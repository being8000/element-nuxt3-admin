<template>
  <NuxtLayout :name="layouts">
    <NuxtPage></NuxtPage>
    <!-- <NuxtWelcome /> -->
  </NuxtLayout>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt3+Element Plus Admin Templete',
  ogTitle: 'Nuxt3+Element Plus Admin Templete',
  description:
    'Nuxt3+Element Plus Admin Templete, Nuxt, nuxt, Nuxt3, nuxt3, element+, element-ui, backoffice, backdoor, element plus, Element Plus',
  ogDescription:
    'Nuxt3+Element Plus Admin Templete, Nuxt, nuxt, Nuxt3, nuxt3, element+, element-ui, backoffice, backdoor, element plus, Element Plus',
  ogImage: './favicon.ico',
  twitterCard: 'summary_large_image'
})

const { status } = useAuth()
const route = useRoute()
const layouts = computed(() => {
  if (status.value === 'authenticated' && route.path != '/login') {
    return 'backoffice'
  }
  return ''
})
</script>