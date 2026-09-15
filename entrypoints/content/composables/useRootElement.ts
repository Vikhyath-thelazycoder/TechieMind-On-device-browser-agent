// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { useInjectContext } from '@/composables/useInjectContext'

export function useRootElement() {
  return useInjectContext('rootElement').inject()
}
