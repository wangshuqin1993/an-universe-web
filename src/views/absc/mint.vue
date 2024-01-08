
import { log } from 'console';

import { relative } from 'path';

<template>
  <div class="w-full h-full bg-black">
    <abscHeader></abscHeader>
    <div>
      <div class="absc-title"><span class="title-text ">BSC Golden Shovel</span></div>
      <div class="absc-sub-title">XXX is an experimental NFT project sponsored by X team, whose NFT works are all
        hand-painted
        and focused on different<br /> kinds and patterns of XXX.
      </div>
      <div class="absc-blind-container">
        <div class="absc-blind">Blind box activity</div>
        <span class="absc-blind-text">XXX is an experimental NFT project sponsored by X team,
          whose NFT works are all hand-painted and focused on different kinds and patterns of XXX.
          XXX is an experimental NFT project sponsored by X team,
          whose NFT works are all hand-painted and focused on different kinds and patterns of XXX.
        </span>
      </div>
    </div>
    <div>
      <div class="cursor-pointer min-btn hover:opacity-[0.85]" @click="connectWallet">
        <span class="min-btn-text " v-if="!address">CONNECT WALLET</span>
        <span class="min-btn-text " v-else @click="open = true">MINT</span>
      </div>
      <div class="text-[#fff]">{{ address }}</div>
      <!-- <div class="cursor-pointer min-btn hover:opacity-[0.85]">
        <span class="min-btn-text ml-[30px]" @click="getAbscBalance">获取余额{{ ':' + abscBalance }}</span>
      </div> -->

      <div v-if="address" class="mint-text">You have started <span class="!text-[#E527FF]">4</span> activity once,
        which costs <span class="!text-[#E527FF]">4000</span> $ABSC
      </div>

      <div class="w-full h-[565px] absc-core-img">
        <!-- <img src="@/assets/images/absc-core-show.png" class="w-full mx-auto" ref="coreImgRef" /> -->
      </div>
      <div class="">
        <div class="text-[#FFFFFF] font-[Montserrat Black] text-[36px] font-bold text-center">Your activity result</div>
        <div class="flex mt-[45px] justify-center gap-[30px] pb-[136px]">
          <div class="card-container" v-for="(item, index) in cardInfo" :key="index">
            <img :src="_" />
            <div class="text-[red] mb-[30px]">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>


  </div>

  <a-modal v-model:open="open" title="" @ok="handleOk" :footer="null">
    <div class="text-[14px] text-[#000] font-semibold mb-[20px] mt-[50px]">Please enter BSC address</div>
    <a-input class="h-[54px] bg-[#F3F3F3]" v-modal="toAddress" />
    <!-- <a-alert message="Note: BSC address is used to receive NFT" type="warning" show-icon /> -->
    <div class="text-[#737373] text-[12px] mt-[14px]">
      <ExclamationCircleTwoTone style="fontSize: 14px" />
      <span class="align-middle ml-[4px]">Note: BSC address is used to receive NFT</span>
    </div>
    <div class="cursor-pointer min-btn-tra hover:opacity-[0.85]" @click="getAbscBlindBoxNumber">
      <!-- <span class="text-[14px] text-[#fff]" @click="signTransaction">Mint</span> -->
      <span class="text-[14px] text-[#fff]">Mint</span>
    </div>
  </a-modal>

  <!-- <div class="absc-cube-container">
    <div class="close-btn">X</div>
    <div>
      <img src="@/assets/images/absc-cube.png" class="w-[450px] mx-auto pt-6"/>
    </div>
    <div class="font-[Montserrat] font-600 text-[#FFF] text-[14px]">Now you can check your draw results!</div>
    <div class="min-btn">
      <span class="min-btn-text">View Results</span>
    </div>
  </div> -->
  <ADModal :show="showModal">
    <div class="absc-cube-container">
      <div class="absolute left-[410px] top-[70px] cursor-pointer z-10" @click="showModalbtn">
        <span class="close-btn">X</span>
      </div>
      <div class="absolute">
        <img src="@/assets/images/absc-cube.png" class="w-[380px] mx-auto"/>
      </div>
      <div class="font-[Montserrat] font-600 text-[#FFF] text-[14px] absolute bottom-[350px]">Now you can check your draw results!</div>
      <div class="min-btn-modal absolute bottom-[280px]">
        <span class="min-btn-text">View Results</span>
      </div>
    </div>
  </ADModal>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ExclamationCircleTwoTone, setTwoToneColor } from "@ant-design/icons-vue"
