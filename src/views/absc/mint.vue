
import { ClientRequest } from 'http';
<template>
  <div class="w-full h-full bg-black">
    <div>
      <div class="absc-title">BSC Golden Shovel</div>
      <div class="absc-sub-title">XXX is an experimental NFT project sponsored by X team, whose NFT works are all hand-painted 
        and focused on different<br/> kinds and patterns of XXX.
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
      <div class="min-btn">
        <span class="min-btn-text">Mint</span> 
      </div>
      <div class="mint-text">You have started <span class="!text-[#E527FF]">4</span> activity once, 
        which costs <span class="!text-[#E527FF]">4000</span> $ABSC
      </div>

      <div>
        <img src="@/assets/images/absc-core-show.png" class="h-[506px] mx-auto w-full"/>
      </div>
    </div>

    <div>
      <div class="text-[#FFFFFF] font-[Montserrat Black] text-[36px] font-bold text-center">Your activity result</div>
      <div class="flex mt-[45px] justify-center gap-[30px] pb-[136px]">
        <div class="card-container" v-for="(item,index) in cardInfo" :key="index">
          <img :src="_"/>
          <div class="text-[red] mb-[30px]">{{ item.content }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const cardInfo = ref([
  {
    path:'1',
    content: 'Rarity: SS'
  },
  {
    path:'2',
    content: 'Rarity: A'
  },
  {
    path:'3',
    content: 'Rarity: S'
  },
  {
    path:'4',
    content: 'Rarity: C'
  }
])

</script>

<style scoped>
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

.absc-blind-container {
  width: 860px;
  padding: 20px 41px 27px 41px;
  background: rgba(255,255,255,0.08);
  border-radius: 10px;
  backdrop-filter: blur(0px);
  margin: 20px auto 0px;
}

.absc-blind {
  font-family: Montserrat-Bold;
  color: rgba(255,255,255,1);
  line-height: 22px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}

.absc-blind-text {
  padding-top:12px;
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
  background: rgba(255,255,255,0.11);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.23);
  text-align: center;
  padding: 30px 20px 0px 20px;
}
</style>