# Generated by Django 5.1.4 on 2024-12-27 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_main', '0002_subject_created_subject_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
