
<template>
  <div class="w-full h-screen bg-black pb-[75px] bg-container  md:px-[32px] px-[24px]">
    <div class="max-w-[1440px] mx-auto md:px-[0px] ">
      <div class="title-text md:pt-[166px] pt-[100px]"><span class="title-text-color md:text-[48px] text-[30px]">
          $ABSC Token IDO After Market Support</span></div>
      <div
        class="text-[#7C7C7C] w-[90%] md:w-[770px] w-full mx-auto text-justify md:mt-[37px] mt-[10px] text-[14px] md:text-[16px]">
        Due to technical breakthroughs achieved by Bmaker and after thorough discussion, the positioning and strategy of the $ABSC token have been adjusted.
        <br />
        Users who participated in the $ABSC initial DEX offering (IDO) before or during the first quarter of 2024 can apply for a 100% refund before April 1, 2024.
        <br />
        <br />
        To protect the safety of your assets, please follow the steps below:
        <br />
        <br />
        1.Please log in to the wallet that you used during the IDO activity.
        <br />
        2.Send the $tABSC tokens to the following address: <br />
        <div class="w-[90%] md:max-w-[450px] mt-[8px] px-[8px] py-[4px] text-[16px] text-[#fff] flex items-center bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid">
            <div>
              <span>{{ sendAddress }}</span>
            </div>
            <div class="ml-[5px]">
              <img @click="copyInfo(sendAddress)"
                   src="@/assets/images/copy.svg"
                   class="h-[19px] cursor-pointer"
              />
        </div>
        </div>
        <div class="mt-[12px]">
          <span>The token address for $tABSC is:</span>
          <div class="w-[90%] md:max-w-[450px] mt-[8px] px-[8px] py-[4px] text-[16px] text-[#fff] flex items-center bg-[#6C6C6C] bg-opacity-[0.09] rounded-full border border-[#463947] border-solid">
            <div>
              <span>{{ tokenAddress }}</span>
            </div>
            <div class="ml-[5px]">
              <img @click="copyInfo(tokenAddress)"
                   src="@/assets/images/copy.svg"
                   class="h-[19px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <br />
        3.We will verify and refund the BNB amount you used during the IDO activity back to the same wallet address you used for participation within 72 hours.
        <br />
        <br />
        Thank you for your ongoing support and understanding. Please contact us if you have any other questions.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from "ant-design-vue";
const refundModal = ref(false);
const claimModal = ref(false);
const isMobile = ref(false);
const sendAddress = ref('0x0108308Cc98f24545105972B2C865980e162Eb2D')
const tokenAddress = ref('0xc43C0e54b79286b3E66955A0dF9Aa49B76fc1798')

const copyInfo = async (address: any) => {
  // 存储传递过来的数据
  let copyAddress = address;
  // 创建一个input 元素
  let newInput = document.createElement("input");
  // 讲存储的数据赋值给input的value值
  newInput.value = copyAddress;
  // appendChild() 方法向节点添加最后一个子节点。
  document.body.appendChild(newInput);
  // 选中input元素中的文本
  // select() 方法用于选择该元素中的文本。
  newInput.select();
  // 执行浏览器复制命令
  try {
    //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
    await document.execCommand('Copy') // 执行浏览器复制命令
    // 清空输入框
    newInput.remove();
    message.success("copy success");
  } catch {
    message.error("copy failed");
  }
}
const getIsMobils = async () => {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  isMobile.value = isIOS || isAndroid;
}
onMounted(async () => {
  getIsMobils()
})


</script>

<style scoped lang="less">
.bg-container {
  background-image: url('../../assets/images/bg-total.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  min-height: 90vh;
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

.cancel-btn {
  font-family: Montserrat, Montserrat;
  font-weight: 400;
  width: 178px;
  height: 37px;
  border: 1px solid #FDE8FF;
  background-color: #FDE8FF;
  margin-right: 20px;
  border-radius: 5px;
  text-align: center;
  color: #252525;
  font-size: 14px;
  cursor: pointer;
  line-height: 37px;

  &:hover {
    opacity: 0.65;
  }
}

.claim-container {
  background: linear-gradient(152deg, rgba(60, 43, 157, 0.13) 0%, rgba(115, 10, 131, 0.15) 100%);
  border-radius: 16px;
  border-color: transparent;
  border: 1px solid;
  border-image: linear-gradient(134deg, rgba(110, 86, 255, 0.24), rgba(240, 33, 255, 0.16)) 16px round;
}

.container {
  display: inline;
}
</style>