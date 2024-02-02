<template>
  <a-modal v-model:open="openSelectedWhiteListModal" title="" :footer="null" width="660px" @cancel="closeModal">
    <div>
      <div class="my-[20px] text-[14px] text-[#000] font-semibold">
        <div class="mb-[30px] text-[18px]">Connect Wallet</div>
        <div v-for="val in walletList " :key="val.name" @click="connectWallet(val.id)">
          <div class="flex wallet-item md:w-[50%] w-[100%] items-center cursor-pointer">
            <img :src="getImageURL(`${val.img}.png`)" class="h-[30px] mr-[18px]" />
            <div>{{ val.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs, onMounted } from "vue";
import useAssets from "@/stores/useAssets";
import { message } from "ant-design-vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
const { getImageURL } = useAssets();
const walletAddress = useWalletAddress()
const walletList = ref([{ name: "OKX Web3 Wallet", img: 'OKXWallet-logo', id: 1 }, { name: "MetaMask", img: 'Metamask', id: 2 }])
const props = defineProps({
  openSelectedWhiteListModal: {
    type: Boolean,
    default: false,
  }
})
const isMobile = ref(false)
const isOKApp = ref(false)
const { openSelectedWhiteListModal } = toRefs(props)
const emit = defineEmits(['closeSelectedWhiteListModal'])
const closeModal = () => {
  emit('closeSelectedWhiteListModal')
}

const baseUrl = ref(import.meta.env.VITE_BASE_URL)

// 连接钱包
const connectWallet = async (id: number) => {


  if (isMobile.value && !isOKApp.value) {
    if (id == 1) {
      // if (typeof window.okxwallet == 'undefined') return message.error('Please install the OKXWallet!')
      const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(baseUrl.value));
      window.location.href = encodedUrl;
    } else {
      debugger
      if (typeof window.ethereum == 'undefined') return message.error('Please install the MetaMask!')
      // 小狐狸地址
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ chainId: '0x61' }], });
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      });
      walletAddress.setWalletAddress(accounts[0]);
      localStorage.setItem('metaMaskWalletAddress', accounts[0])
      localStorage.setItem('walletName', 'MetaMask')
      closeModal()
    }

  } else {
    if (id === 1) {
      if (typeof window.okxwallet == 'undefined') return message.error('Please install the OKXWallet!')
      try {
        const response = await window.okxwallet.request({ method: 'eth_requestAccounts' });
        const res = await window.okxwallet.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        });
        if (window.okxwallet?.selectedAddress) {
          let address = window.okxwallet.selectedAddress
          localStorage.setItem('OKXWalletAddress', address)
          localStorage.setItem('walletName', 'OKX')
          walletAddress.setWalletAddress(address);
          closeModal()
        } else {
          closeModal()
          message.info('Please provide a wallet that supports BSC!')
        }
      } catch (error) {
        message.error(error.message)
      }
    } else {
      if (typeof window.ethereum == 'undefined') return message.error('Please install the MetaMask!')
      // 小狐狸地址
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ chainId: '0x38' }], });
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
      walletAddress.setWalletAddress(accounts[0]);
      localStorage.setItem('metaMaskWalletAddress', accounts[0])
      localStorage.setItem('walletName', 'MetaMask')
      // const providerData = new ethers.providers.Web3Provider(window.ethereum);
      // 这个之如果为 null 就说明没有连接到小狐狸，如果有值就是连接的用户钱包地址
      // const accounts = providerData.provider.selectedAddress
      closeModal()
      // console.log(accounts, 'accounts')
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
  // if (isMobile.value) {
  //   walletList.value = [{ name: "OKX Web3 Wallet", img: 'OKXWallet-logo', id: 1 }]
  // } else {
  //   walletList.value = [{ name: "OKX Web3 Wallet", img: 'OKXWallet-logo', id: 1 }, { name: "MetaMask", img: 'Metamask', id: 2 }]
  // }
})
</script>
<style lang='less' scoped>
.wallet-item {
  padding: 20px 30px;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  background-color: #fff;
  border-radius: 22px;
  box-shadow: 0px 1px 4px 2px rgba(0, 0, 0, 0.13);
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0px 1px 4px 2px rgba(244, 31, 255, 0.13);
  }
}
</style>