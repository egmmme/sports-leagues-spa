import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions {
  manual?: boolean;
}

function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (overrideUrl?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(overrideUrl || url);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!options.manual) {
      fetchData();
    }
    
  }, [url]);

  // For manual mode, expose fetchData
  return { data, error, loading, fetchData: options.manual ? fetchData : undefined };
}

export { useFetch };