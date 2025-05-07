<script setup lang="ts">
import BannerImage from "../assets/images/banner_image_no_bk.png"
import NavBar from './NavBar.vue'
import CurrentLocation from "./CurrentLocation.vue";
import Add from "./Add.vue";
</script>
<template>
   <section
      class="banner rounded-[36px] max-w-[1800px] bg-gradient-to-b from-[#F9F7F6] to-transparent px-12 mx-auto w-[96%] pb-[48px]">
      <NavBar />
      <div class="banner-main flex mt-[24px] justify-between px-[64px]">
         <div class="main-col flex flex-col justify-center gap-7 w-[40%]">
            <h1 class="banner-header text-[#241717] text-7xl tracking-[5px]">Weavue</h1>
            <p class="text-black text-xl">
               Track real-time weather conditions for
               multiple cities around the world.
               Add your favorite locations or
               use your current position for
               instant updates.
            </p>
            <div>
               <CurrentLocation />
               <Add />
            </div>
         </div>
         <img :src="BannerImage" class="banner-image w-[36vw] max-w-[550px] h-fit floating" alt="Banner Image">
      </div>
   </section>
</template>
<style lang="scss">
.banner {
   @media (max-width: 767px) {
      width: 90%;
      padding-inline: 2em;
   }

   &-main {
      @media (max-width: 991px) {
         padding-inline: 12px;
      }
      @media (max-width: 767px) {
         padding-inline: 0;
      }

      .main-col {
         @media (max-width: 991px) {
            width: 55%;
         }

         @media (max-width: 767px) {
            width: 100%;
            text-align: center;
         }
      }

      .banner-image {
         @media (max-width: 991px) {
            width: 32vw;
         }

         @media (max-width: 767px) {
            display: none;
         }
      }
   }

   .floating {
      animation: float 3s ease-in-out infinite;
   }

   .banner-header {
      font-family: var(--font-lobster);

      @media (max-width: 991px) {
         font-size: 4.5em;
      }
   }
}

@keyframes float {

   0%,
   100% {
      transform: translateY(0);
   }

   50% {
      transform: translateY(-20px);
   }
}
</style>
