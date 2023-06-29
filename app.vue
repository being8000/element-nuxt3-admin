<template>
  <NuxtLayout :name="layouts">
    <NuxtPage></NuxtPage>
    <!-- <NuxtWelcome /> -->
  </NuxtLayout>
</template>
<script setup lang="ts">
const { status } = useAuth()

const layouts = computed(() => {
  return status.value === 'authenticated' ? 'backoffice' : ''
})
</script>