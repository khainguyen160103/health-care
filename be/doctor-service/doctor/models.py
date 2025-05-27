from django.db import models

# Create your models here.


class Doctor(models.Model):
    user_id = models.CharField(max_length=36, unique=True)  # UUID string
    specialty = models.CharField(max_length=100, blank=True)
    experience_years = models.IntegerField(default=0)
    qualification = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=500000)
    is_available = models.BooleanField(default=True)
    # Thêm thông tin từ User
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} - {self.specialty}"

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
