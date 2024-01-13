<template>
  <a-modal v-model:open="openWhiteListModal" title="" :footer="null" width="660px" @cancel="closeModal">
    <div class="text-center">
      <div class="flex items-center justify-center text-center text-[21px] font-semibold mt-[50px] mb-[30px] ">
        Get your whitelist and win a better price for $ABSC token IDO
      </div>
      <div class="white-step">
        <div v-for="item in  stepList " :key="item.id" class="flex white-step-item">
          <div class="w-[37px] h-[37px] rounded-[50%] text-[18px] leading-[37px] mr-[20px] font-semibold"
            :class="item.status == 1 ? 'not-started-css' : 'started-css'">
            {{ item.id }}
          </div>
          <div class="text-left mt-[8px]">
            <div class="text-[16px] font-semibold white-step-item-title"
              :class="item.status == 1 ? 'not-started-css-title' : 'started-css-title'">{{ item.title }}</div>
            <div class="text-[#929292] text-[12px]">{{ item.desc }}</div>
            <div v-if="item.id === 1">
              <div class="my-[20px] text-[14px] text-[#000] font-semibold ">Connect Wallet</div>
              <div v-for=" val  in  walletList " :key="val.id">
                <div class="flex wallet-item justify-between items-center cursor-pointer">
                  <div class="flex items-center">
                    <img :src="getImageURL(`${val.img}.png`)" class="h-[30px] mr-[18px]" />
                    <div>{{ val.name }}</div>
                    <!-- <div v-if class="text-[12px] text-[#000000]">address</div> -->
                  </div>
                  <div class="text-[#464646] text-[12px] cursor-pointer">disconnect</div>
                </div>
                <!-- 连接钱包成功 -->
                <!-- <div class="flex items-center mt-[10px]">
                  <img src="@/assets/images/successful.png" class="h-[16px]" />
                  <div class="text-[12px] text-[#28C57C] font-semibold ml-[5px]">Certification Successful</div>
                </div> -->

                <!-- 连接钱包失败 -->
                <!-- <div class="flex items-top mt-[10px]">
                  <img src="@/assets/images/exclamation.png" class="h-[16px] w-[16px]" />
                  <div class="text-[12px] text-[#737373] font-semibold ml-[5px]"> <span
                      class="text-[#FF3653]">Certification failed:</span> You
                    can disconnect the wallet and log in
                    to other wallets have Genesis NFT to continue verification.</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="parting-line"></div>
      <div class="text-center mt-[40px] font-normal ">
        <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledWhiteListBtn">done</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs } from "vue";
import useAssets from "@/stores/useAssets";
const { getImageURL } = useAssets();
const disabledWhiteListBtn = ref(true);
const description = ref('jjjjj')
const stepList = ref([{ title: 'Genesis NFT holder certification', desc: 'Please connect your wallet to complete Genesis NFT holder certification', id: 1, status: 2 }, { title: "Burning ABSC Inscription", desc: '', id: 2, status: 1 }])
const walletList = ref([{ name: 'Metamask', img: 'Metamask', id: 1, }, { name: "OKX Web3 Wallet", img: 'OKXWallet-logo', id: 2, status: 1 }])
const props = defineProps({
  openWhiteListModal: {
    type: Boolean,
    default: false,
  }
})

const { openWhiteListModal } = toRefs(props)
const emit = defineEmits(['closeWhiteListModal'])
const closeModal = () => {
  emit('closeWhiteListModal', false)
}

</script>
<style lang='less' scoped>
.wallet-item {
  padding: 8px 30px;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  background-color: #fff;
  border-radius: 22px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.13);
  margin-bottom: 20px;
}

.white-step-item {
  position: relative;
}

.white-step-item::after {
  content: '';
  position: absolute;
  width: 1px;
  height: calc(100% - 37px);
  top: 37px;
  left: 18px;
  border-left: 1px solid #F0F0F0;
}

.parting-line {
  width: 100%;
  margin-top: 40px;
  border-top: 1px solid #F1F1F1;
}

.not-started-css {
  color: #5D5D5D;
  background-color: #F0F0F0;
}

.not-started-css-title {
  color: #73706E;
}

.started-css {
  color: #fff;
  background-color: #E527FF;
}

.started-css-title {
  color: #E527FF;
}
</style> 