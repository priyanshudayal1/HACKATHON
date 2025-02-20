from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User
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
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
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
            
            user_prompt = f"""Suggest different routes from {data['source']} to {data['destination']} considering:
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
                'status': 'success',
                'routes': []  # Return empty array on error
            })
    
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)
