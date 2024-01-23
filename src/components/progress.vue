<template>
  <div class="">
    <div class="flex justify-between text-[16px]" v-if="!showInfo">
      <div></div>
      <div class="text-[#fff] mb-[5px] text-[18px] text-[#FF3B0F]">{{ percentValue + '%' }}</div>
    </div>

    <a-progress :percent="50" :size="[300, 30]" :stroke-color="{ '0%': '#6E56FF', '100%': '#F41FFF', }"
      :show-info="showInfo" />
    <div class="md:text-[18px] text-[14px] float-right mt-[18px]">
      <div class="text-right">
        <span class="text-[#FF3B0F]">{{ totalAmountData }}/</span>
        <span class="text-[#88898A]">{{ targetAmount }}</span>
      </div>
      <div class="text-[#88898A]">
        Amount of BNB raised: <span class="text-[#E526FF]">-</span>
      </div>
      <!-- <div>{{ getV() }}</div> -->
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, toRefs, computed, watch } from "vue";
const showInfo = ref(true)
const props = defineProps({
  targetAmount: {
    type: String,
    default: ''
  },
  totalAmountData: {
    type: Number,
    default: 0
  }
})
const percentValue = ref(0)
const { targetAmount, totalAmountData } = toRefs(props);

console.log(targetAmount.value, totalAmountData.value, 'qwertyui')


const getV = computed(() => {
  return percentValue.value = totalAmountData.value / Number(targetAmount.value)
})
// const getPercentValue = computed(() => {
//   if (percentValue.value > 100) {
//     showInfo.value = true
//   } else {
//     showInfo.value = false
//   }
//   percentValue.value = totalAmountData.value / Number(targetAmount.value)
//   console.log(percentValue.value, 'percentValue.value')
// })
const getPercentValue = () => {
  if (percentValue.value > 100) {
    showInfo.value = true
  } else {
    showInfo.value = false
  }
  percentValue.value = totalAmountData.value / Number(targetAmount.value) * 100
  console.log(percentValue.value, 'percentValue.value')
}

watch(
  () => props,
  async (newVal, _oldVal) => {
    console.log(newVal, 'new props')
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

:deep(.ant-progress.ant-progress-show-info .ant-progress-outer) {
  margin-inline-end: unset !important;
  padding-inline-end: unset !important;
}
</style>