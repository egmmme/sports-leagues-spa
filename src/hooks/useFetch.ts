import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions {
    manual?: boolean;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (overrideUrl?: string) => {
        setLoading(true);
        setError(null);

        const key = `fetch:${overrideUrl || url}`;
        const cached = localStorage.getItem(key);

        if (cached) {
            try {
                const { timestamp, data: cachedData } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setData(cachedData);
                    setLoading(false);
                    return;
                }
            } catch {
                // Ignore cache parse errors
            }
        }

        try {
            const response = await fetch(overrideUrl || url);
            if (!response.ok) {
                setError("Failed to fetch");
            }
            const result = await response.json();
            setData(result);
            localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: result }));
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

    return { data, error, loading, fetchData: options.manual ? fetchData : undefined };
}

export { useFetch };