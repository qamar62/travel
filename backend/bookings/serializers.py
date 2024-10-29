from rest_framework import serializers
from .models import Booking, Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'amount', 'status', 'payment_method',
            'transaction_id', 'payment_date'
        ]

class BookingSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'booking_reference', 'status', 'total_amount',
            'booking_date', 'service_date', 'service_type',
            'service_details', 'contact_info', 'special_requests',
            'payments', 'created_at', 'updated_at'
        ]
        read_only_fields = ['booking_reference', 'status']

    def create(self, validated_data):
        # Generate unique booking reference
        import random
        import string
        
        def generate_reference():
            return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        
        reference = generate_reference()
        while Booking.objects.filter(booking_reference=reference).exists():
            reference = generate_reference()
            
        validated_data['booking_reference'] = reference
        return super().create(validated_data)