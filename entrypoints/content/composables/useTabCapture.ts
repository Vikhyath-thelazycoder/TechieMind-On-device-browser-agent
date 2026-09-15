// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { onScopeDispose } from 'vue'

import { c2bRpc } from '@/utils/rpc'

export async function useTabCapture(tabId?: number) {
  const currentTabId = (await c2bRpc.getTabInfo()).tabId
  const streamId = await c2bRpc.getTabCaptureMediaStreamId(tabId ?? currentTabId, currentTabId)
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    // @ts-expect-error - this is a correct usage provided by chrome extension doc
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId,
      },
    },
  })
  const destroy = () => {
    stream.getTracks().forEach((track) => {
      track.stop()
    })
  }
  onScopeDispose(() => {
    destroy()
  })
  return { stream, destroy }
}
