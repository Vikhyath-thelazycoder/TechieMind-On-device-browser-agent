// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export function removeUndefined(object: object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, v]) => v !== undefined),
  )
}
