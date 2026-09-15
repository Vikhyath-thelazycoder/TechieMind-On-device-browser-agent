<!-- Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent -->
<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { RouterView } from 'vue-router'

import Logo from '@/components/Logo.vue'
import Button from '@/components/ui/Button.vue'
import { TECHIEMIND_HOMEPAGE_URL } from '@/utils/constants'
import { useI18n } from '@/utils/i18n'
import { getUserConfig } from '@/utils/user-config'

import Sidebar from './Sidebar.vue'

const { t } = useI18n()

const { state: enabledDebug, execute: setEnabledDebug } = useAsyncState(async (enabled?: boolean) => {
  const userConfig = await getUserConfig()
  if (enabled !== undefined) {
    userConfig.debug.enabled.set(enabled)
  }
  return userConfig.debug.enabled.get()
}, false, { immediate: true })

let clickCount = 0
let clickTimeout: ReturnType<typeof setTimeout> | undefined
const onClickTitle = () => {
  clickCount++
  clearTimeout(clickTimeout)
  clickTimeout = setTimeout(() => {
    clickCount = 0
  }, 500)
  if (clickCount > 5) {
    clickCount = 0
    setEnabledDebug(0, !enabledDebug.value)
  }
}
</script>

<template>
  <div>
    <div class="items-center h-15 box-border border-b border-border-light">
      <div class="px-6 flex justify-between items-center h-full bg-bg-app">
        <div
          class="text-base"
          @click="onClickTitle"
        >
          <Logo
            showText
            :size="26"
          />
        </div>
        <div class="flex gap-3 items-stretch min-h-7">
          <a
            :href="`${TECHIEMIND_HOMEPAGE_URL}?utm_source=extension-settings`"
            target="_blank"
          >
            <Button
              class="px-2 flex items-center gap-2 h-full"
              variant="secondary"
            >
              <Logo :size="19" />
              {{ t('settings.header.goto_website') }}
            </Button>
          </a>
        </div>
      </div>
    </div>
    <div class="flex h-[calc(100vh-60px)] overflow-hidden">
      <div class="w-60 shrink-0 grow-0 bg-bg-app">
        <Sidebar :debug="enabledDebug" />
      </div>
      <div class="flex-1 flex justify-center bg-bg-secondary overflow-auto h-full min-w-80 px-4 text-text-primary">
        <div class="max-w-[640px] min-w-0 grow-1 shrink-1">
          <RouterView v-slot="{ Component }">
            <Suspense>
              <component :is="Component" />
            </Suspense>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
