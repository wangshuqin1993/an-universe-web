<template>
  <!-- <abscHeader></abscHeader> -->
  <div class="w-full h-full px-[32px] main-content md:p-[82px] pt-[0px] relative">
    <div class="text-center content pt-[162px]">
      <div class="md:text-[72px] text-[50px] content-title">
        <span class="font-bold title-text">ABSC</span>
      </div>
      <div class="md:text-[18px] text-[14px]">
        <span class="title-text">$ABSC: Asset Base in Bmaker & Btc Stable Coin Paradigm</span>
      </div>
    </div>
    <div class="mobile-min-btn position text-[#ffffff]" v-if="isMobile">
      <a-button class="min-btn  w-[198px] text-[18px] h-[50px] rounded-[25px]" @click="openSelectedWhiteListModal = true"
        v-if="!walletAddress.walletAddress">connect wallet</a-button>
      <a-dropdown v-else>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div @click="disConnectWallet" class="text-center">Disconnect</div>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button class="min-btn w-[198px] h-[50px] rounded-[25px]">{{ btnInfo }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
  <abscFooter></abscFooter>

  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="openSelectedWhiteListModal = false">
  </selectWalletListModal>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-footer.vue";
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { message } from "ant-design-vue";
import { DownOutlined } from '@ant-design/icons-vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress()

const router = useRouter();
const isMobile = ref(false);
const isOKApp = ref(false);
const openSelectedWhiteListModal = ref(false);
const btnInfo = ref('');

const baseUrl = ref(import.meta.env.VITE_BASE_URL)

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

// const connectWallet = async () => {
//   if (isMobile.value && !isOKApp.value) {
//     const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(baseUrl.value));
//     window.location.href = encodedUrl;
//   } else {
//     try {
//       const response = await okxwallet.request({ method: 'eth_requestAccounts' });
//       const res = await okxwallet.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId: '0x38' }],
//       });
//       if (window.okxwallet?.selectedAddress) {
//         let address = window.okxwallet.selectedAddress
//         walletAddress.setWalletAddress(address);
//         btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
//       } else {
//         message.info('Please provide a wallet that supports BSC!')
//       }
//       openSelectedWhiteListModal.value = false
//     } catch (error) {
//       message.error(error.message)
//     }
//   }
// }

const disConnectWallet = async () => {
  if (window.okxwallet?.selectedAddress) {
    let connectionStatus = await window.okxwallet?.isConnected();
    if (connectionStatus) {
      try {
        const response = await window.okxwallet.disconnect()
        walletAddress.setWalletAddress('');
        btnInfo.value = 'connect wallet'
        window.location.reload()
      } catch (error) {
        message.error(error.message)
      }
    }
  } else {
    let connectionStatus = await window.ethereum?.isConnected()
    if (connectionStatus) {
      // try {
      //   await window.ethereum.disconnect()
      //   walletAddress.setWalletAddress('');
      //   window.location.reload()
      //   btnInfo.value = 'connect wallet'
      // } catch (error) {
      //   message.error(error.message)
      // }
      walletAddress.setWalletAddress('');
      localStorage.removeItem('metaMaskWalletAddress')
      window.location.reload()
      btnInfo.value = 'connect wallet'
    }
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
      walletAddress.setWalletAddress(address);
      btnInfo.value = address.substring(0, 5) + "..." + address.substring(address.length - 4);
    } else if (window.ethereum?.selectedAddress) {
      let address = window.ethereum?.selectedAddress;
      walletAddress.setWalletAddress(address);
      btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
    }
  }
})

watch(() => walletAddress.walletAddress,
  (newVal, _oldVal) => {
    if (newVal) {
      // console.log(newVal, 'header watch walletAddress')
      walletAddress.setWalletAddress(newVal)
      btnInfo.value = newVal?.substring(0, 5) + "..." + newVal?.substring(newVal.length - 4);
    }

    if (newVal == '') {
      btnInfo.value = 'connect wallet'
    }
  }, { deep: true, immediate: true })
</script>
<style scoped lang="less">
.main-content {
  height: 100vh;
  margin: 0;
  background: url('../../assets/images/bmake.jpg') no-repeat;
  background-size: cover;
  /* background-attachment: fixed; */
  background-position: center center;
}


.min-btn {
  left: 50%;
  transform: translateX(-50%);
  // bottom: 160px;
  top: 400px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 5px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
}

:deep(.ant-btn>span) {
  vertical-align: middle;
}


.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>