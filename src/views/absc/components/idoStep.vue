<template>
  <div class="">
    <a-steps :current="1" :items="[
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
      },
    ]"></a-steps>
  </div>
</template>
<script lang='ts' setup>
import { ref } from "vue";
const description = ref('This is a description.')
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
</style>