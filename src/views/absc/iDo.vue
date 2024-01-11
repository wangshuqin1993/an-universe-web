
<template>
  <div class="w-full h-full bg-black md:pb-[64px] pb-[32px]">
    <abscHeader></abscHeader>
  <div class="max-w-[1440px] mx-auto md:px-[0px] px-[32px]">
    <div>
      <div class="flex justify-center items-center md:pt-[166px] pt-[100px]">
        <img src="@/assets/images/absc-tokens.png" class="md:h-[50px] h-[38px] self-center" />
        <span class="title-text text-[26px] text-[24px] md:text-[48px] ml-3">$ABSC Token IDO</span>
      </div>
      <div class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[37px]">
        As the mapping token of the leading inscription ABSC based on APT-20 on the BSC chain, 
        the $ABSC token will become the first mapping token of the Bmaker ecosystem and can be exchanged with BSC
          stablecoins based on the Bmaker ecosystem. 
        $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins, 
        which can be used on any chain supported by the BSC ecosystem. 
        The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-full mx-auto mt-[60px] md:mb-[120px] mb-[64px]">
      <div v-for="(item, index) in fakeInfo" :key="index">
        <div v-if="item.time" class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
          <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ item.time }}</span>
          <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">{{ item.desc }}</span>
        </div>
          <div v-else class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
            <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px">{{ item.amount }}</span>
            <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">{{ item.desc }}</span>
          </div>
        </div>
      </div>
      <Progress></Progress>
      <div class="text-center md:mt-[86px] mt-[86px]">
        <a-button
          class="md:h-[60px] h-[48px] md:w-[278px] w-[178px] md:rounded-[30px] rounded-[25px] md:mb-[105px] mb-[50px]">
          Coming Soon
        </a-button>
        <div class="text-[#fff] md:text-[36px] text-[24px] font-bold md:mb-[64px] mb-[32px]">$ABSC Token</div>
        <div class="border border-solid border-[#fff] w-full h-[400px] rounded-[10px] text-[#fff]">这里要放张图片</div>
      </div>
      <div class="service-box md:p-[50px] p-[24px] md:mt-[64px] mt-[32px]">
        <div class="md:text-[21px] text-[18px] text-[#fff] font-bold md:mb-[30px] mb-[20px]">$ABSC IDO Terms of service
        </div>
        <div class="text-[#7C7C7C] text-[14px]">
          1.我是条款我是条款我是条款我是条款我是条款我是条款我是条款我是条款
          2.我是条款我是条款我是条款我是条款我是条款我是条款我是条款我是条款我
          3.我是条款我是条款我是条款我是条款我是条款我是条款我是条款是条款我是条款
          4.我是条款我是条款我是条款我是条款我是条款我是条款我是条款
          5.我是条款我是条款我是条款我是条款我是条款我是条款
        </div>
      </div>
    </div>

  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";
import Progress from "@/components/progress.vue";

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

.service-box {
  background-color: rgba(108, 108, 108, 0.09);
  border: 1px solid #463947;
  border-radius: 10px;
  text-align: left;
}
</style>