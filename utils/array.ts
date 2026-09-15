// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import EventEmitter from 'events'

export class ObservableArray<T> extends Array<T> {
  private eventEmitter = new EventEmitter()
  constructor() {
    super()
  }

  onChange(cb: (newArray: T[], oldArray: T[]) => void) {
    this.eventEmitter.on('change', cb)
    return () => this.eventEmitter.off('change', cb)
  }

  push(...items: T[]) {
    const oldArray = [...this]
    const ret = super.push(...items)
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  pop() {
    const oldArray = [...this]
    const ret = super.pop()
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  shift() {
    const oldArray = [...this]
    const ret = super.shift()
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  unshift(...items: T[]) {
    const oldArray = [...this]
    const ret = super.unshift(...items)
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  splice(start: number, deleteCount: number, ...items: T[]) {
    const oldArray = [...this]
    const ret = super.splice(start, deleteCount, ...items)
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  fill(value: T, start?: number, end?: number) {
    const oldArray = [...this]
    const ret = super.fill(value, start, end)
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  reverse() {
    const oldArray = [...this]
    const ret = super.reverse()
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  sort(compareFn?: (a: T, b: T) => number) {
    const oldArray = [...this]
    const ret = super.sort(compareFn)
    this.eventEmitter.emit('change', this, oldArray)
    return ret
  }

  clear() {
    const oldArray = [...this]
    super.length = 0
    this.eventEmitter.emit('change', this, oldArray)
  }

  get length() {
    return super.length
  }

  set length(value: number) {
    const oldArray = [...this]
    super.length = value
    this.eventEmitter.emit('change', this, oldArray)
  }
}

export function nonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
