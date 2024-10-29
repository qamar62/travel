from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Hotel(models.Model):
    STAR_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=255)
    star_rating = models.IntegerField(choices=STAR_CHOICES)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    amenities = models.JSONField(default=list)
    check_in_time = models.TimeField()
    check_out_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_star_rating_display()})"

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='rooms', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    max_occupancy = models.IntegerField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    size_sqm = models.IntegerField()
    amenities = models.JSONField(default=list)
    images = models.JSONField(default=list)

    def __str__(self):
        return f"{self.name} at {self.hotel.name}"