import { message } from "ant-design-vue";
import abscHeader from "@/components/absc-header.vue";
import ADModal from '@/components/ADModal.vue';
import { AptosClient } from "aptos";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { apiAbscDraw, apiAbscRecord, apiAbscBlindBoxNumber, apiAbscBlindBoxById } from "@/apis/absc.ts"
import gql from 'graphql-tag';
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
const address = ref("");
const abscBalance = ref(0);
const abscNFTList = ref([]);
const toAddress = ref("");
const amount = ref();
const open = ref(false);
const showModal = ref(true)

const showModalbtn = ()=> {
  showModal.value = !showModal.value
  console.log('showModal.value:',showModal.value)
}

const recordData = reactive({})

const cardInfo = ref([
  {
    path: '1',
    content: 'Rarity: SS'
  },
  {
    path: '2',
    content: 'Rarity: A'
  },
  {
    path: '3',
    content: 'Rarity: S'
  },
  {
    path: '4',
    content: 'Rarity: C'
  }
])

const getAbscBlindBoxNumber = async () => {
  console.log('jjW')
  const { data } = await apiAbscBlindBoxNumber();
  console.log(data, 'data')
}

const getAbscRecord = async () => {
  const { data } = await apiAbscRecord(address.value)
  recordData.value = data;
}

const getAbscDraw = async () => {
  const { data } = await apiAbscDraw()
}


const getAbscBlindBoxById = async () => {
  const { data } = await apiAbscBlindBoxById()
}


// 连接钱包
const connectWallet = async () => {
  // if (typeof window.okxwallet !== 'undefined') { console.log(window.okxwallet, 'OKX is installed!'); }
  try {
    const response = await window.okxwallet.aptos.connect();
    console.log(response);
    address.value = response.address;
    getAbscRecord(address.value)
    // { address: string, publicKey: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
}

// 交易
const signTransaction = async () => {
  if (!toAddress.value) return message.error('Please enter BSC address!');
  const transaction = {
    arguments: [address.value, '717'],
    function: '0x1::coin::transfer',
    type: 'entry_function_payload',
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
  };

  try {
    const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);

    const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
    const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
    );

    console.log(txn, 'txn')

  } catch (error) {
    console.log(error);
    // see "Errors"
  }
}

// 获得 Absc 余额
const getAbscBalance = async () => {
  const res = await getOwnersNFTs(address.value).then(data => {
    console.log(data);
    abscNFTList.value = data.data.current_token_datas_v2;
    abscBalance.value = abscNFTList.value.reduce((prev: number, cur: { token_properties: { amt: number; }; }) => {
      return prev + Number(cur.token_properties.amt)
    }, 0)
  })
}

// 返回可支付 apt 的 NFT 数组
const payableNFTs = () => {
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
    const pendingTransaction = await window.okxwallet.aptos.signAndSubmitTransaction(transaction);

    const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
    const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
    );
  } catch (error) {
    console.log(error);
    // see "Errors"
  }
}

const getOwnersNFTs = (address: String) => {
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
      address: address,
    }
  })
}



onMounted(() => {
  if (typeof window.okxwallet !== 'undefined') { console.log(window.okxwallet, 'OKX is installed!'); }
  if (window.okxwallet) {
    address.value = window.okxwallet.aptos.selectedAccount.address;
    getAbscRecord(address.value)
  }

  console.log(coreImgRef.value.offsetHeight, 'iii')
})

</script>

<style scoped>
.contant {
  height: 500px;
  padding-top: 300px;
  background-image: url("../../assets/images/absc-core-show.png");
  background-size: 100% 100%;
  background-position: center;
}

.absc-title {
  font-family: Montserrat Black;
  font-size: 48px;
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
  width: 860px;
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

.min-btn {
  width: 278px;
  height: 60px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 0px;
}
.min-btn-modal{
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
  border-radius: 30px;
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
  font-size: 18px;
  font-family: Montserrat, Montserrat;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 22px;
}

.mint-text {
  width: 532px;
  font-size: 14px;
  font-family: Montserrat, Montserrat;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 18px;
  text-align: center;
  margin: 20px auto 0px;
}

.card-container {
  width: 278px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  text-align: center;
  padding: 30px 20px 0px 20px;
}

.absc-core-img {
  background-image: url("@/assets/images/absc-core-show.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  background-attachment: scroll;
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
  /* background: linear-gradient(180deg, #6F56FF 0%, #F320FF 21%, rgba(0,0,0,0) 100%); */
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