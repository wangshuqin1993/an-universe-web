

<template>
  <div class="">
    <abscHeader></abscHeader>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";

</script>

<style lang="less">
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
