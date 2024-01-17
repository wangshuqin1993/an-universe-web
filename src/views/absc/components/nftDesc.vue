<template>
  <div class="max-w-[798px] mx-auto md:px-[0px] px-[32px] md:pb-[64px] pb-[32px] text-center">
    <div>
      <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    align: 'center'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center'
  },
  {
    title: 'Rights',
    dataIndex: 'rights',
    key: 'rights',
    align: 'center'
  }
]);

const data = ref([
  {
    key: '1',
    level: 'UR',
    amount: 13,
    rights: '30% off during $ABSC IDO',
  },
  {
    key: '2',
    level: 'SSR',
    amount: 40,
    rights: '20% off during $ABSC IDO',
  },
  {
    key: '3',
    level: 'SR',
    amount: 65,
    rights: '10% off during $ABSC IDO',
  },
  {
    key: '4',
    level: 'S',
    amount: 130,
    rights: 'Deduction of 80U during IDO',
  },
  {
    key: '5',
    level: 'R',
    amount: 260,
    rights: 'Deduction of 50U during IDO',
  },
  {
    key: '6',
    level: 'N',
    amount: 492,
    rights: 'Deduction of 30U during IDO',
  },
]);

</script>

<style scoped lang="less"></style>