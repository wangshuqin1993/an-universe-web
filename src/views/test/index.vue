<template>
  <div class="test w-hull h-hulll text-[#000]">
    <a-button @click="connect">connect</a-button>
    <a-button @click="disconnect">disconnect</a-button>
    <div>{{ connectedWallet?.label }}</div>
  </div>
</template>
<script lang='ts' setup>
import { ref, onMouted } from "vue";
import Web3 from "web3";
import * as aptos from "aptos";
import ethers from "ethers";
// // import Onboard, { type WalletState } from '@web3-onboard/core'
// import { useOnboard } from '@web3-onboard/vue'
// const { wallets, connectWallet, connectedWallet, disconnectConnectedWallet, disconnectWallet } = useOnboard()
// const onboard = useOnboard()

// console.log(connectWallet, 'connectWallet')

// const walletsvalue: any = ref()
// aptos
const aptos_client = new aptos.AptosClient(
  "https://fullnode.mainnet.aptoslabs.com"
);

const getBalance = async (address) => {
  try {
    const resource = await aptos_client.getAccountResource(
      address,
      `0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`
    );
    const c = resource.data.coin.value;
    return BigInt(c);
  } catch (error) {
    return BigInt(0);
  }
};


const connect = async () => {
  if (typeof window.okxwallet !== 'undefined') { console.log('OKX is installed!'); }
  try {
    const response = await window.okxwallet.aptos.connect();
    console.log(response);
    // { address: string, publicKey: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
  // console.log(wallets, 'wallets');
  // const walletsValue = await connectWallet()
  // console.log(walletsValue, 'walletsvalue')
  // console.log(wallets, 'wallets');
  // try {


  // } catch (err) {
  //   console.log(err, 'err');
  //   console.log(wallets, 'wallets===err');

  // }

  // console.log(walletsvalue.value, 'conntctResult')
}


const disconnect = async () => {
  // const { label } = walletsvalue.value || {}
  const conntctResult = await disconnectConnectedWallet()
}


// const connectWallet = async () => {
//   if (window.ethereum) {
//     const { ethereum } = window;
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const address = accounts[0];

//     console.log(accounts, 'accounts')
//     const web3 = new Web3(window.ethereum);
//     console.log(web3, ethereum.identicon, ethereum.chainId, 'web3web3')
//     if (address) {
//       console.log(address, 'address')
//     }
//   }
// }

onMounted(() => {

})




</script>
<style lang='less' scoped></style>