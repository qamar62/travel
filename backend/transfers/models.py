from django.db import models

class Vehicle(models.Model):
    CATEGORY_CHOICES = [
        ('economy', 'Economy'),
        ('business', 'Business'),
        ('first', 'First Class'),
        ('van', 'Van'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    max_passengers = models.IntegerField()
    max_luggage = models.IntegerField()
    price_per_km = models.DecimalField(max_digits=10, decimal_places=2)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='vehicles/')
    features = models.JSONField(default=list)
    cancellation_policy = models.TextField()
    terms = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.category})"

class Location(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)  # airport, hotel, landmark, etc.
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.type})"