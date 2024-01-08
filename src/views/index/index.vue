<template>
  <div class="w-full h-full px-[32px] main-content ">
    <abscHeader></abscHeader>
    <div class="text-center content mt-[80px]">
      <div class="md:text-[72px] text-[50px] content-title">
        <span class="font-bold title-text">ABSC</span>
      </div>
      <div class="md:text-[18px] text-[14px]">
        <span class="title-text">$ABSC： build BTC & all assets in aptos</span>
      </div>
      <div class="mobile-min-btn text-[#ffffff]" v-if="isMobile">
        <div class="cursor-pointer min-btn hover:opacity-[0.85]">
          Mint (Coming Soon)
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";

const isMobile = ref(false)

onMounted(() => {
  let width = document.documentElement.clientWidth;
  console.log(width, 'width')
  if (width > 750) {
    isMobile.value = false
  } else {
    isMobile.value = true;
  }
})
</script>
<style scoped>
.main-content {
  height: 100Vh;
  margin: 0;
  background: url('../../assets/images/bmake.jpg') no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  /* 
  max-width: 1440px;
  margin: 0 auto; 
  */
}


.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>