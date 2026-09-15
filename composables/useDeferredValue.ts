// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { Ref, ref, UnwrapRef, watch } from 'vue'

export function useDeferredValue<T>(value: Ref<UnwrapRef<T>>, delay: number = 300, shouldDefer?: (v: UnwrapRef<T>) => boolean): Ref<UnwrapRef<T>> {
  const deferredValue = ref(value.value) as Ref<UnwrapRef<T>>
  let timer: ReturnType<typeof setTimeout> | undefined
  watch(value, (newValue) => {
    clearTimeout(timer)
    if (shouldDefer && !shouldDefer(newValue)) {
      deferredValue.value = newValue
      return
    }
    timer = setTimeout(() => {
      deferredValue.value = newValue
    }, delay)
  }, { immediate: true })

  return deferredValue
}
