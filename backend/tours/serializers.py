from rest_framework import serializers
from .models import Tour, Destination, TourImage, TourDate


from rest_framework.validators import UniqueValidator

from .models import (
    Destination,
    TourCategory,
    Tour,
    TourImage,
    TourDate,
    TourInclusion,
    TourExclusion,
)


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'


class TourCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCategory
        fields = '__all__'
        extra_keys = ['tour_count']  # Optional field to show tour count (requires view logic)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['tour_count'] = instance.tour_set.count()  # Assuming related_name is 'tour_set'
        return representation


class TourDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDate
        fields = '__all__'


class TourInclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourInclusion
        fields = '__all__'


class TourExclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourExclusion
        fields = '__all__'


class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = '__all__'


class TourSerializer(serializers.ModelSerializer):

    images = TourImageSerializer(many=True, read_only=True)
    start_dates = TourDateSerializer(many=True, read_only=True)
    inclusions = TourInclusionSerializer(many=True, read_only=True)
    exclusions = TourExclusionSerializer(many=True, read_only=True)
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = (
            'id',
            'title',
            'slug',
            'category',
            'category_name',
            'destination',
            'duration_days',
            'difficulty_level',
            'overview',
            'highlights',
            'itinerary',
            'meeting_point',
            'end_point',
            'base_price',
            'min_group_size',
            'max_group_size',
            'booking_deadline_days',
            'images',
            'start_dates',
            'inclusions',
            'exclusions',
            'created_at',
            'updated_at',
            'is_active',
        )

    def get_category_name(self, obj):
        return obj.category.name


class DetailedTourSerializer(TourSerializer):
    # Include additional details as needed for a more comprehensive view
    pass