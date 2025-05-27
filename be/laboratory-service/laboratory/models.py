from django.db import models

class LabTest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sample_collected', 'Sample Collected'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    TEST_TYPE_CHOICES = [
        ('blood', 'Blood Test'),
        ('urine', 'Urine Test'),
        ('xray', 'X-Ray'),
        ('mri', 'MRI'),
        ('ct_scan', 'CT Scan'),
        ('ecg', 'ECG'),
    ]
    
    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    test_code = models.CharField(max_length=50, unique=True)
    test_name = models.CharField(max_length=200)
    test_type = models.CharField(max_length=50, choices=TEST_TYPE_CHOICES)
    instructions = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    ordered_date = models.DateTimeField(auto_now_add=True)
    sample_collected_date = models.DateTimeField(null=True, blank=True)
    completed_date = models.DateTimeField(null=True, blank=True)
    results = models.JSONField(null=True, blank=True)
    normal_ranges = models.JSONField(null=True, blank=True)
    technician_notes = models.TextField(blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    urgent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.test_name} - {self.test_code}"

class LabTestTemplate(models.Model):
    """Template cho các loại xét nghiệm thường dùng"""
    name = models.CharField(max_length=200)
    test_type = models.CharField(max_length=50)
    description = models.TextField()
    normal_ranges = models.JSONField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    preparation_instructions = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class LabTechnician(models.Model):
    user_id = models.IntegerField(unique=True)
    certification = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=50, default='General Lab')
    phone = models.CharField(max_length=20, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Lab Tech: {self.first_name} {self.last_name}"
