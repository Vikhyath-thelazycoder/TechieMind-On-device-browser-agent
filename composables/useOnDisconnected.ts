// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

interface Options {
  once?: boolean
}

export function useOnDisconnected(el: HTMLElement, container: HTMLElement, onDisconnected: () => void, options?: Options): () => void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach((node) => {
          if (node === el || container.contains(node)) {
            onDisconnected()
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
