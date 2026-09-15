// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

import { LLMAdditionalInfo, LLMInfo, LLMInstanceAdditionalInfo, ModelInstanceInfoBase } from '@lmstudio/sdk'

export type LMStudioModelInfo = LLMInfo & { instances?: (ModelInstanceInfoBase & LLMAdditionalInfo & LLMInstanceAdditionalInfo)[] }
