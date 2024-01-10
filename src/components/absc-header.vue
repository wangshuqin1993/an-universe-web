<template>
  <div class="px-[32px] fixed top-0 w-full z-10 bg-black opacity-[0.85]">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex justify-between  header h-[82px] py-[20px] ">
        <div>
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div v-if="isMobile" @click="open = true">
          <img src="@/assets/images/mobileShow.png" class="w-[24px] mt-[10px]" />
        </div>
        <div v-else class="flex items-stretch text-[#ffffff] text-[16px]">
          <div class="md:mr-[50px] mr-[16px] self-center">Whitepaper</div>
          <div class="md:mr-[50px] mr-[16px] self-center">Roadmap</div>
          <!-- <div class="md:mr-[50px] mr-[16px] self-center">IDO</div> -->
          <div class="cursor-pointer min-btn hover:opacity-[0.85]" @click="router.push('/mint')">
            Mint (Coming Soon)
          </div>
        </div>
      </div>
    </div>
    <a-drawer :width="500" title="" placement="top" :open="open" @close="onClose" :closable="false"
      :contentWrapperStyle="contentWrapperStyle" rootClassName="bg-css">
      <div class="flex items-stretch justify-between">
        <div class="self-center">
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div class="self-center">
          <CloseOutlined style="color: #ffffff;fontSize: 24px" @click="open = false" />
        </div>
      </div>
      <div class="text-[16px] text-[#ffFfff] font-bold">
        <div class="mt-[40px] mb-[30px]">Whitepaper</div>
        <div class="mb-[30px]">Roadmap</div>
      </div>
    </a-drawer>
  </div>
</template>
<script lang='ts' setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { CloseOutlined } from "@ant-design/icons-vue"

const router = useRouter();
const open = ref(false);
const isMobile = ref(false)
const contentWrapperStyle = ref({ 'backfround-color': '#1F1F1F' })


const onClose = () => {
  open.value = false
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
<style lang='less' scoped>
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


:deep(.ant-drawer-content) {
  background-color: #1F1F1F;
}

.bg-css {
  background-color: #1F1F1F;
}
</style>