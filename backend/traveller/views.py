from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User
import bcrypt

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Hash the password
            password = data['password'].encode('utf-8')
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(password, salt)
            
            # Create user
            user = User(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                password_hash=hashed.decode('utf-8'),
                user_type=data['user_type']
            )
            user.save()
            
            return JsonResponse({
                'status': 'success',
                'message': 'User registered successfully'
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
