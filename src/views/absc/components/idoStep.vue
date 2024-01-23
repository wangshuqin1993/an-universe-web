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
          USDT</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">$ABSC Price</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
          stageData?.targetAmount
        }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Target IDO amount</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ stepAmount }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Current amount</span>
      </div>
    </div>
    <Progress :targetAmount="stageData?.targetAmount" :totalAmountData="stepAmount"></Progress>

  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs, watch, onMounted } from "vue";
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

const { stageValue, stageData } = toRefs(props)
console.log(stageValue.value, stageData.value, 'stageData')

// stageValue.value - 1为当前
// stepItems.value[stageValue.value - 1].status = StepStatusEnums[stageData.value?.status]
// if (stageValue.value == 1) {
//   stepItems.value[stageValue.value - 1].disabled = StepStatusEnums[stageData.value?.status]
// } else if (stageValue.value == 2) {
//   stepItems.value[stageValue.value - 2].status = 'finish'
// } else if (stageValue.value == 3) {
//   stepItems.value[stageValue.value - 3].status = 'finish'
//   stepItems.value[stageValue.value - 2].status = 'finish'
// }

// 进度条分子
// const getTotalAmountData = async () => {
//   const walletApiIDO = await getIDOApiData()
//   const data = await walletApiIDO.getTotalAmount(stageValue.value)
//   console.log(data, 'getTotalAmount')
//   // to(talAmountData.value = data.toNumber() + Number(state.IDOLaunchInfoData.whitelistAmount)
//   // console.log(totalAmountData.value, data, 'totalAmountData.value')
// }

const initData = () => {
  console.log(stepItems.value, '99')
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
  // initData()
})

watch(
  () => props,
  (newVal, _oldVal) => {
    console.log(newVal, 'new')

    if (newVal.stageValue && newVal.stageData) {
      initData()
    }
  }, { deep: true, immediate: true }
);
</script>
<style lang='less' scoped>
:deep(.ant-steps .ant-steps-item-finish .ant-steps-item-icon) {
  background-color: #FAD9FF !important;
  border-color: #E527FF !important;
}

:deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon) {
  border-color: #E527FF !important;
}

:deep(.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title) {
  color: #FFFFFF !important;
}

:deep(.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-description) {
  color: #6F6F6F;
}

:deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-description) {
  color: #E527FF;
}

:deep(.ant-steps .ant-steps-item-finish .ant-steps-item-icon >.ant-steps-icon) {
  color: #E527FF;
}

:deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon) {
  color: #E527FF;
}

:dep(.ant-steps-icon svg) {
  color: #E527FF;
}

:deep(.ant-steps .ant-steps-item-process .ant-steps-item-icon) {
  color: #fff;
  background-color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after) {
  background-color: #4D4C4C;
}

:deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-steps .ant-steps-item-wait .ant-steps-item-icon) {
  background-color: #484848;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait .ant-steps-item-icon >.ant-steps-icon) {
  color: white;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-description) {
  color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-description) {
  color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title) {
  color: #FFFFFF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title) {
  color: #FFFFFF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-subtitle) {
  color: #6F6F6F;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process .ant-steps-item-icon) {
  border-color: #E527FF;
}

:deep(.anticon svg) {
  vertical-align: baseline;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after) {
  background-color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after) {
  background-color: #4D4C4C;
}
</style>