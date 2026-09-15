// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { ThemeType } from '@/types/theme'

export const getDocumentTheme = (): ThemeType => {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
  return 'light'
}
