from django.db import migrations, models
import datetime

class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0003_auto_20250527_0331'),  # migration cuối cùng của bạn
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='appointment_date',
            field=models.DateField(default=datetime.date.today),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='appointment_time',
            field=models.TimeField(default=datetime.time(9, 0)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='duration',
            field=models.IntegerField(default=30),
        ),
        migrations.AddField(
            model_name='appointment',
            name='reason',
            field=models.TextField(blank=True, help_text='Lý do khám'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='symptoms',
            field=models.TextField(blank=True, help_text='Triệu chứng'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='priority',
            field=models.CharField(
                choices=[
                    ('normal', 'Bình Thường'),
                    ('urgent', 'Khẩn Cấp'),
                    ('emergency', 'Cấp Cứu')
                ],
                default='normal',
                max_length=20
            ),
        ),
        migrations.AddField(
            model_name='appointment',
            name='consultation_fee',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='appointment',
            name='booked_by',
            field=models.IntegerField(default=1),
        ),
    ]