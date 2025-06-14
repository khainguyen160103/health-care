from django.contrib import admin
from .models import Patient, RegularPatient, VIPPatient, MedicalRecord

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'first_name', 'last_name', 'patient_type', 'created_at']
    list_filter = ['patient_type', 'gender', 'created_at']
    search_fields = ['user_id', 'first_name', 'last_name', 'email']

@admin.register(RegularPatient)
class RegularPatientAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'first_name', 'last_name', 'insurance_provider', 'created_at']
    list_filter = ['insurance_provider', 'gender', 'created_at']
    search_fields = ['user_id', 'first_name', 'last_name', 'email', 'insurance_number']

@admin.register(VIPPatient)
class VIPPatientAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'first_name', 'last_name', 'vip_tier', 'membership_start_date', 'created_at']
    list_filter = ['vip_tier', 'gender', 'membership_start_date', 'created_at']
    search_fields = ['user_id', 'first_name', 'last_name', 'email']

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ['patient', 'doctor_id', 'diagnosis', 'date', 'is_priority_treatment']
    list_filter = ['is_priority_treatment', 'follow_up_required', 'date']
    search_fields = ['patient__first_name', 'patient__last_name', 'diagnosis']
