<template>
  <a-modal v-model:open="openWhiteListModal" title="" :footer="null" width="660px" @cancel="closeModal">
    <div class="text-center">
      <div class="flex items-center justify-center text-center text-[21px] font-semibold mt-[50px] mb-[30px] ">
        Get your whitelist and win a better price for $ABSC token IDO
      </div>
      <div class="white-step">
        <!-- 第一步 -->
        <div class="flex white-step-item">
          <div>
            <CheckCircleFilled v-if="whitelistAbscNFTdata.tokenId" :style="{ fontSize: '35px', color: '#E527FF' }" />
            <div v-else class="w-[37px] h-[37px] rounded-[50%] text-[18px] leading-[37px] font-semibold"
              :class="whitelistAbscNFTdata ? 'started-css' : 'not-started-css'">
              1
            </div>
          </div>
          <div class="text-left mt-[8px] mb-[20px]  ml-[20px]">
            <div class="text-[16px] font-semibold white-step-item-title "
              :class="whitelistAbscNFTdata.tokenId ? 'started-css-title' : 'not-started-css-title'">UR-level Genesis NFT
              holder
              certification
            </div>
            <div class="text-[#929292] text-[12px]">Please connect your wallet to complete Genesis NFT holder
              certification</div>
            <div v-if="check" class="text-[12px] text-[#E527FF] font-semibold ml-[5px] mt-[6px]">
              <LoadingOutlined class="text-[14px] mr-[8px]" /> checking...
            </div>
            <div v-else>
              <div class="flex items-center mt-[10px]" v-if="whitelistAbscNFTdata.tokenId">
                <img src="@/assets/images/successful.png" class="h-[16px]" />
                <div class="text-[12px] text-[#28C57C] font-semibold ml-[5px]">Certification Successful</div>
              </div>
              <div class="flex items-top mt-[10px]" v-if="!whitelistAbscNFTdata.tokenId">
                <img src="@/assets/images/exclamation.png" class="h-[16px] w-[16px]" />
                <div class="text-[12px] text-[#737373] font-semibold ml-[5px]"> <span class="text-[#FF3653]">Certification
                    failed:</span> You
                  can disconnect the wallet and log in
                  to other wallets have UR-level Genesis NFT to continue verification.</div>
              </div>
            </div>

          </div>
        </div>
        <!-- 第二部 -->
        <div class="flex white-step-item">
          <div>
            <CheckCircleFilled v-if="whitelistVerifyData.joined" :style="{ fontSize: '35px', color: '#E527FF' }" />
            <div v-else class="w-[37px] h-[37px] rounded-[50%] text-[18px] leading-[37px] font-semibold"
              :class="whitelistAbscNFTdata.tokenId ? 'started-css' : 'not-started-css'">
              2
            </div>
          </div>

          <div class=" text-left mt-[8px] mb-[20px] ml-[20px]">
            <div class="text-[16px] font-semibold white-step-item-title "
              :class="whitelistAbscNFTdata.tokenId ? 'started-css-title' : 'not-started-css-title'">Burning ABSC
              Inscription
            </div>
            <div v-if="whitelistAbscNFTdata.tokenId">
              <div class="text-[#929292] text-[12px] font-normal mb-[20px]">Each whitelist requires a cost of 500000
                ABSC
                inscriptions
              </div>
              <!-- <div @click="startNow" v-if="!whitelistVerifyData.joined"
                class="w-[120px] h-[32px] text-[#fff] text-[12px] font-semibold bg-[#000] rounded-[22px] text-center leading-[32px] cursor-pointer hover:opacity-[0.75]">
                Start Now
              </div> -->
              <a-button @click="startNow" v-if="!whitelistVerifyData.joined" :loading="startNowLoading"
                class="start-btn w-[120px] h-[32px] text-[#fff] text-[12px] font-semibold bg-[#000000] rounded-[22px] text-center hover:opacity-[0.75]">
                Start Now
              </a-button>
              <div class="flex items-center" v-else>
                <img src="@/assets/images/successful.png" class="h-[16px] mr-[5px]" />
                <div>
                  You have obtained the <span class="text-[#28C57C]">{{ LeveLabellEnums[whitelistVerifyData.level]
                  }}</span> whitelist,
                  corresponding to your NFT
                  with Token ID <span class="text-[#28C57C]">{{ whitelistVerifyData.tokenId }}</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <a-button @click="startNow" :loading="startNowLoading"
        class="start-btn w-[120px] h-[32px] text-[#fff] text-[12px] font-semibold bg-[#000000] rounded-[22px] text-center hover:opacity-[0.75]">
        Start Now
      </a-button> -->
      <div class="parting-line"></div>
      <div class="text-center mt-[40px] font-normal ">
        <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledWhiteListBtn"
          @click="getWhiteListDone">done</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs, onMounted, watch } from "vue";
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons-vue";
import useAssets from "@/stores/useAssets";
import { message } from "ant-design-vue";
import { AptosClient } from "aptos";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { apiAbscQualificationCheck, apiWhitelistVerify, apiWhitelistApplication } from "@/apis/absc";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { LeveLabellEnums } from "@/enums/levelLabel";
import gql from 'graphql-tag';
const { getImageURL } = useAssets();
const walletAddress = useWalletAddress();
const disabledWhiteListBtn = ref(true);
const amount = ref(500000);
const abscNFTList = ref([]);
const aptosAddress = ref('');
const whitelistApplicationResult = ref(false);
const startNowLoading = ref(false)
const abscBalance = ref(0)
const check = ref(false)
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

