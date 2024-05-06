<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { ConfigProvider } from 'ant-design-vue';
// import { useRecaptchaProvider } from 'vue-recaptcha';
// useRecaptchaProvider();
</script>

<template>
  <ConfigProvider>
    <router-view></router-view>
    <Toaster />
  </ConfigProvider>
</template>

<style>
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
