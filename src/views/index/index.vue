<template>
  <div class="w-full h-full px-[32px] main-content ">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex justify-between  header h-[82px] py-[20px] ">
        <div>
          <!-- <img src="@/assets/images/mbake-logo.png" class="md:w-[140px] w-[110px]" /> -->
          <!-- <div class="text-[28px] text-[#fff] font-bold">
            <span class="absc-title">$ABSC</span>
          </div> -->
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div v-if="isMobile" @click="open = true">
          <img src="@/assets/images/mobileShow.png" class="w-[24px] mt-[10px]" />
        </div>
        <div v-else class="flex items-stretch text-[#ffffff] text-[16px]">
          <div class="md:mr-[50px] mr-[16px] self-center">Whitepaper</div>
          <div class="md:mr-[50px] mr-[16px] self-center">Roadmap</div>
          <!-- <div class="md:mr-[50px] mr-[16px] self-center">IDO</div> -->
          <div class="min-btn">
            Mint (Coming Soon)
          </div>
        </div>

      </div>
      <div class="text-center content mt-[80px]">
        <div class="md:text-[72px] text-[50px] content-title">
          <span class="font-bold title-text">ABSC</span>
        </div>
        <div class="md:text-[18px] text-[14px]">
          <span class="title-text">$ABSC： build BTC & all assets in aptos</span>
        </div>
        <div class="mobile-min-btn text-[#ffffff]" v-if="isMobile">
          <div class=" min-btn">
            Mint (Coming Soon)
          </div>
        </div>
      </div>
    </div>

    <a-drawer :width="500" title="" placement="top" :open="open" @close="onClose" :closable="false"
      :contentWrapperStyle="contentWrapperStyle" rootClassName="bg-css">
      <div class="flex items-stretch justify-between">
        <div class="self-center">
          <!-- <img src="@/assets/images/mbake-logo.png" class="w-[110px]" /> -->
          <!-- <div class="text-[28px] text-[#fff] font-bold"><span class="absc-title">$ABSC</span></div> -->
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div class="self-center">
          <CloseOutlined style="color: #ffffff;fontSize: 24px" @click="open = false" />
        </div>
      </div>
      <div class="text-[16px] text-[#ffFfff] font-bold">
        <div class="mt-[40px] mb-[30px]">Whitepaper</div>
        <div class="mb-[30px]">Roadmap</div>
        <!-- <div class="mb-[30px]">IDO</div> -->
      </div>
    </a-drawer>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue"
const open = ref(false);
const isMobile = ref(false)

const onClose = () => {
  open.value = false
}

const contentWrapperStyle = ref({ 'backfround-color': '#1F1F1F' })

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
  margin: 0 auto; */
}

.absc-title {
  background-image: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.mobile-min-btn {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translatex(-50%);
}

.min-btn {
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

:deep(.ant-drawer-content) {
  background-color: #1F1F1F;
}

.bg-css {
  background-color: #1F1F1F;
}



/* 1F1F1F */
</style>