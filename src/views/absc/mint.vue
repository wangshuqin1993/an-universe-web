<template>
  <abscHeader></abscHeader>
  <div class="w-full h-full">

    <div class="w-screen h-screen" :class="isMobile == true ? 'phone-bg1-container' : 'bg1-container'">
      <div class="px-[32px] pt-[82px]">
        <div class="absc-title "><span class="title-text text-[30px] md:text-[48px] ">$BSC Golden Shovel</span></div>
        <div class="absc-sub-title md:w-[860px] w-hull mx-auto">
          <div class="text-left">
            $BSC Golden Shovel is a collection of 1000 NFTs issued on
            the BSC chain. As the genesis NFT of the
            BMaker&$BSC project, it plays an important role in the subsequent
            development of the ecosystem.<br />
            According to different rarity, $BSC Golden Shovel NFT is divided into 6 levels, each level corresponding
            to different<br /> rights. You can lottery the BSC Golden Shovel NFT by burning ABSC inscriptions.
          </div>
        </div>
        <!-- <div class="absc-blind-container md:w-[860px] w-hull">
          <div class="absc-blind">Blind box activity</div>
          <span class="absc-blind-text w-hull">The blind box activity is an event set up for ABSC inscription holders to
            consume inscriptions and obtain

            the genesis NFT. Each participation in the event will consume 100,000 ABSC inscriptions. We wish every

            ABSC inscription holder can obtain their desired genesis NFT.
          </span>
        </div> -->
      </div>
      <div class="">
        <!--
        <div class="text-center mt-[40px]  px-[32px]" v-if="!walletAddress.walletAddress">
          <a-button class="h-[50px] md:h-[60px] w-[240px] md:w-[278px] rounded-[25px] md:rounded-[30px]"
            @click="connectWallet">Start now
          </a-button>
        </div>
      -->
        <div class="text-center mt-[30px] px-[32px]">
          <a-button :disabled="abscDrawCheck !== 2"
            class="h-[50px] md:h-[60px] w-[240px] md:w-[278px] rounded-[25px] md:rounded-[30px]" :loading="loading"
            @click="showOpen">Start now
          </a-button>
        </div>
        <div v-if="(abscDrawCheck == 1) || (abscDrawCheck == 3)" class="mint-text md:w-[532px] w-hull px-[32px] ">
         <div v-if="abscDrawCheck == 1">
            The activity has not started yet
          </div>
          <div v-if="abscDrawCheck == 3">
            <a class="text-[#017AFF] cursor-pointer underline text-[14px]" href="https://element.market/bsc">
              You can click to trade it in the market
            </a>
          </div>
        </div>
      </div>
      <div v-if="walletAddress.walletAddress" class="mint-text md:w-[532px] w-hull px-[32px] ">
        <div v-if="aptosAddress" class="mb-[8px]">balance: <span class="!text-[#E527FF]">{{ abscBalance }}</span> ABSC
        </div>
        <div>
          You have started
          <span class="!text-[#E527FF]">{{ recordData.length }}</span>
          activities,
          which costs <span class="!text-[#E527FF]">{{ recordData.length * 100000 }}</span> ABSC inscriptions
        </div>
      </div>
    </div>
  </div>
  <div class="w-screen" :class="isMobile == true ? 'phone-bg2-container' : 'bg2-container'">
    <div class="md:px-[0px] px-[32px] md:pt-[82px] pt-[0px] max-w-[1440px] mx-auto pb-[75px]">
      <div class="text-[#FFFFFF] font-[Montserrat Black] text-[20px] md:text-[36px] font-bold text-center mb-[20px]">
        Your activity result
      </div>
      <div class="text-[14px] mb-[10px] font-medium text-center text-[#FFFFFF]">Reveal Time: <span
          class="text-[#F41FFF]">Jan 19th 12:00 AM (UTC+8)</span></div>
      <div v-if="recordData.length"
        class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] pb-[136px]">
        <div class="card-container" v-for="( item, index ) in  recordData " :key="index">
          <div v-if="!item?.child?.blank">
            <img :src="getImageURL(`ABSC-NFT-0${item?.child?.level}.png`)" class="rounded-[16px] mb-[30px]" />
            <div class="flex justify-center text-[#fff] md:text-[18px] text-[14px] font-extrabold">
              <div>Rarity:</div>
              <!-- <div>{{ getLevelLabel(item?.child?.level) }}</div> -->
              <div>{{ LeveLabellEnums[item?.child?.level] }}</div>
            </div>
          </div>

          <div v-else class="text-[#fff] md:text-[18px] text-[14px] font-extrabold">
            <img src="@/assets/images/null.png" class="rounded-[16px]" />
            <div class="flex justify-center text-[#fff] md:text-[18px] text-[14px] font-extrabold mt-[20px]">
              <div>Didn't get reward</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else
        class="text-center flex justify-center items-center bg-[#FFFFFF] w-[80%] mx-auto h-[170px] md:h-[260px] bg-opacity-20 rounded-[16px] border border-opacity-20 border-[#fff]">
        <span class="text-[#7C7C7C] font-[Arial] text-[16px]">You haven't obtained the NFT yet, please go to mint</span>
      </div>
    </div>

    <div class="max-w-[798px] mx-auto text-center">
      <div class="font-[Montserrat Black] text-[#fff] text-[36px] font-black">NFT Description</div>
      <div class="font-[Arial] text-[#7C7C7C] text-[16px] mt-[29px] mx-auto leading-[18px]">
        <div>
          $BSC Golden Shovel is a collection of 1000 NFTs issued on
          the BSC chain. As the genesis NFT of the<br />
          BMaker&$BSC project, it plays an important role in the subsequent
          development of the ecosystem.<br />
        </div>
        <div class="mt-[20px] pb-[20px]">
          According to different rarity, $BSC Golden Shovel NFT is divided into 6 levels, each level corresponding
          to<br />
          different rights. You can lottery the BSC Golden Shovel NFT by burning ABSC inscriptions.
        </div>
      </div>
    </div>
  </div>

  <div class="bg-black">
    <nftDesc></nftDesc>
    <nftRights></nftRights>
  </div>
  <abscFooter></abscFooter>



  <a-modal v-model:open="open" title="" :footer="null" @cancel="loading=false">
    <div class="text-center">
      <div class="flex items-center justify-center text-center text-[21px] font-semibold mt-[50px] mb-[30px] ">
        <ExclamationCircleTwoTone style="fontSize: 20px" />
        <div class="ml-[10px]">Attention</div>
      </div>
      <div class="text-[#737373] text-[14px]">The NFT won from the blind box will be airdropped directly to your BSC
        wallet by Jan 19th 12am UTC+8.
        address:
        {{ walletAddress.walletAddress }}</div>
      <div class="text-center mt-[40px]">
        <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledMint" @click="gotIt">Got
          it</a-button>
      </div>
    </div>
  </a-modal>

  <ADModal :show="showModal">
    <div class="absc-cube-container">
      <div class="absolute right-[150px] top-[50px] z-10 cursor-pointer" @click="showModalbtn">
        <span class="close-btn">X</span>
      </div>
      <div class="absolute bg-black opacity-[0.85] p-[20px] rounded-[25px]">
        <img src="@/assets/images/absc-cube.png" class="w-[380px] mx-auto" />
      </div>
      <div class="font-[Montserrat] font-600 text-[#FFF] text-[14px] absolute bottom-[335px]">Now you can check your draw
        results!</div>
      <div class="absolute bottom-[272px]">
        <a-button class=" w-[198px] h-[40px] rounded-[25px]" @click="viewResult">View Results</a-button>
      </div>
    </div>
  </ADModal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ExclamationCircleTwoTone, setTwoToneColor } from "@ant-design/icons-vue"
