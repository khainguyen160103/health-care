from django.contrib import admin
from .models import EmailTemplate, EmailLog

@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'created_at']
    search_fields = ['name', 'subject']

@admin.register(EmailLog)
class EmailLogAdmin(admin.ModelAdmin):
    list_display = ['recipient_email', 'subject', 'status', 'sent_at']
    list_filter = ['status', 'sent_at']
    search_fields = ['recipient_email', 'subject']
