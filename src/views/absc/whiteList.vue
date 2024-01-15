
<template>
  <abscHeader></abscHeader>
  <div class="w-full h-full bg-black pb-[75px]">
    <div class="max-w-[1440px] mx-auto md:px-[0px] px-[32px]">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text">$ABSC Token IDO Whitelist</span></div>
      <div class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-center mt-[37px]">
        The $ABSC token IDO will be launched soon, and users with whitelist spots can enjoy corresponding price discounts.
        Users holding $BSC Genesis NFT can exchange for whitelist spots by burning ABSC inscriptions.
        Each exchange requires burning 500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
      </div>
    </div>
    <div>
      <div
        class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center mt-[49px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-[47px] border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold text-[24px] text-[#fff]">{{ startTime }} am — {{
          endTime }}
          am(UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] text-[18px]">Exchange time</span>
      </div>
      <div class="text-center mt-[40px]">
        <a-button class="w-[278px] h-[60px] rounded-[30px] text-[18px]" @click="handleExchangeModal"
          :disabled="disabled">{{ btnInfo
          }}</a-button>
      </div>
      <div v-if="whitelistSubscribeTime.status == '2' && walletAddress.walletAddress"
        class="text-center text-[#fff] mt-[20px]"> Your $ABSC balance：<span class="text-[#E527FF]">{{
          whitelistSubscribeAmountData.abscAmount }}</span> ABSC
      </div>
      <div v-if="whitelistVerifyData.result && walletAddress.walletAddress" class="text-center text-[#fff] mt-[20px]">You
        have
        obtained the <span class="text-[#E527FF]">{{
          whitelistVerifyData.level }}</span>
        whitelist,
        corresponding to your NFT with
        Token ID <span class="text-[#E527FF]">{{ whitelistVerifyData.tokenId }}</span></div>

      <!-- <div class="text-[14px] font-[Montserrat, Montserrat] font-medium text-[#fff] text-center mt-[19px] mb-[9px]">
        balance：<span class="text-[#F41FFF]">1200000</span> ABSC</div>
      <div
        class="w-[90%] md:w-full text-[14px] font-[Montserrat, Montserrat] font-medium text-[#fff] text-center mx-auto">
        You have obtained the <span class="text-[#F41FFF]">UR</span> whitelist, corresponding to your NFT with Token ID
        <span class="text-[#F41FFF]">1268</span>
      </div> -->
    </div>

    <div v-if="!whitelistSubscribeResult"
      class="whitelist-absc-container w-[90%] md:max-w-[931px] py-[50px] mt-[70px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]">As the governance token
          of
          the leading inscription ABSC based on APT-20 on the BSC chain,
          the $ABSC token will become the first governance token of the Bmaker ecosystem and can be exchanged with BSC
          stablecoins based on the Bmaker ecosystem.
          $ABSC can also be staked to obtain the corresponding amount of Bmaker ecosystem stablecoins,
          which can be used on any chain supported by the BSC ecosystem.
          The $ABSC token is an important value support for the Bmaker ecosystem stablecoins.
        </span>
      </div>
      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token IDO Whitelist</span>
        <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]">The $ABSC token IDO
          will
          be launched soon, and users with whitelist spots can enjoy corresponding price discounts.
          Users holding $BSC Genesis NFT can exchange for whitelist spots by burning ABSC inscriptions.
          Each exchange requires burning 500,000 ABSC inscriptions, and each address can only exchange once for each NFT.
          <div class="mt-[12px]">
            Exchange time：{{ whitelistAcquisitionTime.start }} am—— {{ whitelistAcquisitionTime.end }} am（UTC+8）
          </div>
        </span>
      </div>

      <div class="flex flex-col items-center justify-center mt-[32px]">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold mb-[19px]">Whitelist information:</span>
        <a-table :columns="columns" :data-source="data" bordered :pagination="false"></a-table>
      </div>
    </div>
  </div>

  <!-- <a-modal v-model:open="open" title="" :footer="null">
    <div class="text-[18px] text-[#000] font-semibold mb-[20px] mt-[50px] font-bold">Please enter BSC address</div>
    <a-input class="h-[54px] bg-[#F3F3F3]" v-model:value="bscAddress" placeholder="Please enter BSC address" />
    <div class="text-[#737373] text-[12px] mt-[14px]">
      <ExclamationCircleTwoTone style="fontSize: 14px" />
      <span class="align-middle ml-[4px]">Note: The BSC chain address is used to detect whether it is qualified for the
        redemption whitelist</span>
    </div>
    <div class="text-center mt-[40px]">
      <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" @click="handleExchangeNow">Exchange Now</a-button>
    </div>
  </a-modal> -->


  <WhiteListModal :openWhiteListModal="openWhiteListModal" @closeWhiteListModal="openWhiteListModal = false"
    @getWhiteListDone="getWhiteListDone">
  </WhiteListModal>
  <whiteListBuyModal :openWhiteListBuyModal="openWhiteListBuyModal"
    @getWhitelistSubscribeResult="getWhitelistSubscribeResult" @closeWhiteListBuyModal="openWhiteListBuyModal = false">
  </whiteListBuyModal>
  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="closeSelectedWhiteListModal">
  </selectWalletListModal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import abscHeader from "@/components/absc-header.vue";
