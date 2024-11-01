import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock } from 'react-icons/fi';
import { Tour } from '../../types/tour';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage'; // Import ErrorMessage

// Function to fetch tours data
async function fetchTours() {
  try {
    // Obtain JWT token
    const tokenResponse = await fetch('http://localhost:8000/api/v1/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "qam",
        password: "Teacher@62"
      })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access;

    // Make API request with JWT token
    const response = await fetch('http://localhost:8000/api/v1/activities/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    console.log(data.results); // Log fetched tours and their slugs
    return data.results;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
}

export default function PopularTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tours data on component mount
    const loadTours = async () => {
      try {
        const toursData = await fetchTours();
        setTours(toursData);
      } catch (error) {
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, []);

  const validTours = Array.isArray(tours) ? tours : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary-900">Most Popular Tours</h2>
        <p className="text-primary-600 mt-2">Discover the best experiences in the UAE</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : error ? (
        <div className="py-12">
          <ErrorMessage message={error} className="text-center" />
        </div>
      ) : validTours.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No tours available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validTours.map((tour) => (
            <Link key={tour.id} to={`/activity/${tour.id}`} className="group">
              <div className="card">
                <img 
                  src={tour.images[0]?.image || '/placeholder-tour.jpg'} 
                  alt={tour.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-primary-900">{tour.title}</h3>
                  <div className="flex items-center mb-2">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-primary-700">{tour.available_days}</span>
                    <span className="text-primary-500 ml-1">({tour.reviews_count} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-primary-600">
                      <FiClock className="mr-1" />
                      <span>{tour.duration?.slice(0, 5)} H</span>
                    </div>
                    <span className="text-xl font-bold text-primary-700">€{tour.base_price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
