<template>
  <div class="relative bg-[#020619] " :class="!isMobile ? 'main-content' : 'main-content-bg'">
    <!-- class="absolute top-0" -->
    <div class="video-box" :class="isMobile ? 'mobile-css' : ''">
      <video autoplay loop muted width="100%" v-if="!isMobile">
        <source src="@/assets/images/video.mp4" type="video/mp4" />
      </video>
    </div>


    <div class="w-full h-full px-[32px] content-box">
      <div class="max-w-[1440px] mx-auto">
        <div class="flex justify-between items-center header h-[82px] py-[20px] ">
          <div>
            <img src="@/assets/images/mbake-logo.png" class="md:w-[140px] w-[110px]" />
          </div>
          <div class="flex items-center text-[#ffffff] text-[16px] text-right">
            <div
              class="md:mr-[50px] md:text-[20px] text-[16px] mr-[12px] cursor-pointer hover:text-[#F41FFF] md:font-bold font-semibold"
              @click="clickJoin">$ABSC
            </div>
            <div @click="clickTwitter">
              <!-- <img src="@/assets/images/Twitter.png" class="w-[22px] md:mr-[50px] mr-[24px] cursor-pointer" /> -->
              <div
                class=" md:mr-[50px] mr-[12px] cursor-pointer md:text-[20px] text-[16px] md:font-bold font-semibold hover:text-[#F41FFF]">
                Twitter</div>
            </div>
            <div @click="clickTG">
              <div
                class=" md:mr-[50px] mr-[12px] cursor-pointer md:text-[20px] text-[16px] md:font-bold font-semibold hover:text-[#F41FFF]">
                Telegram</div>
              <!-- <img src="@/assets/images/TG.png" class="w-[22px] cursor-pointer" /> -->
            </div>
            <div @click="clickDiscord">
              <div class=" cursor-pointer md:text-[20px] text-[16px] md:font-bold font-semibold hover:text-[#F41FFF]">
                Discord</div>
              <!-- <img src="@/assets/images/TG.png" class="w-[22px] cursor-pointer" /> -->
            </div>
          </div>

        </div>
        <div class="text-center content md:mt-[80px] mt-[130px]">
          <div class="md:text-[72px] text-[50px] content-title">
            <span class="font-black title-text">Bmaker</span>
          </div>
          <div class="md:text-[48px] text-[18px] font-bold mx-auto">
            <!-- <span class="title-text">The Web3 future Bitcoin Stablecoin Paradigm</span> -->
            <span class="title-text">L1-2 INFRASTRUCTURE FOR<br /> ALL THE FULL CHAIN ASSETS</span>
          </div>
          <div class="flex justify-center">
            <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box mr-[24px]" @click="clickJoin">Join
              $ABSC</a-button>
            <a-anchor :affix="false" :items="[{
    key: '1',
    href: '#bmaker-demo-video',
    title: 'Basic demo',
  }]" @change="onChange">
              <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box">View Demo</a-button>
            </a-anchor>
            <!-- <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box" href="#bmaker-demo-video"
              @click="onChange">View Demo</a-button> -->
          </div>
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
  <div class="bg-black px-[32px]">
    <div class="w-full text-[#ffffff] text-center md:pt-[120px] pt-[60px] max-w-[1428px] mx-auto">
      <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px]">
        <div>Bmaker: BTC & Omni Chains Asset Infra<br />
          Unlock infinite possibilities</div>
      </div>
      <div class="items-center justify-around md:flex">
        <img src="@/assets/images/Home-1.png" class="mx-auto md:w-[50%] w-[100%] md:mr-[50px] mb-[30px]" />
        <div class="md:text-[20px] text-[16px] text-left ">
          · Omni chain infra L1-2 for decentralized stablecoin & all omni
          chain
          assets<br />
          · BTC L1 Supporting the issuance of centralized stablecoins with excess collateral<br />
          · Stablecoin can be used directly on EVM L1&L2 & Non EVM w/o coss chain bridge<br />
          · Universal infra that can empower any asset with omni chain free consumption scenarios<br />
          · Web 3 Massadotion/Web 2.5/ Old money friendly <br />
          · Decentralized and fully on chain</div>
      </div>
      <div class="md:mt-[120px] mt-[60px]">
        <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px]">
          BTC Ecological Native /EVM&Non-EVM supportable,
          Web2.5-Web3.0 financial application scenarios friendly
        </div>
        <img src="@/assets/images/Home-2.png" class="md:w-[80%] w-[100%] mx-auto" />

      </div>
      <div class="md:mt-[120px] mt-[60px]" id="bmaker-demo-video">
        <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px]">
          Bmaker Demo Video
        </div>
        <div class="md:w-[70%] h-full w-[100%] mx-auto md:pb-[60px] pb-[32px]">
          <iframe width="100%" :height="heightValue" src="https://www.youtube.com/embed/SrT93VxCrlE?si=eifWepFkzUgVvtAJ"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>

      </div>
    </div>
  </div>
  <div class="max-w-[1428px] text-[#ffffff] px-[32px] pt-[60px] pb-[80px] mx-auto">
    <div>
      <img src="@/assets/images/mbake-logo.png" class="md:w-[140px] w-[110px]" />
    </div>
    <div class="text-[16px] font-bold mt-[12px] mb-[20px]">Copyright © 2024 Bmaker. All rights reserved.</div>
    <div class="flex">
      <div @click="clickTwitter">
        <img src="@/assets/images/bmaker-twitter.png" class="w-[22px] mr-[24px] cursor-pointer" />
      </div>
      <div @click="clickDiscord">
        <img src="@/assets/images/bmaker-discord.png" class="w-[22px] mr-[24px] cursor-pointer" />
      </div>
      <div @click="clickTG">
        <img src="@/assets/images/bmaker-tg.png" class="w-[22px] cursor-pointer" />
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { CloseOutlined } from "@ant-design/icons-vue"
const isMobile = ref(false)
const heightValue = ref(556)

