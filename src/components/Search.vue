<script lang="ts" setup>
import { cities } from '@/stores/cityStore';  
import { ref } from 'vue';

const searchQuery = ref('');

function handleInputChange() {
  if (searchQuery.value.trim()) {
    cities.addCity(searchQuery.value.trim());
    
    console.log('Cities that we store :', cities.list);
    searchQuery.value = ''; 
  }
}
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
      <input 
        class="text-black bg-transparent border-none 
               placeholder:text-black outline-none 
               py-3 font-medium" 
        type="search" 
        v-model="searchQuery"
        @change="handleInputChange"
        required
        placeholder="Search" 
        />
    </label>
  </div>
</template>