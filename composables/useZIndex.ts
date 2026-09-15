// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { ref } from 'vue'

import { lazyInitialize } from '@/utils/memo'

const getZIndexStore = lazyInitialize(() => {
  const groups = new Map<string, number>()
  const getNextIndex = (groupName: string, baseLevel: number) => {
    const next = groups.get(groupName) || baseLevel
    groups.set(groupName, next + 1)
    return next
  }
  return {
    getNextIndex,
  }
})

export function useZIndex(group: keyof typeof ZIndexPriorityGroup = 'common') {
  const zIndexStore = getZIndexStore()
  const idx = ref(zIndexStore.getNextIndex(group, ZIndexPriorityGroup[group]))
  return {
    index: idx,
    floatTop() {
      idx.value = zIndexStore.getNextIndex(group, ZIndexPriorityGroup[group])
    },
    resetBase() {
      idx.value = ZIndexPriorityGroup[group]
    },
  }
}

export const ZIndexPriorityGroup = {
  common: 5000,
  settings: 3000,
  onboarding: 4000,
}
