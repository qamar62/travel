# Generated by Django 5.0.1 on 2024-11-01 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0003_activity_itinerary'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='addons',
            field=models.JSONField(blank=True, default=list, help_text='List of addons items', null=True),
        ),
    ]
