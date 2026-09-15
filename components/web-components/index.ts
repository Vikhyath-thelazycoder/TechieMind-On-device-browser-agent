// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { register as registerNMIcon } from './icon'
import { register as registerNMAgentTask } from './reading-task'

export const webComponents = [
  { name: 'nm-icon', register: registerNMIcon },
  { name: 'nm-agent-task', register: registerNMAgentTask },
]

export function registerWebComponents() {
  webComponents.forEach(({ register }) => register())
}
