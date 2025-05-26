from django.contrib import admin
from .models import Bill, InsuranceClaim

admin.site.register(Bill)
admin.site.register(InsuranceClaim)
