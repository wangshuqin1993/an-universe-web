<template>
  <div class="w-full bg-black h-[79px] pb-[30px] px-[32px]">
    <div class="max-w-[1440px] mx-auto h-[49px] flex justify-between items-end  footer-border">
      <div class="text-[#999999] text-[14px] inline-block">@2024 ABSC</div>
      <div>
        <img src="@/assets/images/Twitter.png" class="h-[18px] mr-[40px] inline-block cursor-pointer"
          @click="clickTwitter" />
        <img src="@/assets/images/TG.png" class="h-[18px] inline-block cursor-pointer" @click="clickTG" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>

const clickTwitter = () => {
  window.open('https://twitter.com/bscstable')
}

const clickTG = () => {
  window.open('https://t.me/aptbscs')
}
</script>

<style lang='less' scoped>
.footer-border {
  border-top: 1px solid #363636;
}
</style>