<template>
  <div>
    <a-steps v-model:current="current" :items="[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
        // disabled: true,
      },
    ]" @change="changeStep">
    </a-steps>
    <div
      class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] w-full mx-auto mt-[60px] md:mb-[64px] mb-[32px]">
      <div
        class="flex justify-center items-center flex-col text-center h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{ IDOLaunchInfoData.start
        }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Launch at</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">1 USDT</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">$ABSC Price</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">{{
          IDOLaunchInfoData.targetAmount
        }}</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Target IDO amount</span>
      </div>
      <div
        class="flex justify-center items-center flex-col h-[134px] bg-[#6C6C6C] rounded-[12px] border border-solid border-[#463947] bg-opacity-[0.09]">
        <span class="font-[Montserrat-Bold] font-bold text-[#fff] md:text-[24px] text-[18px]">99999</span>
        <span class="font-[Arial] text-[#8D8D8D] md:text-[18px] text-[14px] mt-[12px]">Current amount</span>
      </div>
    </div>
    <Progress :targetAmount="'800'" :totalAmountData="1000"></Progress>

  </div>
</template>
<script lang='ts' setup>
import { ref } from "vue";
import Progress from "@/components/progress.vue";
const description = ref('This is a description.')
const IDOLaunchInfoData = ref({ start: '2024-01-23', targetAmount: '100' })
const current = ref<number>(0)
const changeStep = (current: any) => {
  console.log(current, 'value')
}
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

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after){
  background-color: #4D4C4C;
}

:deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-steps .ant-steps-item-wait .ant-steps-item-icon){
  background-color: #484848;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait .ant-steps-item-icon >.ant-steps-icon){
  color: white;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-description){
  color: #E527FF;
}
:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-description){
  color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title){
  color: #FFFFFF;
}
:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title){
  color: #FFFFFF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-subtitle){
  color: #6F6F6F;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-process .ant-steps-item-icon){
  border-color:#E527FF;
}

:deep(.anticon svg) {
  vertical-align: baseline;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after){
  background-color: #E527FF;
}

:deep(.css-dev-only-do-not-override-1qb1s0s.ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after){
  background-color: #4D4C4C;
}
</style>