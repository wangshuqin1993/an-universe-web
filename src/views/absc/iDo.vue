
<template>
  <!-- <abscHeader></abscHeader> -->
  <div class="w-full h-full bg-black md:pb-[64px] pb-[32px] bg-container">
    <div class="max-w-[1440px] mx-auto px-[24px] md:px-[120px]">
      <div>
        <div class="flex justify-center items-center md:pt-[166px] pt-[100px]">
          <img src="@/assets/images/absc-tokens.png" class="md:h-[50px] h-[38px] self-center" />
          <span class="title-text text-[26px] text-[24px] md:text-[48px] ml-3">$ABSC Token IDO</span>
        </div>
      </div>
      <div class="text-center ido-content  md:p-[66px] md:p-[32px] p-[24px] md:mt-[60px] mt-[32px]">
        <idoStep :stageValue="stageValue" :stageData="state.IDOLaunchInfoData" :stepAmount="totalAmountData"
          :bnbPriceData="bnbPriceData" :stages="stageTime"></idoStep>
        <div class="md:mb-[50px] mb-[40px] mt-[70px]">
          <a-button ghost
            class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] text-[14px] mr-[20px]">
            Refund
          </a-button>
          <a-button :disabled="disabled" @click="idoBtnClick" :loading="cliamLoading"
            class="md:h-[60px] h-[40px] md:w-[278px] w-[130px] md:rounded-[30px] rounded-[25px] mb-[20px] text-[14px]">
            {{ btnInfo }}
          </a-button>
          <div v-if="walletAddress.walletAddress" class="text-center text-[14px] text-[#fff]">
            <div> Your $ABSC balance: <span class="text-[#E527FF] mb-[10px]">{{ tokensBalanceData }} ABSC</span></div>
            <div>The $ABSC token will enable claim function after the IDO ends. Please pay attention to the official
              announcement.</div>
          </div>
          <ul
            class="text-[#88898A] text-[10px] md:text-[14px] text-left mt-[10px] refund-text w-full md:max-w-[908px] mx-auto">
            <li>If the IDO complete, The $ABSC token will can claim. Please pay attention to the official announcement.
            </li>
          </ul>
        </div>
        <div class="progress pt-[30px] md:pb-[90px] pb-[70px] md:px-[45px] px-[32px] text-left">
          <div class="text-[#ffffff] md:mb-[28px] mb-[36px] md:text-[18px] text-[12px] font-bold">$ABSC Token IDO overall
            progress</div>
          <Progress :targetAmount="1667" :totalAmountData="totalAmountDataAll" :bnbPriceData="bnbPriceData"
            :size="30"></Progress>
        </div>
      </div>
      <div class="text-center md:mt-[86px] mt-[86px]">
        <div class="text-[#fff] md:text-[36px] text-[24px] font-bold md:mb-[32px] mb-[10px]">$ABSC Token</div>
        <div
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto md:text-[16px] text-[14px] text-center mb-[20px] md:mb-[30px]">
          As the governance token of the leading inscription ABSC based on APT-20 on the BSC chain,
          the $ABSC token will become the first governance token of the Bmaker ecosystem and can be exchanged with BSC
          stablecoins based on the Bmaker ecosystem.
          $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins,
          which can be used on any chain supported by the BSC ecosystem.
          The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
        </div>
        <div class=" w-full rounded-[10px] text-[#fff]">
          <img src="@/assets/images/id-tokens.png" />
        </div>
      </div>
      <div class="service-box md:p-[50px] p-[24px] md:mt-[64px] mt-[32px]">
        <div class="md:text-[21px] text-[18px] text-[#fff] font-bold md:mb-[30px] mb-[10px]">$ABSC IDO Terms of service
        </div>
        <div class="text-[#7C7C7C] text-[14px]">
          1.Declaration<br />
          Welcome to participate in the $ABSC Token IDO activity. Your participation indicates that you have read and will
          comply with the terms of service.<br />
          2.Token<br />
          Our token ABSC will be issued on the BSC public chain, and will be distributed according to the shares obtained
          by you during the IDO after it ends.<br />
          3.Refund<br />
          If the amount raised in the IDO does not reach the target, the full amount raised will be refunded, and the ABSC
          shares already issued will be revoked.<br />
          4.Regulations<br />
          You need to comply with the law and be fully responsible for ensuring that your IDO behavior complies with local
          laws and regulations.<br />
          5.We reserve the right to temporarily or permanently change or suspend part or all of the services without
          notice.<br />
        </div>
      </div>
    </div>
  </div>
  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="openSelectedWhiteListModal = false">
  </selectWalletListModal>

  <a-modal v-model:open="openIDOBuyModal" title="" :footer="null" @cancel="openIDOBuyModal = false">
    <div class="relative">
      <div class="mt-[50px] buy-input-item">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">Your pay</div>
        <a-input v-model:value="buyValue" placeholder="Please enter" @change="changePay">
          <template #suffix>
            <div>BNB</div>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <!-- <div class="text-[#6A6A6A ]">$300.12</div> -->
          <div></div>
          <div class="text-[#000000]">Balance: {{ BNBBalance }} BNB</div>
        </div>
      </div>
      <img src="@/assets/images/swap.png" class="swap-posi" />

      <div class="buy-input-item mt-[10px]">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">You Receive</div>
        <a-input v-model:value="transitionPay" placeholder="Please enter" disabled>
          <template #suffix>
            <div>ABSC</div>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <div></div>
          <div class="text-[#000000]">You $ABSC balance:{{ tokensBalanceData }}</div>
        </div>

      </div>
    </div>

    <div class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">{{ '1ABSC=' + tokenRate + 'BNB' }}</div>
    </div>
    <div class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="openIDOBuyModal = false">Cancel</div>
      <a-button class="w-[178px] h-[37px]" @click="buyIDOSubscribe" :loading="loading">Buy</a-button>
    </div>
  </a-modal>
  <abscFooter></abscFooter>
