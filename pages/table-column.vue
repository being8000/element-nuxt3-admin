<template>
  <div>
    <EleTableSticker>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="amount" label="Amount">
          {{ toThousand(2000) }}
        </el-table-column>
        <el-table-column prop="amount" label="Amount">
          {{ toThousand(2055500.65564) }}
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
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
