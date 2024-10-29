from rest_framework import serializers
from .models import Vehicle, Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'type', 'latitude', 'longitude', 'is_popular']

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'id', 'name', 'category', 'description', 'max_passengers',
            'max_luggage', 'price_per_km', 'base_price', 'image',
            'features', 'cancellation_policy', 'terms'
        ]