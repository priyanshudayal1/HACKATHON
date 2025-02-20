from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, LostAndFound
from django.core.exceptions import ValidationError
from .utils import callGPT

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
                        'user_type': user.user_type
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
    if request.method == 'GET':
        try:
            source = request.GET.get('source')
            destination = request.GET.get('destination')
            
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