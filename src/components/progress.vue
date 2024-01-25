<template>
  <div class="">
    <div class="flex justify-between text-[16px]" v-if="!showInfo">
      <div></div>
      <div class="text-[#fff] mb-[5px] text-[16px] text-[#FF3B0F]">{{ percentValue + '%' }}</div>
    </div>

    <!-- :size="[300, 30]" -->
    <a-progress :percent="percentValue" :size="size" :stroke-color="{ '0%': '#6E56FF', '100%': '#F41FFF', }"
      :show-info="showInfo" />
    <div class="md:text-[14px] text-[12px] float-right md:mt-[18px] mt-[10px]">
      <div class="text-right">
        <span class="text-[#FF3B0F]">{{ totalAmountData }}/</span>
        <span class="text-[#88898A]">{{ targetAmount }}</span>
      </div>
      <div class="text-[#88898A]">
        Amount of BNB raised: <span class="text-[#E526FF]">{{ '$' + (bnbPriceData * totalAmountData) }}</span>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs, watch } from "vue";
const showInfo = ref(true)
const props = defineProps({
  targetAmount: {
    type: String,
    default: ''
  },
  totalAmountData: {
    type: Number,
    default: 0
  },
  bnbPriceData: {
    type: Number,
    default: 0,
  },
  size: {
    type: String || Number,
    default: 'default',
  }
})
const percentValue = ref(0)
const { targetAmount, totalAmountData, bnbPriceData, size } = toRefs(props);

const getPercentValue = () => {
  if (percentValue.value > 100) {
    showInfo.value = true
  } else {
    showInfo.value = false
  }
  percentValue.value = totalAmountData.value / Number(targetAmount.value) * 100
  console.log(percentValue.value, totalAmountData.value, Number(targetAmount.value), 'percentValue.value')
}

watch(
  () => props,
  async (newVal, _oldVal) => {
    if (newVal.totalAmountData && newVal.targetAmount) {
      getPercentValue()
    }
  }, { deep: true, immediate: true }
);




</script>
<style lang='less' scoped>
:deep(.ant-progress .ant-progress-text) {
  color: #fff;
}

:deep(.ant-progress .ant-progress-inner) {
  border: 1px solid #EF21FF;
  padding: 5px;
}

:deep(.ant-progress-text) {
  position: absolute;
  font-size: 18px;
  top: -30px;
  right: 0px;
}

@media screen and (max-width: 768px) {
  :deep(.ant-progress-text) {
    font-size: 12px !important;
    top: -22px;
  }
}

:deep(.ant-progress .ant-progress-text) {
  width: unset;
}

:deep(.ant-progress.ant-progress-show-info .ant-progress-outer) {
  margin-inline-end: unset !important;
  padding-inline-end: unset !important;
}
</style>