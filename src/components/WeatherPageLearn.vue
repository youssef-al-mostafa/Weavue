<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface WeatherLocation {
  name: string;
  country: string;
  localtime: string;
}

interface WeatherCurrent {
  temp_c: number;
}

interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

const weatherData = ref<WeatherData | null>(null);

const formatDateTime = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString('en-US', options);
};

onMounted(async () => {
  try {
    const response = await axios.get<WeatherData>('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: '1087a4e93c0343b7ad370948240507',
        q: '24510 saint marcel du perigord, France',
        aqi: 'yes',
      },
    });
    weatherData.value = response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});
</script>
<template>
  <div class="">
    <div class="">
      <h1 class="">
        {{ weatherData ? weatherData.current.temp_c + '°C' : 'Loading...' }}
      </h1>
      <p class="">
        {{ weatherData ? formatDateTime(weatherData.location.localtime) : 'Loading...' }}
      </p>
    </div>
    <div class="">
      <p class="">
        {{ weatherData ? weatherData.location.name + ', ' + weatherData.location.country : 'Loading...' }}
      </p>
    </div>
  </div>
</template>

