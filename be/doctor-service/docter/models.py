from django.db import models

# Create your models here.

class Doctor(models.Model):
    user_id = models.IntegerField(unique=True)
    specialization = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    experience_years = models.IntegerField()
    phone = models.CharField(max_length=20)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    available_days = models.JSONField(default=list)  # ['monday', 'tuesday', ...]
    available_hours = models.JSONField(default=dict)  # {'start': '09:00', 'end': '17:00'}
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Doctor {self.user_id}"

class Schedule(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='schedules')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ['doctor', 'date', 'start_time']

    def __str__(self):
        return f"Schedule for {self.doctor} on {self.date}"
