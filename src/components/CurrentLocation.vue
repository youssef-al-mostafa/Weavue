
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const getGeolocation = () => {
  if ("geolocation" in navigator) {
    isLoading.value = true
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
        isLoading.value = false
      },
      (error) => {
        isLoading.value = false
        errorMessage.value = `Error: ${error.message}`
      }
    )
  } else {
    errorMessage.value = "Geolocation is not supported by your browser."
  }
}

onMounted(() => {
  getGeolocation()
})
</script>
<template>
  <div class="current-location-cont">
    <h1>Geolocation Example</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="latitude && longitude">Latitude: {{ latitude }}, Longitude: {{ longitude }}</p>
    <p v-if="isLoading">Loading location...</p>
  </div>
</template>
<style scoped lang="scss">
.current-location-cont {
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: black;
  }

  p {
    font-size: 18px;
    color: black;
  }
}
</style>
