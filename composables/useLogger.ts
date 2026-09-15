// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { getCurrentInstance } from 'vue'

import logger from '@/utils/logger'

export function useLogger() {
  const instance = getCurrentInstance()
  if (!instance) {
    logger.warn('useLogger called outside of component context')
  }
  const filePath = instance?.type.__file
  const extractComponentName = (filePath: string | undefined): string => {
    const parts = filePath?.split('/')
    if (!parts || parts.length === 0) return 'UnknownComponent'
    const fileName = parts.pop()
    if (!fileName) return 'UnknownComponent'
    if (fileName.startsWith('index.')) {
      return parts.pop() || 'UnknownComponent'
    }
    return fileName.replace(/\.\w+$/, '') // Remove file extension
  }
  const log = logger.child(extractComponentName(filePath))
  return log
}
