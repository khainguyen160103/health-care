# Generated by Django 5.2.1 on 2025-05-26 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phamacry', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pharmacist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField(unique=True)),
                ('license_number', models.CharField(blank=True, max_length=50)),
                ('department', models.CharField(default='General Pharmacy', max_length=50)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=30)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
