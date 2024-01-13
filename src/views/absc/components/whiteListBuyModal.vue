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
          <div class="text-[#000000]">Balance: 12.12</div>
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
        <div class="text-[#000000]">You $ABSC balance: 1000000</div>
      </div>
    </div>

    <div class="text-[12px] bg-[#F7F7F7] rounded-[8px] px-[30px] py-[20px] mt-[20px]">
      <div class="text-[#343434]">1ABSC=0.0001BNB</div>
      <div>
        <div class="text-[#FF3653]">Discount: 0.7<br />
          Minimum amount: 100 USDT<br />
          Maximum amount: 1000 USDT<br />
          Remaining amount: 400 USDT</div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-[40px]">
      <div class="cancel-btn">Cancel</div>
      <a-button class="w-[178px] h-[37px]">Buy</a-button>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs } from "vue";
const buyValue = ref(0)

const props = defineProps({
  openWhiteListBuyModal: {
    type: Boolean,
    default: false,
  }
})

const { openWhiteListBuyModal } = toRefs(props)
const emit = defineEmits(['closeWhiteListBuyModal'])
const closeModal = () => {
  emit('closeWhiteListBuyModal', false)
}
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