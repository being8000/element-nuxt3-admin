<!-- file: ~/pages/login.vue -->
<template>
  <div
    class="background flex items-center justify-center min-h-screen relative"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
    ></div>
    <div
      class="flex px-24 h-screen m-auto shadow-lg shadow-slate-500 backdrop-blur p-3 relative rounded-sm overflow-hidden border-sky-100"
    >
      <div
        class="flex p-5 px-10 bg-opacity-[.8] mb-5 absolute top-0 w-full left-0"
      >
        <div class="space-y-3">
          <img
            class="logo"
            src="https://element-plus.org/images/element-plus-logo.svg"
          />
          <NuxtLogo class="text-white"></NuxtLogo>
        </div>
        <div class="ml-auto text-3xl text-gray-300 font-bold">
          Nuxt-Admin-Template
        </div>
      </div>
      <section class="max-w-6xl m-auto w-full">
        <div
          class="flex backdrop-blur items-center rounded-sm overflow-hidden h-[350px]"
        >
          <section class="flex-1 h-full">
            <el-carousel class="h-full w-[500px]">
              <el-carousel-item>
                <div
                  class="bg-red-200 h-full bg-[url(@/assets/images/a1.avif)] bg-no-repeat bg-cover"
                ></div>
              </el-carousel-item>
              <el-carousel-item>
                <div
                  class="bg-red-200 h-full bg-[url(@/assets/images/a2.avif)] bg-no-repeat bg-cover"
                ></div>
              </el-carousel-item>
              <el-carousel-item>
                <div
                  class="bg-red-200 h-full bg-[url(@/assets/images/a3.avif)] bg-no-repeat bg-cover"
                ></div>
              </el-carousel-item>
            </el-carousel>
          </section>
          <section class="min-w-[350px] h-full">
            <div class="bg-black bg-opacity-50 p-3 h-full">
              <div
                class="text-slate-50 text-2xl font-baloo font-bold text-center"
              >
                Login to your Account
              </div>
              <div>
                <el-form
                  class="login-form mt-5"
                  :model="form"
                  label-width="0px"
                >
                  <el-form-item prop="username">
                    <el-input
                      class=""
                      v-model="form.username"
                      size="large"
                      placeholder="Username"
                      :prefix-icon="User"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="form.password"
                      class="bg-none"
                      size="large"
                      :type="state.showPassword ? '' : 'password'"
                      placeholder="Password"
                      :prefix-icon="Lock"
                    >
                      <template #suffix>
                        <el-icon
                          class="cursor-pointer"
                          @click="state.showPassword = !state.showPassword"
                        >
                          <el-icon-view v-if="state.showPassword" />
                          <el-icon-Hide v-else />
                        </el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <div class="text-right pb-5">
                    <el-link round class="mtext-right"
                      >Forget Password?</el-link
                    >
                  </div>
                  <el-form-item>
                    <div class="w-full text-center">
                      <el-button
                        class="w-[90%]"
                        round
                        type="primary"
                        size="large"
                        @click="logIn"
                        >Sign In</el-button
                      >
                    </div>
                    <div class="w-full text-center">
                      <el-button round type="" class="w-[90%]" size="large"
                        >Sign Up</el-button
                      >
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})

const {
  status,
  data,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  signOut
} = useAuth()
const session = await getSession()
const state = reactive({
  showPassword: false,
  form: {
    username: 'admin',
    password: 'admin'
  }
})
const form = ref(state.form)
const route = useRoute()
const logIn = async (e) => {
  e.preventDefault()
  const { error, url } = await signIn('credentials', {
    callbackUrl: '/',
    redirect: false,
    username: state.form.username,
    password: state.form.password
  })
  if (error) {
    ElMessage.error(error)
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(route.query.callbackUrl as string, {
      external: true,
      replace: true
    })
  }
}
</script>
  
<style lang="scss" scoped>
.background {
  background: url('@/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
<style lang="scss">
.el-carousel__container {
  height: 100%;
}
button {
  display: block;
  border: 1px solid;
  padding: 8px;
  margin: 8px;
  border-radius: 5px;
}

.login-form {
  .el-form-item .el-form-item__content .el-input .el-input__wrapper {
    background-color: initial;
  }
}
</style>