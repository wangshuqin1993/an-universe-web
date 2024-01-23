<template>
  <abscHeader></abscHeader>
  <div class="w-full h-full bg-black pb-[75px] text-center">
    <div class="max-w-[1440px] mx-auto md:px-[0px] px-[32px]">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">$ABSC
          Token IDO</span></div>
      <div class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-center mt-[37px]">
        In order to provide a better IDO experience for users who hold ABSC Genesis NFTs, we have
        opened an exclusive IDO channel for them, and provided corresponding IDO price discounts and exclusive
        IDO quotas, as described below.
      </div>
    </div>
    <div>
      <div
        class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center mt-[49px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold md:text-[24px] text-[18px] text-[#fff]">{{
          NFTEquityTime.start }} am — {{
    NFTEquityTime.end }}
          am(UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] md:text-[18px] text-[14px]">Exchange time</span>
      </div>
      <div class="text-center mt-[40px]">
        <a-button class="w-[278px] h-[60px] rounded-[30px] text-[18px]" @click="handleExchangeModal"
          :disabled="disabled">{{ btnInfo }}
        </a-button>
      </div>
      <div v-if="NFTEquityTime.status == '2' && walletAddress.walletAddress" class="text-center text-[#fff] mt-[20px]">
        Your $ABSC balance:<span class="text-[#E527FF]">{{
          NFTEquityAmountData.abscAmount }}</span> ABSC
      </div>
      <div class="text-center text-[#FF3653] mt-[20px]">The $ABSC tokens you purchased in the IDO will be airdropped
        directly
        to your wallet soon. Please pay attention
        to check it.</div>
    </div>

    <div class="whitelist-absc-container w-[90%] md:max-w-[931px] py-[50px] mt-[70px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]">As the mapping token of
          the leading inscription ABSC based on APT-20 on the BSC chain, the $ABSC token

          will become the first mapping token of the Bmaker ecosystem and can be exchanged with BSC stablecoins

          based on the Bmaker ecosystem. $ABSC can also be staked toobtain the corresponding amount of Bmaker

          ecosystem stablecoins, which can be used on any chain supported by the BSC ecosystem. The $ABSC

          token is an important value support for the Bmaker ecosystem stablecoins.
        </span>
      </div>
      <div class="max-w-[798px] mx-auto md:px-[0px] px-[32px] md:pb-[64px] pb-[32px] text-center">
        <div class="flex flex-col items-center justify-center mt-[32px]">
          <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token IDO</span>
          <span class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-center mt-[24px] text-[16px]"> In order to provide
            a
            better IDO experience for users who hold ABSC Genesis NFTs, we have

            opened an exclusive IDO channel for them, and provided corresponding IDO price discounts and exclusive

            IDO quotas, as described below.
            <div class="mt-[12px]">
              Exchange time:{{ NFTEquityTime.start }} am—— {{ NFTEquityTime.end }} am (UTC+8)
            </div>
          </span>
        </div>
        <div class="flex flex-col justify-center mt-[32px]">
          <span class="text-[#fff] md:text-[18px] text-[14px] font-bold mb-[19px]">Whitelist information:</span>
          <a-table :columns="columns" :data-source="data" bordered :pagination="false"></a-table>
        </div>
      </div>

    </div>
  </div>
  <abscFooter></abscFooter>
  <whiteListBuyModal :openWhiteListBuyModal="openWhiteListBuyModal" pageName="NFT(Ido)"
    @getWhitelistSubscribeResult="getWhitelistSubscribeResult" @closeWhiteListBuyModal="openWhiteListBuyModal = false">
  </whiteListBuyModal>
  <selectWalletListModal :openSelectedWhiteListModal="openSelectedWhiteListModal"
    @closeSelectedWhiteListModal="closeSelectedWhiteListModal">
  </selectWalletListModal>
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue'
import { message } from "ant-design-vue";
import abscHeader from "@/components/absc-header.vue";
import abscFooter from "@/components/absc-Footer.vue";
import whiteListBuyModal from './components/whiteListBuyModal.vue';
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { apiNFTEquityCheck, apiNFTEquityTime, apiNFTEquityAmount, getBnbPrice } from "@/apis/absc"
const walletAddress = useWalletAddress()
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
  // {
  //   key: '1',
  //   type: 'UR',
  //   price: 13,
  //   quota: 'Discount voucher 70% during $ABSC IDO',
  // },
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

const disabled = ref(false);
const openWhiteListBuyModal = ref(false)
const openSelectedWhiteListModal = ref(false)
const NFTEquityCheck = ref(false);
const NFTEquityAmountData = ref({});
const NFTEquityTime = ref({});
const btnInfo = ref('IDO(coming soon)');
const handleExchangeModal = async () => {
  if (walletAddress.walletAddress) {
    await getApiNFTEquityCheck()
    NFTEquityCheck.value = true;
    if (NFTEquityCheck.value) {
      openWhiteListBuyModal.value = true;
    } else {
      message.info('This address does not qualify for nft interest!')
    }

  } else {
    openSelectedWhiteListModal.value = true
  }
}


const getApiNFTEquityCheck = async () => {
  try {
    const { data } = await apiNFTEquityCheck(walletAddress.walletAddress)
    NFTEquityCheck.value = data.result
  } catch (err) {
    message.error(err.message)
  }
}

// 连接钱包成功
const closeSelectedWhiteListModal = async () => {
  openSelectedWhiteListModal.value = false;

}

// 添加白名单时间
const getapiNFTEquityTime = async () => {
  const { data } = await apiNFTEquityTime()
  NFTEquityTime.value = data
  if (data.status == '1') {
    btnInfo.value = 'IDO(coming soon)';
    disabled.value = true;
  } else if (data.status == '2') {
    btnInfo.value = 'IDO';
    disabled.value = false;
    getApiNFTEquityAmount()
  } else {
    btnInfo.value = 'IDO has ended';
    disabled.value = true;
  }
}

const getApiNFTEquityAmount = async () => {
  const { data } = await apiNFTEquityAmount(walletAddress.walletAddress)
  NFTEquityAmountData.value = data
}

// 购买成功
const getWhitelistSubscribeResult = () => {
  getapiNFTEquityTime()
}

onMounted(() => {
  getapiNFTEquityTime()
  getBnbPrice().then((res) => {
    console.log(res);
  });
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal != '') {
      getapiNFTEquityTime()
    }
  }, { deep: true, immediate: true }
);

</script>
<style lang='less' scoped>
.title-text {
  font-family: Montserrat Black;
  text-align: center;
  font-weight: 900;
}

.title-text-color {
  background-image: linear-gradient(to right, #60638B 0%, #F9F9F9 25%, #FFFFFF 50%, #60638B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>