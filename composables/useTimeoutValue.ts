// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { onScopeDispose, ref } from 'vue'

type Setter<T> = ((oldValue: T) => T) | T

export function useTimeoutValue<T>(initialValue: T, fallbackValue: T, timeout: number) {
  const value = ref<T>(initialValue)

  let timer: ReturnType<typeof setTimeout> | undefined = undefined

  const setValue = (newValue: Setter<T>) => {
    clearTimeout(timer)
    value.value = typeof newValue === 'function' ? (newValue as (oldValue: T) => T)(value.value) : newValue
    timer = setTimeout(() => {
      value.value = fallbackValue
      timer = undefined
    }, timeout)
  }

  onScopeDispose(() => {
    clearTimeout(timer)
  })

  return { value, setValue }
}
