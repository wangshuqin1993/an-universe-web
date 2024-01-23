<template>
  <a-modal v-model:open="openWhiteListBuyModal" title="" :footer="null" @cancel="closeModal">
    <div class="relative">
      <div class="mt-[50px] buy-input-item">
        <!-- maxValue -->
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">Your pay ({{
          `Max: ${whitelistSubscribeConfigData?.maxAllocation - whitelistSubscribeAmountData?.amount} ` }})</div>
        <a-input v-model:value="buyValue" placeholder="Basic usage" @change="changePay">
          <template #suffix>
            <div>BNB</div>
            <a-button @click="getMaxValue()">Max</a-button>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <!-- <div class="text-[#6A6A6A ]">$300.12</div> -->
          <div></div>
          <div class="text-[#000000]">Balance: {{ balanceValue }}</div>
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
          <div class="text-[#000000]">You $ABSC balance: {{ whitelistSubscribeAmountData?.abscAmount }}</div>
        </div>

      </div>
    </div>

    <div class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">1ABSC=0.0001BNB</div>
      <div>
        <div class="text-[#FF3653]">
          <div v-if="whitelistDiscountData != '1'">Discount: {{ whitelistDiscountData }}</div>
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
import { ref, toRefs, onMounted, watch } from "vue";
import { message } from "ant-design-vue";
import { apiWhitelistVerify, apiWhitelistSubscribeConfig, apiWhitelistSubscribeAmount, apiNFTEquityAmount, apiWhitelistDiscount, apiNFTEquityDiscount, apiWhitelistSubscribe, apiNFTEquitySubscribe } from "@/apis/absc";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { chainApi } from "@/apis/chainApi"
const walletAddress = useWalletAddress();
const buyValue = ref(0)
const whitelistSubscribeConfigData = ref({});
const whitelistSubscribeAmountData = ref({});
const whitelistSubscribeResult = ref(false);
const NFTEquitySubscribeResult = ref(false);
const whitelistDiscountData = ref(1)
const loading = ref(false)
const transitionPay = ref(0);
const balanceValue = ref(0);
const maxValue = ref(0)

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
  return data
}

const { openWhiteListBuyModal, pageName } = toRefs(props)
const emit = defineEmits(['closeWhiteListBuyModal', 'getWhitelistSubscribeResult'])
const closeModal = () => {
  emit('closeWhiteListBuyModal')
}

const getMaxValue = () => {
  buyValue.value = whitelistSubscribeConfigData.value?.maxAllocation - whitelistSubscribeAmountData.value?.amount
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
    whitelistDiscountData.value = data
  } catch (err) {
    message.error(err.message)
  }
}

// nft(ido)折扣
const getApiNFTEquityDiscount = async () => {
  try {
    const { data } = await apiNFTEquityDiscount(walletAddress.walletAddress)
    whitelistDiscountData.value = data
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
      closeModal()
    } else {
      whitelistSubscribeResult.value = false;
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
      closeModal()
    } else {
      whitelistSubscribeResult.value = false;
      emit('getWhitelistSubscribeResult', false)
    }
  } catch (err) {
    message.error(err.message)
  }
}

// 买
const buyWhitelistSubscribe = async () => {
  const isWhitelistVerify = await getApiWhitelistVerify()
  if (!isWhitelistVerify.joined) return message.error('The address is not whitelisted');
  loading.value = true;
  const walletChainApi = await getChainApidata()
  const Max = whitelistSubscribeConfigData.value?.maxAllocation - whitelistSubscribeAmountData.value?.amount
  if (buyValue.value > Max) return message.error('Exceed the maximum purchase value')
  try {
    const data = await walletChainApi.transfer('0x5C8D243B165215871D0E199A362CfD33E5E69230', buyValue.value.toString())
    // const data = await walletChainApi.transfer(walletAddress.walletAddress, buyValue.value)
    console.log(data, '交易成功')
    if (data) {
      pageName.value == 'Whitelist' ? getApiWhitelistSubscribe(data.hash) : getApiNFTEquitySubscribe(data.hash)
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
    message.error(err)
  }
}

const changePay = () => {
  transitionPay.value = buyValue.value * 10000 / Number(whitelistDiscountData.value)
}

const getBalanceValue = async () => {
  const walletChainApi = await getChainApidata()
  balanceValue.value = await walletChainApi.getBalance(walletAddress.walletAddress)
  console.log(balanceValue.value, 'balanceValue');
}

const getChainApidata = async () => {
  if (window.okxwallet?.selectedAddress) {
    const chainApidata = new chainApi(window.okxwallet)
    return chainApidata
  } else {
    const chainApidata = new chainApi(window.ethereum)
    return chainApidata
  }
}

onMounted(async () => {
  if (walletAddress.walletAddress) {
    getBalanceValue()
    pageName.value == 'Whitelist' ? getApiWhitelistSubscribeAmount() : getApiNFTEquityAmount()
    pageName.value == 'Whitelist' ? getApiWhitelistDiscount() : getApiNFTEquityDiscount()
  }
  getApiWhitelistSubscribeConfig();
})


watch(
  () => props.openWhiteListBuyModal,
  (newVal, _oldVal) => {
    console.log(newVal, 'new')
    if (newVal) {
      getBalanceValue()
      getApiWhitelistSubscribeConfig();
      pageName.value == 'Whitelist' ? getApiWhitelistSubscribeAmount() : getApiNFTEquityAmount()
      // getApiWhitelistSubscribeAmount()
    }
  }, { deep: true }
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
}
</style>