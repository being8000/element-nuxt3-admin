<template>
  <div>
    <section>Login Dashboard</section>
    <section>{{ session }}</section>
    <section>{{ status }}</section>
    <section>
      <el-button @click="signOut"> Sign out </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
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
</script>