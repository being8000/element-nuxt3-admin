<template>
  <el-config-provider :size="size" namespace="el">
    <div
      :class="dynamicClass"
      ref="el"
      class="layout-wrapper bg-slate-100 min-h-screen dark:bg-slate-950"
    >
      <div
        v-if="device === 'mobile' && opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <!-- left side -->
      <Sidebar class="sidebar-container"></Sidebar>
      <!-- right container -->
      <div class="main-container hasTagsView">
        <Navbar />
        <div class="p-3">
          <slot></slot>
        </div>
      </div>
      <el-backtop :right="50" :bottom="50">
        <el-icon color="var(--el-color-primary)" class="cursor-pointer">
          <el-icon-top />
        </el-icon>
      </el-backtop>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'

const { opened, device, size, updateDevice } = useApp()
const dynamicClass = computed(
  (): {
    closeSidebar: boolean
    hideSidebar?: boolean
  } => {
    return {
      closeSidebar: !opened.value
      // hideSidebar: sidebar.value.opened
    }
  }
)
const el = ref(null)
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  updateDevice(width)
})

const handleClickOutside = () => {
  // close Sidebar
}

const gridData = [
  {
    date: '2016-05-02',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-04',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-01',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-03',
    name: 'Jack',
    address: 'New York City'
  }
]
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--side-bar-width);
  position: relative;
  border-left: 1px solid var(--layout-border-left-color);
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
  width: calc(100% - 54px);

  &.opened {
    width: calc(100% - var(--side-bar-width));
  }
}

.sidebar-container {
  transition: width 0.28s;
  width: var(--side-bar-width) !important;
  background-color: var(--el-menu-bg-color);
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px !important;
  }
}

.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }

  .main-container {
    margin-left: 0;
  }
}
</style>
