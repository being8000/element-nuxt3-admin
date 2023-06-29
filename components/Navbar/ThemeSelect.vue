<template>
  <el-dropdown trigger="click" type="primary" @command="handleSettheme">
    <div>
      <Icon name="mdi:theme-light-dark" class="text-2xl" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="(color.preference || 'base') === item.value"
        >
          <h3 class="pt-1 pb-1 font-themePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
const state = reactive({
  themeOptions: [
    { label: 'Base', value: 'base' },
    { label: 'Dark', value: 'dark' }
    // { label: 'lighting', value: 'lighting-theme' }
  ]
})

let { themeOptions } = toRefs(state)
const color = useColorMode()
const handleSettheme = (theme) => {
  color.preference = theme
}
</script>

<style scoped lang="scss">
.theme-icon-style {
}
</style>