import WhiteListModal from './components/WhiteListModal.vue';
import whiteListBuyModal from './components/whiteListBuyModal.vue';
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { apiWhitelistAcquisitionTime, apiWhitelistVerify, apiWhitelistSubscribeTime, apiWhitelistSubscribeAmount } from "@/apis/absc";
const walletAddress = useWalletAddress()

const open = ref(false)
const bscAddress = ref("");
const openWhiteListModal = ref(false);
const openWhiteListBuyModal = ref(false);
const openSelectedWhiteListModal = ref(false);
const whitelistSubscribeResult = ref(false);
const whitelistVerifyData = ref({});
const whitelistAbscNFTdata = ref({});
const whitelistAcquisitionTime = ref({});
const whitelistSubscribeTime = ref({});
const whitelistSubscribeAmountData = ref({});
const btnInfo = ref('');
const disabled = ref(false);
const startTime = ref('');
const endTime = ref('');


const columns = ref([
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center'
  },
  {
    title: 'IDO Quota',
    dataIndex: 'quota',
    key: 'quota',
    align: 'center'
  },
  {
    title: 'IDO Price',
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  }
]);

const data = ref([
  {
    key: '1',
    type: 'UR',
    price: 13,
    quota: 'Discount voucher 70% during $ABSC IDO',
  },
  {
    key: '2',
    type: 'SSR',
    price: 40,
    quota: 'Discount voucher 80% during $ABSC IDO',
  },
  {
    key: '3',
    type: 'SR',
    price: 65,
    quota: 'Discount voucher 90% during $ABSC IDO',
  },
  {
    key: '4',
    type: 'S',
    price: 130,
    quota: 'Voucher worth 80U during $ABSC IDO',
  },
  {
    key: '5',
    type: 'R',
    price: 260,
    quota: 'Voucher worth 50U during $ABSC IDO',
  },
  {
    key: '6',
    type: 'N',
    price: 492,
    quota: 'Voucher worth 30U during $ABSC IDO',
  },
]);

// 点击按钮
const handleExchangeModal = async () => {
  if (!walletAddress.walletAddress) return openSelectedWhiteListModal.value = true;
  if (btnInfo.value.includes('Whitelist')) {
    // 点击获取白名单
    await getApiWhitelistVerify();
    if (whitelistVerifyData.value && whitelistVerifyData.value.result) {
      // 有白名单判断IDO是否开始
      getApiWhitelistSubscribeTime()
    } else {
      // 没有白名单
      openWhiteListModal.value = true;
    }
  } else {
    await getApiWhitelistVerify();
    if (whitelistVerifyData.value && whitelistVerifyData.value.result) {
      // 有白名单判断IDO是否开始
      getApiWhitelistSubscribeTime()
      if (whitelistSubscribeTime.value.status === '2') {
        openWhiteListBuyModal.value = true;
      }
    }
    // openWhiteListBuyModal.value = true;
    // 点击开始IDO
  }

}

// 活动开始时间
const getApiWhitelistAcquisitionTime = async () => {
  const { data } = await apiWhitelistAcquisitionTime();
  whitelistAcquisitionTime.value = data
  if (data.status == '1') {
    btnInfo.value = 'Get Whitelist'
    disabled.value = true
  } else if (data.status == '2') {
    btnInfo.value = 'Get Whitelist'
    disabled.value = false;
    startTime.value = data.start
    endTime.value = data.end
  } else {
    btnInfo.value = '活动已结束';
    disabled.value = true;
  }

  console.log('认领的data', data)
}

// 添加白名单时间
const getApiWhitelistSubscribeTime = async () => {
  const { data } = await apiWhitelistSubscribeTime()
  whitelistSubscribeTime.value = data
  if (data.status == '1') {
    btnInfo.value = 'IDO(coming soon)';
    disabled.value = true;
  } else if (data.status == '2') {
    btnInfo.value = 'IDO';
    disabled.value = false;
    startTime.value = data.start
    endTime.value = data.end
    getApiWhitelistSubscribeAmount()
  } else {
    btnInfo.value = 'IDO已结束';
    disabled.value = true;
  }
}

const getApiWhitelistSubscribeAmount = async () => {
  const { data } = await apiWhitelistSubscribeAmount(walletAddress.walletAddress)
  whitelistSubscribeAmountData.value = data
}


const getWhiteListDone = () => {
  getApiWhitelistVerify()
  getApiWhitelistSubscribeTime()
}

// 连接钱包成功
const closeSelectedWhiteListModal = async () => {
  openSelectedWhiteListModal.value = false;
  await getApiWhitelistVerify()
  if (whitelistAbscNFTdata.value && whitelistAbscNFTdata.value.result) {
    // 有白名单判断IDO是否开始
    getApiWhitelistSubscribeTime()
  }
}

