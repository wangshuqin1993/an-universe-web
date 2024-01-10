<template>
  <div class="progress ">
    <a-progress :percent="50" :size="[300, 36]" :stroke-color="{ '0%': '#6E56FF', '100%': '#F41FFF', }" md:text-[21px]
      text-[16px] />
    <div class="md:text-[21px] text-[16px] font-bold float-right mt-[18px]">
      <div>
        <span class="text-[#FF3B0F]">$750000</span>
        <span class="text-[#88898A]">/$500000</span>
      </div>
      <div>
        <span class="text-[#E526FF]">$400000</span>
        <span class="text-[#88898A]">/$500000</span>
      </div>

    </div>

  </div>
</template>
<script lang='ts' setup>
</script>
<style lang='less' scoped>
:deep(.ant-progress .ant-progress-text) {
  color: #fff;
}

:deep(.ant-progress .ant-progress-inner) {
  border: 1px solid #EF21FF;
  // border-image: linear-gradient(90deg, rgba(111, 86, 255, 1), rgba(239, 33, 255, 1)) 1 1;
  padding: 5px;
  // position: relative;

  // &::after {
  //   content: '';
  //   width: 100%;
  //   height: 40px;
  //   position: absolute;
  //   border-radius: 8px;
  //   background: linear-gradient(90deg, rgba(111, 86, 255, 1), rgba(239, 33, 255, 1)) 1 1;
  //   top: -1px;
  //   left: -1px;
  //   z-index: -1;
}



:deep(.ant-progress-text) {
  position: absolute;
  top: -30px;
  right: 0px;
}

:deep(.ant-progress.ant-progress-show-info .ant-progress-outer) {
  margin-inline-end: unset !important;
  padding-inline-end: unset !important;

}
</style>