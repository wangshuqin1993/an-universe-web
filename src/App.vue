<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-[#15083E] w-full h-full">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