import { message } from "ant-design-vue";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-Footer.vue";
import nftDesc from './components/nftDesc.vue';
import nftRights from "./components/nftRights.vue";
import ADModal from '@/components/ADModal.vue';
import { AptosClient } from "aptos";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { apiAbscDraw, apiAbscRecord, apiAbscBlindBoxNumber, apiAbscBlindBoxById, apiAbscDrawCheck } from "@/apis/absc";
import useAssets from "@/stores/useAssets";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { LeveLabellEnums } from "@/enums/levelLabel"
const walletAddress = useWalletAddress()
import gql from 'graphql-tag';
const { getImageURL } = useAssets();

setTwoToneColor('#FAAD14')
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

const surplusAmount = ref(false);
const abscDrawCheck = ref(0);
const abscBalance = ref(0);
const abscNFTList = ref([]);
const aptosAddress = ref("");
const amount = ref(10);
const open = ref(false);
const showModal = ref(false)
const loading = ref(false);
const disabledMint = ref(false);
const recordData = ref([])
const isMobile = ref(false)
const isOKApp = ref(false)

const showModalbtn = () => {
  showModal.value = !showModal.value
  console.log('showModal.value:', showModal.value)
}

const getAbscBlindBoxNumber = async () => {
  const { data } = await apiAbscBlindBoxNumber();
  surplusAmount.value = data
  //console.log(data, '剩余抽奖次数')
}

