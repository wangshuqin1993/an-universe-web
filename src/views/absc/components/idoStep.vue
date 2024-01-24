<template>
  <div>
    <a-steps v-model:current="current" :items="stepItems" @change="changeStep">
    </a-steps>
    <div
      class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-full mx-auto mt-[60px] md:mb-[64px] mb-[32px]">
      <div
        class="flex justify-center items-center flex-col text-center h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
          stageData?.startTime?.Time
        }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Launch at</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ stageData?.unitPrice }}
          BNB</span>
        <span class="text-[14px] text-[#8D8D8D]">≈ ${{ getPriceData(stageData?.unitPrice) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">$ABSC Price</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
          stageData?.targetAmount
        }}</span>
        <span class="text-[14px] text-[#8D8D8D]">≈ $ {{ getPriceData(stageData?.targetAmount) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Target IDO amount</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ stepAmount }}</span>
        <span class="text-[14px] text-[#8D8D8D]">≈ ${{ getPriceData(stepAmount) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Current amount</span>
      </div>
    </div>
    <Progress :targetAmount="stageData?.targetAmount" :totalAmountData="stepAmount"
      :bnbPriceData="bnbPriceData"></Progress>

  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs, watch, onMounted, computed } from "vue";
import Progress from "@/components/progress.vue";
const description = ref('This is a description.')
import { StepStatusEnums } from "@/enums/levelLabel";

const props = defineProps({
  stageValue: {
    type: Number,
    default: 0,
  },
  stepAmount: {
    type: Number,
    default: 0
  },
  stageData: {
    type: Object,
    default: () => { }
  },
  bnbPriceData: {
    type: Number,
    default: 0,
  }
})

const stepItems = ref([{
  title: 'Stage 1',
  description,
  status: 'wait',
  disabled: true,
}, {
  title: 'Stage 2',
  description,
  status: 'wait',
  disabled: true,
},
{
  title: 'Stage 3',
  description,
  status: 'wait',
  disabled: true,
},])

const { stageValue, stageData, bnbPriceData } = toRefs(props)

const getPriceData = (value: number) => {
  return (bnbPriceData.value * value).toFixed(6)
}

const initData = () => {
  stepItems.value[stageValue.value - 1].status = StepStatusEnums[stageData.value?.status]
  if (stageValue.value == 1) {
    stepItems.value[stageValue.value - 1].disabled = StepStatusEnums[stageData.value?.status]
  } else if (stageValue.value == 2) {
    stepItems.value[stageValue.value - 2].status = 'finish'
  } else if (stageValue.value == 3) {
    stepItems.value[stageValue.value - 3].status = 'finish'
    stepItems.value[stageValue.value - 2].status = 'finish'
  }

}


const current = ref<number>(0)

const changeStep = (current: any) => {
  console.log(current, 'value')
}

onMounted(() => {

})

watch(
  () => props,
  (newVal, _oldVal) => {
    if (newVal.stageValue && newVal.stageData) {
      initData()
    }
  }, { deep: true, immediate: true }
);
</script>
<style lang='less' scoped></style>