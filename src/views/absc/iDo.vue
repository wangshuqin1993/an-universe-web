
<template>
  <abscHeader></abscHeader>
  <div class="w-full h-full bg-black md:pb-[64px] pb-[32px]">
    <div class="max-w-[1440px] mx-auto px-[32px] md:px-[120px]">
      <div>
        <div class="flex justify-center items-center md:pt-[166px] pt-[100px]">
          <img src="@/assets/images/absc-tokens.png" class="md:h-[50px] h-[38px] self-center" />
          <span class="title-text text-[26px] text-[24px] md:text-[48px] ml-3">$ABSC Token IDO</span>
        </div>
        <div class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[37px]">
          As the governance token of the leading inscription ABSC based on APT-20 on the BSC chain,
          the $ABSC token will become the first governance token of the Bmaker ecosystem and can be exchanged with BSC
          stablecoins based on the Bmaker ecosystem.
          $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins,
          which can be used on any chain supported by the BSC ecosystem.
          The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
        </div>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-full mx-auto mt-[60px] md:mb-[120px] mb-[64px]">
        <!-- <div v-for="(item, index) in fakeInfo" :key="index">
          <div v-if="item.time"
            class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
            <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ item.time }}</span>
            <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">{{ item.desc }}</span>
          </div>
          <div v-else
            class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
            <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px">{{ item.amount }}</span>
            <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">{{ item.desc }}</span>
          </div>
        </div> -->
        <div
          class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ IDOLaunchInfoData.start
          }}</span>
          <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Launch at</span>
        </div>
        <div
          class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">1 USDT</span>
          <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">$ABSC Price</span>
        </div>
        <div
          class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
            IDOLaunchInfoData.targetAmount
          }}</span>
          <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Target IDO amount</span>
        </div>
        <div
          class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
            totalAmountData
          }}</span>
          <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Current amount</span>
        </div>
      </div>
      <Progress :targetAmount="IDOLaunchInfoData.targetAmount" :totalAmountData="totalAmountData"></Progress>
      <div class="text-center md:mt-[86px] mt-[86px]">
        <div class="md:mb-[105px] mb-[50px]">
          <a-button :disabled="disabled" @click="idoBtnClick"
            class="md:h-[60px] h-[48px] md:w-[278px] w-[178px] md:rounded-[30px] rounded-[25px] mb-[20px]  text-[18px]">
            {{ btnInfo }}
          </a-button>
          <div v-if="purchaseResult" class="text-center text-[14px] text-[#fff]">
            <div> Your $ABSC balance<span class="text-[#E527FF] mb-[10px]">{{ tokensBalanceData }} ABSC</span></div>
            <div>The $ABSC token will enable claim function after the IDO ends. Please pay attention to the official
              announcement.</div>
          </div>
        </div>

        <div class="text-[#fff] md:text-[36px] text-[24px] font-bold md:mb-[64px] mb-[32px]">$ABSC Token</div>
        <div class=" w-full rounded-[10px] text-[#fff]">
          <img src="@/assets/images/id-tokens.png" />
        </div>
      </div>
      <div class="service-box md:p-[50px] p-[24px] md:mt-[64px] mt-[32px]">
        <div class="md:text-[21px] text-[18px] text-[#fff] font-bold md:mb-[30px] mb-[20px]">$ABSC IDO Terms of service
        </div>
        <div class="text-[#7C7C7C] text-[14px] ">
          1.我是条款我是条款我是条款我是条款我是条款我是条款我是条款我是条款
          2.我是条款我是条款我是条款我是条款我是条款我是条款我是条款我是条款我
          3.我是条款我是条款我是条款我是条款我是条款我是条款我是条款是条款我是条款
          4.我是条款我是条款我是条款我是条款我是条款我是条款我是条款
          5.我是条款我是条款我是条款我是条款我是条款我是条款
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
        <a-input v-model:value="buyValue" placeholder="Basic usage" @change="changePay">
          <template #suffix>
            <div>BNB</div>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <div class="text-[#6A6A6A ]">$300.12</div>
          <div class="text-[#000000]">Balance: {{ BNBBalance }} BNB</div>
        </div>
      </div>
      <img src="@/assets/images/swap.png" class="swap-posi" />

      <div class="buy-input-item mt-[10px]">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">You Receive</div>
        <a-input v-model:value="transitionPay" placeholder="Basic usage">
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
      <div class="text-[#343434]">{{ '1ABSC=' + tokenEthRateData / 100 + 'BNB' }}</div>
    </div>
    <div class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="openIDOBuyModal = false">Cancel</div>
      <a-button class="w-[178px] h-[37px]" @click="buyIDOSubscribe">Buy</a-button>
    </div>
  </a-modal>
</template>

