<template>
  <div class="copy-parent relative">
    <div v-html="props.html"></div>
    <div
      class="absolute right-0 top-0"
      :code="props.source"
      :onclick="`copyMarkdownCode(this)`"
    >
      <!-- copy(source) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="cursor-pointer"
      >
        <g fill="currentColor">
          <path
            d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z"
          />
          <path
            d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z"
          />
        </g>
      </svg>
      <!-- <div
        class="absolute right-0 top-0 text-sm text-orange-600 p-1 bg-white rounded-sm"
      >
        Copied!
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
const props = defineProps<{
  source: string
  html: string
}>()

const source = ref('')

const randomKey =
  new Date().getTime() + Math.floor(Math.random() * 100000 + 10000)

const unsecuredCopyToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand('copy')
    ElMessage.success('Copy successul')
  } catch (err) {
    console.error('Unable to copy to clipboard', err)
  }
  document.body.removeChild(textArea)
}

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
const copyToClipboard = (content) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(content)
    ElMessage.success('Copy successul')
  } else {
    unsecuredCopyToClipboard(content)
  }
}
onMounted(() => {
  if (window.copyMarkdownCode) {
    return
  }
  window.copyMarkdownCode = function (el: HTMLElement) {
    copyToClipboard(el.getAttribute('code') as string)
  }
})
</script>

<style lang="scss" scoped>
.copy-parent {
  .copy-icon {
    display: none;
  }
  &:hover {
    .copy-icon {
      display: initial;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>