import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiClock, FiStar, FiCheck, FiX, FiInfo, FiPercent } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import TimelineItinerary from '../components/TimelineItinerary';
import TourGallery from '../components/TourGallery';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';
import { checkDateAvailability, getAvailableDates } from '../utils/availability'; // Import getAvailableDates
import Addon from '../components/Addon'; // Import Addon component

// Define the Activity type
interface Activity {
  id: number;
  images: { id: number; image: string; is_primary: boolean; alt_text: string; order: number; }[];
  time_slots: { id: number; start_time: string; end_time: string; available_days: number[]; seasonal_dates: null | string; price_modifier: string; available_capacity: number; }[];
  average_rating: number | null;
  reviews_count: number;
  title: string;
  slug: string;
  activity_type: string;
  languages: string[];
  location_name: string;
  address: string;
  latitude: string;
  longitude: string;
  meeting_point_details: string;
  description: string;
  highlights: string[];
  included: string[];
  not_included: string[];
  requirements: string[];
  accessibility_info: string;
  duration: string;
  skip_the_line: boolean;
  instant_confirmation: boolean;
  min_participants: number;
  max_participants: number;
  private_available: boolean;
  base_price: string;
  child_price: string;
  private_price: string;
  cancellation_policy: string;
  booking_deadline_hours: number;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  itinerary: { time: string; title: string; detail: string; }[]; // Update itinerary field
  addons: { icon: string; price: number; short_detail: string; title: string; }[]; // Update addons field
}

