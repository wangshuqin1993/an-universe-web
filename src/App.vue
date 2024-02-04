

<template>
  <div class="">
    <abscHeader></abscHeader>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import abscHeader from "@/components/absc-header.vue";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/vue'

// 1. Get projectId
const projectId = 'e1f20e0639756f920aab049ed328aa2d'

const isProd = import.meta.env.VITE_NODE_ENV === 'production';

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: 'BNB Smart Chain Mainnet',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://api.zan.top/node/v1/bsc/mainnet/6b55148012b74249962002e2154d5f26'
}

const testnet = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'tBNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://api.zan.top/node/v1/bsc/testnet/6b55148012b74249962002e2154d5f26'
}

// 3. Create modal
const metadata = {
  name: 'ABSC',
  description: 'Asset Base in Bmaker & BTC Stable Coin Paradigm',
  url: 'https://absc.app', // origin must match your domain & subdomain
  icons: ['']
}

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: 56,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    rpcUrl: 'https://api.zan.top/node/v1/bsc/mainnet/6b55148012b74249962002e2154d5f26' // used for the Coinbase SDK
  }),
  chains: isProd ? [mainnet] : [mainnet, testnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})
</script>

<style lang="less">
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
