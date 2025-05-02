import axios from 'axios';
import type { WeatherData } from '@/types/weather';

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
});

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeatherByCoords = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const response = await weatherApi.get<WeatherData>('/current.json', {
    params: {
      key: API_KEY,
      q: `${latitude},${longitude}`,
      aqi: 'yes',
      days: 2
    },
  });

  return response.data;
};

export const getCurrentWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await weatherApi.get<WeatherData>('/current.json', {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'yes',
    },
  });

  return response.data;
};