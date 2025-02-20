from django.db import models

# Create your models here.

class LostAndFound(models.Model):
    STATUS_CHOICES = [
        ('Lost', 'Lost'),
        ('Found', 'Found'),
        ('Recovered', 'Recovered'),
    ]
    
    report_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    item_description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    report_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'LostAndFound'
        
    def __str__(self):
        return f"Report {self.report_id} - {self.status}"

from django.db import models

from django.db import models

class User(models.Model):
    USER_TYPES = [
        ('Traveler', 'Traveler'),
        ('Admin', 'Admin'),
        ('Community', 'Community')  # Added Community user type
    ]
    
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)
    password_hash = models.CharField(max_length=255)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserPreferences(models.Model):
    TRAVEL_TYPES = [
        ('Solo', 'Solo'),
        ('Group', 'Group'),
        ('Family', 'Family'),
        ('Business', 'Business')
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    preferred_language = models.CharField(max_length=50)
    budget_range = models.CharField(max_length=50)
    travel_type = models.CharField(max_length=10, choices=TRAVEL_TYPES)

    def __str__(self):
        return f"{self.user.name}'s Preferences"

class SafetyAlert(models.Model):
    ALERT_TYPES = [
        ('Crime', 'Crime'),
        ('Protest', 'Protest'),
        ('Disaster', 'Disaster'),
        ('Accident', 'Accident')
    ]
    
    alert_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=255)
    alert_type = models.CharField(max_length=10, choices=ALERT_TYPES)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class EmergencyService(models.Model):
    SERVICE_TYPES = [
        ('Police', 'Police'),
        ('Hospital', 'Hospital'),
        ('Embassy', 'Embassy')
    ]
    
    service_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=10, choices=SERVICE_TYPES)
    location = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

class UserReport(models.Model):
    REPORT_TYPES = [
        ('Scam', 'Scam'),
        ('Crime', 'Crime'),
        ('Accident', 'Accident'),
        ('Unsafe Area', 'Unsafe Area')
    ]
    
    report_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    report_type = models.CharField(max_length=15, choices=REPORT_TYPES)
    description = models.TextField()
    report_time = models.DateTimeField(auto_now_add=True)

class Itinerary(models.Model):
    itinerary_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)

class TransportOption(models.Model):
    TRANSPORT_TYPES = [
        ('Train', 'Train'),
        ('Flight', 'Flight'),
        ('Bus', 'Bus'),
        ('Auto', 'Auto'),
        ('Taxi', 'Taxi')
    ]
    
    transport_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=10, choices=TRANSPORT_TYPES)
    provider = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField()  # in minutes
    departure_time = models.DateTimeField()

class Accommodation(models.Model):
    ACCOMMODATION_TYPES = [
        ('Hotel', 'Hotel'),
        ('Hostel', 'Hostel'),
        ('Homestay', 'Homestay'),
        ('Resort', 'Resort')
    ]
    
    accommodation_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=ACCOMMODATION_TYPES)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=2)

class Expense(models.Model):
    EXPENSE_CATEGORIES = [
        ('Transport', 'Transport'),
        ('Food', 'Food'),
        ('Stay', 'Stay'),
        ('Misc', 'Misc')
    ]
    
    expense_id = models.AutoField(primary_key=True)
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    category = models.CharField(max_length=10, choices=EXPENSE_CATEGORIES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

class GroupExpense(models.Model):
    expense_id = models.AutoField(primary_key=True)
    payer = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    split_between = models.CharField(max_length=255)

class OfflineCache(models.Model):
    DATA_TYPES = [
        ('Maps', 'Maps'),
        ('EmergencyContacts', 'EmergencyContacts'),
        ('Permits', 'Permits'),
        ('Translator', 'Translator')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data_type = models.CharField(max_length=20, choices=DATA_TYPES)
    data = models.JSONField()
    last_updated = models.DateTimeField(auto_now_add=True)

class AIRecommendation(models.Model):
    RECOMMENDATION_TYPES = [
        ('Hotel', 'Hotel'),
        ('Transport', 'Transport'),
        ('Food', 'Food'),
        ('Safety', 'Safety')
    ]
    
    recommendation_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recommendation_type = models.CharField(max_length=10, choices=RECOMMENDATION_TYPES)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class TravelPermit(models.Model):
    PERMIT_STATUS = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected')
    ]
    
    permit_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=PERMIT_STATUS)
    applied_on = models.DateTimeField(auto_now_add=True)

class FoodSafetyRating(models.Model):
    place_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    hygiene_score = models.DecimalField(max_digits=3, decimal_places=2)
    fssai_verified = models.BooleanField(default=False)


