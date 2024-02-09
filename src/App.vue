

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
  enableAnalytics: true, // Optional - defaults to your Cloud configuration,
  featuredWalletIds: [
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66',
    'ef333840daf915aafdc4a004525502d6d49d77bd9c65e0642dbaefb3c2893bef'
  ]
})
</script>

<style lang="less">
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
