import { useState, useEffect } from 'react';
import { FiFilter, FiStar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

interface TourImage {
  id: number;
  image: string;
  is_primary: boolean;
  caption: string;
  tour: number;
}

interface Tour {
  id: number;
  title: string;
  slug: string;
  category: number;
  category_name: string;
  destination: number;
  duration_days: number;
  difficulty_level: string;
  overview: string;
  highlights: string;
  itinerary: string;
  meeting_point: string;
  end_point: string;
  base_price: string;
  min_group_size: number;
  max_group_size: number;
  images: TourImage[];
}

interface Activity {
  id: number;
  title: string;
  slug: string;
  activity_type: string;
  destination: number;
  duration_minutes: number;
  difficulty_level: string;
  overview: string;
  highlights: string;
  location_name: string;
  base_price: string;
  min_group_size: number;
  max_group_size: number;
  images: TourImage[];
}

type ListItem = Tour | Activity;

const categories = [
  { id: 'all', name: 'All' },
  { id: 'activities', name: 'Activities' },
  { id: 'tours', name: 'Tours' },
  { id: 'attractions', name: 'Attractions' },
  { id: 'transfers', name: 'Transfers' }
];

const filters = {
  priceRange: [
    { id: 'any', name: 'Any Price' },
    { id: 'under-50', name: 'Under AED 50' },
    { id: '50-100', name: 'AED 50 - 100' },
    { id: 'over-100', name: 'Over AED 100' }
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
  const [tours, setTours] = useState<Tour[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Construct filter query params
    const getFilterParams = () => {
      const params = new URLSearchParams();
      
      if (selectedFilters.priceRange !== 'any') {
        switch (selectedFilters.priceRange) {
          case 'under-50':
            params.append('base_price_lte', '50');
            break;
          case '50-100':
            params.append('base_price_gte', '50');
            params.append('base_price_lte', '100');
            break;
          case 'over-100':
            params.append('base_price_gte', '100');
            break;
        }
      }

      if (selectedFilters.duration !== 'any') {
        switch (selectedFilters.duration) {
          case 'under-3':
            params.append('duration_lte', '180');
            break;
          case '3-6':
            params.append('duration_gte', '180');
            params.append('duration_lte', '360');
            break;
          case 'over-6':
            params.append('duration_gte', '360');
            break;
        }
      }

      return params.toString();
    };

    // Fetch data based on selected category and filters
    const fetchData = async () => {
      const filterParams = getFilterParams();
      
      if (selectedCategory === 'all' || selectedCategory === 'tours') {
        const toursResponse = await fetch(`http://localhost:8000/api/v1/tours/?${filterParams}`);
        const toursData = await toursResponse.json();
        setTours(toursData.results);
      }

      if (selectedCategory === 'all' || selectedCategory === 'activities') {
        const activitiesResponse = await fetch(`http://localhost:8000/api/v1/activities/?${filterParams}`);
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.results);
      }
    };

    fetchData();
  }, [selectedCategory, selectedFilters]);

  const getPrimaryImage = (images: TourImage[]) => {
    const primaryImage = images.find(img => img.is_primary);
    return primaryImage ? primaryImage.image : 'https://via.placeholder.com/800';
  };

  const getBadgeText = (item: ListItem) => {
    if ('category_name' in item) {
      return item.category_name;
    }
    return item.activity_type;
  };

  const getLocationText = (item: ListItem) => {
    if ('meeting_point' in item) {
      return item.meeting_point;
    }
    return item.location_name;
  };

  const renderItems = () => {
    let items: ListItem[] = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'tours') {
      items = [...items, ...tours];
    }
    
    if (selectedCategory === 'all' || selectedCategory === 'activities') {
      items = [...items, ...activities];
    }

    return items.map((item) => (
      <div key={`${item.id}-${getBadgeText(item)}`} className="bg-white rounded-lg shadow-md overflow-hidden group">
        <div className="relative">
          <img
            src={getPrimaryImage(item.images)}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
              {getBadgeText(item)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FiMapPin className="mr-1" />
            <span>{getLocationText(item)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FiClock className="mr-1" />
            <span>
              {'duration_days' in item 
                ? `${item.duration_days} days`
                : `${Math.round(item.duration_minutes / 60)} hours`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <FiUsers className="mr-1" />
            <span>Min. {item.min_group_size} persons</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600">AED {item.base_price}</span>
              <span className="text-gray-500 text-sm ml-1">per person</span>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    ));
  };

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
            {renderItems()}
          </div>
        </div>
      </div>
    </>
  );
}
