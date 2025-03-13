<template>
  <div class="f-weath">
    <div class="weath-details row">
      <h1 class="temperature">
        {{ weatherData ? weatherData.current.temp_c + '°C' : 'Loading...' }}
      </h1>
      <p class="date-time">
        {{ weatherData ? formatDateTime(weatherData.location.localtime) : 'Loading...' }}
      </p>
    </div>
    <div class="weath-contact">
      <p class="contact-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill"
          viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
        </svg>
        {{ weatherData ? weatherData.location.name + ', ' + weatherData.location.country : 'Loading...' }}
      </p>
    </div>
  </div>
</template>

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

<style lang="scss">
.f-weath {
  .weath-details {
    @media (max-width: 767px) {
      margin: auto;
      padding-left: 0vw;
    }

    width: 100%;
    padding-left: 27px;
    margin-bottom: 18px;

    h1 {
      @media (max-width: 767px) {
        font-size: 55px;
        width: 100%;
        text-align: center;
      }

      font-size: 61px;
      font-weight: 200;
      margin: 0;
      color: #383716;
      text-align: center;
      padding-inline: 0px;
      width: fit-content;
    }

    p {
      @media (max-width: 767px) {
        padding-left: 0vw;
        padding-right: 0;
        text-align: center;
        margin-left: 0vw;
        border-left: 0px;
      }

      margin-left: auto;
      border-left: solid 1px #707070;
      padding-left: 15px;
      font-size: 14px;
      color: #383716;
      margin-top: auto;
      margin-bottom: 11px;
    }
  }

  .weath-contact {
    @media (max-width: 767px) {
      margin-block: 22px;
      text-align: center;
      margin-top: 0px;
    }

    p {
      @media (max-width: 767px) {
        margin-left: 0px;
      }

      font-size: 13px;
      color: #707070;
      margin-left: 17px;
    }

    .contact-numb {
      margin: auto;
      width: 88%;
    }
  }
}
</style>
