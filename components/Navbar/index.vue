<template>
  <div class="pt-3">
    <el-affix :offset="0" @change="statusChange">
      <section
        class="bg-[white] backdrop-blur dark:bg-slate-900/75 flex p-3 transition-all duration-75 items-center"
        :class="stickyClass"
      >
        <el-button-group size="small">
          <el-button class="mr-3" :icon="Back" circle> </el-button>
          <el-button circle @click="toggleSidbar">
            <el-icon>
              <el-icon-expand v-if="opened" />
              <el-icon-fold v-else />
            </el-icon>
          </el-button>
        </el-button-group>

        <el-breadcrumb separator="/" class="mx-3">
          <el-breadcrumb-item :to="{ path: './page-header.html' }">
            Home
          </el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="./page-header.html">route 1</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>route 2</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ml-auto flex items-center">
          <NavbarScreenFull />
          <NavbarSizeSelect />
          <NavbarThemeSelect class="mr-8" />
          <el-icon
            size="24px"
            color="var(--el-color-primary)"
            class="cursor-pointer mx-3"
          >
            <el-icon-BellFilled />
          </el-icon>
          <el-popover
            :width="300"
            popper-style=" box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px
      -15px; padding: 20px;"
          >
            <template #reference>
              <el-icon
                size="24px"
                color="var(--el-color-primary)"
                class="cursor-pointer"
              >
                <el-icon-Setting />
              </el-icon>
            </template>
            <template #default>
              <div
                class="demo-rich-conent"
                style="display: flex; gap: 16px; flex-direction: column"
              >
                <el-avatar
                  :size="60"
                  src="https://avatars.githubusercontent.com/u/72015883?v=4"
                  style="margin-bottom: 8px"
                />
                <div>
                  <p
                    class="demo-rich-content__name"
                    style="margin: 0; font-weight: 500"
                  >
                    Element Plus
                  </p>
                  <p
                    class="demo-rich-content__mention"
                    style="
                      margin: 0;
                      font-size: 14px;
                      color: var(--el-color-info);
                    "
                  >
                    @element-plus
                  </p>
                </div>

                <p class="demo-rich-content__desc" style="margin: 0">
                  Element Plus, a Vue 3 based component library for developers,
                  designers and product managers
                </p>
              </div>
            </template>
          </el-popover>
        </div>
      </section>
    </el-affix>
  </div>
</template>


<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Back } from '@element-plus/icons-vue'
const router = useRouter()
const { opened, updateOpened } = useApp()

const toggleSidbar = () => {
  updateOpened(!!opened.value ? false : true)
}

const sticky = ref(false)
const statusChange = (e: boolean) => {
  sticky.value = e
}

const stickyClass = computed(() => {
  return {
    'mx-3 shadow-md rounded-xl': !sticky.value,
    'm-0 shadow-lg rounded-none': sticky.value
  }
})
</script>