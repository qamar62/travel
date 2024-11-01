# admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Tour, TourImage, TourDate, TourInclusion, 
    TourExclusion, TourCategory, Destination
)

class TourImageInline(admin.TabularInline):
    model = TourImage
    extra = 1
    fields = ('image', 'is_primary', 'caption', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px;"/>',
                obj.image.url
            )
        return "No image"

class TourInclusionInline(admin.TabularInline):
    model = TourInclusion
    extra = 1
    verbose_name = "What's Included"
    verbose_name_plural = "What's Included"

class TourExclusionInline(admin.TabularInline):
    model = TourExclusion
    extra = 1
    verbose_name = "What's Not Included"
    verbose_name_plural = "What's Not Included"

class TourDateInline(admin.TabularInline):
    model = Tour.start_dates.through
    extra = 1
    verbose_name = "Tour Date"
    verbose_name_plural = "Tour Dates"

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'destination', 'duration_days', 
        'base_price', 'difficulty_level', 'is_active',
        'available_dates_count', 'primary_image_preview'
    )
    list_filter = (
        'is_active', 'difficulty_level', 'destination',
        'category', 'duration_days'
    )
    search_fields = ('title', 'overview', 'destination__name')
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'title',
                'slug',
                'category',
                'destination',
                'duration_days',  # Added here
                'difficulty_level',
                'is_active'
            ),
            'classes': ('wide',)
        }),
        ('Tour Details', {
            'fields': (
                'overview',
                'highlights',
                'itinerary',
                'meeting_point',
                'end_point'
            ),
            'classes': ('wide',)
        }),
        ('Activity Includes', {
            'fields': (
                'activities',
               
            ),
            'classes': ('wide',)
        }),
        ('Pricing & Group Size', {
            'fields': (
                'base_price',
                'min_group_size',
                'max_group_size',
                'booking_deadline_days'
            ),
            'classes': ('wide',)
        }),
    )
    
    inlines = [
        TourImageInline,
        TourDateInline,
        TourInclusionInline,
        TourExclusionInline
    ]

    def available_dates_count(self, obj):
        return obj.start_dates.count()
    available_dates_count.short_description = 'Available Dates'

    def primary_image_preview(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return format_html(
                '<img src="{}" style="max-height: 50px;"/>',
                primary_image.image.url
            )
        return "No primary image"
    primary_image_preview.short_description = 'Primary Image'

    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(TourDate)
class TourDateAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date', 'price_modifier', 'available_slots')
    list_filter = ('start_date', 'available_slots')
    search_fields = ('start_date', 'end_date')

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'tours_count')
    search_fields = ('name', 'country')
    
    def tours_count(self, obj):
        return obj.tour_set.count()
    tours_count.short_description = 'Number of Tours'

@admin.register(TourCategory)
class TourCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'tours_count')
    search_fields = ('name',)
    
    def tours_count(self, obj):
        return obj.tour_set.count()
    tours_count.short_description = 'Number of Tours'