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
