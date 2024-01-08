<script setup lang="ts">
// import { init } from '@web3-onboard/vue'
// import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';

// console.log(ProviderLabel, 'ProviderLabel')
// const injected = injectedModule(
//   {
//     // displayUnavailable: true,
//     // display specific unavailable wallets
//     // displayUnavailable: [ProviderLabel.OKXWallet]

//     // sort: wallets => {
//     //   // const metaMask = wallets.find(
//     //   //   ({ label }) => label === ProviderLabel.MetaMask
//     //   // )
//     //   const OKXWallet = wallets.find(
//     //     ({ label }) => label === ProviderLabel.OKXWallet
//     //   )
//     //   return [{ OKXWallet },
//     //   ...wallets.filter(
//     //     ({ label }) =>
//     //       label !== ProviderLabel.OKXWallet
//     //   )].filter(wallet => wallet)
//     // }
//   }
// )
// const infuraKey = '<INFURA_KEY>'
// const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

// const web3Onboard = init({
//   wallets: [injected],
//   chains: [
//     {
//       id: '0x1',
//       token: 'USDT',
//       label: 'Ethereum Mainnet',
//       rpcUrl
//     },
//     {
//       id: '0x2105',
//       token: 'USDT',
//       label: 'Base',
//       rpcUrl: 'https://mainnet.base.org'
//     }
//   ],
//   connect: {
//     showSidebar: false,
//   },
// })


</script>

<template>
  <!-- bg-[#15083E] -->
  <div class="">

    <router-view></router-view>

  </div>
</template>

<style>
.ant-drawer .ant-drawer-content {
  background-color: #1F1F1F !important;
}
</style>
