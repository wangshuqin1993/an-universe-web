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
    title: 'Example of rights',
    dataIndex: 'rights',
    key: 'rights',
    align: 'center'
  }
]);

const data = ref([
  {
    key: '1',
    level: 'UR',
    amount: 100,
    rights: 'Discount voucher worth 70% of 300U during $ABSC IDO',
  },
  {
    key: '2',
    level: 'SSR',
    amount: 300,
    rights: 'Discount voucher worth 80% of 200U during $ABSC IDO',
  },
  {
    key: '3',
    level: 'SR',
    amount: 500,
    rights: 'Discount voucher worth 90% of 100U during $ABSC IDO',
  },
  {
    key: '4',
    level: 'S',
    amount: 1000,
    rights: 'Voucher worth 80U during $ABSC IDO',
  },
  {
    key: '5',
    level: 'R',
    amount: 2000,
    rights: 'Voucher worth 50U during $ABSC IDO',
  },
  {
    key: '6',
    level: 'N',
    amount: 3877,
    rights: 'Voucher worth 30U during $ABSC IDO',
  },
]);

</script>

<style scoped lang="less"></style>