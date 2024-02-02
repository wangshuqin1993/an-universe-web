<template>
  <a-modal v-model:open="openWhiteListBuyModal" title="" :footer="null" @cancel="closeModal">
    <div class="relative">
      <div class="mt-[50px] buy-input-item">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">Your pay ({{
          `Max: ${maxValue} ` }})</div>
        <a-input v-model:value="buyValue" placeholder="Please enter" @change="changePay"
          onkeyup="value=value.replace(/[^\d.]/g,'')">
          <template #suffix>
            <div>BNB</div>
            <a-button @click="getMaxValue()">Max</a-button>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <div></div>
          <div class="text-[#000000]">Balance: {{ balanceValue }}</div>
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
          <div class="text-[#000000]">You $ABSC balance: {{ whitelistSubscribeAmountData?.abscAmount }}</div>
        </div>

      </div>
    </div>

    <div class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <!-- {{ whitelistSubscribeConfigData?.tokenBnbRate }} -->
      <div class="text-[#000000]">1ABSC={{ 1 / whitelistSubscribeConfigData?.tokenBnbRate *
        beforeWhitelistSubscribeConfigData }}BNB
      </div>
      <div class="mb-[10px] text-[#818181]">{{ `(Original price: 1ABSC= ${1 / whitelistSubscribeConfigData?.tokenBnbRate}
        BNB)` }}</div>
      <div>
        <div class="text-[#6A6A6A]">
          <div v-if="whitelistDiscountData != '1'">Discount: {{ whitelistDiscountData + '% off' }}</div>
          <div v-if="whitelistDiscountData == '1' && pageName != 'Whitelist'">Discount: {{ `-${minusValue}U (airdrop) ` }}
          </div>
          Minimum amount: {{ whitelistSubscribeConfigData?.minAllocation }} BNB<br />
          Maximum amount: {{ whitelistSubscribeConfigData?.maxAllocation }} BNB<br />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="closeModal">Cancel</div>
      <a-button class="w-[178px] h-[37px]" @click="buyWhitelistSubscribe" :loading="loading">Buy</a-button>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs, onMounted, watch, computed, Ref } from "vue";
import { message } from "ant-design-vue";
import { apiWhitelistVerify, apiWhitelistSubscribeConfig, apiWhitelistSubscribeAmount, apiNFTEquityAmount, apiWhitelistDiscount, apiNFTEquityDiscount, apiWhitelistSubscribe, apiNFTEquitySubscribe, apiWhitelistAddress } from "@/apis/absc";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { chainApi } from "@/apis/chainApi";
import Big from 'big.js';
const walletAddress = useWalletAddress();
const buyValue = ref(0)
const whitelistSubscribeConfigData = ref({});
const whitelistSubscribeAmountData = ref({});
const whitelistSubscribeResult = ref(false);
const NFTEquitySubscribeResult = ref(false);
const whitelistDiscountData = ref(1)
const beforeWhitelistSubscribeConfigData = ref(1);
const loading = ref(false)
const transitionPay = ref(0);
const balanceValue = ref(0);
const checkResult = ref(true)
const messageInfo = ref('')
const bayMaxvalue: Ref<Big> = ref()
const minusValue = ref(0)

const props = defineProps({
  openWhiteListBuyModal: {
    type: Boolean,
    default: false,
  },
  pageName: {
    type: String,
    default: '',
  }
})

// 验证是否有白名单
const getApiWhitelistVerify = async () => {
  const { data } = await apiWhitelistVerify(walletAddress.walletAddress)
  checkResult.value = data.joined
  messageInfo.value = 'The address is not whitelist'
}

const { openWhiteListBuyModal, pageName } = toRefs(props)
const emit = defineEmits(['closeWhiteListBuyModal', 'getWhitelistSubscribeResult'])
const closeModal = () => {
  emit('closeWhiteListBuyModal')
}

