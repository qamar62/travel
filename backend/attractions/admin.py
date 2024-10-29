from django.contrib import admin
from .models import Attraction, AttractionTicket

class AttractionTicketInline(admin.TabularInline):
    model = AttractionTicket
    extra = 1

@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'price', 'rating', 'reviews_count')
    list_filter = ('rating',)
    search_fields = ('name', 'description', 'location')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [AttractionTicketInline]
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'location')
        }),
        ('Location Details', {
            'fields': ('latitude', 'longitude')
        }),
        ('Business Info', {
            'fields': ('opening_hours', 'price')
        }),
        ('Ratings & Media', {
            'fields': ('rating', 'reviews_count', 'images')
        }),
        ('Features', {
            'fields': ('features',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )