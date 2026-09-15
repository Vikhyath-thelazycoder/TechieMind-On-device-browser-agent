// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export async function sha256(message: string | ArrayBuffer): Promise<string> {
  let data: BufferSource
  if (typeof message === 'string') {
    data = new TextEncoder().encode(message)
  }
  else {
    data = message
  }
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashFile(file: File | Blob) {
  const arrayBuffer = await file.arrayBuffer()
  return sha256(arrayBuffer)
}
