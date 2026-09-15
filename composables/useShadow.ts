// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { onScopeDispose } from 'vue'
import { makeShadow } from 'vue-shadow-dom'

export function useShadow(attachedEl: HTMLElement) {
  const el = document.createElement('div')
  el.classList.add('nativemind-shadow-root')
  const shadowRoot = makeShadow(el, { mode: 'open' })!
  attachedEl.appendChild(el)

  onScopeDispose(() => {
    shadowRoot?.host?.remove()
  })

  return { shadowRoot, shadowHost: el }
}
