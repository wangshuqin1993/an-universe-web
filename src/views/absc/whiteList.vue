
<template>
  <div class="w-full h-full bg-black pb-[75px]">
    <abscHeader></abscHeader>

    <div class="max-w-[1440px] mx-auto md:px-[0px] px-[32px]">
      <div class="title-text md:pt-[166px] pt-[100px]">$ABSC Token IDO Whit</div>
      <div class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-center mt-[37px]">
        The $ABSC token IDO will be launched soon, and users with whitelist spots can enjoy corresponding price discounts. 
        Users holding $BSC Genesis NFT can exchange for whitelist spots by burning ABSC inscriptions. 
        Each exchange requires burning 500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
      </div>
    </div>

    <div>
      <div class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center mt-[49px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-[47px] border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold text-[24px] text-[#fff]">2024.1.16 10:00 am — 1.17 8:00 am(UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] text-[18px]">Exchange time</span>
      </div>
      <div class="min-btn" @click="handleExchangeModal">Exchange Now</div>
      <div class="text-[14px] font-[Montserrat, Montserrat] font-medium text-[#fff] text-center mt-[19px] mb-[9px]">balance：<span class="text-[#F41FFF]">1200000</span> ABSC</div>
      <div class="w-[90%] md:w-full text-[14px] font-[Montserrat, Montserrat] font-medium text-[#fff] text-center mx-auto">You have obtained the <span class="text-[#F41FFF]">UR</span> whitelist, corresponding to your NFT with Token ID <span class="text-[#F41FFF]">1268</span></div>
    </div>

    <div class="whitelist-absc-container w-[90%] md:max-w-[931px] py-[50px] mt-[70px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]">As the mapping token of the leading inscription ABSC based on APT-20 on the BSC chain, 
          the $ABSC token will become the first mapping token of the Bmaker ecosystem and can be exchanged with BSC stablecoins based on the Bmaker ecosystem. 
          $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins, 
          which can be used on any chain supported by the BSC ecosystem. 
          The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
        </span>
      </div>
      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token IDO Whit</span>
        <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]">The $ABSC token IDO will be launched soon, and users with whitelist spots can enjoy corresponding price discounts. 
          Users holding $BSC Genesis NFT can exchange for whitelist spots by burning ABSC inscriptions. 
          Each exchange requires burning 500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
          Exchange time：2024-1-16 10:00 am—— 1-17 8:00 am（UTC+8）
        </span>
      </div>

      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold mb-[19px]">Whitelist information:</span>
        <a-table :columns="columns" :data-source="data" bordered></a-table>
      </div>
    </div>
  </div>

  <a-modal v-model:open="open" title="" :footer="null">
    <div class="text-[18px] text-[#000] font-semibold mb-[20px] mt-[50px] font-bold">Please enter BSC address</div>
    <a-input class="h-[54px] bg-[#F3F3F3]" v-model:value="bscAddress" placeholder="Please enter BSC address"/>
    <div class="text-[#737373] text-[12px] mt-[14px]">
      <ExclamationCircleTwoTone style="fontSize: 14px" />
      <span class="align-middle ml-[4px]">Note: The BSC chain address is used to detect whether it is qualified for the redemption whitelist</span>
    </div>
    <div class="text-center mt-[40px]">
      <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" @click="handleExchangeNow">Exchange Now</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import abscHeader from "@/components/absc-header.vue";
import { ExclamationCircleTwoTone } from "@ant-design/icons-vue"

const open = ref(false)
const bscAddress = ref("");

const handleExchangeModal = ()=>{
  open.value = true
}

const handleExchangeNow =()=>{
  console.log('handleExchangeNow:',bscAddress.value)
}

const columns = ref([
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center'
  },
  {
    title: 'IDO Quota',
    dataIndex: 'quota',
    key: 'quota',
    align: 'center'
  },
  {
    title: 'IDO Price',
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  }
]);

const data = ref([
  {
    key: '1',
    type: 'UR',
    price: 100,
    quota: 'Discount voucher worth 70% of 300U during $ABSC IDO',
  },
  {
    key: '2',
    type: 'SSR',
    price: 300,
    quota: 'Discount voucher worth 80% of 200U during $ABSC IDO',
  },
  {
    key: '3',
    type: 'SR',
    price: 500,
    quota: 'Discount voucher worth 90% of 100U during $ABSC IDO',
  },
  {
    key: '4',
    type: 'S',
    price: 1000,
    quota: 'Voucher worth 80U during $ABSC IDO',
  },
  {
    key: '5',
    type: 'R',
    price: 2000,
    quota: 'Voucher worth 50U during $ABSC IDO',
  },
  {
    key: '6',
    type: 'N',
    price: 3877,
    quota: 'Voucher worth 30U during $ABSC IDO',
  },
]);
</script>

<style scoped lang="less">
.title-text {
  font-family: Montserrat Black;
  text-align: center;
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 48px;
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
  background: linear-gradient(152deg, rgba(60,43,157,0.13) 0%, rgba(115,10,131,0.15) 100%);
  border-radius: 16px;
  border-color: transparent;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px round;
}


</style>