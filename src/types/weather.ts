export interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
  region?: string;
}

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition?: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph?: number;
  humidity?: number;
  feelslike_c?: number;
  cloud: number; 
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherError {
  message: string;
  code?: number;
}

export interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}