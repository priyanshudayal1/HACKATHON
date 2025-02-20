from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json
import requests
from .models import User, LostAndFound
from django.core.exceptions import ValidationError
from .utils import callGPT
import feedparser

def get_location(coordinates):
    try:
        latitude, longitude = coordinates
        api_key = '5c94ad9aa6f745fc8033a3dbfbaeb93e'
        url = f'https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={api_key}'
        
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if data['results']:
            components = data['results'][0]['components']
            address = data['results'][0]['formatted']
            nearby = components.get('neighbourhood') or components.get('suburb') or components.get('city_district') or ''
            return {
                'address': address,
                'nearby': nearby,
                'city': components.get('city', ''),
                'state': components.get('state', ''),
                'country': components.get('country', '')
            }
        return None
    except Exception as e:
        print(f"Error getting location: {str(e)}")
        return None

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validate user type
            if data['user_type'] not in ['Traveler', 'Community']:
                raise ValidationError('Invalid user type')
                
            user = User(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                password_hash=data['password'],  # In production, use proper password hashing
                user_type=data['user_type']
            )
            user.save()
            
            return JsonResponse({
                'status': 'success',
                'message': 'Registration successful'
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(email=data['email'])
            
            # In production, use proper password verification
            if user.password_hash == data['password']:
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'user': {
                        'id': user.user_id,
                        'name': user.name,
                        'email': user.email,
                        'user_type': user.user_type,
                        'phone': user.phone,
                        'created_at': user.created_at
                    }
                })
            else:
                raise ValidationError('Invalid credentials')
                
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def generate_trip(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            system_prompt = """You are a travel planner expert. Generate a detailed day-by-day trip plan based on the user's requirements.
            Format the response as a JSON array where each object represents a day with the following structure:
            {
                "places": "comma separated list of places",
                "food": "recommended food places",
                "activities": "suggested activities",
                "budget": "estimated budget for the day"
            }"""
            
            user_prompt = f"""Create a {data['days']}-day trip plan for {data['place']} with the following requirements:
            - Total budget: {data['budget']} INR
            - Preferred activities: {data['activity']}
            - Include local food recommendations
            - Optimize the daily schedule for efficiency
            - Include estimated costs for each day"""
            response = callGPT(system_prompt, user_prompt)
            return JsonResponse({
                'status': 'success',
                'trip_plan': response
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def get_transport_routes(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print('Data:', data)
            source = data.get('source')
            destination = data.get('destination')
            
            if not source or not destination:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Source and destination are required'
                }, status=400)
            
            system_prompt = """You are a local transport expert. Generate different route options between two locations.
            Return exactly 3 routes in a JSON array format where each object represents a route with the following structure:
            [
                {
                    "duration": "estimated time",
                    "cost": "estimated cost",
                    "crowdLevel": "low/medium/high",
                    "description": "detailed route description"
                }
            ]"""
            
            user_prompt = f"""Suggest different routes from {source} to {destination} considering:
            - Various transport options (bus, train, metro, etc.)
            - Cost comparison
            - Duration of travel
            - Crowd levels
            - Route descriptions"""
            
            response = callGPT(system_prompt, user_prompt)
            # Ensure response is a valid JSON array
            routes = json.loads(response) if isinstance(response, str) else response
            if not isinstance(routes, list):
                routes = []
                
            return JsonResponse({
                'status': 'success',
                'routes': routes
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def travel_suggestions(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            system_prompt = """You are a travel expert. Generate destination suggestions based on the user's interests and requirements.
            Format the response as a JSON array where each object represents a destination with the following structure:
            {
                "name": "destination name",
                "description": "brief description",
                "highlights": "key attractions or features",
                "costRange": "estimated cost range",
                "bestTime": "best time to visit",
                "activities": ["activity1", "activity2", "activity3"]
            }"""
            
            user_prompt = f"""Suggest destinations matching these criteria:
            - Interests: {data.get('interests', 'any')}
            - Budget: {data.get('budget', 'flexible')}
            - Duration: {data.get('duration', 'any')} days
            - Number of travelers: {data.get('travelers', '1')}
            
            Provide 3-5 destinations in India that best match these preferences. Include popular activities 
            and highlights for each destination."""
            
            response = callGPT(system_prompt, user_prompt)
            suggestions = json.loads(response) if isinstance(response, str) else response
            
            # Validate response format
            if not isinstance(suggestions, list):
                raise ValueError("Invalid response format from GPT")
                
            # Ensure connection is not broken before sending response
            try:
                return JsonResponse({
                    'status': 'success',
                    'suggestions': suggestions
                })
            except BrokenPipeError:
                # Log the error but don't raise it to client
                print("[ERROR] Broken pipe while sending response")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Connection error'
                }, status=500)
                
        except Exception as e:
            print(f"[ERROR] Travel suggestions error: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': 'Failed to generate suggestions'
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def add_lost_found_item(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(user_id=data['user_id'])
            lost_found_item = LostAndFound(
                user=user,
                location=data['location'],
                item_description=data['item_description'],
                status=data['status'],
                date_found=data.get('date_found', None)
            )
            lost_found_item.save()
            # Return the created item data
            response_data = {
                'status': 'success',
                'data': {
                    'report_id': lost_found_item.report_id,
                    'user_id': lost_found_item.user.user_id,
                    'location': lost_found_item.location,
                    'item_description': lost_found_item.item_description,
                    'status': lost_found_item.status,
                    'report_date': lost_found_item.report_date,
                    'date_found': lost_found_item.date_found
                }
            }
            return JsonResponse(response_data)
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found'
            }, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def update_lost_found_item(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            lost_found_item = LostAndFound.objects.get(report_id=data['report_id'])
            lost_found_item.location = data.get('location', lost_found_item.location)
            lost_found_item.item_description = data.get('item_description', lost_found_item.item_description)
            lost_found_item.status = data.get('status', lost_found_item.status)
            lost_found_item.date_found = data.get('date_found', lost_found_item.date_found)
            lost_found_item.save()
            return JsonResponse({
                'status': 'success',
                'message': 'Lost and found item updated successfully',
                'data': {
                    'report_id': lost_found_item.report_id,
                    'user_id': lost_found_item.user.user_id,
                    'location': lost_found_item.location,
                    'item_description': lost_found_item.item_description,
                    'status': lost_found_item.status,
                    'report_date': lost_found_item.report_date,
                    'date_found': lost_found_item.date_found
                }
            })
        except LostAndFound.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'Lost and found item not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def delete_lost_found_item(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            lost_found_item = LostAndFound.objects.get(report_id=data['report_id'])
            lost_found_item.delete()
            return JsonResponse({
                'status': 'success',
                'message': 'Lost and found item deleted successfully'
            })
        except LostAndFound.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'Lost and found item not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def get_all_lost_found_items(request):
    if request.method == 'GET':
        try:
            items = LostAndFound.objects.all()
            items_list = [{
                'report_id': item.report_id,
                'user_id': item.user.user_id,
                'location': item.location,
                'item_description': item.item_description,
                'status': item.status,
                'report_date': item.report_date,
                'date_found': item.date_found
            } for item in items]
            return JsonResponse({
                'status': 'success',
                'items': items_list
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def translate_text(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            required_fields = ['sourceText', 'sourceLang', 'targetLang']
            
            if not all(field in data for field in required_fields):
                return JsonResponse({
                    'status': 'error',
                    'message': 'Missing required fields'
                }, status=400)

            system_prompt = """You are a professional translator. 
            Translate the given text accurately while maintaining the context and meaning."""
            
            user_prompt = f"""Translate this text:
            "{data['sourceText']}"
            From: {data['sourceLang']}
            To: {data['targetLang']}
            
            Provide only the translated text without any additional context or explanations."""
            
            translated_text = callGPT(system_prompt, user_prompt)
            
            return JsonResponse({
                'status': 'success',
                'translatedText': translated_text.strip(),
                'sourceLang': data['sourceLang'],
                'targetLang': data['targetLang']
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid method'
    }, status=405)

@csrf_exempt
def get_location_alerts(request):
    if request.method == 'GET':
        try:
            location = request.GET.get('location', '')
            if not location:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Location is required'
                }, status=400)

            try:
                # Fetch news from Google News
                url = f"https://news.google.com/rss/search?q={location.strip()}+India&hl=en-IN&gl=IN&ceid=IN:en"
                feed = feedparser.parse(url)
                
                news_entries = []
                for entry in feed.entries[:5]:
                    try:
                        news_entries.append({
                            'title': entry.title,
                            'link': entry.link,
                            'published': getattr(entry, 'published', 'No date available')
                        })
                    except AttributeError:
                        continue

                # Get GPT analysis
                system_prompt = """You are a travel safety expert. Analyze the news and provide safety recommendations. 
                Return response in valid JSON format with fields: analysis (string), alerts (array), precautions (array)."""
                
                news_titles = "\n".join([entry['title'] for entry in news_entries])
                user_prompt = f"""Based on these recent news headlines from {location}:
                {news_titles}
                
                Provide:
                1. A brief safety analysis
                2. Key alerts or warnings
                3. Recommended precautions"""

                try:
                    gpt_response = callGPT(system_prompt, user_prompt)
                    # Clean up the response to ensure valid JSON
                    cleaned_response = gpt_response.strip()
                    if cleaned_response.startswith('```json'):
                        cleaned_response = cleaned_response[7:-3]  # Remove ```json and ``` markers
                    
                    analysis_data = json.loads(cleaned_response)
                except (json.JSONDecodeError, AttributeError) as e:
                    print(f"[ERROR] GPT response parsing failed: {str(e)}")
                    # Fallback analysis
                    analysis_data = {
                        "analysis": f"Analysis currently unavailable for {location}.",
                        "alerts": ["No specific alerts at this time."],
                        "precautions": ["Stay updated with local news."]
                    }

                return JsonResponse({
                    'status': 'success',
                    'location': location,
                    'news': news_entries,
                    'analysis': analysis_data
                })

            except Exception as inner_e:
                print(f"[ERROR] Inner processing error: {str(inner_e)}")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to process location data'
                }, status=400)

        except Exception as e:
            print(f"[ERROR] Alert system error: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': 'Failed to fetch alerts'
            }, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def add_loved_one(request, user_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(user_id=user_id)
            
            # Initialize loved_ones if it doesn't exist
            if not user.loved_ones:
                user.loved_ones = []
            
            # Add new loved one
            new_loved_one = {
                'name': data['name'],
                'email': data['email']
            }
            user.loved_ones.append(new_loved_one)
            user.save()
            
            return JsonResponse({
                'status': 'success',
                'message': 'Loved one added successfully',
                'loved_ones': user.loved_ones
            })
            
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def get_loved_ones(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(user_id=user_id)
            return JsonResponse({
                'status': 'success',
                'loved_ones': user.loved_ones or []
            })
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

@csrf_exempt
def send_sos_alert(request, user_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.get(user_id=user_id)
            
            if not user.loved_ones:
                return JsonResponse({
                    'status': 'error',
                    'message': 'No emergency contacts found. Please add emergency contacts first.'
                }, status=400)

            latitude = data.get('latitude')
            longitude = data.get('longitude')
            
            if latitude is None or longitude is None:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Location coordinates are required'
                }, status=400)

            try:
                location_info = get_location((latitude, longitude))
                maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"
                
                # Prepare email context
                context = {
                    'user_name': user.name,
                    'user_phone': user.phone,
                    'user_email': user.email,
                    'maps_link': maps_link,
                    'latitude': latitude,
                    'longitude': longitude,
                    'location_info': location_info
                }

                # Render HTML email content
                html_message = render(request, 'email.html', context).content.decode('utf-8')
                
                subject = f"❗ EMERGENCY SOS Alert from {user.name}"
                plain_message = f"""
                EMERGENCY SOS ALERT!
                {user.name} has triggered an emergency SOS alert.
                Location: {location_info['address'] if location_info else f'{latitude}, {longitude}'}
                Maps Link: {maps_link}
                Contact: {user.phone} | {user.email}
                PLEASE RESPOND IMMEDIATELY!
                """
                
                success_count = 0
                failed_emails = []
                
                for loved_one in user.loved_ones:
                    try:
                        send_mail(
                            subject,
                            plain_message,  # Plain text version
                            settings.DEFAULT_FROM_EMAIL,
                            [loved_one['email']],
                            fail_silently=False,
                            html_message=html_message  # HTML version
                        )
                        success_count += 1
                    except Exception as e:
                        failed_emails.append(loved_one['email'])
                        print(f"Failed to send email to {loved_one['email']}: {str(e)}")
                
                if success_count == 0:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Failed to send alerts to any emergency contacts'
                    }, status=500)
                
                return JsonResponse({
                    'status': 'success',
                    'message': f'SOS alerts sent successfully to {success_count} contacts',
                    'total_contacts': len(user.loved_ones),
                    'successful_sends': success_count,
                    'failed_sends': len(failed_emails)
                })
                
            except Exception as e:
                print(f"Error in send_sos_alert location handling: {str(e)}")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to process location information'
                }, status=500)
            
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found'
            }, status=404)
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON data'
            }, status=400)
        except Exception as e:
            print(f"Unexpected error in send_sos_alert: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': f'An unexpected error occurred: {str(e)}'
            }, status=500)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid method'
    }, status=405)