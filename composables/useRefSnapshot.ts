// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { Ref, ref } from 'vue'

export function useRefSnapshot<T>(refValue: Ref<T>) {
  const snapshot = ref(refValue.value)

  const updateSnapshot = () => {
    snapshot.value = refValue.value
  }

  return {
    snapshot,
    updateSnapshot,
  }
}