<script lang='ts' setup>
import { ref, onMounted, watch } from "vue";
import abscHeader from "@/components/absc-header.vue";
import { message } from "ant-design-vue";
import Progress from "@/components/progress.vue";
import { IDOApi } from "@/apis/idoApi"
import { chainApi } from "@/apis/chainApi"
import { apiIDOLaunchTime } from "@/apis/absc"
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress()
const IDOLaunchInfoData = ref({});
const disabled = ref(false)
const openIDOBuyModal = ref(false);
const btnInfo = ref('Coming Soon')
const openSelectedWhiteListModal = ref(false);
const tokenEthRateData = ref(0)
const totalAmountData = ref(0);
const tokensBalanceData = ref(0)
const buyValue = ref(0);
const BNBBalance = ref(0)
const ABSCBalance = ref(0)
const purchaseResult = ref(false)

const transitionPay = ref(0)
// const idoApiData: any = ref()
// const chainApiData: any = ref()

const idoBtnClick = async () => {
  if (!walletAddress.walletAddress) {
    openSelectedWhiteListModal.value = true;
  } else {
    if (IDOLaunchInfoData.value.status === '2') {
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

// 获取转换率
const getTokenEthRateData = async () => {
  const walletApiIDO = await getIDOApiData()
  tokenEthRateData.value = await walletApiIDO.getTokenEthRate()
  console.log(tokenEthRateData.value.toNumber(), 'tokenEthRateData.value ')
}

// 总额 + IDOLaunchInfoData.value.whitelistAmount
const getTotalAmountData = async () => {
  const walletApiIDO = await getIDOApiData()
  const data = await walletApiIDO.getTotalAmount()
  totalAmountData.value = data.toNumber() + Number(IDOLaunchInfoData.value.whitelistAmount)
  console.log(totalAmountData.value, data, 'totalAmountData.value')
}

// 获取余额
const getTokensBalanceData = async () => {
  const walletApiIDO = await getIDOApiData()
  const data = await walletApiIDO.getTokensBalance(walletAddress.walletAddress)
  tokensBalanceData.value = (data * tokenEthRateData.value) / 100
  console.log(tokensBalanceData.value, 'tokensBalanceData.value')
}


const getIDOApiData = () => {
  if (window.okxwallet?.selectedAddress) {
    const ido = new IDOApi(window.okxwallet, 'test');
    return ido
  } else {
    const ido = new IDOApi(window.ethereum, 'test');
    return ido
  }
}

const getChainApiData = () => {
  if (window.okxwallet?.selectedAddress) {
    const chain = new chainApi(window.okxwallet)
    return chain
  } else {
    const chain = new chainApi(window.ethereum)
    return chain
  }
}

const toClaim = async () => {
  const walletApiIDO = await getIDOApiData()
  const data = await walletApiIDO.claim()
  if (data) {
    message.info('Successful')
  } else {
    message.error('failed')
  }
}

// purchase 买
const buyIDOSubscribe = async () => {
  const walletApiIDO = await getIDOApiData()
  try {
    const data = await walletApiIDO.purchase(buyValue.value)
    // console.log(data, '购买返回值')
    if (data) {
      openIDOBuyModal.value = false;
      purchaseResult.value = true
      buyValue.value = 0;
      getTokensBalanceData()
      getApiIDOLaunchTime()
    }
  } catch (err) {
    message.error(err.message)
    purchaseResult.value = false
  }

}

const getBNBBalance = async () => {
  const walletApiChain = await getChainApiData()
  BNBBalance.value = await walletApiChain.getBalance(walletAddress.walletAddress)
  console.log(BNBBalance.value, 'data')
}

// 获取状态
const getApiIDOLaunchTime = async () => {
  const { data } = await apiIDOLaunchTime()
  IDOLaunchInfoData.value = data
  if (data.status === '1') {
    disabled.value = true
    btnInfo.value = 'Coming Soon'
  } else if (data.status === '2') {
    disabled.value = false
    btnInfo.value = 'Start Now'
  } else if (data.status === '3') {
    disabled.value = true
    btnInfo.value = 'Claim'
  } else {
    disabled.value = false
    btnInfo.value = 'Claim'
  }
}


const changePay = () => {
  transitionPay.value = (buyValue.value * tokenEthRateData.value) / 100
}


onMounted(() => {
  if (walletAddress.walletAddress) {
    getBNBBalance()
    getTotalAmountData()
    getTokenEthRateData()
    getTokensBalanceData()
  }

  // console.log(window.ethereum, 'window.ethereum')
  getApiIDOLaunchTime()

})


watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    // console.log(newVal, 'new')
    if (newVal != '') {
      getApiIDOLaunchTime()
      getTotalAmountData()
      getTokenEthRateData()
      getTokensBalanceData()
      getBNBBalance()
    }
  }, { deep: true, immediate: true }
);
</script>

<style lang='less' scoped>
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

.swap-posi {
  width: 63px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ant-input-affix-wrapper {
  height: 49px;
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
</style>