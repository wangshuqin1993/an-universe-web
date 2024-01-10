<template>
  <div class="w-full h-full bg-black">

    <abscHeader></abscHeader>
    <div class="px-[32px] pt-[82px]">
      <div class="absc-title"><span class="title-text text-[30px] md:text-[48px]">BSC Golden Shovel</span></div>
      <div class="absc-sub-title">XXX is an experimental NFT project sponsored by X team, whose NFT works are all
        hand-painted
        and focused on different<br /> kinds and patterns of XXX.
      </div>
      <div class="absc-blind-container md:w-[860px] w-hull">
        <div class="absc-blind">Blind box activity</div>
        <span class="absc-blind-text w-hull">XXX is an experimental NFT project sponsored by X team,
          whose NFT works are all hand-painted and focused on different kinds and patterns of XXX.
          XXX is an experimental NFT project sponsored by X team,
          whose NFT works are all hand-painted and focused on different kinds and patterns of XXX.
        </span>
      </div>
    </div>
    <div class="">
      <div class="text-center mt-[40px]  px-[32px]" v-if="!address">
        <a-button class="h-[50px] md:h-[60px] w-[240px] md:w-[278px] rounded-[25px] md:rounded-[30px]"
          @click="connectWallet">CONNECT
          WALLET</a-button>
      </div>
      <div v-else class="text-center mt-[40px]  px-[32px]">
        <a-button class="h-[50px] md:h-[60px] w-[240px] md:w-[278px] rounded-[25px] md:rounded-[30px]"
          @click="showOpen">MINT</a-button>
      </div>



      <!-- 测试用 -->
      <!-- <div class="text-[#fff] text-center w-hull">{{ '已连接address: ' + address }}</div> -->
      <!-- 测试用btn -->
      <!-- <a-button class="h-[50px] md:h-[60px] w-[240px] md:w-[278px] rounded-[25px] md:rounded-[30px]">按钮</a-button> -->
      <!-- <div class="cursor-pointer min-btn hover:opacity-[0.85]">
        <span class="min-btn-text ml-[30px]" @click="getAbscBalance">获取余额{{ ':' + abscBalance }}</span>
      </div> -->

      <div v-if="address" class="mint-text md:w-[532px] w-hull px-[32px] ">You have started <span
          class="!text-[#E527FF]">{{
            recordData.length
          }}</span> activity once,
        which costs <span class="!text-[#E527FF]">{{ recordData.length * 10 }}</span> $ABSC
      </div>

      <!-- :style="{ height: coreImgHeight + 'px' }" -->
      <div class="relative">
        <div class="w-full h-full absc-core-img ">
          <img src="@/assets/images/absc-core-show.png" class="w-full mx-auto" ref="coreImgRef" />
        </div>
      </div>



      <div class="md:px-[0px] px-[32px] relative max-w-[1440px] mx-auto pb-[80px] md:pb-[156px]">
        <div
          class="text-[#FFFFFF] font-[Montserrat Black] mdtext-[21px] text-[20px] md:text-[36px] font-bold text-center absolute md:-top-[100px] -top-[70px] result-titile">
          Your
          activity
          result</div>
        <div v-if="recordData.length"
          class="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-[20px] md:gap-[30px] pb-[136px]">
          <div class="card-container" v-for="( item, index ) in  recordData " :key="index">
            <div v-if="!item?.child?.blank">
              <!-- getImageURL(`ABSC-NFT-0${item?.child?.level}.png`) -->
              <img :src="getImageURL(`ABSC-NFT-0${item?.child?.level}.png`)" class="rounded-[16px] mb-[30px]" />
              <div class="flex justify-center text-[#fff] md:text-[18px] text-[14px] font-extrabold">
                <div>Rarity:</div>
                <div>{{ item?.child?.level }}</div>
              </div>
            </div>

            <div v-else class="text-[#fff] md:text-[18px] text-[14px] font-extrabold">
              <!-- <div>I'm sorry I didn't win. Please try again next time</div> -->
              <img src="@/assets/images/null.png" class="rounded-[16px]" />
              <!-- <img src="@/assets/images/ABSC-NFT-01.png" class="h-[237px]" /> -->
              <div class="flex justify-center text-[#fff] md:text-[18px] text-[14px] font-extrabold mt-[20px]">
                <div>Rarity:</div>
                <div>{{ item?.child?.level }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else
          class="text-center flex justify-center items-center bg-[#FFFFFF] w-[80%] mx-auto h-[170px] md:h-[349px] bg-opacity-20 rounded-[16px] border border-opacity-20 border-[#fff]">
          <span class="text-[#7C7C7C] font-[Arial] text-[16px]">You haven’t obtained the NFT yet, please go to mint</span>
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:open="open" title="" :footer="null">
    <div class="text-[14px] text-[#000] font-semibold mb-[20px] mt-[50px]">Please enter BSC address</div>
    <a-input class="h-[54px] bg-[#F3F3F3]" v-model:value="toAddress" />
    <div class="text-[#737373] text-[12px] mt-[14px]">
      <ExclamationCircleTwoTone style="fontSize: 14px" />
      <span class="align-middle ml-[4px]">Note: BSC address is used to receive NFT</span>
    </div>
    <div class="text-center mt-[40px]">
      <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledMint"
        @click="transactionApt20">Mint</a-button>
    </div>
  </a-modal>

  <ADModal :show="showModal">
    <div class="absc-cube-container">
      <div class="absolute left-[410px] top-[70px] cursor-pointer z-10" @click="showModalbtn">
        <span class="close-btn">X</span>
      </div>
      <div class="absolute">
        <img src="@/assets/images/absc-cube.png" class="w-[380px] mx-auto" />
      </div>
      <div class="font-[Montserrat] font-600 text-[#FFF] text-[14px] absolute bottom-[350px]">Now you can check your draw
        results!</div>
      <div class="min-btn-modal absolute bottom-[280px]">
        <span class="min-btn-text">View Results</span>
      </div>
    </div>
  </ADModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ExclamationCircleTwoTone, setTwoToneColor } from "@ant-design/icons-vue"
