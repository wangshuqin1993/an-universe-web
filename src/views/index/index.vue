<template>
  <div class="w-full h-full px-[32px]">
    <div class="main-content">
      <Header></Header>
      <div class="">
        <div class="md:h-[625px] pt-[38px] md:pt-[0px] flex items-center index-bg1 ">
          <div class="w-[580px]">
            <div class="text-[24px] md:text-[48px] leading-[42px] md:leading-[84px] font-bold">
              <div class="text-[#FFFFFF]">Unlock Wisdom, Join</div>
              <div class="text-color-css">An-Universe</div>
            </div>
            <div class="md:text-[22px] text-[16px] leading-[35px] mt-[20px] mb-[40px] text-[#EEE9E9]">Return the value of
              knowledge to
              the
              one who create it！AIGC is helping us better realize this vision. Let’s build a universe driving by AI-Avatar
              and
              knowledge together!</div>
            <button class="btn-css text-xs md:text-base w-[120px] h-[35px] md:h-[55px] md:w-[150px]">Start Now</button>
          </div>
        </div>
        <div>
          <div class="text-[24px] md:text-[48px] font-extrabold text-[#EBE6FA] text-center mt-[80px] md:mt-[120px]">Our
            Top Planets</div>
          <div class="text-[18px] text-[#E2E1E4] text-center">We have been partner with many influencers</div>
          <div class="flex mt-[50px] justify-center items-center">
            <img src="@/assets/images/imgLogo1.png" class="img-w" />
            <div class="img-w">
              <img src="@/assets/images/imgLogo2.png" />
              <img src="@/assets/images/imgLogo3.png" />
            </div>
            <div class="img-w">
              <img src="@/assets/images/imgLogo4.png" />
              <img src="@/assets/images/imgLogo5.png" />
              <img src="@/assets/images/imgLogo6.png" />
            </div>
            <div class="img-w">
              <img src="@/assets/images/imgLogo7.png" />
              <img src="@/assets/images/imgLogo8.png" />
            </div>
            <img src="@/assets/images/imgLogo9.png" class="img-w" />
          </div>
        </div>
      </div>
      <div>
        <div class="mt-[80px] md:mt-[120px] flex justify-between">
          <div class="hidden md:block">
            <img src="@/assets/images/Component5.png" class="w-[263px] ml-[30px]" />
            <div class="bg-[#291C52] rounded-full flex ml-[270px] p-[8px]">
              <img src="@/assets/images/untitled2.png" class="w-[33px] " />
            </div>
          </div>
          <div class="md:mr-[120px]">
            <div class="flex justify-center">
              <img src="@/assets/images/Component4.png" class="w-[124px]" />
            </div>
            <div class="text-[24px] md:text-[48px] font-bold text-[#FFFFFF] mt-[20px]">
              To access to Star Creator <label class="text-color-css">AI-Avatar</label>,<br>Just buy the Key.
            </div>
          </div>
        </div>
        <div class="mt-[80px] md:mt-[120px] md:flex md:justify-between">
          <img src="@/assets/images/Component7.png"
            class="mx-auto md:mx-0 w-[50%] md:w-[100%] md:w-[608px] md:ml-[30px]" />
          <div class="md:flex md:items-center md:mr-[120px]">
            <div class="md:w-[680px]">
              <div class="text-[24px] md:text-[48px] font-bold text-[#FFFFFF] leading-[42px] md:leading-[84px]">Explore
                Diverse Knowledge Planets now!</div>
              <div class="text-[16px] md:text-[22px] text-[#EEE9E9] mt-[20px] italic">
                <div>AN Universe opens the gateway to diverse knowledge universes. Explore stars across various fields,
                  gaining insights and experiences that align with your interests.</div>
                <div class="mt-[30px]">Connect directly with star creators whose content resonates with you. Interact, ask
                  questions, and be part of a community where your engagement matters.</div>
              </div>
              <button class="btn-css text-xs md:text-base h-[35px] w-[120px] md:h-[55px] md:w-[150px] mt-[30px]">Try It
                Now</button>
            </div>
          </div>
        </div>
        <div class="mt-[80px] md:mt-[120px] flex md:flex-nowrap flex-wrap-reverse md:justify-between">
          <div class="md:flex md:items-center md:ml-[120px]">
            <div class=" md:w-[680px]">
              <div class="text-[24px] md:text-[48px] font-bold text-[#FFFFFF] leading-[42px] md:leading-[84px]">Create to
                earn! Sharing your Knowledge.</div>
              <div class="text-[16px] md:text-[22px] text-[#EEE9E9] mt-[20px] italic">
                <div> AN Universe is your canvas to share your knowledge and creativity. Benefit from the exclusive AI
                  Avatar,
                  enhancing your connection with fans.</div>
                <div class="mt-[30px]">Transform your passion into a profession. AN Universe empowers you to monetize your
                  knowledge and creations, offering a platform for financial growth and recognition.</div>
              </div>
              <button class="btn-css text-xs md:text-base h-[35px] w-[120px] md:h-[55px] md:w-[150px] mt-[30px]">Try It
                Now</button>
            </div>
          </div>
          <img src="@/assets/images/Component7.png"
            class="mx-auto md:mx-0 w-[50%] md:w-[100%] md:w-[608px] md:mr-[30px]" />
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
      <Footer></Footer>
    </div>

  </div>
</template>
<script setup lang="ts">
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
</script>
<style scoped>
.main-content {
  max-width: 1440px;
  margin: 0 auto;
}

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
  width: 20%;
  height: fit-content;
}

.btn-css {
  background-color: #ffffff;
  color: #8C72FF;
  border-radius: 100px;
}
</style>