const getMaxValue = () => {
  let val = new Big(whitelistSubscribeConfigData.value?.maxAllocation).minus(Number(whitelistSubscribeAmountData.value?.amount)).toString()
  buyValue.value = Number(val)
  changePay()
}

const getApiWhitelistSubscribeConfig = async () => {
  const { data } = await apiWhitelistSubscribeConfig()
  whitelistSubscribeConfigData.value = data;
}

const getApiWhitelistSubscribeAmount = async () => {
  try {
    const { data } = await apiWhitelistSubscribeAmount(walletAddress.walletAddress)
    whitelistSubscribeAmountData.value = data
  } catch (err) {
    message.error(err.message)
  }
}


const getApiNFTEquityAmount = async () => {
  try {
    const { data } = await apiNFTEquityAmount(walletAddress.walletAddress)
    whitelistSubscribeAmountData.value = data
    // NFTEquityAmountData.value = data
  } catch (err) {
    message.error(err.message)
  }
}


// 获得白名单折扣
const getApiWhitelistDiscount = async () => {
  try {
    const { data } = await apiWhitelistDiscount(walletAddress.walletAddress)
    beforeWhitelistSubscribeConfigData.value = data
    if (data == '1') {
      whitelistDiscountData.value = data
      beforeWhitelistSubscribeConfigData.value = data
    } else {
      let bigNum = new Big(1)
      let num = Number(data)
      // bigNum.minus(num).times(100)
      let val = bigNum.minus(num).times(100).toString()
      whitelistDiscountData.value = Number(val)
    }
  } catch (err) {
    message.error(err.message)
  }
}

// nft(ido) 折扣
const getApiNFTEquityDiscount = async () => {
  try {
    const { data } = await apiNFTEquityDiscount(walletAddress.walletAddress)
    beforeWhitelistSubscribeConfigData.value = data.discount
    minusValue.value = Number(data.amount)
    if (data.discount == '1') {
      whitelistDiscountData.value = data.discount
      beforeWhitelistSubscribeConfigData.value = data.discount
    } else {
      let bigNum = new Big(1)
      let num = Number(data.discount)
      let val = bigNum.minus(num).times(100).toString()
      whitelistDiscountData.value = Number(val)
    }
  } catch (err) {
    message.error(err.message)
  }
}

const getApiWhitelistSubscribe = async (hash: string) => {
  try {
    const res = await apiWhitelistSubscribe(hash, walletAddress.walletAddress)
    if (res.code == 200) {
      whitelistSubscribeResult.value = true;
      emit('getWhitelistSubscribeResult', true)
      buyValue.value = 0
      transitionPay.value = 0
      loading.value = false
      closeModal()
    } else {
      whitelistSubscribeResult.value = false;
      loading.value = false
      emit('getWhitelistSubscribeResult', false)
    }
  } catch (err) {
    message.error(err.message)
  }
}

const getApiNFTEquitySubscribe = async (hash: string) => {
  try {
    const res = await apiNFTEquitySubscribe(walletAddress.walletAddress, hash)
    if (res.code == 200) {
      NFTEquitySubscribeResult.value = true
      emit('getWhitelistSubscribeResult', true)
      buyValue.value = 0
      transitionPay.value = 0
      loading.value = false
      closeModal()
    } else {
      whitelistSubscribeResult.value = false;
      loading.value = false
      emit('getWhitelistSubscribeResult', false)
    }
  } catch (err) {
    message.error(err.message)
  }
}

const getApiWhitelistAddress = async () => {
  const { data } = await apiWhitelistAddress()
  return data
}

const maxValue = computed(() => {
  let val = new Big(whitelistSubscribeConfigData.value?.maxAllocation).minus(Number(whitelistSubscribeAmountData.value?.amount)).toString()
  return Number(val)
})

