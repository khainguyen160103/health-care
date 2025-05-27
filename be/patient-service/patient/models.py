from django.db import models

# Create your models here.
class Patient(models.Model):
    user_id = models.CharField(max_length=36, unique=True)  # UUID string
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, default='Other')
    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    medical_history = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=20, blank=True)
    # Thêm các field từ User để dễ quản lý
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Patient {self.user_id} - {self.first_name} {self.last_name}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor_id = models.IntegerField()
    diagnosis = models.TextField()
    treatment = models.TextField()
    notes = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record for Patient {self.patient.user_id}"
