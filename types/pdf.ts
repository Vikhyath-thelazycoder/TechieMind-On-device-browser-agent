// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { Base64String } from './common'
import { Base64ImageData } from './image'

export type Base64PDFData = {
  data: Base64String // Base64 encoded string
}

export type PDFContentForModel = {
  type: 'images'
  images: Base64ImageData[]
  pageCount: number
  fileName?: string
} | {
  type: 'text'
  textContent: string
  pageCount: number
  fileName?: string
}
