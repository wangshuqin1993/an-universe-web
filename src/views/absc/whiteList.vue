
<template>
  <div class="w-full h-full bg-black pb-[75px] bg-container  md:px-[32px] px-[24px]">
    <div class="max-w-[1440px] mx-auto md:px-[0px] ">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">$ABSC
          Token IDO
          Whitelist</span></div>
      <div
        class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-justify md:mt-[37px] mt-[10px] text-[14px] md:text-[16px]">
        The $ABSC token IDO will be conducted soon, and users who hold the whitelist can enjoy a 30% discount on the

        IDO price and corresponding quota. You can obtain the whitelist by participating in various activities in the ABSC

        community. In addition, users who hold UR-level $BSC Genesis NFTs can exchange for the whitelist by burning

        500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
      </div>
    </div>
    <div>
      <div
        class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center md:mt-[49px] mt-[30px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold md:text-[20px] text-[16px] text-[#fff]">{{ startTime }} — {{
          endTime }}
          (UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] md:text-[18px] text-[14px]">Exchange time</span>
      </div>
      <div class="text-center md:mt-[40px] mt-[20px]">
        <a-button class="w-[278px] h-[60px] rounded-[30px] text-[18px]" @click="handleExchangeModal" :loading="btnLoading"
          :disabled="disabled">{{ btnInfo
          }}</a-button>
      </div>
      <div v-if="whitelistSubscribeTime.status == '2' && walletAddress.walletAddress"
        class="text-center text-[#fff] mt-[20px]"> Your $ABSC balance: <span class="text-[#E527FF]"> {{
          whitelistSubscribeAmountData?.abscAmount }}</span> ABSC
      </div>
      <div
        v-if="whitelistVerifyData.joined && walletAddress.walletAddress && whitelistSubscribeTime != '3' && whitelistVerifyData.tokenId"
        class="text-left text-[#fff] mt-[20px]">You
        have
        obtained the <span class="text-[#E527FF]">{{ LeveLabellEnums[whitelistVerifyData?.level]
        }}</span>
        level of whitelist,
        corresponding to your NFT with
        Token ID <span class="text-[#E527FF]">{{ whitelistVerifyData.tokenId }}</span></div>
      <div class="text-left text-[#fff] mt-[20px]" v-if="whitelistSubscribeTime == '3'">
        The $ABSC tokens you purchased in the IDO will be airdropped directly to your wallet soon. Please pay attention to
        check it.
      </div>
    </div>

    <div v-if="!whitelistSubscribeResult"
      class="whitelist-absc-container md:max-w-[931px] md:py-[50px] px-[10px] py-[30px] md:mt-[70px] mt-[60px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">As
          the mapping token of
          the leading inscription ABSC based on APT-20 on the BSC chain, the $ABSC token

          will become the first mapping token of the Bmaker ecosystem and can be exchanged with BSC stablecoins

          based on the Bmaker ecosystem. $ABSC can also be staked toobtain the corresponding amount of Bmaker

          ecosystem stablecoins, which can be used on any chain supported by the BSC ecosystem. The $ABSC

          token is an important value support for the Bmaker ecosystem stablecoins.
        </span>
      </div>
      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token IDO Whitelist</span>
        <span
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">The
          $ABSC token IDO
          will be conducted soon, and users who hold the whitelist can enjoy a 30% discount on the

          IDO price and corresponding quota. You can obtain the whitelist by participating in various activities in the
          ABSC

          community. In addition, users who hold UR-level $BSC Genesis NFTs can exchange for the whitelist by burning

          500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
          <div class="mt-[12px] text-center">
            Exchange time:{{ startTime }} —— {{ endTime }} (UTC+8)
          </div>
        </span>
      </div>
    </div>
  </div>
  <abscFooter></abscFooter>
  <WhiteListModal :openWhiteListModal="openWhiteListModal" @closeWhiteListModal="openWhiteListModal = false"
    @getWhiteListDone="getWhiteListDone">
  </WhiteListModal>
  <whiteListBuyModal :openWhiteListBuyModal="openWhiteListBuyModal" pageName="Whitelist"
    @getWhitelistSubscribeResult="getWhitelistSubscribeResult" @closeWhiteListBuyModal="openWhiteListBuyModal = false">
  </whiteListBuyModal>
  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="closeSelectedWhiteListModal">
  </selectWalletListModal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { message } from "ant-design-vue";
import abscFooter from "@/components/absc-Footer.vue";
import WhiteListModal from './components/WhiteListModal.vue';
import whiteListBuyModal from './components/whiteListBuyModal.vue';
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { apiWhitelistAcquisitionTime, apiWhitelistVerify, apiWhitelistSubscribeTime, apiWhitelistSubscribeAmount } from "@/apis/absc";
import { LeveLabellEnums } from "@/enums/levelLabel";
const walletAddress = useWalletAddress()

// const open = ref(false)
const openWhiteListModal = ref(false);
const openWhiteListBuyModal = ref(false);
const openSelectedWhiteListModal = ref(false);
const whitelistSubscribeResult = ref(false);
const whitelistVerifyData = ref({});
const whitelistAcquisitionTime = ref({});
const whitelistSubscribeTime = ref({});
const whitelistSubscribeAmountData = ref({});
const btnInfo = ref('Get Whitelist');
const disabled = ref(true);
const btnLoading = ref(false)
const startTime = ref('');
const endTime = ref('');

