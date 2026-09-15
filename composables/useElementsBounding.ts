// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { onScopeDispose, ref } from 'vue'

interface WatchItem {
  el: HTMLElement
  observer: ResizeObserver
  rect: DOMRect
}

export function useElementsBounding() {
  const watchedItems = ref<WatchItem[]>([])
  const watch = (el: HTMLElement) => {
    const existing = watchedItems.value.find((item) => item.el === el)
    if (!existing) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          item.rect = entry.contentRect
        })
      })
      const item: WatchItem = {
        el,
        observer: null as unknown as ResizeObserver,
        rect: el.getBoundingClientRect(),
      }
      observer.observe(el)
      watchedItems.value.push(item)
    }
  }
  onScopeDispose(() => {
    watchedItems.value.forEach((item) => {
      item.observer.disconnect()
    })
    watchedItems.value.length = 0
  })
  return {
    watch,
  }
}
