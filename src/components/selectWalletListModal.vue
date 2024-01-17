<template>
  <a-modal v-model:open="openSelectedWhiteListModal" title="" :footer="null" width="660px" @cancel="closeModal">
    <div>
      <div class="my-[20px] text-[14px] text-[#000] font-semibold">
        <div class="mb-[30px] text-[18px]">Connect Wallet</div>
        <div v-for="val in walletList " :key="val.name" @click="connectWallet(id)">
          <div class="flex wallet-item w-[50%] items-center cursor-pointer">
            <img :src="getImageURL(`${val.img}.png`)" class="h-[30px] mr-[18px]" />
            <div>{{ val.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs } from "vue";
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
const { openSelectedWhiteListModal } = toRefs(props)
const emit = defineEmits(['closeSelectedWhiteListModal'])
const closeModal = () => {
  emit('closeSelectedWhiteListModal')
}

// 连接钱包
const connectWallet = async (id: number) => {
  if (id === 1) {
    try {
      const response = await okxwallet.request({ method: 'eth_requestAccounts' });
      const res = await okxwallet.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
      if (window.okxwallet.selectedAddress) {
        let address = window.okxwallet.selectedAddress
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
    // 小狐狸地址
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ chainId: '0x61' }], });
    walletAddress.setWalletAddress(accounts[0]);
    closeModal()
    console.log(accounts, 'accounts')
  }

}
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