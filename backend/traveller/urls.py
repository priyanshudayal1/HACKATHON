from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/generate-trip/', views.generate_trip, name='generate-trip'),
    path('get-transport-routes/', views.get_transport_routes, name='get_transport_routes'),
]

