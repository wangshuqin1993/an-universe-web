<template>
  <div>
    <a-steps v-model:current="current" :items="stepItems">
    </a-steps>
    <div
      class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-full mx-auto mt-[50px] md:pb-[30px] mb-[32px]">
      <div
        class="flex justify-center items-center flex-col text-center h-[95px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[18px] text-[18px]">{{
          stageData?.startTime
        }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[14px] text-[12px] mt-[12px]">Launch at</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[95px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[18px] text-[12px]">{{ stageData?.unitPrice }}
          BNB</span>
        <span class="text-[12px] text-[#8D8D8D]">≈ ${{ getPriceData(stageData?.unitPrice) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[14px] text-[12px] mt-[8px]">$ABSC Price</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[95px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[18px] text-[12px]">{{
          stageData?.targetAmount
        }} BNB</span>
        <span class="text-[14px] text-[#8D8D8D]">≈ $ {{ getPriceData(stageData?.targetAmount) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[14px] text-[14px] mt-[8px]">Target IDO amount</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[95px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[18px] text-[18px]">{{ stepAmount }} BNB</span>
        <span class="text-[14px] text-[#8D8D8D]">≈ ${{ getPriceData(stepAmount) }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[14px] text-[14px] mt-[8px]">Current amount</span>
      </div>
    </div>
    <Progress :targetAmount="stageData?.targetAmount" :totalAmountData="stepAmount" :bnbPriceData="bnbPriceData"
      :size="16"></Progress>

  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs, watch, onMounted } from "vue";
import Progress from "@/components/progress.vue";
import { apiIDOLaunchTime } from "@/apis/absc"
import { StepStatusEnums } from "@/enums/levelLabel";
const current = ref<number>(0)
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
  },
  stages: {
    type: Array,
    default: () => []
  }
})

const stepItems = ref([{
  title: 'Stage 1',
  description: '',
  status: 'wait',
  disabled: true,
}, {
  title: 'Stage 2',
  description: '',
  status: 'wait',
  disabled: true,
},
{
  title: 'Stage 3',
  description: '',
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

const getApiIDOLaunchTime = () => {
  if (props.stages && props.stages.length > 0) {
    props.stages.forEach((t, index) => stepItems.value[index].description = `1ABSC = ${t.unitPrice}BNB`);
  }
}


onMounted(() => {

})

watch(
  () => props,
  (newVal, _oldVal) => {
    if (newVal.stageValue && newVal.stageData) {
      initData()
      getApiIDOLaunchTime()
    }
  }, { deep: true, immediate: true }
);
</script>
<style lang='less' scoped></style>