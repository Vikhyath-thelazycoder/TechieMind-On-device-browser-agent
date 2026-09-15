// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { customRef, Ref, ref, toRaw, watch } from 'vue'
import { storage } from 'wxt/utils/storage'

import { debounce } from '../debounce'

export async function persistentRef<T>(
  storeKey: string,
  defaultValue: T,
): Promise<Ref<T>> {
  if (!storeKey) {
    throw new Error('sessionKey is required')
  }
  const localStoreKey = `local:${storeKey}` as `local:${string}`
  const valueInStorageStr = await storage.getItem<string>(localStoreKey)
  const valueInStorage = valueInStorageStr ? JSON.parse(valueInStorageStr) : defaultValue
  return customRef<T>((track, trigger) => {
    const v = ref(valueInStorage)
    watch(
      v,
      () => {
        debounceSetItem()
      },
      { deep: true },
    )

    storage.watch<string>(localStoreKey, (newValue, oldValue) => {
      if (newValue !== null && newValue !== oldValue) {
        v.value = JSON.parse(newValue)
      }
    })

    const debounceSetItem = debounce(() => {
      storage.setItem(localStoreKey, JSON.stringify(toRaw(v.value)))
    }, 1000)

    return {
      get() {
        track()
        return v.value
      },
      set(vv) {
        v.value = vv
        trigger()
      },
    }
  })
}

export function defineSharedStore<T>(cb: () => Promise<T>) {
  let store = null as T | null
  return async () => {
    store = await cb()
    return store
  }
}
