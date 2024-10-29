import { useState, useEffect, useCallback } from 'react';
import { toursApi } from '../services/api';
import { Tour } from '../types/tour';

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await toursApi.getTours();
      setTours(Array.isArray(response) ? response : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load tours';
      setError(errorMessage);
      
      // Retry logic for network errors
      if (errorMessage.includes('Unable to connect') && retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchTours();
        }, 1000 * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    let mounted = true;

    const initFetch = async () => {
      try {
        setLoading(true);
        const response = await toursApi.getTours();
        
        if (mounted) {
          setTours(Array.isArray(response) ? response : []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load tours';
          setError(errorMessage);
          
          // Initial retry for network errors
          if (errorMessage.includes('Unable to connect')) {
            setRetryCount(1);
            setTimeout(() => {
              fetchTours();
            }, 1000);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initFetch();

    return () => {
      mounted = false;
    };
  }, [fetchTours]);

  const refetch = useCallback(async () => {
    setRetryCount(0); // Reset retry count
    await fetchTours();
  }, [fetchTours]);

  return { tours, loading, error, refetch };
}