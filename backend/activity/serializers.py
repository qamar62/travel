from rest_framework import serializers
from .models import *



class ActivityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityImage
        fields = ['id', 'image', 'is_primary', 'alt_text', 'order']

class TimeSlotSerializer(serializers.ModelSerializer):
    available_capacity = serializers.SerializerMethodField()

    class Meta:
        model = TimeSlot
        fields = ['id', 'start_time', 'end_time', 'available_days', 
                 'seasonal_dates', 'price_modifier', 'available_capacity']
    
    def get_available_capacity(self, obj):
        date = self.context.get('date')
        if date:
            bookings = obj.activitybooking_set.filter(booking_date=date)
            booked_participants = bookings.aggregate(
                total=models.Sum('participants'))['total'] or 0
            return max(0, obj.max_capacity - booked_participants)
        return obj.max_capacity

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user_name', 'rating', 'title', 'comment', 
                 'visit_date', 'helpful_votes', 'verified_booking']

class ActivitySerializer(serializers.ModelSerializer):
    images = ActivityImageSerializer(many=True, read_only=True)
    time_slots = TimeSlotSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = '__all__'
        extra_fields = ['images', 'time_slots', 'average_rating', 'reviews_count']

    def get_average_rating(self, obj):
        return obj.reviews.aggregate(avg=models.Avg('rating'))['avg']

    def get_reviews_count(self, obj):
        return obj.reviews.count()

class ActivityBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityBooking
        fields = '__all__'
        read_only_fields = ['booking_reference', 'total_price', 'status']

    def validate(self, data):
        # Check availability
        date = data['booking_date']
        time_slot = data['time_slot']
        participants = data['participants']
        
        # Calculate available capacity
        bookings = ActivityBooking.objects.filter(
            time_slot=time_slot,
            booking_date=date
        )
        booked_participants = bookings.aggregate(
            total=models.Sum('participants'))['total'] or 0
        available = time_slot.max_capacity - booked_participants
        
        if participants > available:
            raise serializers.ValidationError(
                f"Only {available} spots available for this time slot"
            )
        
        return data