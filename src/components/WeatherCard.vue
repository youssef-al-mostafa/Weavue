<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { useWeather } from '@/composables/useWeather';
import { location } from '@/stores/locationStore';

const {
  weatherData,
  isLoading,
  error,
  fetchWeatherByCoords,
  formatDateTime,
  temperature,
  location: locationName,
  country,
  dateTime
} = useWeather();

watchEffect(() => {
  if (location.lat && location.long) {
    fetchWeatherByCoords(location.lat, location.long);
  }
});

onMounted(() => {
  //console.log('Latitude:', location.lat, 'Longitude:', location.long);
  if (location.lat && location.long) {
    fetchWeatherByCoords(location.lat, location.long);
  }
});
</script>

<template>
  <div class="weather-page-cont rounded-[16px] bg-[#dce4ea6b] py-4 mt-2">
    <div class="weather-page" v-if="isLoading || error || weatherData"> 
      <div v-if="isLoading" class="loading-indicator">
        Loading weather data...
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="weatherData" class="weather-content">
        <h1 class="text-2xl font-bold">{{ temperature }}°C</h1>
        <p class="text-lg">{{ dateTime }}</p>
        <p>{{ locationName }}, {{ country }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.weather-page-cont {
  color: black ;
  .weather-page {
    padding: 1rem;

    .loading-indicator {
      font-style: italic;
      color: #666;
    }

    .error-message {
      color: #e53e3e;
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: rgba(229, 62, 62, 0.1);
    }

    .weather-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>