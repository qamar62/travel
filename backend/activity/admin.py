
from django.contrib import admin
from django.utils.html import format_html
from . models import *

class ActivityImageInline(admin.TabularInline):
    model = ActivityImage
    extra = 1
    fields = ('image', 'is_primary', 'alt_text', 'order', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px;"/>',
                obj.image.url
            )
        return "No image"

class TimeSlotInline(admin.TabularInline):
    model = TimeSlot
    extra = 1
    fields = ('start_time', 'end_time', 'available_days', 
              'seasonal_dates', 'price_modifier', 'max_capacity')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'activity_type', 'location_name', 
                   'base_price', 'duration', 'is_active', 'featured')
    list_filter = ('activity_type', 'is_active', 'featured', 'languages')
    search_fields = ('title', 'description', 'location_name')
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'title', 'slug', 'activity_type', 'languages',
                'description', 'highlights'
            )
        }),
        ('Location', {
            'fields': (
                'location_name', 'address', 'latitude', 'longitude',
                'meeting_point_details'
            )
        }),
        ('Activity Details', {
            'fields': (
                'included', 'not_included', 'requirements',
                'accessibility_info', 'duration'
            )
        }),
        ('Booking & Capacity', {
            'fields': (
                'min_participants', 'max_participants',
                'private_available', 'skip_the_line',
                'instant_confirmation'
            )
        }),
        ('Pricing', {
            'fields': (
                'base_price', 'child_price', 'private_price'
            )
        }),
        ('Policies', {
            'fields': (
                'cancellation_policy', 'booking_deadline_hours'
            )
        }),
        ('Status & SEO', {
            'fields': (
                'is_active', 'featured', 'meta_title', 'meta_description'
            )
        }),
    )
    
    inlines = [ActivityImageInline, TimeSlotInline]

@admin.register(ActivityBooking)
class ActivityBookingAdmin(admin.ModelAdmin):
    list_display = ('booking_reference', 'activity', 'booking_date', 
                   'status', 'participants', 'total_price')
    list_filter = ('status', 'booking_date', 'created_at')
    search_fields = ('booking_reference', 'contact_name', 'contact_email')
    readonly_fields = ('booking_reference', 'created_at')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('activity', 'user', 'rating', 'visit_date', 'verified_booking')
    list_filter = ('rating', 'verified_booking', 'visit_date')
    search_fields = ('activity__title', 'user__username', 'comment')