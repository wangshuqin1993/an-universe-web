<template>
  <div class="max-w-[798px] mx-auto md:px-[0px] px-[32px] md:pb-[64px] pb-[32px]">
    <div class="text-center text-[16px] text-[#fff] font-bold mb-[20px]">NFT rights</div>
    <div class="mb-[30px]">
      <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :showHeader="false" bordered />
    </div>
    <div class="text-center py-[20px] md:px-[60px] px-[20px] activity-box">
      <div class="text-[18px] text-[#fff] font-bold mb-[12px]">Blind box activity</div>
      <div class="text-[12px] text-[#7C7C7C]">The blind box activity is an event set up for ABSC inscription holders
        toconsume
        inscriptions and obtain
        the genesis NFT. Each participation in the event will consume 100,000 ABSC inscriptions. We wish every
        ABSC inscription holder can obtain their desired genesis NFT.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const columns = [
  {
    title: 'index',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'rights',
    dataIndex: 'rights',
    key: 'rights',
  },
  {
    title: 'desc',
    dataIndex: 'desc',
    key: 'desc',
  }]

const dataSource = ref([
  {
    index: 1,
    rights: 'Community Identity',
    desc: 'The genesis NFT is a proof of identity to enter the core community of BSC'
  },
  {
    index: 2,
    rights: 'Discount Voucher',
    desc: 'Obtain a discount voucher during the IDO of mapped tokens of BSC stablecoins on various public chains'
  },
  {
    index: 3,
    rights: 'Airdrop',
    desc: 'Receive an airdrop every time BSC releases a stablecoin or a mapped token of a stablecoin on any public chain'
  },
  {
    index: 4,
    rights: 'Governance',
    desc: 'Participate in BSC project governance and qualify for Bmaker token IDO'
  },
])


</script>

<style scoped lang="less">
.activity-box {
  background-color: rgba(255, 255, 255, 0.11);
  border: 1px solid rgba(255, 255, 255, 0.23);
  border-radius: 10px;
}
</style>