const getAbscDrawCheck = async () => {
  const { data } = await apiAbscDrawCheck();
  abscDrawCheck.value = data.status
}


// 抽奖记录列表
const getAbscRecord = async () => {
  const { data } = await apiAbscRecord(walletAddress.walletAddress)
  recordData.value = data || [];
  //  recordData.value = [];

  recordData.value.map(async (item) => {
    item.child = await getAbscBlindBoxById(item.blindBoxId)
  })
}

// 抽奖接口
const getAbscDraw = async (hash: string) => {
  // "hash": "aptos 转账的交易 hash",
  // "aptAddress": "aptos 的账户地址",
  // "mintAddress": "用户填写的 mint 的地址"
  const params = {
    hash: hash,
    aptAddress: aptosAddress.value,
    mintAddress: walletAddress.walletAddress,
  }
  const res = await apiAbscDraw(params);
  if (res.code === 200) {
    getAbscRecord();
    open.value = false;
  } else {

  }
}


const showOpen = async () => {
  if (!surplusAmount.value) {
    if (!walletAddress.walletAddress) {
      await connectWallet();
    }
    if (walletAddress.walletAddress) {
      const response = await window.okxwallet?.aptos.connect();
      if (response.address) {
        loading.value = true;
        aptosAddress.value = response.address;
        await getAbscBalance()
        open.value = true;
      } else {
        message.error("Aptos Wallet without link")
      }
    } else {
      message.error("Wallet without link")
    }
  } else {
    message.info('The activity has ended')
  }
}

// 列表详情
const getAbscBlindBoxById = async (id: string) => {
  const { data } = await apiAbscBlindBoxById(id)
  // console.log(data, '99999')
  return data
}

const viewResult = () => {
  showModal.value = false;
  document.documentElement.scrollTop = 600
}


const gotIt = async () => {
  try {
    open.value = false;
    loading.value = true;
    await transactionApt20()
  } catch (error) {
    open.value = false;
    loading.value = false;
    message.error(error.message);
    console.error(error);
  }
}

// connectWallet
const connectWallet = async () => {
  try {
    if (isMobile.value && !isOKApp.value) {
      const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent('https://absc-mint.hamster.newtouch.com'));
      window.location.href = encodedUrl;
    } else {
      await okxwallet.request({ method: 'eth_requestAccounts' });
      await okxwallet.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
      if (window.okxwallet?.selectedAddress) {
        let address = window.okxwallet.selectedAddress
        walletAddress.setWalletAddress(address);
        getAbscRecord()
      } else {
        message.info('Please provide a wallet that supports BSC!')
      }
    }
  } catch (err) {
    message.error(err.message)
  }

}

// 返回可支付 apt 的 NFT 数组
const payableNFTs = (nfts: any[], amount: number) => {
  let num = 0;
  let list: string[] = [];
  for (let i = 0; i < nfts.length; i++) {
    num = num + nfts[i].token_properties.amt
    list.push(nfts[i].token_data_id);
    if (num > amount) {
      break;
    }
  }
  if (num < amount) {
    throw new Error("Insufficient balance of ABSC inscriptions");
  }
  return list;
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
  console.log("tx", transaction);
  const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);
  const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
  const txn = await client.waitForTransactionWithResult(
    pendingTransaction.hash,
    {
      checkSuccess: true
    }
  );
  console.log(txn, 'txn')
  showModal.value = true;
  loading.value = false;
  await getAbscDraw(txn.hash);
  await getAbscBalance()
}

