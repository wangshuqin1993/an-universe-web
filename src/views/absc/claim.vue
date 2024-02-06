
<template>
  <div class="w-full h-full bg-black pb-[75px] bg-container  md:px-[32px] px-[24px]">
    <div class="max-w-[1440px] mx-auto md:px-[0px] ">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">$ABSC
          Token IDO
          Claim</span></div>
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
        <span class="pt-[15px] px-[21px] font-bold md:text-[20px] text-[16px] text-[#fff]">02-01-2024 12:00 AM —
          02-08-2024 7:00 PM (UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] md:text-[18px] text-[14px]">Exchange time</span>
      </div>
      <div class="md:mb-[50px] mb-[40px] mt-[70px] text-center">
        <a-button :disabled="refundDisable" @click="refundBtnClick"
          class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] md:text-[18px] text-[14px] mr-[20px]">
          Refund
        </a-button>
        <a-button :disabled="claimDisable" @click="claimBtnClick"
          class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] md:text-[18px] text-[14px]">
          Claim
        </a-button>
        <ul class="text-[#88898A] text-[10px] md:text-[14px] mt-[10px] refund-text w-full md:max-w-[908px] mx-auto">
          <li v-if="walletAddress.walletAddress && !idoInfoCheck">
            <div v-html="idoInfoCheckInfo"></div>
          </li>
        </ul>
      </div>
      <div class="text-center text-[#fff] mt-[12px]">IDO through whitelist will not stop while the gap between rounds
      </div>
    </div>
  </div>
  <abscFooter></abscFooter>
  <a-modal v-model:open="refundModal" title="" :footer="null" @cancel="refundModal = false">
    <div v-if="idoInfoCheck" class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">{{ 'Your IDO amount is ' +
        idoInfo.amount + 'BNB and you can receive ' +
        idoInfo.erc20Amount + 'ABSC.' }}
      </div>
      <div class="text-[#343434]">
        Would you like to choose a refund?
      </div>
    </div>
    <div v-else class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]" v-html="idoInfoCheckInfo"></div>
    </div>
    <div v-if="idoInfoCheck" class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="refundModal = false">Think again</div>
      <a-button class="w-[178px] h-[37px]" @click="refund" :loading="refundLoading">Refund</a-button>
    </div>
  </a-modal>
  <a-modal v-model:open="claimModal" title="" :footer="null" @cancel="claimModal = false">
    <div v-if="idoInfoCheck" class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">
        {{ 'Your IDO amount is ' +
          idoInfo.amount + 'BNB and you can receive ' +
          idoInfo.erc20Amount + 'tABSC.' }}
      </div>
      <div class="text-[#343434]">
        Your taste is good.
      </div>
    </div>
    <div v-else class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]" v-html="idoInfoCheckInfo"></div>
    </div>
    <div v-if="idoInfoCheck" class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="claimModal = false">Cancel</div>
      <a-button class="w-[178px] h-[37px]" @click="claim" :loading="claimLoading">Claim</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { message } from "ant-design-vue";
import abscFooter from "@/components/absc-Footer.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { apiIDOInfo, apiIDORefund, apiIDOClaim, apiIDOStatus } from "@/apis/absc";
import { useWeb3Modal } from '@web3modal/ethers5/vue'
const modal = useWeb3Modal()
const walletAddress = useWalletAddress()
const refundLoading = ref(false);
const claimLoading = ref(false);
const refundDisable = ref(false);
const claimDisable = ref(false);
const refundModal = ref(false);
const claimModal = ref(false);
const idoInfo = ref();

const getIdoInfo = async (address) => {
  let res = await apiIDOInfo(address);
  if (res.data) {
    idoInfo.value = res.data;
  } else {
    idoInfo.value = undefined;
  }
  checkIdoInfo(idoInfo.value);
}

const idoInfoCheck = ref(false);
const idoInfoCheckInfo = ref();
const isProd = import.meta.env.VITE_NODE_ENV === 'production';
const scanUrl = isProd ? "https://bscscan.com/tx/" : "https://testnet.bscscan.com/tx/";
const checkIdoInfo = (info) => {
  if (info && info.isRefund == 1 && info.isClaim == 1) {
    idoInfoCheck.value = true;
  } else {
    idoInfoCheck.value = false;
    if (!info) {
      idoInfoCheckInfo.value = 'You do not have an IDO amount.';
    } else if (info.isRefund == 2) {
      idoInfoCheckInfo.value = 'Your account is currently being refunded, please be patient and wait.';
    } else if (info.isRefund == 3) {
      idoInfoCheckInfo.value = 'Your account has been refunded,with a refund amount of <span class="!text-[#E527FF]" > ' + info.amount + 'BNB</span>, transaction hash is <a class="!text-[#47a1ff]" target="_blank" href="' + scanUrl + info.refundHash + '">' + info.refundHash + '</a>, please check your wallet balance.';
    } else if (info.isClaim == 2) {
      idoInfoCheckInfo.value = 'Your account has been claimed,with a claim amount of <span class="!text-[#E527FF]" > ' + info.erc20Amount + 'tABSC</span>, transaction hash is <a class="!text-[#47a1ff]" target="_blank" href="' + scanUrl + info.claimHash + '">' + info.claimHash + '</a>, please check your wallet balance.';
    } else {
      idoInfoCheckInfo.value = 'Please contact the project team.';
    }
  }
}

const refundBtnClick = async () => {
  // check wallet
  if (!walletAddress.walletAddress) {
    modal.open();
  } else {
    // open model
    refundModal.value = true;
  }
}

const refund = async () => {
  try {
    refundLoading.value = true;
    await apiIDORefund(walletAddress.walletAddress);
    await getIdoInfo(walletAddress.walletAddress);
    message.success("Successfully refund");
    refundModal.value = false;
  } catch (e) {
    message.error(e.message);
  } finally {
    refundLoading.value = false;
  }
}

const claimBtnClick = async () => {
  // check wallet
  if (!walletAddress.walletAddress) {
    modal.open();
  } else {
    // open model
    claimModal.value = true;
  }
}

const claim = async () => {
  try {
    claimLoading.value = true;
    await apiIDOClaim(walletAddress.walletAddress);
    await getIdoInfo(walletAddress.walletAddress);
    message.success("Successfully claim");
    claimModal.value = false;
  } catch (e) {
    message.error(e.message);
  } finally {
    claimLoading.value = false;
  }
}

onMounted(async () => {
  apiIDOStatus().then(res => {
    if (res.data) {
      refundDisable.value = res.data.refundStatus == "1";
      claimDisable.value = res.data.claimStatus == "1";
    }
  })
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal && newVal != '') {
      getIdoInfo(newVal);
    } else {
      idoInfo.value = undefined;
    }
  }, { deep: true, immediate: true }
);


</script>

<style scoped lang="less">
.bg-container {
  background-image: url('../../assets/images/bg-total.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  min-height: 90vh;
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

.cancel-btn {
  font-family: Montserrat, Montserrat;
  font-weight: 400;
  width: 178px;
  height: 37px;
  border: 1px solid #FDE8FF;
  background-color: #FDE8FF;
  margin-right: 20px;
  border-radius: 5px;
  text-align: center;
  color: #252525;
  font-size: 14px;
  cursor: pointer;
  line-height: 37px;

  &:hover {
    opacity: 0.65;
  }
}
</style>