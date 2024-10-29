from rest_framework import serializers
from .models import Tour, TourImage, TourDate

class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'image', 'is_primary']

class TourDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDate
        fields = ['id', 'date', 'available_spots', 'price_modifier']

class TourSerializer(serializers.ModelSerializer):
    images = TourImageSerializer(many=True, read_only=True)
    dates = TourDateSerializer(many=True, read_only=True)
    
    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'description', 'price', 'duration',
            'location', 'rating', 'reviews_count', 'max_group_size',
            'highlights', 'included', 'not_included', 'languages',
            'start_time', 'images', 'dates', 'created_at', 'updated_at'
        ]