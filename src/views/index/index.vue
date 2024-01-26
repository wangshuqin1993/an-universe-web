<template>
  <div class="relative bg-[#020619] " :class="!isMobile ? ' main-content' : 'main-content-bg'">
    <!-- class="absolute top-0" -->
    <div class="video-box" :class="isMobile ? 'mobile-css' : ''">
      <video autoplay loop muted width="100%" v-if="!isMobile">
        <source src="@/assets/images/video.mp4" type="video/mp4" />
      </video>

    </div>


    <div class="w-full h-full px-[32px] content-box">
      <div class="max-w-[1440px] mx-auto">
        <div class="flex justify-between header h-[82px] py-[20px] ">
          <div>
            <img src="@/assets/images/mbake-logo.png" class="md:w-[140px] w-[110px]" />
            <!-- <source src="@/assets/images/video.mp4" type="video/mp4" /> -->
          </div>
          <!-- <div v-if="isMobile" @click="open = true">
            <img src="@/assets/images/mobileShow.png" class="w-[24px]" />
          </div> -->
          <div class="flex items-center text-[#ffffff] text-[16px]">
            <!-- <div class="md:mr-[50px] mr-[16px] self-center">Whitepaper</div> -->
            <!-- <div class="md:mr-[50px] mr-[16px] self-center">Roadmap</div> -->
            <!-- <div class="md:mr-[50px] mr-[16px] self-center">IDO</div> -->
            <!-- <div class="min-btn">
              Mint (Coming Soon)
            </div> -->
            <div class="md:mr-[50px] text-[16px] mr-[24px] cursor-pointer hover:text-[#F41FFF]" @click="clickJoin">$ABSC
            </div>
            <div @click="clickTwitter">
              <img src="@/assets/images/Twitter.png" class="w-[22px] md:mr-[50px] mr-[24px] cursor-pointer" />
            </div>
            <div @click="clickTG">
              <img src="@/assets/images/TG.png" class="w-[22px] cursor-pointer" />
            </div>
          </div>

        </div>
        <div class="text-center content md:mt-[80px] mt-[130px]">
          <div class="md:text-[72px] text-[50px] content-title">
            <span class="font-black title-text">Bmaker</span>
          </div>
          <div class="md:text-[18px] text-[14px]">
            <span class="title-text">The Web3 future Bitcoin Stablecoin Paradigm</span>
          </div>
          <div @click="clickJoin">
            <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box">Join $ABSC</a-button>
          </div>
          <!-- <div class="mobile-min-btn text-[#ffffff]" v-if="isMobile">
            <div class=" min-btn">
              Mint (Coming Soon)
            </div>
          </div> -->
        </div>
      </div>

      <!-- <a-drawer :width="500" title="" placement="top" :open="open" @close="onClose" :closable="false"
        :contentWrapperStyle="contentWrapperStyle" rootClassName="bg-css">
        <div class="flex justify-between">
          <div>
            <img src="@/assets/images/mbake-logo.png" class="w-[110px]" />
          </div>
          <div>
            <CloseOutlined style="color: #ffffff;fontSize: 24px" @click="open = false" />
          </div>
        </div>
        <div class="text-[16px] text-[#ffFfff] font-bold">
          <div class="mt-[40px] mb-[30px]">Whitepaper</div>
          <div class="mb-[30px]">Roadmap</div>
    </div>
    </a-drawer> -->

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { CloseOutlined } from "@ant-design/icons-vue"
const open = ref(false);
const isMobile = ref(false)

// const onClose = () => {
//   open.value = false
// }

// const contentWrapperStyle = ref({ 'backfround-color': '#1F1F1F' })

const clickJoin = () => {
  window.open('https://absc.app/')
}

const clickTwitter = () => {
  window.open('https://twitter.com/bscstable')
}

const clickTG = () => {
  window.open('https://t.me/aptbscs')
}

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
.video-box {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  bottom: 0;
  z-index: 1;
}

.mobile-css {
  height: 100vh;
  background: url('../../assets/images/mobile-bg-bmaker.jpg') no-repeat;
  background-size: cover;
  background-position: center bottom;
  background-attachment: fixed;
}

.content-box {
  position: absolute;
  top: 0;
  z-index: 9;
  font-family: Montserrat, Montserrat;
}

.main-content {
  width: 100%;
  min-height: 100vh;
  position: relative;
  top: 0;
  left: 0;


  /* height: 100Vh; */
  /* background: url('../../assets/images/bmake.jpg') no-repeat; */
  /* background-size: cover;
  background-attachment: fixed;
  background-position: center center; */
  /* 
  max-width: 1440px;
  margin: 0 auto; */
}

.main-content:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgba(124, 0, 131, .2) 0%, rgba(243, 30, 255, 0.42) 100%);
}

.main-content-bg {
  width: 100%;
  min-height: 100vh;
  position: relative;
  top: 0;
  left: 0;
}

/* .main-content-bg:after {
  background: none;
} */

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
  color: #ffffff;
  /* background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; */
}

:deep(.ant-drawer-content) {
  background-color: #1F1F1F;
}

.bg-css {
  background-color: #1F1F1F;
}

.btn-box {
  font-weight: bold;
  border-radius: 19px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border: none
}

.btn-box:hover,
.btn-box:focus {
  /* font-size: 14.5px; */
  font-weight: 800;
  color: #FFF;
  border: none;
  opacity: 0.85;
  outline: none;
}





/* 1F1F1F */
</style>