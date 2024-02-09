
<template>
  <div class="w-full h-full bg-black pb-[75px] bg-container  md:px-[32px] px-[24px]">
    <div class="max-w-[1440px] mx-auto md:px-[0px] ">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">
          $ABSC Token IDO After Market Support</span></div>
      <div
        class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-justify md:mt-[37px] mt-[10px] text-[14px] md:text-[16px]">
        Due to the lack of liquidity, the team has decided to postpone the third round of our IDO to around the end of
        Feb. Team highly appreciates the community members who chooses to stay with us until the reopening as Bmaker's OG,
        and will prepare a number of gifts to our OGs. Also, community members who have already purchased into the current
        and previous rounds IDO could freely process a refund within the specified timeframe.
        <br />
        <br />
        To community members stay with us and becomeOGs of Bmaker could enjoy several benefits:
        <br />
        <br />
        1.OGs could get the same amount of Bmaker test token as $tABSC immediately after you
        click the
        "Claim"
        button
        as a
        unique token as well as a voucher.
        <br />
        2.OGs could also get $ABSC immediately after the completion of third round IDO without burning any $tABSC.
        <br />
        3.OGs could get 10% more $ABSC above the original base in the same time of getting $ABSC.
        <br />
        4.More gift packs will be issued during the gap of the third round IDO opening(eg. but no limited to: ogNFTs we
        prepared especially for Bmakers' OG).
        <br />
        5.Test token also will enjoy some liquidity/swap before and after the issuement of $ABSC.
        <br />
        6.Which means you could have two tokens finally.

        <br />
        7.More empowerment of $tABSC will continuously open & listen to the community.
        <br />
        <br />
        More details please check the relevant descriptions on the page of information and entitlements regarding $tABSC.
        <br />
        <br />
        We understand this delay may cause inconvenience, but issue enough addresses and participate around the end of
        Feb. is our top priority. We highly appreciate your continued trust and support in our vision as we work to create
        the best experience possible in the long run.
      </div>
    </div>
    <div>
      <div
        class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center md:mt-[49px] mt-[30px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold md:text-[20px] text-[16px] text-[#fff]">02-07-2024 7:00 PM —
          02-19-2024 7:00 PM (UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] md:text-[18px] text-[14px]">Refund Opening Times</span>
      </div>
      <div v-if="isMobile" class="mt-[70px] text-center">
        <div>
          <a-button :disabled="refundDisable" @click="refundBtnClick" ghost style="color: white;"
            class="md:h-[60px] h-[40px] w-[250px] rounded-[25px] mb-[20px] text-[14px]">
            Refund
          </a-button>
        </div>
        <div>
          <a-button :disabled="claimDisable" @click="claimBtnClick"
            class="md:h-[60px] h-[40px] w-[250px] rounded-[25px] mb-[20px] text-[14px]">
            Claim $tABSC <p class="text-[10px]">+10% $ABSC & ogNFT</p>
          </a-button>
        </div>
      </div>
      <div v-else class="md:mb-[10px] mt-[70px] text-center">
        <a-button :disabled="refundDisable" @click="refundBtnClick" ghost style="color: white;"
          class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] md:text-[18px] text-[14px] mr-[20px]">
          Refund
        </a-button>
        <a-button :disabled="claimDisable" @click="claimBtnClick"
          class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] md:text-[18px] text-[14px]">
          Claim $tABSC <span class="text-[10px]">+10% $ABSC & ogNFT</span>
        </a-button>
      </div>
      <ul
        class="text-[#88898A] text-[10px] md:text-[14px] mt-[10px] refund-text w-full md:max-w-[908px] mx-auto text-center">
        <li v-if="walletAddress.walletAddress">
          <div v-html="idoInfoCheckInfo"></div>
        </li>
      </ul>
      <div class="text-center text-[#fff] mt-[12px]">
        Claim $tABSC - Expand your opportunities. Considering this option to share in the project's future success and
        become OGs of Bmaker will be highly appreciated.
      </div>
    </div>
    <div class="claim-container md:max-w-[931px] md:py-[50px] px-[10px] py-[30px] md:mt-[70px] mt-[60px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">
          Currently, $tABSC is a test token. After the re kick-off and fulfillment of the third round $ABSC IDO around the
          end of Feb, the $ABSC tokens will be airdropped to your wallet while you can still holding $tABSC as your OG
          badge. Community members who choose to claim their $tABSC tokens will receive a limited edition ogNFT as an
          appreciation for their early support. $tABSC holders, will be eligible for an additional 10% allocation bonus of
          $ABSC tokens on their original bases. Holding ogNFTs represents greater potential opportunities to come in the
          future.
        </span>
      </div>
      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">Refund Process Notice</span>
        <span
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">
          1.Please complete the refund process within the designated time frame;
          <br />
          2.Refunds applied for will be processed after you click the "refund" button within 72 hours considering any
          condition. Please be patient for the refund to be completed;
          <br />
          3.Refunding deadline will be Feb 19th 2024, after which community members will only be able to perform the
          $tABSC token claim instead of a refund, since the team is preparing the reopening of the third round IDO at that
          time. BE SURE to note the refund deadline;
          <br />
          4.The third round IDO will be kicked off as soon as possible. Team will try their best to reach the hard cap
          after reopening;
          <br />
          5.We are always here to assist with any questions or concerns regarding your refund.
        </span>
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
          idoInfo.erc20Amount + 'ABSC and you can receive ' +
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
const isMobile = ref(false);

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
    idoInfoCheckInfo.value = 'Your $ABSC balance:<span class="!text-[#E527FF]" > ' + info.erc20Amount + 'ABSC</span>'
  } else {
    idoInfoCheck.value = false;
    if (!info) {
      idoInfoCheckInfo.value = 'You do not have an IDO amount.';
    } else if (info.isRefund == 2) {
      idoInfoCheckInfo.value = 'Your account is currently being refunded, please be patient and wait.';
    } else if (info.isRefund == 3) {
      idoInfoCheckInfo.value = 'Your account has been refunded,with a refund amount of <span class="!text-[#E527FF]" > ' + info.amount + 'BNB</span>, transaction hash is <a class="!text-[#47a1ff]" target="_blank" href="' + scanUrl + info.refundHash + '">' + info.refundHash + '</a>, please check your wallet balance.';
    } else if (info.isClaim == 2) {
      idoInfoCheckInfo.value = 'Your account has been claimed,your $tABSC balance:<span class="!text-[#E527FF]" > ' + info.erc20Amount + 'tABSC</span>,transaction hash is <a class="!text-[#47a1ff]" target="_blank" href="' + scanUrl + info.claimHash + '">' + info.claimHash + '</a>, please check your wallet balance.';
    } else {
      idoInfoCheckInfo.value = undefined;
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

const getIsMobils = async () => {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  isMobile.value = isIOS || isAndroid;
}
onMounted(async () => {
  getIsMobils()
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

.claim-container {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border-color: transparent;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px round;
}

.container {
  display: inline;
}
</style>