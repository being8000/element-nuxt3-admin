<template>
  <!--分页-->
  <el-auto-resizer>
    <template #default="{ width }">
      <el-affix
        position="bottom"
        :offset="0"
        z-index="5"
        :style="{
          width: width + 'px'
        }"
      >
        <el-card :body-style="{ padding: '8px' }">
          <slot></slot>
        </el-card>
      </el-affix>
    </template>
  </el-auto-resizer>
</template>
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
const { x, y } = useWindowScroll()
const srollDown = ref(false)
watch(y, (n, o) => {
  if (o < n) {
    srollDown.value = true
  } else {
    srollDown.value = false
  }
})
</script>