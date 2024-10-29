from django.contrib import admin
from .models import Tour, TourImage, TourDate

class TourImageInline(admin.TabularInline):
    model = TourImage
    extra = 1

class TourDateInline(admin.TabularInline):
    model = TourDate
    extra = 1

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'location', 'rating', 'reviews_count', 'created_at')
    list_filter = ('location', 'rating')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [TourImageInline, TourDateInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'price', 'duration', 'location')
        }),
        ('Ratings & Reviews', {
            'fields': ('rating', 'reviews_count')
        }),
        ('Additional Info', {
            'fields': ('max_group_size', 'created_at', 'updated_at')
        }),
    )