import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiCheck, FiChevronDown, FiChevronUp, FiClock, FiShield } from 'react-icons/fi';
import { Vehicle } from '../types/booking';

const mockVehicles: Vehicle[] = [
  {
    id: 'economy',
    name: 'Economy Class',
    category: 'economy',
    description: 'Toyota Camry or similar',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    thumbnailImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200',
    maxPassengers: 3,
    maxLuggage: 2,
    price: 59,
    features: [
      'Professional driver',
      'Flight tracking',
      'Free cancellation'
    ],
    cancellation: 'Free cancellation up to 24 hours before pickup',
    inclusions: [
      'All taxes and fees',
      'Meet & greet',
      'Flight tracking',
      'Free waiting time'
    ],
    terms: [
      '60 minutes free waiting time',
      'Fixed price - no hidden fees',
      'Pay later option available'
    ]
  },
  {
    id: 'business',
    name: 'Business Class',
    category: 'business',
    description: 'Mercedes-Benz E-Class or similar',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    thumbnailImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200',
    maxPassengers: 3,
    maxLuggage: 3,
    price: 89,
    features: [
      'Professional driver',
      'Free waiting time',
      'Flight tracking',
      'Meet & greet service'
    ],
    cancellation: 'Free cancellation up to 24 hours before pickup',
    inclusions: [
      'All taxes and fees',
      'Meet & greet',
      'Flight tracking',
      'Free waiting time',
      'Professional driver',
      'Door-to-door service'
    ],
    terms: [
      '60 minutes free waiting time',
      'Fixed price - no hidden fees',
      'Pay later option available',
      'Free cancellation'
    ]
  },
  {
    id: 'first',
    name: 'First Class',
    category: 'first',
    description: 'Mercedes-Benz S-Class or similar',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    thumbnailImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200',
    maxPassengers: 3,
    maxLuggage: 3,
    price: 129,
    features: [
      'Professional driver',
      'Free waiting time',
      'Flight tracking',
      'Meet & greet service',
      'Premium vehicle',
      'Extra legroom'
    ],
    cancellation: 'Free cancellation up to 24 hours before pickup',
    inclusions: [
      'All taxes and fees',
      'Meet & greet',
      'Flight tracking',
      'Free waiting time',
      'Professional driver',
      'Door-to-door service',
      'Premium vehicle',
      'Refreshments'
    ],
    terms: [
      '60 minutes free waiting time',
      'Fixed price - no hidden fees',
      'Pay later option available',
      'Free cancellation',
      'Priority service'
    ]
  },
  {
    id: 'van',
    name: 'Business Van',
    category: 'van',
    description: 'Mercedes-Benz V-Class or similar',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    thumbnailImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200',
    maxPassengers: 6,
    maxLuggage: 6,
    price: 149,
    features: [
      'Professional driver',
      'Free waiting time',
      'Flight tracking',
      'Meet & greet service',
      'Extra space',
      'Perfect for groups'
    ],
    cancellation: 'Free cancellation up to 24 hours before pickup',
    inclusions: [
      'All taxes and fees',
      'Meet & greet',
      'Flight tracking',
      'Free waiting time',
      'Professional driver',
      'Door-to-door service',
      'Extra space for luggage'
    ],
    terms: [
      '60 minutes free waiting time',
      'Fixed price - no hidden fees',
      'Pay later option available',
      'Free cancellation'
    ]
  }
];

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams, type } = location.state || {};
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (type === 'transfer' && searchParams) {
        const filteredVehicles = mockVehicles.filter(
          vehicle => vehicle.maxPassengers >= searchParams.passengers
        );
        setVehicles(filteredVehicles);
      }
      
      setIsLoading(false);
    };

    fetchVehicles();
  }, [searchParams, type]);

  const handleSelect = (vehicle: Vehicle) => {
    navigate('/cart', {
      state: {
        newItem: {
          id: `transfer-${vehicle.id}-${Date.now()}`,
          type: 'transfer',
          title: `${vehicle.name} - ${searchParams.pickupLocation} to ${searchParams.dropoffLocation}`,
          image: vehicle.thumbnailImage,
          date: searchParams.date,
          time: searchParams.time,
          price: vehicle.price,
          quantity: 1,
          details: {
            vehicle: vehicle.name,
            pickup: searchParams.pickupLocation,
            dropoff: searchParams.dropoffLocation,
            passengers: searchParams.passengers,
            category: vehicle.category
          }
        }
      }
    });
  };

  if (!searchParams || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Search Parameters</h2>
          <p className="text-gray-600">Please start a new search from the homepage.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Vehicles Available</h2>
          <p className="text-gray-600">No vehicles found for your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
          <div>
            <span className="font-medium">From:</span>
            <p>{searchParams.pickupLocation}</p>
          </div>
          <div>
            <span className="font-medium">To:</span>
            <p>{searchParams.dropoffLocation}</p>
          </div>
          <div>
            <span className="font-medium">Date & Time:</span>
            <p>
              {new Date(searchParams.date).toLocaleDateString()} at{' '}
              {searchParams.time}
            </p>
          </div>
          <div>
            <span className="font-medium">Passengers:</span>
            <p>{searchParams.passengers} passengers</p>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedVehicle(expandedVehicle === vehicle.id ? null : vehicle.id)}>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2">
                  <img
                    src={vehicle.thumbnailImage}
                    alt={vehicle.name}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-4">
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <p className="text-gray-600 text-sm">{vehicle.description}</p>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <div className="flex items-center">
                      <FiUsers className="mr-1" />
                      <span>{vehicle.maxPassengers}</span>
                    </div>
                    <div className="flex items-center">
                      <FiPackage className="mr-1" />
                      <span>{vehicle.maxLuggage}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-2xl font-bold text-primary-600">€{vehicle.price}</div>
                  <p className="text-gray-500 text-xs">Total price</p>
                </div>
                <div className="col-span-1 text-right">
                  {expandedVehicle === vehicle.id ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedVehicle === vehicle.id && (
              <div className="border-t border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Inclusions */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <FiCheck className="mr-2 text-green-500" />
                      Inclusions
                    </h4>
                    <ul className="space-y-2">
                      {vehicle.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <FiCheck className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Terms */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <FiShield className="mr-2 text-primary-500" />
                      Terms
                    </h4>
                    <ul className="space-y-2">
                      {vehicle.terms.map((term, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <FiCheck className="mr-2 mt-1 text-primary-500 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        €{vehicle.price}
                      </div>
                      <p className="text-gray-500 text-sm">Final price, all inclusive</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiClock className="mr-2 text-primary-500" />
                        {vehicle.cancellation}
                      </div>

                      <button
                        onClick={() => handleSelect(vehicle)}
                        className="w-full btn-primary"
                      >
                        Select & Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}