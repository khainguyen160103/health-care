from django.db import models
from decimal import Decimal

# Create your models here.
class Patient(models.Model):
    PATIENT_TYPE_CHOICES = [
        ('regular', 'Regular Patient'),
        ('vip', 'VIP Patient'),
    ]
    
    user_id = models.CharField(max_length=36, unique=True)  # UUID string
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, default='Other')
    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    medical_history = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=20, blank=True)
    patient_type = models.CharField(max_length=10, choices=PATIENT_TYPE_CHOICES, default='regular')
    
    # Thêm các field từ User để dễ quản lý
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    def __str__(self):
        return f"{self.get_patient_type_display()} - {self.first_name} {self.last_name}"
    
    def get_discount_rate(self):
        """Base discount rate - to be overridden by subclasses"""
        return Decimal('0.00')
    
    def get_priority_level(self):
        """Base priority level - to be overridden by subclasses"""
        return 1
    
    def can_book_priority_appointment(self):
        """Check if patient can book priority appointments"""
        return False

class RegularPatient(Patient):
    """Regular Patient với các quyền cơ bản"""
    
    # Thêm các fields cho Regular patient
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=50, blank=True)
    insurance_expiry_date = models.DateField(null=True, blank=True)
    preferred_appointment_time = models.CharField(
        max_length=20,
        choices=[
            ('morning', 'Morning (8AM-12PM)'),
            ('afternoon', 'Afternoon (1PM-5PM)'),
            ('evening', 'Evening (6PM-8PM)')
        ],
        default='morning'
    )
    loyalty_points = models.IntegerField(default=0)
    referral_code = models.CharField(max_length=20, blank=True, unique=True)
    total_visits = models.IntegerField(default=0)
    last_visit_date = models.DateField(null=True, blank=True)
    
    class Meta:
        verbose_name = "Regular Patient"
        verbose_name_plural = "Regular Patients"
    
    def __str__(self):
        return f"Regular Patient {self.first_name} {self.last_name}"
    
    @property
    def is_insurance_active(self):
        """Kiểm tra bảo hiểm còn hiệu lực không"""
        if self.insurance_expiry_date:
            from django.utils import timezone
            return timezone.now().date() <= self.insurance_expiry_date
        return False
    
    def add_loyalty_points(self, points):
        """Thêm điểm thưởng"""
        self.loyalty_points += points
        self.save()
    
    def use_loyalty_points(self, points):
        """Sử dụng điểm thưởng"""
        if self.loyalty_points >= points:
            self.loyalty_points -= points
            self.save()
            return True
        return False
    
    def increment_visit_count(self):
        """Tăng số lần khám"""
        self.total_visits += 1
        from django.utils import timezone
        self.last_visit_date = timezone.now().date()
        self.save()
    
    def get_loyalty_discount(self):
        """Tính discount dựa trên loyalty points"""
        if self.loyalty_points >= 100:
            return min(self.loyalty_points // 100 * 5, 30)  # Max 30% discount
        return 0

class VIPPatient(Patient):
    """VIP Patient với các quyền lợi đặc biệt"""
    
    # Thêm các fields đặc biệt cho VIP
    membership_level = models.CharField(
        max_length=20, 
        choices=[
            ('gold', 'Gold'),
            ('platinum', 'Platinum'),
            ('diamond', 'Diamond')
        ],
        default='gold'
    )
    membership_start_date = models.DateField(auto_now_add=True)
    membership_end_date = models.DateField(null=True, blank=True)
    dedicated_doctor_id = models.IntegerField(null=True, blank=True)  # Bác sĩ riêng
    priority_level = models.IntegerField(default=1)  # 1 = highest priority
    annual_health_checkup = models.BooleanField(default=True)
    free_consultations_remaining = models.IntegerField(default=5)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=20.00)
    
    class Meta:
        verbose_name = "VIP Patient"
        verbose_name_plural = "VIP Patients"
    
    def __str__(self):
        return f"VIP Patient {self.first_name} {self.last_name} ({self.membership_level})"
    
    @property
    def is_membership_active(self):
        """Kiểm tra membership còn active không"""
        if self.membership_end_date:
            from django.utils import timezone
            return timezone.now().date() <= self.membership_end_date
        return True
    
    def get_consultation_fee_with_discount(self, base_fee):
        """Tính phí khám với discount"""
        if self.free_consultations_remaining > 0:
            return 0
        discount_amount = base_fee * (self.discount_percentage / 100)
        return base_fee - discount_amount
    
    def use_free_consultation(self):
        """Sử dụng 1 lượt khám miễn phí"""
        if self.free_consultations_remaining > 0:
            self.free_consultations_remaining -= 1
            self.save()
            return True
        return False

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor_id = models.IntegerField()
    diagnosis = models.TextField()
    treatment = models.TextField()
    notes = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    
    # VIP specific fields
    is_priority_treatment = models.BooleanField(default=False)
    follow_up_required = models.BooleanField(default=False)
    follow_up_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Record for Patient {self.patient.user_id}"
