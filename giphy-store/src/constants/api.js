export const GIPHY_API_KEY = 'MxzKygQDDKQdeuHpHOZIMd22faOhowWt';
export const BASE_URL = 'https://api.giphy.com/v1/gifs';

// src/hooks/useGiphy.js
import { useState, useCallback } from 'react';
import { BASE_URL, GIPHY_API_KEY } from '../constants/api';

export const useGiphy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGifs = useCallback(async (endpoint, params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        api_key: GIPHY_API_KEY,
        ...params
      });
      
      const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      return data.data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchGifs };
};
