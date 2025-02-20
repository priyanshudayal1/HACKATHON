from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User
from django.core.exceptions import ValidationError

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
