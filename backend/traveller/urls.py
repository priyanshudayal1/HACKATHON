from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/generate-trip/', views.generate_trip, name='generate-trip'),
    path('api/login/', views.add_lost_found_item, name='add_lost_found_item'),
    path('api/login/', views.update_lost_found_item, name='update_lost_found_item'),
    path('api/login/', views.delete_lost_found_item, name='delete_lost_found_item'),
]

