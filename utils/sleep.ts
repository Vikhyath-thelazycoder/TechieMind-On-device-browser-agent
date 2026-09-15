// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