const clickJoin = () => {
  window.open('https://absc.app/')
}

const clickTwitter = () => {
  window.open('https://twitter.com/bscstable')
}

const clickTG = () => {
  window.open('https://t.me/aptbscs')
}

const clickDiscord = () => {
  window.open('https://discord.com')
}

const onChange = (link: string) => {
  console.log('Anchor:OnChange', link);
};


onMounted(() => {
  let width = document.documentElement.clientWidth;
  if (width > 750) {
    isMobile.value = false
    heightValue.value = 556
  } else {
    isMobile.value = true;
    heightValue.value = 256
  }
})
</script>

<style scoped>
.video-box {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
}

.mobile-css {
  height: 100vh;
  background: url('../../assets/images/mobile-bg-bmaker.jpg') no-repeat;
  background-size: cover;
  background-position: center bottom;
  /* background-attachment: fixed; */
}

.content-box {
  min-height: 100vh;
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
}

:deep(.ant-drawer-content) {
  background-color: #1F1F1F;
}

:deep(.ant-anchor-wrapper:not(.ant-anchor-wrapper-horizontal) .ant-anchor .ant-anchor-ink) {
  background-color: transparent;
}

:deep(.ant-anchor-wrapper .ant-anchor .ant-anchor-link-title) {
  color: #ffffff;
}

:deep(.ant-anchor-wrapper .ant-anchor .ant-anchor-link-title:hover) {
  font-size: 15px;
}

:deep(.ant-anchor-link-title) {
  font-weight: bold;
  border-radius: 19px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border: none;
  line-height: 37px;
  color: #ffffff;
  width: 178px;
  margin-top: 38px;
}

.bg-css {
  background-color: #1F1F1F;
}

.btn-box {
  font-weight: bold;
  border-radius: 19px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border: none;
  line-height: 30px;
}

.btn-box:hover,
.btn-box:focus {
  font-weight: 800;
  color: #FFF;
  border: none;
  opacity: 0.85;
  outline: none;
}





/* 1F1F1F */
</style>