// 点击按钮
const handleExchangeModal = async () => {
  if (!walletAddress.walletAddress) return openSelectedWhiteListModal.value = true;
  btnLoading.value = true
  if (btnInfo.value.includes('Whitelist')) {
    // 点击获取白名单
    await getApiWhitelistVerify();
    if (whitelistVerifyData.value && whitelistVerifyData.value.joined) {
      // 有白名单判断 IDO 是否开始
      await getApiWhitelistSubscribeTime()
    } else {
      // 没有白名单
      openWhiteListModal.value = true;
    }
    btnLoading.value = false
  } else {
    await getApiWhitelistVerify();
    if (whitelistVerifyData.value && whitelistVerifyData.value.joined) {
      // 有白名单判断 IDO 是否开始
      await getApiWhitelistSubscribeTime()
      if (whitelistSubscribeTime.value.status === '2') {
        openWhiteListBuyModal.value = true;
      }
      btnLoading.value = false
    }
  }
}

// 活动开始时间
const getApiWhitelistAcquisitionTime = async () => {
  try {
    const { data } = await apiWhitelistAcquisitionTime();
    whitelistAcquisitionTime.value = data
    if (data.status == '1') {
      btnInfo.value = 'Get Whitelist(coming soon)'
      disabled.value = true
    } else if (data.status == '2') {
      btnInfo.value = 'Get Whitelist'
      disabled.value = false;
    } else {
      btnInfo.value = 'Get Whitelist has ended';
      disabled.value = true;
    }
    startTime.value = data.start
    endTime.value = data.end
    // console.log('认领的 data', data)
  } catch (err) {
    message.error(err.message)
  }
}

// 添加白名单时间
const getApiWhitelistSubscribeTime = async () => {
  try {
    const { data } = await apiWhitelistSubscribeTime()
    whitelistSubscribeTime.value = data
    if (data.status == '1') {
      btnInfo.value = 'IDO(coming soon)';
      disabled.value = true;
    } else if (data.status == '2') {
      btnInfo.value = 'IDO';
      disabled.value = false;
      if (walletAddress.walletAddress) {
        getApiWhitelistSubscribeAmount()
      }
    } else {
      btnInfo.value = 'IDO has ended';
      disabled.value = true;
    }
    startTime.value = data.start
    endTime.value = data.end
  } catch (err) {
    message.error(err.message)
  }
}

const getApiWhitelistSubscribeAmount = async () => {
  try {
    const { data } = await apiWhitelistSubscribeAmount(walletAddress.walletAddress)
    whitelistSubscribeAmountData.value = data
  } catch (err) {
    message.error(err.message)
  }
}


const getWhiteListDone = () => {
  getApiWhitelistVerify()
  getApiWhitelistSubscribeTime()
}

// 连接钱包成功
const closeSelectedWhiteListModal = async () => {
  openSelectedWhiteListModal.value = false;
  await getApiWhitelistVerify()
  if (whitelistVerifyData.value && whitelistVerifyData.value.joined) {
    // 有白名单判断 IDO 是否开始
    getApiWhitelistSubscribeTime()
  }
}

// 购买成功
const getWhitelistSubscribeResult = (result: boolean) => {
  whitelistSubscribeResult.value = result
  getApiWhitelistSubscribeAmount()
}

// 白名单的接口
const getApiWhitelistVerify = async () => {
  try {
    const { data } = await apiWhitelistVerify(walletAddress.walletAddress)
    whitelistVerifyData.value = data;
  } catch (err) {
    console.log(err.message);
  }
}

// 判断有没有白名单
const initDataHasWhitelistVerify = async () => {
  await getApiWhitelistVerify()
  if (whitelistVerifyData.value && whitelistVerifyData.value.joined) {
    // 有白名单判断 IDO 是否开始
    getApiWhitelistSubscribeTime()
  } else {
    // 没有，判断认领是否开始
    getApiWhitelistAcquisitionTime()
  }
}

// 没有白名单判断认领是否开始
const initDataNoWhitelistVerify = async () => {
  await getApiWhitelistAcquisitionTime()
  if (whitelistAcquisitionTime.value.status == '3') {
    getApiWhitelistSubscribeTime()
  }
}

onMounted(async () => {
  console.log('onMounted 查看 walletAddress：', walletAddress.walletAddress)
  if (walletAddress.walletAddress) {
    // console.log('walletAddress', "sadfa")
    await initDataHasWhitelistVerify()
  } else {
    // 认领是否开始
    await initDataNoWhitelistVerify()
  }
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal && newVal != '') {
      await initDataHasWhitelistVerify()
    } else {
      //await initDataNoWhitelistVerify()
    }
  }, { deep: true, immediate: false }
);


</script>

<style scoped lang="less">
.bg-container {
  background-image: url('../../assets/images/bg-total.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.title-text {
  font-family: Montserrat Black;
  text-align: center;
  font-weight: 900;
}

.title-text-color {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.min-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0;
  width: 278px;
  height: 60px;
  color: #fff;
  font-size: 18px;
  border-radius: 30px;
  cursor: pointer;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
}

.whitelist-absc-container {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border-color: transparent;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px round;
}
</style>