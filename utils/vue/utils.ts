// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { twMerge } from 'tailwind-merge'
import { computed, normalizeClass } from 'vue'

export type ComponentClassAttr = undefined | null | string | string[] | Record<string, boolean> | ComponentClassAttr[]

export function classNames(...cls: ComponentClassAttr[]) {
  return twMerge(normalizeClass(cls))
}

export function extendedComputed<T>(fn: (lastValue: T | undefined) => T) {
  let lastValue: T | undefined
  return computed(() => {
    const v = fn(lastValue)
    lastValue = v
    return v
  })
}
