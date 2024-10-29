from rest_framework import serializers
from .models import Attraction, AttractionTicket

class AttractionTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionTicket
        fields = ['id', 'name', 'description', 'price', 'duration', 'inclusions', 'exclusions']

class AttractionSerializer(serializers.ModelSerializer):
    tickets = AttractionTicketSerializer(many=True, read_only=True)
    
    class Meta:
        model = Attraction
        fields = [
            'id', 'name', 'description', 'location', 'latitude', 'longitude',
            'opening_hours', 'price', 'rating', 'reviews_count', 'images',
            'features', 'tickets', 'created_at', 'updated_at'
        ]