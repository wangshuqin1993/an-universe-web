<template>
  <div class="px-[120px]">
    <div class="h-[625px] flex items-center index-bg1">
      <div class="w-[580px]">
        <div class="text-[48px] leading-[84px] font-bold">
          <div class="text-[#FFFFFF]">Unlock Wisdom, Join</div>
          <div class="text-color-css">An-Universe</div>
        </div>
        <div class="text-[22px] leading-[35px] mt-[20px] mb-[40px] text-[#EEE9E9]">Return the value of knowledge to the
          one who create it！AIGC is helping us better realize this vision. Let’s build a universe driving by AI-Avatar and
          knowledge together!</div>
        <button class="btn-css">Start Now</button>
      </div>
    </div>
    <div>
      <div class="text-[48px] font-extrabold text-[#EBE6FA] text-center mt-[120px]">Our Top Planets</div>
      <div class="text-[18px] text-[#E2E1E4] text-center">We have been partner with many influencers</div>
      <div class="flex mt-[50px] justify-center items-center">
        <img src="@/assets/images/imgLogo1.png" class="img-w" />
        <div>
          <img src="@/assets/images/imgLogo2.png" class="img-w" />
          <img src="@/assets/images/imgLogo3.png" class="img-w" />
        </div>
        <div>
          <img src="@/assets/images/imgLogo4.png" class="img-w" />
          <img src="@/assets/images/imgLogo5.png" class="img-w" />
          <img src="@/assets/images/imgLogo6.png" class="img-w" />
        </div>
        <div>
          <img src="@/assets/images/imgLogo7.png" class="img-w" />
          <img src="@/assets/images/imgLogo8.png" class="img-w" />
        </div>
        <img src="@/assets/images/imgLogo9.png" class="img-w" />
      </div>
    </div>
  </div>
  <div>
    <div class="mt-[120px] flex justify-between">
      <div>
        <img src="@/assets/images/Component5.png" class="w-[263px] ml-[30px]" />
        <div class="bg-[#291C52] rounded-full flex ml-[270px] p-[8px]">
          <img src="@/assets/images/untitled2.png" class="w-[33px] " />
        </div>
      </div>
      <div class="mr-[120px]">
        <div class="flex justify-center">
          <img src="@/assets/images/Component4.png" class="w-[124px]" />
        </div>
        <div class="text-[48px] font-bold text-[#FFFFFF] mt-[20px]">
          To access to Star Creator <label class="text-color-css">AI-Avatar</label>,<br>Just buy the Key.
        </div>
      </div>
    </div>
    <div class="mt-[120px] flex justify-between">
      <img src="@/assets/images/Component7.png" class="w-[608px] ml-[30px]" />
      <div class="flex items-center mr-[120px]">
        <div class="w-[680px]">
          <div class="text-[48px] font-bold text-[#FFFFFF] leading-[84px]">Explore Diverse Knowledge Planets now!</div>
          <div class="text-[22px] text-[#EEE9E9] mt-[20px] italic">
            <div>AN Universe opens the gateway to diverse knowledge universes. Explore stars across various fields,
              gaining insights and experiences that align with your interests.</div>
            <div class="mt-[30px]">Connect directly with star creators whose content resonates with you. Interact, ask
              questions, and be part of a community where your engagement matters.</div>
          </div>
          <button class="btn-css mt-[30px]">Try It Now</button>
        </div>
      </div>
    </div>
    <div class="mt-[120px] flex justify-between">
      <div class="flex items-center ml-[120px]">
        <div class="w-[680px]">
          <div class="text-[48px] font-bold text-[#FFFFFF] leading-[84px]">Create to earn! Sharing your Knowledge.</div>
          <div class="text-[22px] text-[#EEE9E9] mt-[20px] italic">
            <div> AN Universe is your canvas to share your knowledge and creativity. Benefit from the exclusive AI Avatar,
              enhancing your connection with fans.</div>
            <div class="mt-[30px]">Transform your passion into a profession. AN Universe empowers you to monetize your
              knowledge and creations, offering a platform for financial growth and recognition.</div>
          </div>
          <button class="btn-css mt-[30px]">Try It Now</button>
        </div>
      </div>
      <img src="@/assets/images/Component7.png" class="w-[608px] mr-[30px]" />
    </div>
    <div class="fixed right-[30px] bottom-[30px] cursor-pointer">
      <a href="#top">
        <div class="bg-[#EBE6FA] rounded-full h-[56px] w-[56px] flex justify-center items-center ml-[15px] mb-[10px]">
          <img src="@/assets/images/Vector1.png" class="h-[16px]" />
        </div>
        <div class="text-[#EEE9E9]">Bact to Top</div>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.text-color-css {
  width: max-content;
  background: linear-gradient(245.29deg, #6DC1DC 13.32%, #A690FC 28.55%, #FC96BB 55.55%, #FFC397 84.12%), linear-gradient(0deg, #FFFFFF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.index-bg1 {
  background: url("@/assets/images/index-img1.png") no-repeat right #15083E;
  background-size: contain;

}

.img-w {
  width: 200px;
  height: fit-content;
}

.btn-css {
  background-color: #FBFAFF;
  color: #8C72FF;
  height: 55px;
  width: 150px;
  border-radius: 100px;
}</style>