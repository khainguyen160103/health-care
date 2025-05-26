from django.db import models

class EmailTemplate(models.Model):
    name = models.CharField(max_length=100, unique=True)
    subject = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'notify'  # Khớp với INSTALLED_APPS
        db_table = 'notify_emailtemplate'

class EmailLog(models.Model):
    recipient_email = models.EmailField()
    subject = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)  # Cho phép null và blank
    template_name = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('sent', 'Sent'),
        ('failed', 'Failed'),
        ('pending', 'Pending')
    ], default='pending')
    sent_at = models.DateTimeField(auto_now_add=True)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.recipient_email} - {self.status}"

    class Meta:
        app_label = 'notify'
        db_table = 'notify_emaillog'
        ordering = ['-sent_at']
