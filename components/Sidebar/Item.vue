<template>
  <el-sub-menu
    v-if="item.children?.length > 0"
    ref="subMenu"
    :index="item.path"
    class="space-y-2"
    teleported
  >
    <template v-if="item.meta" #title>
      <!-- <div v-if=" pointNum " class="red-pointer">{{ pointNum }}</div> -->
      <SidebarIcon v-if="level == 1" :elSvgName="item.icon"></SidebarIcon>
      <span>{{ item.meta.title }}</span>
    </template>
    <div class="space-y-2">
      <SidebarItem
        v-for="child in item.children"
        :key="child.path + '_' + level"
        :is-nest="true"
        :item="child"
        :base-path="child.path"
        :level="level + 1"
      />
    </div>
  </el-sub-menu>
  <NuxtLink v-else :to="item.path" class="block">
    <el-menu-item
      :index="item.path"
      :class="{ 'submenu-title-noDropdown': !isNest }"
    >
      <!-- <div v-if="pointNum > 0" class="red-pointer">{{ pointNum }}</div> -->
      <!-- <item v-else :meta="onlyOneChild.meta || item.meta" /> -->
      <SidebarIcon v-if="level == 1" :elSvgName="item.icon"></SidebarIcon>
      <template #title>
        {{ item.meta?.title }}
      </template>
    </el-menu-item>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  // 每一个router Item
  item: {
    type: Object,
    required: true
  },
  // 用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  // 基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  }
})
</script>
