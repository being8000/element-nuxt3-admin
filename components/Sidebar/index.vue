<template>
  <div
    id="Sidebar"
    class="reset-menu-style h-screen flex-col relative"
    :class="{
      isCollapse: !isCollapse
    }"
  >
    <div class="sidebar-logo w-3/5 m-auto py-4 relative">
      <NuxtLogo />
    </div>
    <el-scrollbar
      style="
        height: calc(100% - var(--sidebar-logo-height) - var(--logout-height));
      "
      class="px-1 relative"
    >
      <el-menu
        class="el-menu-vertical space-y-2"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>

    <div
      style="
        width: 100%;
        position: absolute;
        bottom: 0px;
        z-index: 100;
        height: 50px;
        line-height: 50px;
      "
      class="text-white font-semibold text-xl text-center cursor-pointer left-0"
      @click="signOut"
    >
      Logout
    </div>
  </div>
</template>

<script setup lang="ts">
const routes = useRoutes()
const route = useRoute()
const { signOut } = useAuth()
const logout = () => {
  // useLogout()
}

const { opened, device } = useApp()
const isCollapse = computed(() => opened.value)
const activeMenu = computed((): string => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  // if (meta.activeMenu) {
  //   return meta.activeMenu
  // }
  return path
})
</script>

<style lang="scss" >
:root {
}
</style>