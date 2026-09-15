// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { TimeoutError } from './error'

export function timeout<R, E>(p: Promise<R>, ms: number, onTimeout?: () => E): Promise<R> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(onTimeout?.() || new TimeoutError(`Promise timed out after ${ms} ms`))
    }, ms)

    p.then((result) => {
      clearTimeout(timer)
      resolve(result)
    }).catch((error) => {
      clearTimeout(timer)
      reject(error)
    })
  })
}
