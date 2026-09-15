// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

interface Options {
  once?: boolean
}

type Selector = HTMLElement | string

export function useOnConnected(el: Selector, container: HTMLElement, onConnected: (el: Node) => void, options?: Options): () => void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (el instanceof HTMLElement && node === el) {
            onConnected(node)
            if (options?.once) {
              observer.disconnect()
            }
          }
          else if (typeof el === 'string' && node instanceof HTMLElement && node.matches(el)) {
            onConnected(node)
            if (options?.once) {
              observer.disconnect()
            }
          }
        })
      }
    })
  })

  observer.observe(container, { childList: true, subtree: true })

  return () => {
    observer.disconnect()
  }
}
