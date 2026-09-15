// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { defu } from 'defu'
import { defineConfig } from 'wxt'

import config from './wxt.config'

const BETA = 'BETA'
const BETA_DESC = 'THIS EXTENSION IS FOR BETA TESTING'
const IS_FIREFOX = process.argv.includes('firefox')

// See https://wxt.dev/api/config.html
export default defineConfig(
  defu(
    {
      mode: 'beta',
      manifest: {
        name: `${IS_FIREFOX ? '__MSG_extNameFirefox__' : '__MSG_extName__'} ${BETA}`,
        description: `${IS_FIREFOX ? '__MSG_extDescFirefox__' : '__MSG_extDesc__'} ${BETA_DESC}`,
      },
      autoIcons: {
        baseIconPath: 'assets/icon.png',
      },
    },
    config,
  ),
)
