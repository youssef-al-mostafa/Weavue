import axios from 'axios';
import type { city } from '@/types/city';

const ninjaApi = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
});

const API_KEY = import.meta.env.VITE_NINJA_API_KEY;

export const getCityBySearch = async (city: string): Promise<city> => {
  const response = await ninjaApi.get<city>('/city', {
    params: {
      key: API_KEY,
      name: city,
    },
  });

  return response.data;
};