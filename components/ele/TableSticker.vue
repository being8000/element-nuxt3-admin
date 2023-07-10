<template >
  <span ref="root">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
interface StickyItem {
  $el: HTMLElement
  rect: DOMRect
  sticky: boolean
  style: Partial<CSSStyleDeclaration>
  beforeStyle?: string | null
  py?: number | null
}

class EleTableSticker {
  items: StickyItem[] = []
  scroll: any
  isEventListened: boolean = false
  sticky: boolean = false
  constructor() {}
  mount($el: HTMLElement, style?: Partial<CSSStyleDeclaration>) {
    this.items.push({
      $el: $el,
      rect: $el.getBoundingClientRect(),
      sticky: false,
      style: {
        ...{
          position: 'fixed',
          top: '50px',
          boxShadow: '"0 3px 10px #aaa'
        },
        ...style
      },
      beforeStyle: $el.getAttribute('style')
    })
    if (!this.isEventListened) {
      this.addEventListener()
    }
  }
  addEventListener() {
    const scroll = (evt: Event) => {
      this.setSticky()
      this.clearStickyStyle()
    }
    this.scroll = scroll
    window.removeEventListener('scroll', this.scroll)
    window.addEventListener('scroll', this.scroll)
    this.isEventListened = true
  }
  unmount() {
    window.removeEventListener('scroll', this.scroll)
    this.isEventListened = false
  }
  setSticky() {
    const item = this.items.filter((el) => el.sticky == false)[0]
    const index = this.items.indexOf(item)
    if (!item) {
      return
    }
    const $el = item.$el
    if (item.py == null) {
      item.py = 0
    }
    const { y, width } = $el.getBoundingClientRect()
    if (item.py != null && y < item.py && y <= 50) {
      item.sticky = true
      const tableEL = item.$el.querySelector(
        '.el-table__header-wrapper'
      ) as HTMLElement
      item.$el.style.paddingTop = tableEL.getBoundingClientRect().height + 'px'
      tableEL.style.width = tableEL.getBoundingClientRect().width + 'px'
      Object.keys(item.style).forEach((key: any) => {
        tableEL.style[key] = item.style[key] as string
      })
      tableEL.style.position = 'fixed'
      tableEL.style.zIndex = 500 + index + ''
      if (index > 0 && this.items[index - 1]) {
        this.resetItem(this.items[index - 1])
      }
    } else {
      item.py = y
    }
  }
  clearStickyStyle() {
    const stickyers = this.items.filter((el) => el.sticky == true)
    const item = stickyers[stickyers.length - 1]
    if (!item) {
      return
    }
    if (item.py == null) {
      item.py = 0
    }
    const { y, width } = item.$el.getBoundingClientRect()
    if (item.py != null && y > item.py && y >= 50) {
      this.resetItem(item)
    } else {
      item.py = y
    }
  }
  resetItem(item: StickyItem) {
    const tableEL = item.$el.querySelector(
      '.el-table__header-wrapper'
    ) as HTMLElement
    item.sticky = false
    item.$el.style.paddingTop = '0' + 'px'
    tableEL.setAttribute('style', item.beforeStyle || '')
    item.py = null
  }
}

const sticker = new EleTableSticker()
const root = ref<HTMLElement>()
onMounted(() => {
  const P = root.value
  P?.querySelectorAll('.el-table').forEach((el) => {
    sticker.mount(el as HTMLElement)
  })
})

onUnmounted(() => {
  sticker.unmount()
})
</script>