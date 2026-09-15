// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import logger from './logger'

const log = logger.child('utils:fetch')

export interface CustomFetchOptions {
  extraHeaders?: Record<string, string>
  extraParams?: Record<string, string>
  bodyTransformer?: (body?: BodyInit) => BodyInit | undefined
  logger?: boolean
}

export function makeCustomFetch(options?: CustomFetchOptions) {
  const appendHeaders = (init?: RequestInit) => {
    init ??= {}
    const headerInit = init.headers
    if (options?.extraHeaders) {
      const headers = new Headers(headerInit)
      for (const [key, value] of Object.entries(options.extraHeaders)) {
        headers.set(key, value)
      }
      init.headers = headers
    }
    return init
  }

  const appendParams = (url: RequestInfo | URL) => {
    if (options?.extraParams) {
      const urlObj = new URL(url instanceof URL ? url.href : url.toString())
      for (const [key, value] of Object.entries(options.extraParams)) {
        urlObj.searchParams.set(key, value)
      }
      return urlObj
    }
    return url
  }

  const appendBody = (init?: RequestInit) => {
    init ??= {}
    if (options?.bodyTransformer && init.body) {
      const newBody = options.bodyTransformer(init.body)
      init.body = newBody
    }
    return init
  }

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    input = appendParams(input)
    init = appendHeaders(appendBody(init))
    if (options?.logger) {
      log.debug('custom fetch', { input, init })
    }
    return fetch(input, init)
  }
}
