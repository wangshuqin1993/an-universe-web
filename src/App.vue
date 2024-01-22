

<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-Footer.vue";

// const disconnect = () => {
//   console.log('小狐狸解绑了')
// }

// window.ethereum.on('disconnect', disconnect())
// onMounted(() => {

// })



</script>

<style lang="less">
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
