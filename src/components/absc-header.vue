<template>
  <div class="fixed top-0 w-full z-10 bg-black opacity-[0.85]">
    <div class="max-w-[1440px] mx-auto ">
      <div class="flex justify-between  header h-[82px] py-[20px] px-[32px]">
        <div>
          <img src="@/assets/images/absc.png" class="md:w-[140px] w-[110px]" />
        </div>
        <div v-if="isMobile" @click="open = true">
          <img src="@/assets/images/mobileShow.png" class="w-[24px] mt-[10px]" />
        </div>
        <div v-else class="flex items-stretch text-[#ffffff] text-[16px]">
          <!-- <div class="md:mr-[50px] mr-[16px] self-center">Home</div>
          <div class="md:mr-[50px] mr-[16px] self-center">Roadmap</div>
          <div class="md:mr-[50px] mr-[16px] self-center cursor-pointer hover:text-[#F41FFF]" @click="router.push('/ido')"
            :class="{ 'selected-header-menu': selectedNavTitle === 'ido' }">IDO</div>
          <div class="cursor-pointer min-btn hover:opacity-[0.85]" @click="router.push('/mint')">
            Mint (Coming Soon)
          </div> -->
          <div v-for="item in menuList" :key="item.path"
            class="md:mr-[50px] mr-[16px] self-center cursor-pointer hover:text-[#F41FFF]" @click="router.push(item.path)"
            :class="{ 'selected-header-menu': selectedNavTitle === item.name }">
            {{ item.name }}
          </div>
          <a-button class="w-[178px] text-[18px] h-[42px] rounded-[12px]" @click="connectWallet"
            v-if="!walletAddress.walletAddress">connect wallet</a-button>

          <a-dropdown placement="bottom" v-else>
            <a-button class="w-[178px] h-[42px] rounded-[12px]">{{ btnInfo }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <div @click="disConnectWallet" class="text-center">disConnect</div>
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
          {{ item.name }}
        </div>
      </div>
    </a-drawer>
  </div>
  <!-- <a-modal v-model:open="walletOpen" title="" :footer="null">
    <div class="text-[20px] text-[#000] font-bold mb-[30px] mt-[0px]">Please connect your wallet</div>
    <div class="flex">
      <div class="text-center wallet-item" @click="connectWallet">
        <img src="@/assets/images/OKXWallet-logo.png" class="w-[54px] mx-auto" />
        <div class="mt-[10px]">OKX WAllet</div>
      </div>
    </div>
  </a-modal> -->
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { CloseOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { useWalletAddress } from "@/stores/useWalletAddress";
const walletAddress = useWalletAddress()
const router = useRouter();
const route = useRoute();
const open = ref(false);
const walletOpen = ref(false);
const isMobile = ref(false);
const isOKApp = ref(false);
const selectedNavTitle = ref('');
const btnInfo = ref('');
const contentWrapperStyle = ref({ 'backfround-color': '#1F1F1F' })
const menuList = ref([{ name: 'Home', path: '/' }, { name: 'NFT', path: '/mint' }, { name: 'Whitelist', path: '/whitelist' }, { name: 'IDO', path: '/ido' }])

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
// 连接钱包
const connectWallet = async () => {
  walletOpen.value = false;

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

  // if (typeof window.okxwallet !== 'undefined') {
  //   try {
  //     const response = await window.okxwallet.aptos.connect();
  //     // console.log(response);
  //     walletAddress.setWalletAddress(response.address);
  //     btnInfo.value = response.address?.substring(0, 5) + "..." + response.address?.substring(response.address.length - 4);
  //   } catch (error) {
  //     message.error(error.message)
  //   }
  // } else {
  //   return message.info('请先安装OKX钱包')
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
  // console.log(window.okxwallet, 'window.okxwallet')
  if (window.okxwallet.selectedAddress) {
    let address = window.okxwallet.selectedAddress;
    walletAddress.setWalletAddress(address);
    btnInfo.value = address?.substring(0, 5) + "..." + address?.substring(address.length - 4);
  }

  console.log(window.okxwallet.selectedAddress, walletAddress.walletAddress, btnInfo.value, 'window.okxwallet')
  // let width = document.documentElement.clientWidth;
  // console.log(width, 'width')
  // if (width > 750) {
  //   isMobile.value = false
  // } else {
  //   isMobile.value = true;
  // }
})



watch(
  () => route.name,
  (newVal, _oldVal) => {
    if (newVal) {
      console.log(newVal, route, 'bbbb')
      selectedNavTitle.value = newVal;
      console.log(selectedNavTitle.value);
    }
  }, { deep: true, immediate: true }
);

watch(() => walletAddress.walletAddress,
  (newVal, _oldVal) => {
    if (newVal) {
      console.log(newVal, 'kkkk')
      walletAddress.setWalletAddress(newVal)
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