import { message } from "ant-design-vue";
import abscHeader from "@/components/absc-header.vue";
import ADModal from '@/components/ADModal.vue';
import { AptosClient } from "aptos";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { apiAbscDraw, apiAbscRecord, apiAbscBlindBoxNumber, apiAbscBlindBoxById, apiAbscDrawCheck } from "@/apis/absc.ts";
import useAssets from "@/stores/useAssets";

const { getImageURL } = useAssets();
// import gql from 'graphql-tag';
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
const coreImgRef = ref();
const coreImgHeight = ref(0);
const surplusAmount = ref(false);
const abscDrawCheck = ref(0);
const address = ref("");
// const abscBalance = ref(0);
const abscNFTList = ref([]);
const toAddress = ref("");
const amount = ref(10);
const open = ref(false);
const showModal = ref(false)
const disabledMint = ref(false);

const showModalbtn = () => {
  showModal.value = !showModal.value
  console.log('showModal.value:', showModal.value)
}

const recordData = ref([])


const getAbscBlindBoxNumber = async () => {
  const { data } = await apiAbscBlindBoxNumber();
  surplusAmount.value = data
  console.log(data, '剩余抽奖次数')
}

const getAbscDrawCheck = async () => {
  const { data } = await apiAbscDrawCheck();
  abscDrawCheck.value = data.status
}


// 抽奖记录列表
const getAbscRecord = async () => {
  const { data } = await apiAbscRecord(address.value)
  recordData.value = data || [];
  recordData.value.map(async (item) => {
    item.child = await getAbscBlindBoxById(item.blindBoxId)
    // console.log('recordData.value:', recordData.value)
  })
}

// 抽奖接口
const getAbscDraw = async (hash: string) => {
  // "hash": "aptos转账的交易hash",
  // "aptAddress": "aptos的账户地址",
  // "mintAddress": "用户填写的mint的地址"
  const params = {
    hash: hash,
    aptAddress: address.value,
    mintAddress: toAddress.value,
  }
  const res = await apiAbscDraw(params);
  if (res.code === 200) {
    getAbscRecord();
    open.value = false;
  } else {

  }
}


const showOpen = () => {
  if (abscDrawCheck.value == 1) {
    return message.info('活动未开始')
  } else if (abscDrawCheck.value == 2) {
    if (!surplusAmount.value) {
      open.value = true
    } else {
      message.info('抽奖次数已用完')
    }
  } else if (abscDrawCheck.value == 3) {
    return message.info('活动已结束')
  }
}

// 列表详情
const getAbscBlindBoxById = async (id: string) => {
  const { data } = await apiAbscBlindBoxById(id)
  // console.log(data, '99999')
  return data
}


// 连接钱包
const connectWallet = async () => {
  if (typeof window.okxwallet == 'undefined') return message.info('请先安装OKX钱包')
  try {
    const response = await window.okxwallet.aptos.connect();
    // console.log(response);
    address.value = response.address;
    getAbscRecord()
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


// // 交易 APT20 
const transactionApt20 = async () => {
  if (!toAddress.value) return message.error('Please enter BSC address!');
  let list = payableNFTs(abscNFTList.value, amount.value);
  console.log(list);
  const transaction = {
    arguments: [
      list, toAddress.value, amount.value],
    function: '0x1fc2f33ab6b624e3e632ba861b755fd8e61d2c2e6cf8292e415880b4c198224d::apts::split',
    type_arguments: [],
  };
  console.log(transaction);
  try {
    open.value = false;
    toAddress.value = '';
    const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);
    const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
    const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
    );
    console.log(txn, 'txn')
    if (txn) {
      showModal.value = true;
      getAbscDraw(txn.hash)
    }
  } catch (error) {
    open.value = false;
    toAddress.value = '';
    message.error(error.message)
    console.log(error);
  }
}

onMounted(() => {
  if (typeof window.okxwallet !== 'undefined') { console.log(window.okxwallet, 'OKX is installed!'); }
  if (window.okxwallet.aptos.selectedAccount) {
    address.value = window.okxwallet.aptos.selectedAccount?.address;
    getAbscRecord()
  }
  getAbscBlindBoxNumber()
  getAbscDrawCheck()
})

</script>

<style scoped  lang="less">
// button:focus {
//   outline: none;
//   overflow: unset;
// }

// .ant-btn {
//   font-weight: bold;
//   background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
//   color: #ffffff;
//   border-color: transparent;
//   box-shadow: none;
//   border: none;

//   &:hover {
//     opacity: 0.85;
//   }
// }

// .ant-btn:hover,
// .ant-btn:active {
//   color: #ffffff;
//   box-shadow: none;
//   border: none;
// }

// :deep(.ant-btn-default) {
//   background-color: transparent;
//   border: none;
// }

.result-titile {
  left: 50%;
  transform: translateX(-50%);
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
  font-family: Arial;
  font-size: 16px;
  color: rgba(124, 124, 124, 1);
  text-align: center;
  margin-top: 32px;
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

// .absc-core-img {
//   background-image: url("@/assets/images/absc-core-show.png");
//   background-repeat: no-repeat;
//   background-position: center top;
//   background-size: contain;
//   background-attachment: scroll;
// }

.absc-cube-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 650px;
  margin-right: 150px;
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

.absc-cube-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 650px;
  margin-right: 150px;
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
</style>