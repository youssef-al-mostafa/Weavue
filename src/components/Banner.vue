<script setup lang="ts">
 import BannerImage from "../assets/images/banner_image_no_bk.png"
 import Search from "../components/Search.vue";
 import NavBar from './NavBar.vue'
 import CurrentLocation from "./CurrentLocation.vue";
</script>
<template>
  <section class="banner rounded-[36px] max-w-[1800px] bg-gradient-to-b from-[#F9F7F6] to-transparent px-12 py-4 mx-[24px]">
   <NavBar/>
   <div class="banner-main flex mt-[24px] justify-between px-[64px]">
      <div class="main-col ">
         <CurrentLocation/>
         <h1 class="text-[#241717] font-bold text-[59px]  text-5xl">Weavue</h1>
         <Search/>
      </div>
      <img :src="BannerImage" class="" alt="" srcset="">
   </div>
  </section>
</template>
