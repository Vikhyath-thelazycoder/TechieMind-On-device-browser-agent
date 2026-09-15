// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

const status = {
  loaded: false,
}

export function setSidepanelStatus(_status: Partial<typeof status>) {
  Object.assign(status, _status)
}

export function getSidepanelStatus() {
  return status
}
