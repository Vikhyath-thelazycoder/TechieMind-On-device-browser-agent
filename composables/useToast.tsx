// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { createApp, inject, Plugin } from 'vue'

import ToastGroup, {
  ToastFunction,
  ToastOptions,
} from '@/components/ToastGroup.vue'
import { logger } from '@/utils/logger'

const log = logger.child('useToast')

const TOAST_ROOT_PROVIDER = Symbol('toastRootElement')

export const initToast: (rootEl: HTMLElement) => Plugin = (rootEl) => {
  return {
    install(app) {
      const toastApp = createApp(ToastGroup)
      toastApp.mount(rootEl)
      const toast = (message: string, options?: ToastOptions) => {
        if (!toastApp._instance?.exposed?.addToast) {
          log.error('Toast function not available, please initialize first.')
        }
        toastApp._instance?.exposed?.addToast?.(message, options)
      }
      app.provide(TOAST_ROOT_PROVIDER, toast)
    },
  }
}

export const useToast = () => {
  const toast = inject<ToastFunction>(TOAST_ROOT_PROVIDER)
  return toast!
}
