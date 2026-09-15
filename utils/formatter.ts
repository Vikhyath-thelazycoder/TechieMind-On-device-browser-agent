// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export function formatSize(size: number, precision = 2): string {
  if (size < 1024) {
    return `${size} B`
  }
  else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(precision)} KB`
  }
  else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(precision)} MB`
  }
  else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(precision)} GB`
  }
}
