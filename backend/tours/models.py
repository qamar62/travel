# models.py
from django.db import models
from django.contrib.auth.models import User
from activity.models import Activity
from django.core.validators import MinValueValidator, MaxValueValidator

class Destination(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.name}, {self.country}"

class TourCategory(models.Model):
    name = models.CharField(max_length=100)  # e.g., Adventure, Cultural, Nature
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "Tour Categories"
    
    def __str__(self):
        return self.name

class Tour(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('moderate', 'Moderate'),
        ('challenging', 'Challenging'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(TourCategory, on_delete=models.SET_NULL, null=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    # Add validators to duration_days
    duration_days = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1, message="Duration must be at least 1 day"),
            MaxValueValidator(30, message="Duration cannot exceed 30 days")
        ],
        help_text="Number of days for the tour",
        default=1  # Add a default value
    )
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    activities = models.ManyToManyField(Activity, related_name="tours")
    # Tour Details
    overview = models.TextField()
    highlights = models.TextField()
    itinerary = models.TextField()
    meeting_point = models.CharField(max_length=200)
    end_point = models.CharField(max_length=200)
    
    # Pricing
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    min_group_size = models.PositiveIntegerField(default=1)
    max_group_size = models.PositiveIntegerField()
    
    # Dates and Availability
    start_dates = models.ManyToManyField('TourDate')
    booking_deadline_days = models.PositiveIntegerField(default=7)
    
    # Additional Info
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title

class TourImage(models.Model):
    tour = models.ForeignKey(Tour, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='tour_images/')
    is_primary = models.BooleanField(default=False)
    caption = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"Image for {self.tour.title}"

class TourDate(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    price_modifier = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)
    available_slots = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.start_date} to {self.end_date}"

class TourInclusion(models.Model):
    tour = models.ForeignKey(Tour, related_name='inclusions', on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.description

class TourExclusion(models.Model):
    tour = models.ForeignKey(Tour, related_name='exclusions', on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.description