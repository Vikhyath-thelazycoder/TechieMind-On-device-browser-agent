// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { onScopeDispose } from 'vue'

export function useInjectStyle(inlineCss: string, attachedElement?: HTMLElement) {
  const styleElement = document.createElement('style')
  styleElement.textContent = inlineCss
  styleElement.setAttribute('data-nativemind-style', 'true')
  styleElement.setAttribute('data-nativemind-style-injected', 'true')

  // Append the style element to the head
  ;(attachedElement ?? document.head).appendChild(styleElement)

  onScopeDispose(() => {
    styleElement.remove()
  })

  // Return a cleanup function to remove the style element
  return () => {
    styleElement.remove()
  }
}
