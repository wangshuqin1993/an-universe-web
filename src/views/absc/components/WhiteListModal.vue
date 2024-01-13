<template>
  <a-modal v-model:open="openWhiteListModal" title="" :footer="null" width="660px">
    <div class="text-center">
      <div class="flex items-center justify-center text-center text-[21px] font-semibold mt-[50px] mb-[30px] ">
        Get your whitelist and win a better price for $ABSC token IDO
      </div>
      <a-steps direction="vertical" size="small" :current="1" :items="[
        { title: 'Genesis NFT holder certification', description },
        {
          title: 'In Progress',
          description,
        },
        {
          title: 'Waiting',
          description,
        },
      ]"></a-steps>
      <div class="text-center mt-[40px]">
        <a-button class="text-[14px] w-[178px] h-[38px] rounded-[5px]" :disabled="disabledWhiteListBtn">done</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script lang='ts' setup>
import { ref, toRefs } from "vue";
const disabledWhiteListBtn = ref(false);
const description = ref('jjjjj')
const props = defineProps({
  openWhiteListModal: {
    type: Boolean,
    default: false,
  }
})

const { openWhiteListModal } = toRefs(props)
</script>
<style lang='less' scoped></style>