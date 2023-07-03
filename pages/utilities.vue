<template>
  <div>
    <EleTableSticker>
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="amount" label="Amount">
          <template #default="{ row }">
            {{ toThousand(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="Amount2">
          <template #default="{ row }">
            {{ toThousand(row.amount, false, 3) }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" width="180">
          <template #default="{ row }">
            {{ moment(row.date).format('LLL') }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180" />
      </el-table>
    </EleTableSticker>
  </div>
</template>

<script setup lang="ts">
const { moment, toThousand } = useUtilites()
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    amount: '888888.888888',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
