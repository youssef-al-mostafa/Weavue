<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CurrentLocation from "./CurrentLocation.vue";

const props = defineProps({
  activated: {
    type: Boolean,
    required: false,
    default: false
  },
  lat: {
    type: String,
    required: false,
  },
  long: {
    type: String,
    required: false,
  }
});

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
const isLoading = ref(true);
const error = ref<string | null>(null);
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);

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

const fetchWeatherData = async () => {
  isLoading.value = true;
  error.value = null;

  if (!latitude.value || !longitude.value) {
    error.value = "Location coordinates unavailable";
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get<WeatherData>('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: '1087a4e93c0343b7ad370948240507',
        q: `${latitude.value},${longitude.value}`,
        aqi: 'yes',
      },
    });
    weatherData.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch weather data. Please try again later.";
    console.error('Error fetching weather data:', err);
  } finally {
    isLoading.value = false;
  }
};

</script>
<template>
  <div v-if="props.activated" class="weather-page">
    <h1 class="text-black text-2xl">Youssef</h1>
  </div>
</template>

<style lang="scss">

</style>
