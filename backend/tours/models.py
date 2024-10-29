from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Tour(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0
    )
    reviews_count = models.IntegerField(default=0)
    max_group_size = models.IntegerField(default=15)
    highlights = models.JSONField(default=list)
    included = models.JSONField(default=list)
    not_included = models.JSONField(default=list)
    languages = models.JSONField(default=list)
    start_time = models.CharField(max_length=10, default="09:00")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TourImage(models.Model):
    tour = models.ForeignKey(Tour, related_name='images', on_delete=models.CASCADE)
    image = models.URLField()  # Changed to URLField for external image URLs
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.tour.title}"

class TourDate(models.Model):
    tour = models.ForeignKey(Tour, related_name='dates', on_delete=models.CASCADE)
    date = models.DateField()
    available_spots = models.IntegerField()
    price_modifier = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        default=1.00
    )

    class Meta:
        unique_together = ['tour', 'date']

    def __str__(self):
        return f"{self.tour.title} on {self.date}"