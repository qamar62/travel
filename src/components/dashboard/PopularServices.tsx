import { useState, useEffect } from 'react';
import { FiTrendingUp, FiStar } from 'react-icons/fi';
import { toursApi } from '../../services/api';

interface Tour {
  id: string;
  title: string;
  rating: number;
  reviews_count: number;
  images: string[];
}

export default function PopularServices() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await toursApi.getAll();
        // Sort by rating and take top 3
        const sortedTours = response.data
          .sort((a: Tour, b: Tour) => b.rating - a.rating)
          .slice(0, 3);
        setTours(sortedTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Popular Tours</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {tours.map((tour) => (
          <div key={tour.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{tour.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span>{tour.rating.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{tour.reviews_count} reviews</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <FiTrendingUp className="mr-1" />
                  Popular
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}