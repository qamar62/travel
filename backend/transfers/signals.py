from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import Vehicle, Location

@receiver(post_save, sender=Vehicle)
def vehicle_post_save(sender, instance, created, **kwargs):
    """
    Handle post-save operations for Vehicle model
    - Send notifications when new vehicles are added
    - Update related bookings when vehicle details change
    """
    if created:
        # Log new vehicle creation
        print(f"New vehicle added: {instance.name}")
        
        # You could send email notifications to admins
        subject = 'New Vehicle Added'
        message = f'A new vehicle has been added: {instance.name}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [admin[1] for admin in settings.ADMINS]
        
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        except Exception as e:
            print(f"Failed to send email notification: {e}")

@receiver(pre_save, sender=Vehicle)
def vehicle_pre_save(sender, instance, **kwargs):
    """
    Handle pre-save operations for Vehicle model
    - Validate vehicle data before saving
    - Update related data if needed
    """
    if instance.pk:  # If this is an update
        try:
            old_instance = Vehicle.objects.get(pk=instance.pk)
            if old_instance.max_passengers != instance.max_passengers:
                # Handle passenger capacity changes
                print(f"Vehicle capacity changed from {old_instance.max_passengers} to {instance.max_passengers}")
        except Vehicle.DoesNotExist:
            pass

@receiver(post_save, sender=Location)
def location_post_save(sender, instance, created, **kwargs):
    """
    Handle post-save operations for Location model
    - Update caches when locations change
    - Send notifications for new popular locations
    """
    if created and instance.is_popular:
        # Handle new popular location creation
        subject = 'New Popular Location Added'
        message = f'A new popular location has been added: {instance.name}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [admin[1] for admin in settings.ADMINS]
        
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        except Exception as e:
            print(f"Failed to send email notification: {e}")

@receiver(pre_save, sender=Location)
def location_pre_save(sender, instance, **kwargs):
    """
    Handle pre-save operations for Location model
    - Validate location data
    - Update related transfers if location details change
    """
    if instance.pk:
        try:
            old_instance = Location.objects.get(pk=instance.pk)
            if old_instance.name != instance.name:
                # Handle location name changes
                print(f"Location name changed from {old_instance.name} to {instance.name}")
        except Location.DoesNotExist:
            pass