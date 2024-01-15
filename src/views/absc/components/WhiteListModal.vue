<template>
  <a-modal v-model:open="openWhiteListModal" title="" :footer="null" width="660px" @cancel="closeModal">
    <div class="text-center">
      <div class="flex items-center justify-center text-center text-[21px] font-semibold mt-[50px] mb-[30px] ">
        Get your whitelist and win a better price for $ABSC token IDO
      </div>
      <div class="white-step">
        <!-- 第一步 -->
        <div class="flex white-step-item">
          <CheckCircleFilled v-if="whitelistAbscNFTdata.tokenId" :style="{ fontSize: '35px', color: '#E527FF' }" />
          <div v-else class="w-[37px] h-[37px] rounded-[50%] text-[18px] leading-[37px] font-semibold"
            :class="whitelistAbscNFTdata ? 'started-css' : 'not-started-css'">
            1
          </div>
          <div class="text-left mt-[8px] mb-[20px]  ml-[20px]">
            <div class="text-[16px] font-semibold white-step-item-title "
              :class="whitelistAbscNFTdata.tokenId ? 'started-css-title' : 'not-started-css-title'">Genesis NFT holder
              certification
            </div>
            <div class="text-[#929292] text-[12px]">Please connect your wallet to complete Genesis NFT holder
              certification</div>
            <div class="flex items-center mt-[10px]" v-if="whitelistAbscNFTdata.tokenId">
              <img src="@/assets/images/successful.png" class="h-[16px]" />
              <div class="text-[12px] text-[#28C57C] font-semibold ml-[5px]">Certification Successful</div>
            </div>
            <div class="flex items-top mt-[10px]" v-if="!whitelistAbscNFTdata.tokenId">
              <img src="@/assets/images/exclamation.png" class="h-[16px] w-[16px]" />
              <div class="text-[12px] text-[#737373] font-semibold ml-[5px]"> <span class="text-[#FF3653]">Certification
                  failed:</span> You
                can disconnect the wallet and log in
                to other wallets have Genesis NFT to continue verification.</div>
            </div>
          </div>
        </div>

        <!-- 第二部 -->
        <div class="flex white-step-item">
          <CheckCircleFilled v-if="whitelistVerifyData.result" :style="{ fontSize: '35px', color: '#E527FF' }" />
          <div v-else class="w-[37px] h-[37px] rounded-[50%] text-[18px] leading-[37px] font-semibold"
            :class="whitelistAbscNFTdata.tokenId ? 'started-css' : 'not-started-css'">
            2
          </div>
          <div class="text-left mt-[8px] mb-[20px]  ml-[20px]">
            <div class="text-[16px] font-semibold white-step-item-title "
              :class="whitelistAbscNFTdata.tokenId ? 'started-css-title' : 'not-started-css-title'">Burning ABSC
              Inscription</div>
            <div v-if="whitelistAbscNFTdata.tokenId">
              <div class="text-[#929292] text-[12px] font-normal mb-[20px]">Each whitelist requires a cost of 500000
                ABSC
                inscriptions
              </div>
              <div @click="startNow" v-if="!whitelistVerifyData.result"
                class="w-[120px] h-[32px] text-[#fff] text-[12px] font-semibold bg-[#000] rounded-[22px] text-center leading-[32px] cursor-pointer hover:opacity-[0.75]">
                Start Now</div>
              <div class="flex items-center" v-else>
                <img src="@/assets/images/successful.png" class="h-[16px] mr-[5px]" />
                <div>
                  You have obtained the <span class="text-[#28C57C]">{{ whitelistVerifyData.level }}</span> whitelist,
                  corresponding to your NFT
                  with Token ID <span class="text-[#28C57C]">{{ whitelistVerifyData.tokenId }}</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="parting-line"></div>
      <div class="text-center mt-[40px] font-normal ">
        <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledWhiteListBtn"
          @click="getWhiteListDone">done</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs, onMounted } from "vue";
