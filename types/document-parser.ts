// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export interface DocumentResult {
  title: string
  html?: string
  textContent: string
  siteName: string
  lang: string
  parser: 'readability' | 'turndown'
}
