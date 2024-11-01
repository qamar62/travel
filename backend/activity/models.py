from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
# Create your models here.



class Activity(models.Model):
    ACTIVITY_TYPES = [
        ('tour', 'Guided Tour'),
        ('adventure', 'Adventure Activity'),
        ('workshop', 'Workshop/Class'),
        ('attraction', 'Attraction Visit'),
        ('experience', 'Local Experience'),
        ('water', 'Water Activity'),
        ('cultural', 'Cultural Activity'),
        ('food', 'Food & Drinks'),
    ]

    LANGUAGES = [
        ('en', 'English'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('de', 'German'),
        ('it', 'Italian'),
        ('ar', 'Arabic'),
        ('zh', 'Chinese'),
    ]

    # Basic Information
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    languages = models.JSONField(default=list, help_text="List of languages available")
    
    # Location Details
    location_name = models.CharField(max_length=200)
    address = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    meeting_point_details = models.TextField(blank=True)
    
    # Activity Details
    description = models.TextField()
    highlights = models.JSONField(default=list)
    included = models.JSONField(default=list)
    not_included = models.JSONField(default=list)
    requirements = models.JSONField(default=list)
    accessibility_info = models.TextField(blank=True)
    
    # New itinerary field
    itinerary = models.JSONField(default=list, help_text="List of itinerary items")
    
    # Timing and Duration
    duration = models.DurationField(help_text="Duration in hours and minutes")
    skip_the_line = models.BooleanField(default=False)
    instant_confirmation = models.BooleanField(default=True)
    
    # Capacity and Booking
    min_participants = models.PositiveIntegerField(default=1)
    max_participants = models.PositiveIntegerField()
    private_available = models.BooleanField(default=False)
    
    # Pricing
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    child_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    private_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Cancellation and Policies
    cancellation_policy = models.TextField()
    booking_deadline_hours = models.PositiveIntegerField(default=24)
    
    # Status and Metadata
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Addons 
    addons = models.JSONField(default=list, help_text="List of addons items", null=True, blank=True)
    
    # SEO and Display
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Activities"
        ordering = ['-featured', '-created_at']
        
    def __str__(self):
        return self.title
    

class ActivityImage(models.Model):
    activity = models.ForeignKey(Activity, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='activity_images/')
    is_primary = models.BooleanField(default=False)
    alt_text = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class TimeSlot(models.Model):
    activity = models.ForeignKey(Activity, related_name='time_slots', on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    available_days = models.JSONField(help_text="List of available days (0-6)")
    seasonal_dates = models.JSONField(null=True, blank=True, 
                                    help_text="Optional seasonal availability")
    price_modifier = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)
    max_capacity = models.PositiveIntegerField()



class ActivityBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    booking_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    participants = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    booking_reference = models.CharField(max_length=20, unique=True)
    contact_name = models.CharField(max_length=200)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    activity = models.ForeignKey(Activity, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(

        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title = models.CharField(max_length=200)

    comment = models.TextField()
    visit_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    helpful_votes = models.PositiveIntegerField(default=0)
    verified_booking = models.BooleanField(default=False)