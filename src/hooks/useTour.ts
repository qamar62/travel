import { useState, useEffect } from 'react';
import { toursApi } from '../services/api';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  reviews_count: number;
  max_group_size: number;
  start_time: string;
  languages: string[];
  images: string[];
  highlights: string[];
  included: string[];
  not_included: string[];
}

export function useTour(id: string | undefined) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) {
        setError('Tour ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await toursApi.getTour(id);
        setTour(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load tour details');
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  return { tour, loading, error };
}