from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/generate-trip/', views.generate_trip, name='generate-trip'),
    path('api/lost-found-items/', views.get_all_lost_found_items, name='lost_found_item'),
    path('api/add-lost-found-item/', views.add_lost_found_item, name='add_lost_found_item'),
    path('api/update-lost-found-items/', views.update_lost_found_item, name='update_lost_found_item'),
    path('api/delete-lost-found-items/', views.delete_lost_found_item, name='delete_lost_found_item'),
    path('get-transport-routes/', views.get_transport_routes, name='get_transport_routes'),
]