</template>

<script lang='ts' setup>
import { ref, onMounted, watch, reactive, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-Footer.vue";
import { message } from "ant-design-vue";
import Progress from "@/components/progress.vue";
import idoStep from "./components/idoStep.vue";
import { IDOApi } from "@/apis/idoApi"
import { chainApi } from "@/apis/chainApi"
import { apiIDOLaunchTime, apiIDOLaunchAmount, getBnbPrice, apiIDOInvite } from "@/apis/absc"
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import Big from 'big.js';
const { params } = useRoute();
const walletAddress = useWalletAddress()
const state = reactive({
  IDOLaunchInfoData: {}
})
const disabled = ref(true)
const loading = ref(false)
const openIDOBuyModal = ref(false);
const btnInfo = ref('Coming Soon')
const openSelectedWhiteListModal = ref(false);
const tokenEthRateData = ref(0)
const totalAmountData = ref(0);
const tokensBalanceData = ref(0)
const buyValue = ref(0);
const BNBBalance = ref(0)
const stageValue = ref(0)
const totalAmountDataAll = ref(0)
const bnbPriceData = ref(0)
const IDOLaunchAmount = ref('')
const cliamLoading = ref(false);

const transitionPay = ref(0)

const intervalData: any = ref()

const tokenRate = computed(() => {
  return new Big(100).div(tokenEthRateData.value);
})


const idoBtnClick = async () => {
  if (!walletAddress.walletAddress) {
    openSelectedWhiteListModal.value = true;
  } else {
    if (state.IDOLaunchInfoData?.status == '2') {
      // 购买
      openIDOBuyModal.value = true;
      getTokenEthRateData()
      getTotalAmountData()
      getTokensBalanceData()
    } else {
      toClaim()
    }
  }
}


const getApiIDOLaunchAmount = async () => {
  const { data } = await apiIDOLaunchAmount()
  IDOLaunchAmount.value = data.String
  // console.log(data, 'total amount')
}

// 获取转换率
const getTokenEthRateData = async () => {
  const walletApiIDO = await getIDOApiData()
  tokenEthRateData.value = await walletApiIDO.getTokenEthRate(stageValue.value)
  // console.log(tokenEthRateData.value.toNumber(), stageValue.value, 'tokenEthRateData.value ')
}

// 总额 + state.IDOLaunchInfoData.whitelistAmount
const getTotalAmountData = async () => {
  const walletApiIDO = await getIDOApiData()
  const data = await walletApiIDO.getTotalAmount(stageValue.value)
  totalAmountData.value = data
  // totalAmountData.value = data.toNumber() + Number(state.IDOLaunchInfoData.whitelistAmount)
}

const getTotalAmountDataAll = async () => {
  let val = new Big(0)
  const walletApiIDO = await getIDOApiData()
  for (let i = 1; i <= stageValue.value; i++) {
    const data = await walletApiIDO.getTotalAmount(stageValue.value)
    val = val.plus(Number(data))
  }

  // console.log(val, 'val');
  totalAmountDataAll.value = val.plus(Number(IDOLaunchAmount.value))
}

// 获取 step
const getStage = async () => {
  const walletApiIDO = await getIDOApiData()
  const data = await walletApiIDO.stage()
  stageValue.value = data
}

// 获取余额
const getTokensBalanceData = async () => {
  const walletApiIDO = await getIDOApiData()
  for (let i = 1; i <= stageValue.value; i++) {
    const data = await walletApiIDO.getTokensBalance(i, walletAddress.walletAddress)
    tokensBalanceData.value += Number(data)
  }
  // console.log(tokensBalanceData.value, 'tokensBalanceData.value')
}


const getIDOApiData = () => {
  let walletName = localStorage.getItem('walletName') || ''
  if (walletName == 'OKX') {
    const ido = new IDOApi(window.okxwallet, 'test');
    return ido
  } else if (walletName == 'MetaMask') {
    const ido = new IDOApi(window.ethereum, 'test');
    return ido
  } else {
    return new IDOApi(undefined, 'test')
  }
  // if (window.okxwallet?.selectedAddress) {
  //   const ido = new IDOApi(window.okxwallet, 'test');
  //   return ido
  // } else {
  //   const ido = new IDOApi(window.ethereum, 'test');
  //   return ido
  // }
}

const getChainApiData = () => {
  // if (window.okxwallet?.selectedAddress) {
  //   const chain = new chainApi(window.okxwallet)
  //   return chain
  // } else {
  //   const chain = new chainApi(window.ethereum)
  //   return chain
  // }

  let walletName = localStorage.getItem('walletName') || ''
  if (walletName == 'OKX') {
    const chain = new chainApi(window.okxwallet)
    return chain
  } else if (walletName == 'MetaMask') {
    const chain = new chainApi(window.ethereum)
    return chain
  } else {
    return undefined
  }
}

const toClaim = async () => {
  cliamLoading.value = true;
  try {
    const walletApiIDO = await getIDOApiData()
    await walletApiIDO.claim()
    await getTokensBalanceData()
    message.info('Successful')
    cliamLoading.value = false;
  } catch (err) {
    const walletApiChain = await getChainApiData()
    let errorMessage = await walletApiChain.getTransactionErrorInfo(err.transactionHash);
    message.error(errorMessage + 'transaction error: ' + err.transactionHash);
    cliamLoading.value = false
  }
}


const getApiIDOInvite = async (hash: string) => {
  const res = await apiIDOInvite(walletAddress.walletAddress, hash, String(params?.invite_code))
}


// purchase 买
const buyIDOSubscribe = async () => {
  if (buyValue.value <= 0) return message.error('Purchase value error')
  loading.value = true;
  const walletApiIDO = await getIDOApiData()
  try {
    const txh = await walletApiIDO.purchase(String(buyValue.value))
    // console.log(txh, 'txh')
    await getTokensBalanceData()
    openIDOBuyModal.value = false;
    loading.value = false
    buyValue.value = 0;
    transitionPay.value = 0
    message.success('Successfully')
    if (params?.invite_code && Object.prototype.toString.call(params?.invite_code) === "[object String]") {
      getApiIDOInvite(txh.transactionHash)
    }
  } catch (err) {
    const walletApiChain = await getChainApiData()
    let errorMessage = await walletApiChain.getTransactionErrorInfo(err.transactionHash);
    message.error(errorMessage + 'transaction error: ' + err.transactionHash);
    loading.value = false
  }
}

const getBNBBalance = async () => {
  const walletApiChain = await getChainApiData()
  BNBBalance.value = await walletApiChain.getBalance(walletAddress.walletAddress)
  // console.log(BNBBalance.value, 'data')
}

// 获取状态
const getApiIDOLaunchTime = async () => {
  const data = stageTime.value[stageValue.value - 1];
  state.IDOLaunchInfoData = data
  state.IDOLaunchInfoData.startTime = state.IDOLaunchInfoData.startTime
  if (data.status == '1') {
    disabled.value = true
    btnInfo.value = 'Coming Soon'
  } else if (data.status == '2') {
    disabled.value = false
    btnInfo.value = 'Start Now'
  } else if (data.status == '3') {
    disabled.value = true
    btnInfo.value = 'Claim'
  } else {
    disabled.value = false
    btnInfo.value = 'Claim'
  }
}


const changePay = () => {
  transitionPay.value = new Big(buyValue.value).times(tokenEthRateData.value).div(100);
}


const getBnbPriceData = async () => {
  const { data } = await getBnbPrice()
  // console.log(data);
  bnbPriceData.value = Number(data.price)
}

let stageTime = ref([]);

const getStageTime = async () => {
  const stage1 = await apiIDOLaunchTime(1)
  stageTime.value.push(stage1.data);
  const stage2 = await apiIDOLaunchTime(2)
  stageTime.value.push(stage2.data);
  const stage3 = await apiIDOLaunchTime(3)
  stageTime.value.push(stage3.data);
  // console.log(stageTime);
}

const setTimeGetAmount = () => {
  intervalData.value = setInterval(() => {
    getTotalAmountData()
    getTotalAmountDataAll()
    // console.log('哈哈，我执行了');
  }, 5000)
}

onMounted(async () => {
  // console.log(params, Object.prototype.toString.call(params?.invite_code) === "[object String]", 'params');

  await getStage()
  await getStageTime()
  getApiIDOLaunchTime()
  getApiIDOLaunchAmount()
  getBnbPriceData()
  getTotalAmountData()
  getTotalAmountDataAll()
  if (walletAddress.walletAddress) {
    getBNBBalance()
    getTokenEthRateData()
    getTokensBalanceData()
  }

  setTimeGetAmount()
})

onUnmounted(() => {
  clearInterval(intervalData.value)
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal && newVal != '') {
      // getApiIDOLaunchTime()
      getTotalAmountData()
      getTokenEthRateData()
      getTokensBalanceData()
      getBNBBalance()
      getTotalAmountDataAll()
    }
  }, { deep: true, immediate: false }
);
</script>

