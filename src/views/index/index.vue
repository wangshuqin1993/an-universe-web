<template>
  <div class="w-full h-full px-[32px] main-content ">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex justify-between  header h-[82px] py-[20px] ">
        <div>
          <img src="@/assets/images/mbake-logo.png" class="w-[140px]" />
        </div>
        <div class="flex items-stretch text-[#ffffff] text-[16px]">
          <div class="mr-[50px] self-center">Whitepaper</div>
          <div class="mr-[50px] self-center">Roadmap</div>
          <div class="mr-[50px] self-center">IDO</div>
          <div class="min-btn">
            Mint (Coming Soon)
          </div>
        </div>
      </div>
      <div class="text-center content mt-[80px]">
        <div class="text-[72px] content-title">
          <span class="font-bold title-text">Bmaker</span>
        </div>
        <div class="text-[18px] ">
          <span class="title-text">The Web3 future Bitcoin Stablecoin Paradigm</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.main-content {
  height: 100Vh;
  margin: 0;
  background: url('../../assets/images/bmake.jpg') no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  /* 
  max-width: 1440px;
  margin: 0 auto; */
}

.min-btn {
  line-height: 40px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 5px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
}

.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>