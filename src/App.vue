

<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import abscHeader from "@/components/absc-header.vue";
import defaultFooter from "@/components/defaultFooter.vue";
</script>

<style lang="less">
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
