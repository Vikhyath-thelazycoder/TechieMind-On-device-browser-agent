// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'

export function useDocumentLoaded(cb: () => void) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // If the document is already loaded, we can call the callback immediately.
    cb()
    return
  }
  useEventListener(document, 'DOMContentLoaded', () => {
    cb()
  }, { once: true })
}

export function useDocumentReadyState() {
  const readyState = ref(document.readyState)
  useEventListener(document, 'readystatechange', () => {
    readyState.value = document.readyState
  })
  return readyState
}
