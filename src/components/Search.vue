<script lang="ts" setup>
import { ref, watch } from 'vue';

const searchQuery = ref('');
const cities = ref<any[]>([]);
const loading = ref(false);
const showResults = ref(false);

// Debounce function to limit API calls
function debounce(func: Function, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

// Function to search for cities based on input
const searchCities = debounce(async () => {
  if (!searchQuery.value || searchQuery.value.length < 2) {
    cities.value = [];
    showResults.value = false;
    return;
  }

  loading.value = true;
  showResults.value = true;

  try {
    // Using GeoDB Cities API from RapidAPI (you'll need to create a free account)
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchQuery.value}&limit=10`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY', // Replace with your actual API key
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();
    cities.value = data.data || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    cities.value = [];
  } finally {
    loading.value = false;
  }
});

// Watch for changes in the search query
watch(searchQuery, () => {
  searchCities();
});

// Handle city selection
const selectCity = (city: any) => {
  searchQuery.value = city.name;
  showResults.value = false;

  // You can emit an event here to pass the selected city to the parent component
  // emit('city-selected', city);
};

// Close results when clicking outside
const closeResults = () => {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
};
</script>

<template>
  <div class="search_bar_container relative">
    <label class="input 
             bg-[#7fcbcb] 
             text-black 
             font-bold 
             rounded-full 
             text-lg 
             w-full
             h-fit
             transition-all  
             outline-none 
             duration-200 
             focus-within:outline-none 
             focus-within:border-none 
             focus-within:shadow-none 
             focus-within:ring-0">
      <svg class="h-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input v-model="searchQuery"
        class="text-black bg-transparent border-none placeholder:text-black outline-none py-3" type="search" required
        placeholder="Search" @blur="closeResults" />
    </label>

    <!-- Search results dropdown -->
    <div v-if="showResults && (loading || cities.length > 0)"
      class="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
      <div v-if="loading" class="p-4 text-center text-gray-600">
        Searching...
      </div>
      <ul v-else class="py-1">
        <li v-for="city in cities" :key="city.id" @mousedown="selectCity(city)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {{ city.name }}, {{ city.countryCode }}
        </li>
      </ul>
    </div>
  </div>
</template>