<script setup lang="ts">
 import BannerImage from "../assets/images/banner_image_no_bk.png"
 import Search from "../components/Search.vue";
 import NavBar from './NavBar.vue'
 import CurrentLocation from "./CurrentLocation.vue";
</script>
<template>
   <section class="banner rounded-[36px] max-w-[1800px] bg-gradient-to-b from-[#F9F7F6] to-transparent px-12 mx-[24px]">
      <NavBar />
      <div class="banner-main flex mt-[24px] justify-between px-[64px]">
         <div class="main-col flex flex-col gap-7 w-[40%]">
            <h1 class="text-[#241717] text-[64px] text-5xl tracking-[5px]">Weavue</h1>
            <p class="text-black text-xl">
               Get accurate weather forecasts for the next 3 days
               and plan your activities with confidence.
            </p>
            <div>
               <CurrentLocation />
               <Search />
            </div>
         </div>
         <img :src="BannerImage" class="" alt="" srcset="">
      </div>
   </section>
</template>
<style lang="scss">
h1 {
   font-family: var(--font-lobster);
}
</style>
