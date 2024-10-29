import { useState, useEffect } from 'react';
import { FiFilter, FiStar, FiClock, FiMapPin } from 'react-icons/fi';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'tours', name: 'Tours' },
  { id: 'attractions', name: 'Attractions' },
  { id: 'transfers', name: 'Transfers' }
];

const filters = {
  priceRange: [
    { id: 'any', name: 'Any Price' },
    { id: 'under-50', name: 'Under €50' },
    { id: '50-100', name: '€50 - €100' },
    { id: 'over-100', name: 'Over €100' }
  ],
  duration: [
    { id: 'any', name: 'Any Duration' },
    { id: 'under-3', name: 'Under 3 hours' },
    { id: '3-6', name: '3-6 hours' },
    { id: 'over-6', name: 'Over 6 hours' }
  ],
  rating: [
    { id: 'any', name: 'Any Rating' },
    { id: '4plus', name: '4+ Stars' },
    { id: '3plus', name: '3+ Stars' }
  ]
};

export default function ThingsToDo() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'any',
    duration: 'any',
    rating: 'any'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/tours/')
      .then((response) => response.json())
      .then((data) => setTours(data.results))
      .catch((error) => console.error('Error fetching tours:', error));
  }, []);

  return (
    <>
      <SEO 
        title="Things To Do in Dubai"
        description="Discover the best tours, attractions, and experiences in Dubai. Book your next adventure with us!"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-primary-900">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"
              alt="Dubai Skyline"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900/90" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Things To Do in Dubai</h1>
              <p className="text-xl text-primary-100">
                Discover unforgettable experiences in the city of wonders
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-primary-600 font-medium"
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 p-4 bg-gray-50 rounded-lg">
                {Object.entries(filters).map(([filterType, options]) => (
                  <div key={filterType}>
                    <h3 className="font-medium text-gray-900 mb-2 capitalize">
                      {filterType.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            name={filterType}
                            value={option.id}
                            checked={selectedFilters[filterType as keyof typeof selectedFilters] === option.id}
                            onChange={(e) => setSelectedFilters(prev => ({
                              ...prev,
                              [filterType]: e.target.value
                            }))}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-600">{option.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img
                    src={tour.images[0] || 'https://via.placeholder.com/800'} // Placeholder if no images
                    alt={tour.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      Tour
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FiMapPin className="mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FiClock className="mr-1" />
                    <span>{tour.duration} minutes</span>
                    <span className="mx-2">•</span>
                    <FiStar className="text-yellow-400" />
                    <span className="ml-1">{tour.rating} ({tour.reviews_count})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">€{tour.price}</span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
