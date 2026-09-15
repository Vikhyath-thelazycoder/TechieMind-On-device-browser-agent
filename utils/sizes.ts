// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { formatSize } from './formatter'

export class ByteSize {
  private constructor(private bytes: number) {}

  static fromGB(gb: number): ByteSize {
    return new ByteSize(gb * 1024 * 1024 * 1024)
  }

  static fromMB(mb: number): ByteSize {
    return new ByteSize(mb * 1024 * 1024)
  }

  static fromKB(kb: number): ByteSize {
    return new ByteSize(kb * 1024)
  }

  static fromBytes(bytes: number): ByteSize {
    return new ByteSize(bytes)
  }

  toGB(): number {
    return this.bytes / (1024 * 1024 * 1024)
  }

  toMB(): number {
    return this.bytes / (1024 * 1024)
  }

  toKB(): number {
    return this.bytes / 1024
  }

  toBytes(): number {
    return this.bytes
  }

  format(precision: number = 2): string {
    return formatSize(this.bytes, precision)
  }
}