const getAbscBalance = async () => {
  if (!aptosAddress.value || aptosAddress.value == "") {
    abscBalance.value = 0
    return;
  }
  console.log("getAbscBalance")
  let data = await getOwnersNFTs();
  console.log("getAbscBalance data", data.data.current_token_datas_v2)
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

const getIsMobils = () => {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  isMobile.value = isIOS || isAndroid;
  isOKApp.value = /OKApp/i.test(ua);
}


onMounted(async () => {
  // if (typeof window.okxwallet !== 'undefined') { console.log(window.okxwallet, 'OKX is installed!'); }
  await getIsMobils()
  
  if (window.okxwallet?.selectedAddress) {
    let address = window.okxwallet.selectedAddress;
    walletAddress.setWalletAddress(address);
    getAbscRecord()
  }

  getAbscBlindBoxNumber()
  getAbscDrawCheck()
})


watch(
  () => walletAddress.walletAddress,
  (newVal, _oldVal) => {
    if (newVal) {
      getAbscRecord()
    } else {
      recordData.value = [];
    }
  }, { deep: true, immediate: true }
);

// const levelLabel = new Map();
// levelLabel.set(1, 'UR');
// levelLabel.set(2, 'SSR');
// levelLabel.set(3, 'SR');
// levelLabel.set(4, 'S');
// levelLabel.set(5, 'R');
// levelLabel.set(6, 'N');

// const getLevelLabel = (level: number): string => {
//   return levelLabel.get(level)
// }

</script>

<style scoped  lang="less">
@media screen and (max-width: 1350px) {
  .bg1-container {
    height: 100vh;
    background-image: url("../../assets/images/mint-bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center !important;
    background-clip: content-box !important;
  }

  .phone-bg1-container {
    height: 100vh;
    background-image: url("../../assets/images/phone-mint-bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center !important;
    background-clip: content-box !important;
  }

  .bg2-container {
   // height: 100vh;
   // height: 100%;
    background-image: url("../../assets/images/mint-bg2.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center !important;
    background-clip: content-box !important;
  }

  .phone-bg2-container {
    height: 100vh;
    background-image: url("../../assets/images/phone-mint-bg2.jpg");
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center !important;
    background-clip: content-box !important;
  }
}
.bg1-container {
  // position: relative;
  background-image: url("../../assets/images/mint-bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.phone-bg1-container {
  background-image: url("../../assets/images/phone-mint-bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.bg2-container {
  background-image: url("../../assets/images/mint-bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100%;
}

.phone-bg2-container {
  background-image: url("../../assets/images/phone-mint-bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}


.contant {
  // min-height: 180vh;
  // background-image: url("../../assets/images/absc-core-show.png");
  background-image: url("../../assets/images/absc-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  // max-height: 120vh;
  // background-attachment: fixed;
  // background-position: top 300px right 0px;
}

.absc-title {
  font-family: Montserrat Black;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  padding-top: 80px;
}

.absc-sub-title {
  background: rgba(213,165,0,0.15);
  padding: 15px 24px;
  border-radius: 10px;
  backdrop-filter: blur(0px);
  font-family: Arial;
  font-size: 16px;
  color: #B3B3B3;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
  line-height: 18px;
}

.title-text {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.absc-blind-container {
  padding: 20px 41px 27px 41px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  backdrop-filter: blur(0px);
  margin: 20px auto 0px;
}

.absc-blind {
  font-family: Montserrat-Bold;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}

.absc-blind-text {
  padding-top: 12px;
  width: 778px;
  font-size: 12px;
  font-family: Montserrat, Montserrat;
  font-weight: 500;
  color: #7C7C7C;
  line-height: 15px;
}

.min-btn-modal {
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 0px;
  cursor: pointer;
}

.min-btn-tra {
  width: 178px;
  height: 38px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 0px;
}

.min-btn-text {
  font-family: Montserrat, Montserrat;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 22px;
}

.mint-text {
  font-size: 14px;
  font-family: Montserrat, Montserrat;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 18px;
  text-align: center;
  margin: 20px auto 0px;
}

.card-container {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  text-align: center;
  padding: 30px 20px;
}

.absc-cube-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 650px;
  text-align: center;
  opacity: 1;
}

.close-btn {
  width: 28px;
  height: 28px;
  opacity: 0.7;
  border: 1px solid #FFF;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}



.close-btn {
  width: 28px;
  height: 28px;
  opacity: 0.7;
  border: 1px solid #FFF;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>