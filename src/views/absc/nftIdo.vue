<template>
  <div class="w-full h-full bg-black pb-[75px] text-center bg-container">
    <div class="max-w-[1440px] mx-auto md:px-[0px] px-[32px]">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">$ABSC
          Token IDO</span></div>
      <div
        class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-justify md:mt-[37px] mt-[10px] text-[14px] md:text-[16px]">
        In order to provide a better IDO experience for users who hold ABSC Genesis NFTs, we have
        opened an exclusive IDO channel for them, and provided corresponding IDO price discounts and exclusive
        IDO quotas, as described below.
      </div>
    </div>
    <div>
      <div
        class="flex items-center flex-col justify-center w-[90%] md:max-w-[646px] text-center md:mt-[49px] mt-[30px] bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid mx-auto">
        <span class="pt-[15px] px-[21px] font-bold md:text-[20px] text-[16px] text-[#fff]">{{
          startExchangeTime }} — {{
    endExchangeTime }}
          (UTC+8)</span>
        <span class="pb-[15px] text-[#8D8D8D] md:text-[18px] text-[14px]">Exchange time</span>
      </div>
      <div class="text-center md:mt-[40px] mt-[20px]">
        <a-button class="w-[278px] h-[60px] rounded-[30px] text-[18px]" @click="handleExchangeModal" :loading="btnLoading"
          :disabled="disabled">{{ btnInfo }}
        </a-button>
      </div>
      <div v-if="NFTEquityTime.status == '2' && walletAddress.walletAddress" class="text-center text-[#fff] mt-[20px]">
        Your $ABSC balance: <span class="text-[#E527FF]">{{
          NFTEquityAmountData.abscAmount }}</span> ABSC
      </div>
      <div class="text-center text-[#FFF] mt-[20px] text-[14px]">The $ABSC tokens you purchased in the IDO will be
        airdropped
        directly
        to your wallet soon. Please pay attention
        to check it.</div>
    </div>

    <div
      class="whitelist-absc-container w-[90%] md:max-w-[931px] md:py-[50px] px-[10px] py-[30px] md:mt-[70px] mt-[60px] mx-auto">
      <div class="flex flex-col items-center justify-center">
        <span class="text-[#fff] md:text-[18px] text-[14px] font-bold">$ABSC Token</span>
        <span
          class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">As
          the mapping token of
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
          <span
            class="text-[#7C7C7C] md:w-[770px] w-full mx-auto text-justify md:mt-[24px] mt-[10px] md:text-[16px] text-[14px]">
            In order to provide
            a
            better IDO experience for users who hold ABSC Genesis NFTs, we have

            opened an exclusive IDO channel for them, and provided corresponding IDO price discounts and exclusive

            IDO quotas, as described below.
            <div class="mt-[12px] text-center">
              Exchange time:{{ startExchangeTime }} —— {{ endExchangeTime }} (UTC+8)
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

  <a-modal v-model:open="showConfirmModal" title="" :footer="null">
    <div class="text-center">
      <div class="text-[18px] mt-[20px] ">Attention</div>
      <div class="text-[14px] text-left">You do not hold ABSC Genesis NFTs or the NFT rights have been used, so you do not
        have
        access to the exclusive
        IDO channel.<br />
        Ways to obtain the whitelist.</div>
      <div class="text-center mt-[20px]">
        <!-- showConfirmModal = false -->
        <a-button @click="toGotIt" class="w-[158px] h-[41px]">Got it</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue'
import { message } from "ant-design-vue";
import abscFooter from "@/components/absc-Footer.vue";
import whiteListBuyModal from './components/whiteListBuyModal.vue';
import selectWalletListModal from "@/components/selectWalletListModal.vue";
import { useWalletAddress } from "@/stores/useWalletAddress";
import { apiNFTEquityCheck, apiNFTEquityTime, apiNFTEquityAmount, getBnbPrice } from "@/apis/absc";
import { PurchaseValueEnums } from "@/enums/levelLabel"
const walletAddress = useWalletAddress()
const columns = ref([
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
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
  },

]);

const data = ref([
  {
    key: '2',
    level: 'SSR',
    price: 'Discount voucher 80% during $ABSC IDO',
    quota: `${PurchaseValueEnums['min']}u<=Q<=${PurchaseValueEnums['max']}u`,
  },
  {
    key: '3',
    level: 'SR',
    price: 'Discount voucher 90% during $ABSC IDO',
    quota: `${PurchaseValueEnums['min']}u<=Q<=${PurchaseValueEnums['max']}u`,
  },
  {
    key: '4',
    level: 'S',
    price: 'Voucher worth 80U during $ABSC IDO',
    quota: `${PurchaseValueEnums['min']}u<=Q<=${PurchaseValueEnums['max']}u`,
  },
  {
    key: '5',
    level: 'R',
    price: 'Voucher worth 50U during $ABSC IDO',
    quota: `${PurchaseValueEnums['min']}u<=Q<=${PurchaseValueEnums['max']}u`,
  },
  {
    key: '6',
    level: 'N',
    price: 'Voucher worth 30U during $ABSC IDO',
    quota: `${PurchaseValueEnums['min']}u<=Q<=${PurchaseValueEnums['max']}u`,
  },
]);

const disabled = ref(true);
const btnLoading = ref(false)
const openWhiteListBuyModal = ref(false)
const openSelectedWhiteListModal = ref(false)
const NFTEquityCheck = ref(false);
const showConfirmModal = ref(false)
const NFTEquityAmountData = ref({});
const NFTEquityTime = ref({});
const startExchangeTime = ref('')
const endExchangeTime = ref('')
const btnInfo = ref('IDO(coming soon)');
const handleExchangeModal = async () => {
  btnLoading.value = true
  if (walletAddress.walletAddress) {
    await getApiNFTEquityCheck()
    if (NFTEquityCheck.value) {
      openWhiteListBuyModal.value = true;
    } else {
      showConfirmModal.value = true;
      // message.info('This address does not qualify for nft interest!')
    }
    btnLoading.value = false
  } else {
    openSelectedWhiteListModal.value = true
    btnLoading.value = false
  }
}


const toGotIt = () => {
  showConfirmModal.value = false;
  window.open(`${import.meta.env.VITE_ElEMENT_URL}`)
}

const getApiNFTEquityCheck = async () => {
  try {
    const { data } = await apiNFTEquityCheck(walletAddress.walletAddress)
    NFTEquityCheck.value = data.result
    // NFTEquityCheck.value = false
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
  startExchangeTime.value = NFTEquityTime.value.start
  endExchangeTime.value = NFTEquityTime.value.end
  console.log('NFTEquityTime.value', NFTEquityTime.value)
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
    // console.log(res);
  });
})

watch(
  () => walletAddress.walletAddress,
  async (newVal, _oldVal) => {
    if (newVal != '') {
      getapiNFTEquityTime()
    }
  }, { deep: true, immediate: false }
);

</script>
<style lang='less' scoped>
.bg-container {
  background-image: url('../../assets/images/bg-total.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.whitelist-absc-container {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px 16px;
}

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