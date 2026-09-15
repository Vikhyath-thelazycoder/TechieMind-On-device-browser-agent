<!-- Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent -->
<template>
  <div
    v-if="!isProduction"
    class="bg-red-500 p-4 text-white"
  >
    <pre>{{ error.message }}</pre>
    ----- Error Stack -----
    <pre>{{ error.stack }}</pre>
  </div>
</template>

<script setup lang="ts">
import logger from '@/utils/logger'
const props = defineProps<{
  unexpected?: unknown
}>()

const isProduction = import.meta.env.PROD
const error = new Error(`Vue Template Exhaustive Error, please check your template\nUnexpected value: ${props.unexpected}`)
logger.error(error)
</script>