<style lang='less' scoped>
.bg-container {
  background-image: url('../../assets/images/bg-total.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 900;
}

.service-box {
  background-color: rgba(108, 108, 108, 0.09);
  border: 1px solid #463947;
  border-radius: 10px;
  text-align: left;
}

.refund-text {
  padding: 20px 30px;
  background: rgba(108, 108, 108, 0.09);
  border-radius: 5px;
}

.ido-content {
  border: 1px solid #442989;
  border-radius: 20px;
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  backdrop-filter: blur(30px);
}

.swap-posi {
  width: 63px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ant-input-affix-wrapper {
  height: 49px;
  font-size: 16px;
}

:deep(.ant-input-affix-wrapper-disabled) {
  background-color: #fff;
  color: rgba(0, 0, 0, .88)
}

:deep(.ant-input-affix-wrapper-disabled .ant-input[disabled]) {
  font-size: 16px;
  color: rgba(0, 0, 0, .88)
}


.progress {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid #442989;
  backdrop-filter: blur(30px);
}

.buy-input-item {
  background-color: #F4EBF5;
  border-radius: 9px;
  padding: 20px;
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

li::before {
  content: '';
  width: 3px;
  height: 3px;
  display: inline-block;
  border-radius: 50%;
  background: #88898A;
  vertical-align: middle;
  margin-right: 5px
}
</style>