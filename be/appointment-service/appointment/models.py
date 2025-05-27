from django.db import models
from django.utils import timezone
from datetime import time, date
import uuid

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Chờ Xác Nhận'),
        ('confirmed', 'Đã Xác Nhận'),
        ('cancelled', 'Đã Hủy'),
        ('completed', 'Hoàn Thành'),
        ('missed', 'Lỡ Hẹn'),
    ]
    
    PRIORITY_CHOICES = [
        ('normal', 'Bình Thường'),
        ('urgent', 'Khẩn Cấp'),
        ('emergency', 'Cấp Cứu'),
    ]

    # Foreign keys to other services
    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    
    # Fix default values - DateField cần date(), không phải datetime
    appointment_date = models.DateField(default=date.today)  # ✅ Fix here
    appointment_time = models.TimeField(default=time(9, 0))
    duration = models.IntegerField(default=30)
    
    # Status and metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='normal')
    
    # Booking information
    reason = models.TextField(blank=True, help_text="Lý do khám")
    symptoms = models.TextField(blank=True, help_text="Triệu chứng")
    note = models.TextField(blank=True, help_text="Ghi chú thêm")
    
    # Additional info
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    # Booking metadata
    booked_by = models.UUIDField(default=uuid.uuid4)
    
    class Meta:
        ordering = ['-appointment_date', '-appointment_time']
        unique_together = ['doctor_id', 'appointment_date', 'appointment_time']

    def __str__(self):
        return f"Appointment {self.id} - {self.appointment_date} {self.appointment_time}"




class AppointmentHistory(models.Model):
    """Track appointment changes"""
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='history')
    action = models.CharField(max_length=50)
    note = models.TextField(blank=True)
    created_by = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.appointment} - {self.action}"
