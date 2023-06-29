<template>
  <el-dropdown
    id="size-select"
    trigger="click"
    type="primary"
    @command="handleSetSize"
  >
    <div class="mx-3">
      <Icon name="ic:round-format-size" class="text-2xl" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
          <h3 class="pt-1 pb-1 font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
const state = reactive({
  sizeOptions: [
    { label: 'Large ', value: 'large' },
    { label: 'Default ', value: 'default' },
    { label: 'Small', value: 'small' }
  ]
})

let { sizeOptions } = toRefs(state)
// const size = computed(() => {
//   return localStorage.getItem('size') || setting.defaultSize
// })

const { size, updateSize } = useApp()
const handleSetSize = (size) => {
  // localStorage.setItem('size', size)
  // location.reload()
  updateSize(size)
}
// 导出属性到页面中使用
</script>

