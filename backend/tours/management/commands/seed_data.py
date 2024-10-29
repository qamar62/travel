from django.core.management.base import BaseCommand
from tours.models import Tour, TourImage, TourDate
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Seed the database with sample tour data'

    def handle(self, *args, **kwargs):
        # Create sample tours
        tour1 = Tour.objects.create(
            title="Dubai: Desert Safari with BBQ & Activities",
            description="Experience a magical evening in the desert on this half-day safari tour. Enjoy a dune drive, watch the sunset, ride a camel, enjoy a BBQ dinner, and more.",
            price=75.00,
            duration="7 hours",
            location="Dubai Desert Conservation Reserve",
            rating=4.8,
            reviews_count=2453,
            max_group_size=15
        )

        # Add tour images
        TourImage.objects.create(
            tour=tour1,
            image="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200",
            is_primary=True
        )

        # Add more images
        images = [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
            "https://images.unsplash.com/photo-1582672752486-dab67774f8f2?w=1200",
            "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200"
        ]
        
        for image in images:
            TourImage.objects.create(
                tour=tour1,
                image=image,
                is_primary=False
            )

        # Add tour dates (next 30 days)
        today = datetime.now().date()
        for i in range(30):
            date = today + timedelta(days=i)
            # Make some dates have different availability
            if i % 5 == 0:
                spots = 5
            elif i % 3 == 0:
                spots = 0
            else:
                spots = 15
                
            TourDate.objects.create(
                tour=tour1,
                date=date,
                available_spots=spots,
                price_modifier=1.0 if i < 15 else 1.2  # Higher price for later dates
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))