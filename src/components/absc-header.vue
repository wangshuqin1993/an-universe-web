<template>
  <div class="fixed top-0 w-full z-10 bg-black opacity-[0.85]">
    <div class="max-w-[1440px] mx-auto ">
      <div class="flex justify-between header h-[82px] py-[20px] px-[32px]">
        <div>
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div v-if="isMobile" @click="open = true">
          <img src="@/assets/images/mobileShow.png" class="w-[24px] mt-[10px]" />
        </div>
        <div v-else class="flex items-stretch text-[#ffffff] text-[16px]">
          <div v-for="item in menuList" :key="item.path" @click="router.push(item.path)" class="self-center"
            :class="{ 'selected-header-menu': selectedNavTitle === item.name }">

            <div class="md:mr-[50px] mr-[16px] cursor-pointer hover:text-[#F41FFF]" v-if="item.meta.isShow">
              {{ item.name }}
            </div>
          </div>

          <a-button class="w-[178px] text-[18px] h-[42px] rounded-[12px]" @click="openSelectedWhiteListModal = true"
            v-if="!walletAddress.walletAddress">connect wallet</a-button>

          <a-dropdown placement="bottom" v-else>
            <a-button class="w-[178px] h-[42px] rounded-[12px]">{{ btnInfo }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <div @click="disConnectWallet" class="text-center">Disconnect</div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-drawer :width="500" title="" placement="top" :open="open" @close="onClose" :closable="false"
      :contentWrapperStyle="contentWrapperStyle" rootClassName="bg-css">
      <div class="flex items-stretch justify-between mb-[30px]">
        <div class="self-center">
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div class="self-center">
          <CloseOutlined style="color: #ffffff;fontSize: 24px" @click="open = false" />
        </div>
      </div>
      <div class="text-[16px] text-[#ffFfff] font-bold">
        <div v-for="item in menuList" :key="item.path"
          class="md:mr-[50px] mr-[16px] self-center cursor-pointer hover:text-[#F41FFF] mb-[30px]"
          @click="changeRouter(item)" :class="{ 'selected-header-menu': selectedNavTitle === item.name }">
          <div v-if="item.meta.isShow">
            {{ item.name }}
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="openSelectedWhiteListModal = false">
  </selectWalletListModal>
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { CloseOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress()
const router = useRouter();
const route = useRoute();
const open = ref(false);
const isMobile = ref(false);
const isOKApp = ref(false);
const openSelectedWhiteListModal = ref(false);
const selectedNavTitle = ref('Home');
const btnInfo = ref('');
const contentWrapperStyle = ref({ 'backfround-color': '#1F1F1F' })
// const menuList = ref([{ name: 'Home', path: '/' }, { name: 'NFT', path: '/mint' }, { name: 'Whitelist(IDO)', path: '/whitelist' }, { name: 'NFT(IDO)', path: '/nftIdo' }, { name: 'IDO', path: '/ido' }])

const menuList = router.options.routes
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

const onClose = () => {
  open.value = false
}

const changeRouter = (item: any) => {
  router.push(item.path);
  open.value = false
}

const disConnectWallet = async () => {
  let walletName = localStorage.getItem('walletName') || ''
  if (walletName != '') {
    if (walletName == 'MetaMask') {
      localStorage.removeItem('metaMaskWalletAddress')
      localStorage.setItem('walletName', '')
      walletAddress.setWalletAddress('');
      window.location.reload()
    } else {
      localStorage.removeItem('OKXWalletAddress')
      localStorage.setItem('walletName', '')
      walletAddress.setWalletAddress('');
      window.location.reload()
    }
  }
  // if (window.okxwallet?.selectedAddress) {
  //   let connectionStatus = await window.okxwallet?.isConnected();
  //   if (connectionStatus) {
  //     try {
  //       const response = await window.okxwallet.disconnect()
  //       walletAddress.setWalletAddress('');
  //       btnInfo.value = 'connect wallet'
  //       window.location.reload()
  //     } catch (error) {
  //       message.error(error.message)
  //     }
  //   }
  // } else {
  //   let connectionStatus = await window.ethereum?.isConnected()
  //   if (connectionStatus) {
  //     // window.ethereum.isMetaMask = false
  //     walletAddress.setWalletAddress('');
  //     localStorage.removeItem('metaMaskWalletAddress')
  //     window.location.reload()
  //     btnInfo.value = 'connect wallet'
  //     // try {
  //     //   // console.log(window.ethereum, window.ethereum._metamask, '909090')
  //     //   // await window.ethereum.metamask.disconnect('MetaMask')
  //     //   // const data = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: '' }], });
  //     //   // window.ethereum.request({
  //     //   //   "method": "wallet_revokePermissions",
  //     //   //   "params": [
  //     //   //     {
  //     //   //       "eth_accounts": {}
  //     //   //     }
  //     //   //   ]
  //     //   // });
  //     //   walletAddress.setWalletAddress('');
  //     //   localStorage.removeItem('metaMaskWalletAddress')
  //     //   // window.location.reload()
  //     //   btnInfo.value = 'connect wallet'
  //     // } catch (error) {
  //     //   message.error(error.message)
  //     // }
  //   }

  // let connectionStatus = await window.ethereum?.isConnected()
  // if (connectionStatus) {
  //   try {
  //     const data = await window.ethereum.disconnect()
  //     walletAddress.setWalletAddress('');
  //     window.location.reload()
  //     btnInfo.value = 'connect wallet'
  //   } catch (error) {
  //     message.error(error.message)
  //   }
  // }
  // }
}

const getIsMobils = async () => {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  isMobile.value = isIOS || isAndroid;
  isOKApp.value = /OKApp/i.test(ua);
  // console.log(isMobile.value, isIOS, isAndroid, 'isMobile.value')
}

onMounted(async () => {
  // console.log(window.okxwallet, window.ethereum.isMetaMask, window.ethereum?.isConnected(), 'window.okxwallet')
  // console.log(window.ethereum?.provider, walletAddress.walletAddress, 'window.ethereum');
  await getIsMobils()
  let walletName = localStorage.getItem('walletName') || ''
  if (walletName != '') {
    let address
    if (walletName == 'MetaMask') {
      address = localStorage.getItem('metaMaskWalletAddress') || ''
    } else {
      address = localStorage.getItem('OKXWalletAddress') || ''
    }
    walletAddress.setWalletAddress(address);
    btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
  } else {
    walletAddress.setWalletAddress('');
    btnInfo.value = 'connect wallet'
  }



  // let address = localStorage.getItem('metaMaskWalletAddress') || ''
  // if (address) {
  //   walletAddress.setWalletAddress(address);
  //   btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
  // } else {
  //   let okxAddress = window.okxwallet?.selectedAddress;
  //   walletAddress.setWalletAddress(okxAddress);
  //   btnInfo.value = okxAddress?.substring(0, 5) + "..." + okxAddress?.substring(okxAddress.length - 4);
  // }

  // if (window.okxwallet?.selectedAddress) {
  //   let address = window.okxwallet?.selectedAddress;
  //   walletAddress.setWalletAddress(address);
  //   btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
  // } else {
  //   // const data = await window.ethereum.request({
  //   //   "method": "eth_requestAccounts",
  //   //   "params": []
  //   // });
  //   // const address = data[0]
  //   // window.ethereum?.selectedAddress || 
  //   if (window.ethereum.isMetaMask) {
  //     let address = localStorage.getItem('metaMaskWalletAddress') || '';
  //     walletAddress.setWalletAddress(address);
  //     btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
  //   }
  // }
})



watch(
  () => route.name,
  (newVal, _oldVal) => {
    if (newVal) {
      selectedNavTitle.value = newVal as string;
    }
  }, { deep: true, immediate: true }
);

watch(() => walletAddress.walletAddress,
  (newVal, _oldVal) => {
    if (newVal != '') {
      // console.log(newVal, 'header watch walletAddress')
      walletAddress.setWalletAddress(newVal)
      btnInfo.value = newVal?.substring(0, 5) + "..." + newVal?.substring(newVal.length - 4);
    }
    if (newVal == '') {
      walletAddress.setWalletAddress('');
      btnInfo.value = 'connect wallet'
    }
  }, { deep: true, immediate: true })



</script>
<style lang='less' scoped>
.absc-title {
  background-image: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.mobile-min-btn {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translatex(-50%);
}

.min-btn {
  line-height: 40px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 5px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
}


:deep(.ant-drawer-content) {
  background-color: #1F1F1F;
}

.bg-css {
  background-color: #1F1F1F;
}

.selected-header-menu {
  font-weight: bold;
  color: #F41FFF;
}

.selected-header-menu-mobile {
  color: #F41FFF;
}

.wallet-item {
  border: 1px solid #463947;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    border-color: #F41FFF;
  }
}
</style>