// 有 NFT 可以 Start Now
const getApiWhitelistAbscNFT = async () => {
  try {
    check.value = true;
    const { data } = await apiAbscQualificationCheck(walletAddress.walletAddress)
    whitelistAbscNFTdata.value = data;
    check.value = false;
    // console.log(data, '有 nft')
  } catch (error) {
    message.error(error.message)
    check.value = false;
  }
}

const getWhiteListDone = () => {
  emit('getWhiteListDone')
  closeModal()
}

const startNow = async () => {
  startNowLoading.value = true;
  try {
    const response = await window.okxwallet.aptos.connect();
    // console.log(response);
    if (response.address) {
      aptosAddress.value = response.address;
      transactionApt20();
    }
  } catch (error) {
    startNowLoading.value = false;
    message.error(error.message)
  }
}

// 获取白名单资格
const getApiWhitelistVerify = async () => {
  const { data } = await apiWhitelistVerify(walletAddress.walletAddress)
  whitelistVerifyData.value = data;
  if (data.joined) {
    disabledWhiteListBtn.value = false
  }
  // console.log(data, 'apiWhitelistVerify')
}

const getApiWhitelistApplication = async (hash: string) => {
  const res = await apiWhitelistApplication(hash, whitelistAbscNFTdata.value.tokenId, whitelistAbscNFTdata.value.level, walletAddress.walletAddress)
  if (res.code == 200) {
    whitelistApplicationResult.value = true
  } else {
    whitelistApplicationResult.value = false
  }
}

// // 交易 APT20 
const transactionApt20 = async () => {
  await getAbscBalance()
  let list = payableNFTs(abscNFTList.value, amount.value);
  if (list.length == 0) {
    throw new Error("Insufficient balance of ABSC inscriptions");
  }
  const transaction = {
    arguments: [
      list, "0x3ba8ef462cf3831f09665284db095ad75aa7be15a47910a3304aab3b8ea7da30", amount.value],
    function: '0x1fc2f33ab6b624e3e632ba861b755fd8e61d2c2e6cf8292e415880b4c198224d::apts::split',
    type_arguments: [],
  };
  // console.log(transaction);
  try {
    const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);
    const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
    const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
    );
    // // console.log(txn, 'txn')
    if (txn) {
      await getApiWhitelistApplication(txn.hash);
      getApiWhitelistVerify()
      getAbscBalance()
    }
    startNowLoading.value = false;
  } catch (error) {
    startNowLoading.value = false;
    message.error(error.message)
  }
}



// 返回可支付 apt 的 NFT 数组
const payableNFTs = (nfts: any[], amount: number) => {
  let num = 0;
  let list: string[] = [];
  for (let i = 0; i < nfts.length; i++) {
    num = num + Number(nfts[i].token_properties.amt)
    list.push(nfts[i].token_data_id);
    if (num >= amount) {
      break;
    }
  }
  //console.log("num",num)
  if (num < amount) {
    throw new Error("Insufficient balance of ABSC inscriptions");
  }
  return list;
}

const getAbscBalance = async () => {
  if (!aptosAddress.value || aptosAddress.value == "") {
    abscBalance.value = 0
    return;
  }
  let data = await getOwnersNFTs();
  abscNFTList.value = data.data.current_token_datas_v2;
  abscBalance.value = abscNFTList.value.reduce((prev: number, cur: { token_properties: { amt: number; }; }) => {
    return prev + Number(cur.token_properties.amt)
  }, 0)
}


const getOwnersNFTs = () => {
  return apolloClient.query({
    query: gql`query getOwnersNFTs($address:String) {
        current_token_datas_v2(
          where: {current_token_ownership: {owner_address: {_eq: $address }, amount: {_gt: "0"}}, current_collection: {creator_address: {_eq: "0xadeb45c274f9f4f535afe8957a8cf9ffecbd2b79026fba6c207111136d963f14"}, collection_name: {_eq: "ABSC"}}}
        ) {
          token_data_id
          token_properties
        }
      }`,
    variables: {
      address: aptosAddress.value,
    },
    fetchPolicy: "no-cache",
  })
}

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal != '') {
      //getApiWhitelistAbscNFT()
    }
  }, { deep: true, immediate: true }
);

watch(
  () => props.openWhiteListModal,
  async (newVal, _oldVal) => {
    if (newVal) {
      getApiWhitelistAbscNFT()
    }
  }, { deep: true, immediate: true }
);

onMounted(async () => {
  if (walletAddress.walletAddress) {
    //getApiWhitelistAbscNFT()
  }
})


</script>
<style lang='less' scoped>
.start-btn.ant-btn {
  background: #000000 !important;
}

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