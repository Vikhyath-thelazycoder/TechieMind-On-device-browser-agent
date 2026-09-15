// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import 'temporal-polyfill/global'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export { dayjs, dayjs as default }