// 购买成功
const getWhitelistSubscribeResult = (result: boolean) => {
  whitelistSubscribeResult.value = result
}

// 用来判断是否有白名单
const getApiWhitelistVerify = async () => {
  const { data } = await apiWhitelistVerify(walletAddress.walletAddress)
  whitelistVerifyData.value = data;
}


// onMounted(async () => {
//   console.log('onMounted查看walletAddress：', walletAddress.walletAddress)
//   if (walletAddress.walletAddress) {
//     await getApiWhitelistVerify()
//     console.log(whitelistVerifyData.value, 'oioi')
//     if (whitelistVerifyData.value && whitelistVerifyData.value.result) {
//       // 有白名单判断IDO是否开始
//       getApiWhitelistSubscribeTime()
//     } else {
//       // 没有，判断认领是否开始
//       getApiWhitelistAcquisitionTime()
//     }
//   } else {
//     await getApiWhitelistAcquisitionTime()
//     if (whitelistAcquisitionTime.value.status !== '2') {
//       await getApiWhitelistSubscribeTime()

//       // startTime.value = whitelistSubscribeTime.value.start
//       // endTime.value = whitelistSubscribeTime.value.end
//     } else {
//       // 认领开始
//       // startTime.value = whitelistAcquisitionTime.value.start
//       // endTime.value = whitelistAcquisitionTime.value.end
//     }
//   }
// })

onMounted(async () => {
  console.log('onMounted查看walletAddress：', walletAddress.walletAddress)
  if (walletAddress.walletAddress) {
    await getApiWhitelistVerify()
    console.log(whitelistVerifyData.value, 'oioi')
    if (whitelistVerifyData.value && whitelistVerifyData.value.result) {
      // 有白名单判断IDO是否开始
      getApiWhitelistSubscribeTime()
      // startTime.value = whitelistSubscribeTime.start
      // endTime.value = whitelistSubscribeTime.end
    } else {
      // 没有，判断认领是否开始
      getApiWhitelistAcquisitionTime()
      // startTime.value = whitelistSubscribeTime.start
      // endTime.value = whitelistSubscribeTime.end
    }
  } else {
    // 认领是否开始
    await getApiWhitelistAcquisitionTime()
    if (whitelistAcquisitionTime.value.status == '1') {
      disabled.value = true;
      btnInfo.value = 'Get Whitelist'
    } else if (whitelistAcquisitionTime.value.status == '3') {
      getApiWhitelistSubscribeTime()
    }
    // if (whitelistAcquisitionTime.value.status !== '2') {
    //   await getApiWhitelistSubscribeTime()
    //   if (whitelistAcquisitionTime.value.status == '1') {
    //     disabled.value = true;
    //     btnInfo.value = 'Get Whitelist'
    //   } else if (whitelistAcquisitionTime.value.status == '3') {
    //     disabled.value = true;
    //     btnInfo.value = 'Get Whitelist'
    //   }

    //   // startTime.value = whitelistSubscribeTime.value.start
    //   // endTime.value = whitelistSubscribeTime.value.end
    // }

    // else {
    //   // 认领开始 显示认领时间
    //   // startTime.value = whitelistAcquisitionTime.value.start
    //   // endTime.value = whitelistAcquisitionTime.value.end
    // }
  }
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    console.log(newVal, 'new')
    if (newVal != '') {
      await getApiWhitelistVerify()
      if (whitelistVerifyData.value && whitelistVerifyData.value.result) {
        // 有白名单判断IDO是否开始
        console.log('有了白名单')
        getApiWhitelistSubscribeTime()
      } else {
        // 没有，判断认领是否开始
        getApiWhitelistAcquisitionTime()
      }
    } else {
      await getApiWhitelistAcquisitionTime()
      if (whitelistAcquisitionTime.value.status == '1') {
        disabled.value = true;
        btnInfo.value = 'Get Whitelist'
      } else if (whitelistAcquisitionTime.value.status == '3') {
        getApiWhitelistSubscribeTime()
      }
      // await getApiWhitelistAcquisitionTime()
      // if (whitelistAcquisitionTime.value.status !== '2') {
      //   // await getApiWhitelistSubscribeTime()
      //   if (whitelistAcquisitionTime.value.status == '1') {
      //     disabled.value = true;
      //     btnInfo.value = 'Get Whitelist'
      //   } else if (whitelistAcquisitionTime.value.status == '3') {
      //     disabled.value = true;
      //     btnInfo.value = 'Get Whitelist'
      //   }
      // }
    }
  }, { deep: true, immediate: true }
);
</script>

<style scoped lang="less">
.title-text {
  font-family: Montserrat Black;
  text-align: center;
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: te xt;
  background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 48px;
}

// .title-text- {
//   background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
// }

.min-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0;
  width: 278px;
  height: 60px;
  color: #fff;
  font-size: 18px;
  border-radius: 30px;
  cursor: pointer;
  background: linear-gradient(90deg, #6E56FF 0%, #F41FFF 100%);
}

.whitelist-absc-container {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border-color: transparent;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px round;
}
</style>