import { CheckCircleFilled } from "@ant-design/icons-vue";
import useAssets from "@/stores/useAssets";
import { message } from "ant-design-vue";
import { AptosClient } from "aptos";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { apiWhitelistAbscNFT, apiWhitelistVerify, apiWhitelistApplication } from "@/apis/absc";
import { useWalletAddress } from "@/stores/useWalletAddress";
const { getImageURL } = useAssets();
const walletAddress = useWalletAddress();
const disabledWhiteListBtn = ref(true);
const amount = ref(10);
const abscNFTList = ref([]);
const aptosAddress = ref('');
const whitelistApplicationResult = ref(false);
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
const props = defineProps({
  openWhiteListModal: {
    type: Boolean,
    default: true,
  },
})
const whitelistAbscNFTdata = ref({});
const whitelistVerifyData = ref({});
const { openWhiteListModal } = toRefs(props)
const emit = defineEmits(['closeWhiteListModal', 'getWhiteListDone'])
const closeModal = () => {
  emit('closeWhiteListModal', false)
}

// 有NFT可以Start Now
const getApiWhitelistAbscNFT = async () => {
  const { data } = await apiWhitelistAbscNFT(walletAddress.walletAddress)
  whitelistAbscNFTdata.value = data;
  console.log(data)
}

const getWhiteListDone = () => {
  closeModal()
  emit('getWhiteListDone')
}

const startNow = async () => {
  try {
    const response = await window.okxwallet.aptos.connect();
    console.log(response);
    if (response.address) {
      aptosAddress.value = response.address;
      transactionApt20();
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 获取白名单资格
const getApiWhitelistVerify = async () => {
  const { data } = await apiWhitelistVerify(walletAddress.walletAddress)
  whitelistVerifyData.value = data;
  if (data.result) {
    disabledWhiteListBtn.value = false
  }
  console.log(data, 'apiWhitelistVerify')
}

const getApiWhitelistApplication = async (hash: string) => {
  const { data } = await apiWhitelistApplication(hash, aptosAddress.value, walletAddress.walletAddress)
  whitelistApplicationResult.value = data.result
}

// // 交易 APT20 
const transactionApt20 = async () => {
  let list = payableNFTs(abscNFTList.value, amount.value);
  console.log(list);
  const transaction = {
    arguments: [
      list, "0x3ba8ef462cf3831f09665284db095ad75aa7be15a47910a3304aab3b8ea7da30", amount.value],
    function: '0x1fc2f33ab6b624e3e632ba861b755fd8e61d2c2e6cf8292e415880b4c198224d::apts::split',
    type_arguments: [],
  };
  console.log(transaction);
  try {

    const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);
    const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
    const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
    );
    console.log(txn, 'txn')
    if (txn) {
      await getApiWhitelistApplication(txn.hash);
      getApiWhitelistVerify()
    }
  } catch (error) {
    message.error(error.message)
  }
}
// 返回可支付 apt 的 NFT 数组
const payableNFTs = (nfts: any[], amount: number) => {
  let num = 0;
  let list = [];
  for (let i = 0; i < nfts.length; i++) {
    num = num + nfts[i].token_properties.amt
    list.push(nfts[i].token_data_id);
    if (num > amount) {
      break;
    }
  }
  return list;
}

onMounted(() => {
  getApiWhitelistAbscNFT()
})


</script>
<style lang='less' scoped>
.wallet-item {
  padding: 8px 30px;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  background-color: #fff;
  border-radius: 22px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.13);
  margin-bottom: 20px;
}

.white-step-item {
  position: relative;
}

.white-step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  width: 1px;
  height: calc(100% - 37px);
  top: 37px;
  left: 18px;
  border-left: 1px solid #F0F0F0;
}

.parting-line {
  width: 100%;
  margin-top: 40px;
  border-top: 1px solid #F1F1F1;
}

.not-started-css {
  color: #5D5D5D;
  background-color: #F0F0F0;
}

.not-started-css-title {
  color: #73706E;
}

.started-css {
  color: #fff;
  background-color: #E527FF;
}

.started-css-title {
  color: #E527FF;
}

:deep(.anticon) {
  align-items: start;
}
</style> 