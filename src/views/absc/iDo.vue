
import { Item } from 'ant-design-vue/es/menu';

import { Item } from 'ant-design-vue/es/menu';
<template>
  <div class="w-full h-full bg-black">

    <abscHeader></abscHeader>

    <div>
      <div class="flex justify-center pt-[166px]">
        <img src="@/assets/images/absc-tokens.png" class="h-[50px] self-center"/>
        <span class="title-text text-[30px] md:text-[48px] ml-3">$ABSC Token IDO</span>
      </div>
      <div class="text-[#7C7C7C] w-[770px] mx-auto text-center mt-[37px]">
        As the mapping token of the leading inscription ABSC based on APT-20 on the BSC chain, 
        the $ABSC token will become the first mapping token of the Bmaker ecosystem and can be exchanged with BSC stablecoins based on the Bmaker ecosystem. 
        $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins, 
        which can be used on any chain supported by the BSC ecosystem. 
        The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-[90%] mx-auto mt-[60px]">
      <div v-for="(item,index) in fakeInfo" :key="index">
        <div v-if="item.time" class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] text-[24px]">{{ item.time }}</span>
          <span class="font-[Arial] text-[#8D8D8D] text-[18px] mt-[12px]">{{ item.desc }}</span>
        </div>

        <div v-else class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] text-[24px]">{{ item.amount }}</span>
          <span class="font-[Arial] text-[#8D8D8D] text-[18px] mt-[12px]">{{ item.desc }}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";

const fakeInfo = ref([
  {
    time: '18:00',
    desc: 'Launch at'
  },
  {
    amount: '1',
    desc: '$ABSC Price'
  },
  {
    amount: '$500,000',
    desc: 'Target IDO amount'
  },
  {
    amount: '$100,000',
    desc: 'Current amount'
  }
])
</script>

<style lang='less' scoped>
.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 900;
}
</style>