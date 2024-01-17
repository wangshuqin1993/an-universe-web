<template>
  <abscHeader></abscHeader>
  <div class="w-full h-full px-[32px] main-content md:p-[82px] pt-[0px]">
    <div class="text-center content pt-[162px]">
      <div class="md:text-[72px] text-[50px] content-title">
        <span class="font-bold title-text">ABSC</span>
      </div>
      <div class="md:text-[18px] text-[14px]">
        <span class="title-text">$ABSC： build BTC & all assets in aptos</span>
      </div>
      <div class="mobile-min-btn text-[#ffffff]" v-if="isMobile">
        <a-button class="min-btn fixed w-[198px] text-[18px] h-[50px] rounded-[25px]" @click="walletOpen = true"
          v-if="!walletAddress.walletAddress">connect wallet</a-button>
        <a-dropdown v-else>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <div @click="disConnectWallet" class="text-center">Disconnect</div>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button class="min-btn fixed w-[198px] h-[50px] rounded-[25px]">{{ btnInfo }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </div>
  </div>
  <abscFooter></abscFooter>



  <a-modal v-model:open="walletOpen" title="" :footer="null">
    <div class="text-[20px] text-[#000] font-bold mb-[30px] mt-[0px]">Please connect your wallet</div>
    <div class="flex">
      <div class="text-center wallet-item" @click="connectWallet">
        <img src="@/assets/images/OKXWallet-logo.png" class="w-[54px] mx-auto" />
        <div class="mt-[10px]">OKX WAllet</div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-footer.vue";
import { message } from "ant-design-vue";
import { DownOutlined } from '@ant-design/icons-vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress()

const router = useRouter();
const isMobile = ref(false);
const isOKApp = ref(false);
const walletOpen = ref(false);
const btnInfo = ref('');

// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  // 你需要在这里使用绝对路径
  uri: 'https://indexer.mainnet.aptoslabs.com/v1/graphql',
})

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const connectWallet = async () => {
  const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent('https://absc-mint.hamster.newtouch.com'));
  window.location.href = encodedUrl;
  try {
    const response = await okxwallet.request({ method: 'eth_requestAccounts' });
    const res = await okxwallet.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }],
    });
    if (window.okxwallet.selectedAddress) {
      let address = window.okxwallet.selectedAddress
      walletAddress.setWalletAddress(address);
      btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
    } else {
      message.info('Please provide a wallet that supports BSC!')
    }
  } catch (error) {
    message.error(error.message)
  }
  // if (isMobile.value && !isOKApp.value) {
  //   // try {
  //   //   const response = await window.okxwallet.aptos.connect();
  //   //   // console.log(response);
  //   //   address.value = response.address;
  //   //   walletAddress.setWalletAddress(address.value)
  //   //   btnInfo.value = address.value?.substring(0, 5) + "..." + address.value?.substring(address.value.length - 4);
  //   // } catch (error) {
  //   //   message.error(error.message)
  //   // }
  // }
}

const disConnectWallet = async () => {
  let connectionStatus = await window.okxwallet.isConnected();
  console.log(connectionStatus, 'connectionStatus')

  try {
    const response = window.okxwallet.disconnect()
    console.log(response, 'response')
    walletAddress.setWalletAddress('');
  } catch (error) {
    message.error(error.message)
  }
}

const getIsMobils = async () => {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  isMobile.value = isIOS || isAndroid;
  isOKApp.value = /OKApp/i.test(ua);
}


onMounted(async () => {
  await getIsMobils()
  if (isMobile.value) {
    if (window.okxwallet?.selectedAddress) {
      let address = window.okxwallet?.selectedAddress;
      walletAddress.setWalletAddress(address.value);
      btnInfo.value = address.value?.substring(0, 5) + "..." + address.value?.substring(address.value.length - 4);
    }
  }
})
</script>
<style scoped>
.main-content {
  height: 100vh;
  margin: 0;
  background: url('../../assets/images/bmake.jpg') no-repeat;
  background-size: cover;
  /* background-attachment: fixed; */
  background-position: center center;
  /* 
  max-width: 1440px;
  margin: 0 auto; 
  */
}

.min-btn {
  left: 50%;
  transform: translateX(-50%);
  bottom: 160px;
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