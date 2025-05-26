from django.db import models

# Create your models here.

class Patient(models.Model):
    user_id = models.IntegerField(unique=True)  # Liên kết với user từ auth-service
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    medical_history = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Patient {self.user_id}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor_id = models.IntegerField()
    diagnosis = models.TextField()
    treatment = models.TextField()
    notes = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record for Patient {self.patient.user_id}"
