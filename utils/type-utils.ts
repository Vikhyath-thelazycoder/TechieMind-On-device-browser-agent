// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export type ArrayNonEmpty<T> = [T, ...T[]]

export declare type JsonPaths<T, Key extends keyof T = keyof T> = Key extends string ? T[Key] extends Record<string, unknown> ? `${Key}.${JsonPaths<T[Key]>}` : `${Key}` : never
