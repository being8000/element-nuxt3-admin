<template>
  <NuxtLayout :name="layouts">
    <NuxtPage></NuxtPage>
    <!-- <NuxtWelcome /> -->
  </NuxtLayout>
</template>
<script setup lang="ts">
const { status } = useAuth()
const route = useRoute()
const layouts = computed(() => {
  if (status.value === 'authenticated' && route.path != '/login') {
    return 'backoffice'
  }
  return ''
})
</script>