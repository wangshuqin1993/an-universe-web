<template>
  <div class="w-full h-full px-[32px] main-content ">
    <abscHeader></abscHeader>
    <div class="text-center content pt-[162px]">
      <div class="md:text-[72px] text-[50px] content-title">
        <span class="font-bold title-text">ABSC</span>
      </div>
      <div class="md:text-[18px] text-[14px]">
        <span class="title-text">$ABSC： build BTC & all assets in aptos</span>
      </div>
      <div class="mobile-min-btn text-[#ffffff]" v-if="isMobile">
        <div class="cursor-pointer min-btn hover:opacity-[0.85] fixed" @click="router.push('/mint')">
          Mint (Coming Soon)
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import abscHeader from "@/components/absc-header.vue";

const router = useRouter();
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

.min-btn {
  left: 50%;
  transform: translateX(-50%);
  bottom: 160px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 5px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);

}


.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

</style>