// Function to fetch activity data
async function fetchActivity(id: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/activities/${id}/`); // Use ID for fetching
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
}

export default function ActivityDetail() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]); // State for available dates
  const [selectedAddonQuantities, setSelectedAddonQuantities] = useState<{ [key: string]: number }>({}); // State for addon quantities
  
  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activityData = await fetchActivity(id!); // Fetch activity using ID
        setActivity(activityData);
        
        // Get available dates from time slots
        const dates = getAvailableDates(activityData.time_slots);
        setAvailableDates(dates);
      } catch (error) {
        setError('Failed to load activity details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [participants, setParticipants] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [currentStep, setCurrentStep] = useState<'date' | 'options'>('date');

  const totalParticipants = useMemo(() => {
    return participants.adults + participants.children + participants.infants;
  }, [participants]);

  const discount = useMemo(() => {
    if (totalParticipants >= 5) return 15;
    if (totalParticipants >= 3) return 10;
    return 0;
  }, [totalParticipants]);

  const availability = useMemo(() => {
    if (!selectedDate) return null;
    return checkDateAvailability(selectedDate);
  }, [selectedDate]);

  const isDateAvailable = useMemo(() => {
    return availability?.available && 
           (availability.spotsLeft || 0) >= totalParticipants;
  }, [availability, totalParticipants]);

  const total = useMemo(() => {
    if (!activity) return 0;
    
    let total = parseFloat(activity.base_price) * participants.adults;
    total += parseFloat(activity.child_price) * participants.children; // Child price for children
    
    // Calculate total for selected addons
    Object.keys(selectedAddonQuantities).forEach(addonId => {
      const addon = activity.addons.find(a => a.title === addonId);
      if (addon) {
        total += addon.price * selectedAddonQuantities[addonId];
      }
    });

    if (discount > 0) {
      total = total * (1 - discount / 100);
    }

    return total;
  }, [activity, participants, selectedAddonQuantities, discount]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Activity not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleParticipantChange = (type: 'adults' | 'children' | 'infants', value: number) => {
    setParticipants(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(value, 10))
    }));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleContinueToOptions = () => {
    if (selectedDate && isDateAvailable) {
      setCurrentStep('options');
    }
  };

  const handleAddonQuantityChange = (title: string, quantity: number) => {
    setSelectedAddonQuantities(prev => ({
      ...prev,
      [title]: quantity
    }));
  };

  const handleBooking = () => {
    if (!selectedDate || !isDateAvailable || !pickupLocation) {
      return;
    }

    const addonsToCart = Object.keys(selectedAddonQuantities)
      .filter(key => selectedAddonQuantities[key] > 0)
      .map(key => ({
        title: key,
        quantity: selectedAddonQuantities[key]
      }));

    navigate('/cart', {
      state: {
        newItem: {
          type: 'activity',
          title: activity.title,
          image: activity.images[0]?.image || '',
          date: selectedDate.toISOString(),
          price: total,
          quantity: 1,
          details: {
            adults: participants.adults.toString(),
            children: participants.children.toString(),
            infants: participants.infants.toString(),
            pickup: pickupLocation,
            addons: addonsToCart
          }
        }
      }
    });
  };

  const renderDateSelection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-1">
          Select Date
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-3 top-3 text-primary-500 z-10" />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            filterDate={(date) => availableDates.some(d => d.toDateString() === date.toDateString())} // Filter available dates
            placeholderText="Select a date"
            dateFormat="MMMM d, yyyy"
            className="input-field pl-10 w-full cursor-pointer"
            required
          />
        </div>
        {availability && (
          <div className={`text-sm mt-2 ${
            availability.available ? 'text-green-600' : 'text-red-600'
          }`}>
            {availability.message}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-primary-700">
          Number of Participants
        </label>
        
        <div className="flex items-center justify-between">
          <span className="text-primary-800">Adults (18+)</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleParticipantChange('adults', participants.adults - 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >-</button>
            <span className="w-8 text-center">{participants.adults}</span>
            <button 
              onClick={() => handleParticipantChange('adults', participants.adults + 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >+</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-800">Children (2-17)</span>
            <p className="text-sm text-primary-500">30% off</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleParticipantChange('children', participants.children - 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >-</button>
            <span className="w-8 text-center">{participants.children}</span>
            <button 
              onClick={() => handleParticipantChange('children', participants.children + 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >+</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-800">Infants (0-2)</span>
            <p className="text-sm text-primary-500">Free</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleParticipantChange('infants', participants.infants - 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >-</button>
            <span className="w-8 text-center">{participants.infants}</span>
            <button 
              onClick={() => handleParticipantChange('infants', participants.infants + 1)}
              className="w-8 h-8 rounded-full border border-primary-300 flex items-center justify-center"
            >+</button>
          </div>
        </div>
      </div>

      <button
        onClick={handleContinueToOptions}
        disabled={!selectedDate || !isDateAvailable}
        className={`w-full py-3 rounded-lg transition-colors ${
          selectedDate && isDateAvailable
            ? 'btn-primary' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {!selectedDate 
          ? 'Select a date'
          : !isDateAvailable
            ? 'Not available'
            : 'Continue'
        }
      </button>
    </div>
  );

  const renderOptionsSelection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-1">
          Pickup Location
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-primary-500" />
          <input
            type="text"
            placeholder="Enter your pickup location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="input-field pl-10 w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Optional Add-ons
        </label>
        <div className="space-y-2">
          {activity?.addons.map((addon, index) => (
            <Addon 
              key={index}
              icon={addon.icon}
              title={addon.title}
              short_detail={addon.short_detail}
              price={addon.price}
              onQuantityChange={(quantity) => handleAddonQuantityChange(addon.title, quantity)} // Pass quantity change handler
            />
          ))}
        </div>
      </div>

      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">€{total.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Group Discount:</span>
            <span>{discount}% OFF</span>
          </div>
        )}
        <div className="flex justify-between items-center mt-2 text-lg font-bold">
          <span>Total:</span>
          <span className="text-primary-600">€{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleBooking}
        disabled={!pickupLocation}
        className={`w-full py-3 rounded-lg transition-colors ${
          pickupLocation
            ? 'btn-primary' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {!pickupLocation ? 'Enter pickup location' : 'Add to Cart'}
      </button>

      <button
        onClick={() => setCurrentStep('date')}
        className="w-full py-2 text-primary-600 hover:text-primary-700"
      >
        Back to Date Selection
      </button>
    </div>
  );

  return (
    <>
      <SEO {...seoConfig.tour} />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <FiMapPin className="text-primary-500" />
              <span>{activity?.location_name}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{activity?.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{activity?.average_rating || 'N/A'}</span>
                <span className="text-gray-500 ml-1">({activity?.reviews_count} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-1" />
                <span>{activity?.duration}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <TourGallery images={activity?.images.map(img => img.image) || []} />

              {/* Quick Info */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-primary-700 font-semibold">Duration</div>
                    <div className="text-primary-900">{activity?.duration}</div>
                  </div>
                  <div>
                    <div className="text-primary-700 font-semibold">Start time</div>
                    <div className="text-primary-900">{activity?.time_slots[0]?.start_time || 'Flexible'}</div>
                  </div>
                  <div>
                    <div className="text-primary-700 font-semibold">Languages</div>
                    <div className="text-primary-900">{activity?.languages.join(', ') || 'English'}</div>
                  </div>
                  <div>
                    <div className="text-primary-700 font-semibold">Group size</div>
                    <div className="text-primary-900">Max {activity?.max_participants || 'N/A'} people</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary-900">About this activity</h2>
                <p className="text-primary-800 leading-relaxed">{activity?.description}</p>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-primary-900">Activity Itinerary</h2>
                <TimelineItinerary items={activity?.itinerary} /> {/* Use TimelineItinerary component */}
              </div>

              {/* Highlights */}
              {activity?.highlights && activity.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-primary-900">Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FiCheck className="text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-primary-800">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included/Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activity?.included && activity.included.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-primary-900">Included</h2>
                    <ul className="space-y-3">
                      {activity.included.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-primary-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activity?.not_included && activity.not_included.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-primary-900">Not Included</h2>
                    <ul className="space-y-3">
                      {activity.not_included.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FiX className="text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-primary-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-lg shadow-lg p-6">
                <div className="relative">
                  {discount > 0 && (
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-2 flex items-center">
                      <FiPercent className="mr-1" />
                      <span className="font-bold">{discount}% OFF</span>
                    </div>
                  )}
                  <div className="text-3xl font-bold text-primary-900 mb-4">
                    From {activity?.base_price}د.إ
                    <span className="text-lg font-normal text-primary-600 ml-2">per person</span>
                  </div>
                </div>

                {currentStep === 'date' ? renderDateSelection() : renderOptionsSelection()}

                <div className="flex items-start space-x-2 text-sm text-primary-600 mt-4">
                  <FiInfo className="flex-shrink-0 mt-1" />
                  <p>Free cancellation up to 24 hours before the start time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary-900">
                From €{activity?.base_price}
                <span className="text-sm font-normal text-primary-600 ml-1">per person</span>
              </div>
              {discount > 0 && (
                <div className="text-green-600 text-sm font-medium">
                  {discount}% OFF applied
                </div>
              )}
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary"
            >
              Check Availability
            </button>
          </div>
        </div>

        {/* Mobile Booking Panel */}
        <div className={`fixed inset-0 bg-white z-50 lg:hidden transform transition-transform duration-300 ${isBookingOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Book Your Activity</h2>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {currentStep === 'date' ? renderDateSelection() : renderOptionsSelection()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
