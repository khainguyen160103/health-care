from django.db import models

class Appointment(models.Model):
    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    scheduled_time = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled')],
        default='pending'
    )
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment {self.id} - Patient {self.patient_id} with Doctor {self.doctor_id}"
