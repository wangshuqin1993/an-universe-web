<template>
  <div class="max-w-[798px] mx-auto md:px-[0px] px-[32px] md:pb-[64px] pb-[32px] text-center">
    <div class="font-[Montserrat Black] text-[#fff] text-[36px] font-black">NFT Description</div>
    <div class="font-[Arial] text-[#7C7C7C] text-[16px] my-[29px] w-[90%] mx-auto leading-[18px]">
      BSC Golden Shovel is a collection of 7777 NFTs issued on the BSC chain. 
      As the genesis NFT of the BMaker&$BSC project, it plays an important role in the subsequent development of the ecosystem.
      According to different rarity, BSC Golden Shovel NFT is divided into 6 levels, each level corresponding
      to different rights. You can obtain the BSC Golden Shovel NFT by burning ABSC inscriptions.
    </div>

    <div>
      <a-table :columns="columns" :data-source="data" bordered>
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

<style scoped lang="less">

:deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper .ant-table-pagination.ant-pagination) {
  display: none;
}

:deep(.ant-table-wrapper .ant-table) {
  background-color: transparent !important;
  font-size: 16px;
  color: #7C7C7C;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container) {
  border: 2px solid #2D2D2D;
  border-radius: 12px;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table) {
  border-top: none;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tbody>tr>td) {
  border-inline-end: 1px solid #2D2D2D;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tbody>tr>td:last-child) {
  border-inline-end: none;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered .ant-table-tbody >tr >td) {
  border-bottom: 1px solid #2D2D2D;
}

:deep(.ant-table-wrapper .ant-table.ant-table-bordered .ant-table-tbody >tr:last-child >td) {
  border-bottom: none;
}

:deep(.ant-table-wrapper .ant-table-tbody>tr.ant-table-row:hover>td),
:deep(.ant-table-wrapper .ant-table-tbody>tr>td.ant-table-cell-row-hover) {
  background-color: transparent !important;
}

:deep(.ant-table-thead>tr>th) {
  background-color: #000000;
  border-bottom: 1px solid #2D2D2D;
  color: #7C7C7C;
  font-weight: bold;
}

:deep(.ant-table-thead>tr>th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan]):before) {
  width: 0;
}

:deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >thead>tr>th) {
  border-inline-end: 1px solid #2D2D2D;
}

:deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >thead>tr>th:last-child) {
  border-inline-end: none;
}
</style>