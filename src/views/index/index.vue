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
          <div v-if="!isMobile" class="flex items-center text-[#ffffff] text-[16px] text-right">
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
          <div @click="open = true" v-if="isMobile">
            <img src="@/assets/images/mobileShow.png" class="h-[24px]" />
          </div>

        </div>
        <div class="text-center content md:mt-[200px] mt-[130px]">
          <div class="md:text-[72px] text-[32px] font-bold mx-auto title-text">
            <!-- <span v-if="!isMobile" class="title-text">L1-2 INFRASTRUCTURE FOR <br /> ALL THE FULL CHAIN ASSETS</span>
            <span v-if="isMobile" class="title-text">L1-2 INFRASTRUCTURE FOR ALL THE FULL CHAIN ASSETS</span> -->
            LAYER M INFRA FOR OMNI ASSETS
          </div>
          <div class="md:justify-center md:flex mt-[40px] flex flex-col md:flex-row items-center">
            <!-- <a-button class="w-[178px] h-[37px] text-[#fff]  btn-box md:mr-[24px] ms:mx-auto mb-[24px] md:mb-[0px]"
              @click="clickJoin">Join
              $ABSC</a-button> -->
              <a-button class="w-[178px] h-[37px] text-[#fff]  btn-box md:mr-[24px] ms:mx-auto mb-[24px] md:mb-[0px]"
              @click="clickFaucent">
              Faucet</a-button>
            <a-anchor :affix="false" :items="[{
    key: '1',
    href: '#bmaker-demo-video',
    title: 'View demo',
  }]" @change="onChange">
              <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box">View Demo</a-button>
            </a-anchor>
            <!-- <a-button class="w-[178px] h-[37px] text-[#fff] mt-[40px] btn-box" href="#bmaker-demo-video"
              @click="onChange">View Demo</a-button> -->
          </div>
        </div>
      </div>



      <a-drawer :width="500" title="" placement="top" :open="open" @close="onClose" :closable="false"
        rootClassName="bg-css">
        <div class="flex justify-between">
          <div>
            <img src="@/assets/images/mbake-logo.png" class="w-[110px]" />
          </div>
          <div>
            <CloseOutlined :style="{ fontSize: '24px', color: '#fff' }" @click="open = false" />
          </div>
        </div>
        <div class="text-[18px] text-[#ffFfff] font-bold">
          <div class=" mb-[32px] mt-[32px]" @click="clickJoin">$ABSC
          </div>
          <div @click="clickTwitter">
            <div class=" mb-[32px]">
              Twitter</div>
          </div>
          <div @click="clickTG">
            <div class=" mb-[32px]">
              Telegram</div>
          </div>
          <div @click="clickDiscord">
            <div class="">
              Discord</div>
          </div>
        </div>
      </a-drawer>

    </div>

  </div>
  <div class="bg-black px-[32px]">
    <div class="w-full text-[#ffffff] text-center md:pt-[120px] pt-[60px] max-w-[1428px] mx-auto">
      <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px]">
        <div>Bmaker: BTC & Omni Chains Asset InfraUnlock infinite possibilities</div>
      </div>
      <div class="items-center justify-around md:flex">
        <img src="@/assets/images/Home-1.png" class="mx-auto md:w-[50%] w-[100%] md:mr-[50px] mb-[30px]" />
        <div class="md:text-[26px] text-[16px] text-left ">


          · Finally! ICP could travel freely through the very Bitcoin original L1 network.<br />
          · Utilizing decentralized rollup protocol, there are no moral risks associated with centralized cross-chain
          bridges.<br />
          · Ready for the whale！Release the TVL of the Bitcoin network onto the ICP.<br />
          · The Grand De-Fi Era of ICP is about to dawn!<br />
          · BTC and BTC L2 assets can be staked/re-staked on the ICP network!<br />
        </div>
      </div>
      <div class="md:mt-[120px] mt-[60px]">
        <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px]">
          Application Scenarios of Bmaker Infra & Omni chain assets
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
  <div class="pt-[60px] text-[#ffffff] box-4 px-[32px] md:h-full h-[400px] md:pb-[200px]">
    <div class="md:text-[48px] text-[24px] font-bold md:mb-[80px] mb-[48px] text-center">Partnership</div>
    <div
      class="mx-auto grid md:grid-cols-3 grid-cols-2 gap-4 box-4-in w-[100%] md:w-[1160px] md:h-[540px] items-center md:justify-items-center p-[24px] md:p-[100px] ">
      <img src="@/assets/images/ANT.png" class="md:h-[64px] h-[36px]" />
      <img src="@/assets/images/Pic.png" class="md:h-[64px] h-[36px]" />
      <img src="@/assets/images/KODO.png" class="md:h-[64px] h-[36px]" />
      <img src="@/assets/images/Syn.png" class="md:h-[48px] h-[30px]" />
      <img src="@/assets/images/Par.png" class="md:h-[48px]  h-[26px]" />
      <img src="@/assets/images/OKX.png" class="md:h-[48px] h-[26px]" />
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
import { CloseOutlined } from "@ant-design/icons-vue"
import { useRouter } from "vue-router"

const isMobile = ref(false)
const open = ref(false)
const heightValue = ref(556)
const router = useRouter();

const clickJoin = () => {
  window.open('https://absc.app/')
  open.value = false
}

const clickTwitter = () => {
  window.open('https://twitter.com/BmakerAI')
  open.value = false
}

const clickTG = () => {
  window.open('https://t.me/bmaker2024')
  open.value = false
}

const clickDiscord = () => {
  window.open('https://discord.com/invite/cpECV8CKbS')
  open.value = false
}

const clickFaucent = () => {
  router.push('/faucet');
  open.value = false
}

const onChange = (link: string) => {
  console.log('Anchor:OnChange', link);
};

const onClose = () => {
  open.value = false;
}


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
  margin: 0 auto;
}

:deep(.ant-anchor-link) {
  margin: 0 auto;
}

:deep(.ant-anchor-wrapper .ant-anchor .ant-anchor-link) {
  padding-inline: 0px;
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

.box-4 {
  background: url("@/assets/images/home-bg5.png") 100% 100% no-repeat;
  background-size: cover;


}

.box-4-in {
  margin: 0 auto;
  border: 2px solid #3b82f680;
  background-color: rgba(59, 130, 246, 0.2);
  /* padding: 80px 100px; */
  border-radius: 12px;
}



/* 1F1F1F */
</style>
