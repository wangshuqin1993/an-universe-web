<template>
  <a-modal v-model:open="openWhiteListBuyModal" title="" :footer="null" @cancel="closeModal">
    <div class="relative">
      <div class="mt-[50px] buy-input-item">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">Your pay</div>
        <a-input v-model:value="buyValue" placeholder="Basic usage">
          <template #suffix>
            <div>BNB</div>
          </template>
        </a-input>
        <div class="flex justify-between mt-[5px]">
          <div class="text-[#6A6A6A ]">$300.12</div>
          <div class="text-[#000000]">Balance: {{ whitelistSubscribeAmountData.amount }}</div>
        </div>
      </div>
      <img src="@/assets/images/swap.png" class="swap-posi" />

      <div class="buy-input-item mt-[10px]">
        <div class="text-[#6A6A6A] text-[14px] mb-[15px]">You Receive</div>
        <a-input v-model:value="buyValue" placeholder="Basic usage">
          <template #suffix>
            <div>ABSC</div>
          </template>
        </a-input>
        <div class="text-[#000000]">You $ABSC balance: {{ whitelistSubscribeAmountData.abscAmount }}</div>
      </div>
    </div>

    <div class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">1ABSC=0.0001BNB</div>
      <div>
        <div class="text-[#FF3653]">Discount: {{ whitelistSubscribeConfigData.tokenEthRate }}<br />
          Minimum amount: {{ whitelistSubscribeConfigData.minAllocation }} USDT<br />
          Maximum amount: {{ whitelistSubscribeConfigData.maxAllocation }} USDT<br />
          <!-- Remaining amount: {{ }} USDT</div> -->
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn" @click="closeModal">Cancel</div>
      <a-button class="w-[178px] h-[37px]" @click="buyWhitelistSubscribe">Buy</a-button>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs, onMounted } from "vue";
import { message } from "ant-design-vue";
import { apiWhitelistSubscribeConfig, apiWhitelistSubscribeAmount, apiWhitelistDiscount, apiWhitelistSubscribe } from "@/apis/absc";
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress();
const buyValue = ref(0)
const whitelistSubscribeConfigData = ref({});
const whitelistSubscribeAmountData = ref({});
const whitelistSubscribeResult = ref(false);
const props = defineProps({
  openWhiteListBuyModal: {
    type: Boolean,
    default: false,
  }
})

const { openWhiteListBuyModal } = toRefs(props)
const emit = defineEmits(['closeWhiteListBuyModal', 'getWhitelistSubscribeResult'])
const closeModal = () => {
  emit('closeWhiteListBuyModal')
}

const getApiWhitelistSubscribeConfig = async () => {
  const { data } = await apiWhitelistSubscribeConfig()
  whitelistSubscribeConfigData.value = data;
}

const getApiWhitelistSubscribeAmount = async () => {
  const { data } = await apiWhitelistSubscribeAmount(walletAddress.walletAddress)
  whitelistSubscribeAmountData.value = data
}

const getApiWhitelistSubscribe = async (hash: string) => {
  const { data } = await apiWhitelistSubscribe(hash, walletAddress.walletAddress)
  whitelistSubscribeResult.value = data.result;
  emit('getWhitelistSubscribeResult', data.result)
  closeModal()
}

const buyWhitelistSubscribe = async () => {
  if (buyValue > whitelistSubscribeAmountData.value.amount) return message.error('超出购买最大值')
  try {
    const accounts = await okxwallet.request({ method: 'eth_requestAccounts' });
    okxwallet.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xc2895146e7e35ca7210fedefb75af56a67eeb4084017f5d3bd45882780e93277',
          value: '0x29a2241af62c0000',
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
      .then((txHash) => {
        console.log(txHash)
        if (txHash) {
          getApiWhitelistSubscribe(txHash)
        }
      })
      .catch((error) => console.error);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await getApiWhitelistSubscribeConfig()
  getApiWhitelistSubscribeAmount();
})
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