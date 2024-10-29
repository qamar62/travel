import { IconType } from 'react-icons';
import { FiMapPin, FiSunrise, FiCamera, FiSun, FiCoffee, FiMoon } from 'react-icons/fi';

interface TourItineraryItem {
  time: string;
  title: string;
  description: string;
  icon: IconType;
}

export const tourItinerary: TourItineraryItem[] = [
  {
    time: "14:30",
    title: "Hotel Pickup",
    description: "Comfortable pickup from your hotel in a modern 4x4 vehicle",
    icon: FiMapPin
  },
  {
    time: "15:00",
    title: "Desert Adventure Begins",
    description: "Experience thrilling dune bashing in the Dubai Desert Conservation Reserve",
    icon: FiSunrise
  },
  {
    time: "16:30",
    title: "Desert Activities",
    description: "Enjoy sandboarding, camel riding, and photo opportunities in traditional costumes",
    icon: FiCamera
  },
  {
    time: "17:45",
    title: "Sunset Views",
    description: "Watch the magical desert sunset while enjoying Arabic coffee and dates",
    icon: FiSun
  },
  {
    time: "18:30",
    title: "Desert Camp",
    description: "Visit our authentic Bedouin-style camp with traditional entertainment",
    icon: FiCoffee
  },
  {
    time: "19:00",
    title: "Dinner & Entertainment",
    description: "Enjoy a delicious BBQ dinner while watching traditional performances",
    icon: FiMoon
  }
];