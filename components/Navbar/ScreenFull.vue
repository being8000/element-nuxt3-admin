<template>
  <div id="screenfull" class="pl-1 pr-1 mtPx-2">
    <div class="cursor-pointer text-[#606266]" @click="toggle">
      <Icon
        v-if="isFullscreen"
        name="gridicons:fullscreen-exit"
        class="text-2xl"
      />
      <Icon v-else name="gridicons:fullscreen" class="text-2xl" />
    </div>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
.nav-svg-icon {
}
</style>
