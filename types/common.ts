// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array

export function isTypedArray(value: unknown): value is TypedArray {
  return (
    value instanceof Int8Array
    || value instanceof Uint8Array
    || value instanceof Uint8ClampedArray
    || value instanceof Int16Array
    || value instanceof Uint16Array
    || value instanceof Int32Array
    || value instanceof Uint32Array
    || value instanceof Float32Array
    || value instanceof Float64Array
  )
}

export type Base64String = string

export type PromiseOr<T> = T | Promise<T>
