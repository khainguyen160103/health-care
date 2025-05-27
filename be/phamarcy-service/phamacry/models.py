from django.db import models

# Create your models here.

class Medication(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    manufacturer = models.CharField(max_length=100)
    dosage_form = models.CharField(max_length=50)  # tablet, capsule, syrup
    strength = models.CharField(max_length=50)  # 500mg, 10ml
    price = models.DecimalField(max_digits=10, decimal_places=2)
    requires_prescription = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Inventory(models.Model):
    medication = models.OneToOneField(Medication, on_delete=models.CASCADE, related_name='inventory')
    quantity = models.IntegerField(default=0)
    expiry_date = models.DateField()
    batch_number = models.CharField(max_length=50)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medication.name} - {self.quantity} units"

class Prescription(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('dispensed', 'Dispensed'),
        ('cancelled', 'Cancelled'),
    ]
    
    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    prescription_number = models.CharField(max_length=50, unique=True)
    medications = models.JSONField()  # [{'medication_id': 1, 'quantity': 30, 'instructions': '...'}]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    prescribed_date = models.DateTimeField(auto_now_add=True)
    dispensed_date = models.DateTimeField(null=True, blank=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Prescription {self.prescription_number}"

class Pharmacist(models.Model):
    user_id = models.IntegerField(unique=True)
    license_number = models.CharField(max_length=50, blank=True)
    department = models.CharField(max_length=50, default='General Pharmacy')
    phone = models.CharField(max_length=20, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pharmacist: {self.first_name} {self.last_name}"