// verify
const verifyBuyValue = () => {
  let bayMax = new Big(whitelistSubscribeConfigData.value?.maxAllocation).minus(Number(whitelistSubscribeAmountData.value?.amount)).toString()
  bayMaxvalue.value = Number(bayMax)
  //if (buyValue.value < whitelistSubscribeConfigData.value?.minAllocation || bayMaxvalue.value.lt(buyValue.value)) {
  if (buyValue.value < whitelistSubscribeConfigData.value?.minAllocation || buyValue.value > bayMaxvalue.value) {
    // false
    return false
  } else {
    return true
  }
}

// 买
const buyWhitelistSubscribe = async () => {
  const isBuy = await verifyBuyValue()
  if (isBuy) {
    if (buyValue.value > balanceValue.value) return message.error('Insufficient Balance')
    if (!checkResult.value) return message.error(messageInfo.value);
    loading.value = true;
    const walletChainApi = await getChainApidata()
    // const Max = whitelistSubscribeConfigData.value?.maxAllocation - whitelistSubscribeAmountData.value?.amount
    const whitelistAddressValue = await getApiWhitelistAddress()
    // if (buyValue.value > Max) return message.error('Exceed the maximum purchase value')
    try {
      const data = await walletChainApi.transfer(whitelistAddressValue, buyValue.value.toString())
      // console.log(data, '交易成功')
      if (data) {
        pageName.value == 'Whitelist' ? await getApiWhitelistSubscribe(data.hash) : await getApiNFTEquitySubscribe(data.hash)
      }
      loading.value = false;
      message.success('Successfully')
    } catch (err) {
      console.log("error: ", err.code)
      if (err.code == 'ACTION_REJECTED') {
        message.error("User Rejected")
      } else {
        message.error(err.message)
      }
      loading.value = false;
    }
  } else {
    return message.error('Out of the purchase value range')
  }
}

const changePay = () => {
  let data = buyValue.value || 0
  let val = new Big(data).times(whitelistSubscribeConfigData.value?.tokenBnbRate).div(Number(beforeWhitelistSubscribeConfigData.value)).round(18).toString()
  transitionPay.value = Number(val)
}

const getBalanceValue = async () => {
  const walletChainApi = await getChainApidata()
  balanceValue.value = await walletChainApi.getBalance(walletAddress.walletAddress)
  console.log(balanceValue.value, 'balanceValue');
}

const getChainApidata = async () => {
  let walletName = localStorage.getItem('walletName') || ''
  if (walletName == 'OKX') {
    const chainApidata = new chainApi(window.okxwallet)
    return chainApidata
  } else if (walletName == 'MetaMask') {
    const chainApidata = new chainApi(window.ethereum)
    return chainApidata
  } else {
    return undefined
  }

}

onMounted(async () => {
  // console.log(walletAddress.walletAddress, 'walletAddress.walletAddress');

  if (walletAddress.walletAddress) {
    if (pageName.value == 'Whitelist') {
      getApiWhitelistSubscribeAmount()
      //getApiWhitelistDiscount()
      getApiWhitelistVerify()
    } else {
      //getApiNFTEquityDiscount()
      getApiNFTEquityAmount()
      // getApiNFTEquityCheck()
    }
    // pageName.value == 'Whitelist' ? getApiWhitelistSubscribeAmount() : getApiNFTEquityAmount()
    // pageName.value == 'Whitelist' ? getApiWhitelistDiscount() : getApiNFTEquityDiscount()
    getBalanceValue()
  }

  getApiWhitelistSubscribeConfig();
})


watch(
  () => props.openWhiteListBuyModal,
  (newVal, _oldVal) => {
    if (newVal) {
      getBalanceValue()
      pageName.value == 'Whitelist' ? getApiWhitelistSubscribeAmount() : getApiNFTEquityAmount()
      pageName.value == 'Whitelist' ? getApiWhitelistDiscount() : getApiNFTEquityDiscount()
    }
  }, { deep: true, immediate: true }
);
</script>
<style lang='less' scoped>
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
  color: rgba(0, 0, 0, .88);
  font-size: 16px;
}
</style>