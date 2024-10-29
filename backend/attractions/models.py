from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Attraction(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    opening_hours = models.JSONField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0
    )
    reviews_count = models.IntegerField(default=0)
    images = models.JSONField(default=list)
    features = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class AttractionTicket(models.Model):
    attraction = models.ForeignKey(Attraction, related_name='tickets', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    inclusions = models.JSONField(default=list)
    exclusions = models.JSONField(default=list)

    def __str__(self):
        return f"{self.name} - {self.attraction.name}"