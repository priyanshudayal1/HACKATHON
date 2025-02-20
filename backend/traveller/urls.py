from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/generate-trip/', views.generate_trip, name='generate-trip'),
    path('api/lost-found-items/', views.get_all_lost_found_items, name='lost_found_item'),
    path('api/add-lost-found-item/', views.add_lost_found_item, name='add_lost_found_item'),
    path('api/update-lost-found-item/', views.update_lost_found_item, name='update_lost_found_item'),
    path('api/delete-lost-found-items/', views.delete_lost_found_item, name='delete_lost_found_item'),
    path('api/transport-routes/', views.get_transport_routes, name='get_transport_routes'),
    path('travel-suggestions/', views.travel_suggestions, name='travel_suggestions'),
    path('api/translate/', views.translate_text, name='translate_text'),
    path('api/alerts/location/', views.get_location_alerts, name='get_location_alerts'),
    path('api/add_loved_one/<int:user_id>/', views.add_loved_one, name='add_loved_one'),
    path('api/loved_ones/<int:user_id>/', views.get_loved_ones, name='get_loved_ones'),
    path('api/send-sos-alert/<int:user_id>/', views.send_sos_alert, name='send_sos_alert'),
]

