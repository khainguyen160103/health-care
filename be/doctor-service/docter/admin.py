from django.contrib import admin
from .models import Doctor, Appointment, Prescription, MedicalReport, LabTest

admin.site.register(Doctor)
admin.site.register(Appointment)
admin.site.register(Prescription)
admin.site.register(MedicalReport)
admin.site.register(LabTest)
