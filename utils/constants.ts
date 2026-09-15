// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

export const EXTENSION_SHORT_NAME = 'TechieMind'
export const OLLAMA_TUTORIAL_URL = 'https://ollama.com'
export const OLLAMA_DOWNLOAD_URL = 'https://ollama.com/download'
export const OLLAMA_HOMEPAGE_URL = 'https://ollama.com'
export const OLLAMA_SEARCH_URL = 'https://ollama.com/search'
export const LM_STUDIO_HOMEPAGE_URL = 'https://lmstudio.ai'
export const LM_STUDIO_DOWNLOAD_URL = 'https://lmstudio.ai/download'
export const LM_STUDIO_TUTORIAL_URL = 'https://lmstudio.ai'
export const LM_STUDIO_SEARCH_URL = 'https://lmstudio.ai/models'
export const TECHIEMIND_HOMEPAGE_URL = 'https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent'
export const TECHIEMIND_REPOSITORY_URL = 'https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent'
export const NATIVEMIND_HOMEPAGE_URL = TECHIEMIND_HOMEPAGE_URL
export const NATIVEMIND_REPOSITORY_URL = TECHIEMIND_REPOSITORY_URL
export const OLLAMA_SITE_DOWNLOAD_BUTTON_CLASS = 'techiemind-ollama-download-button'
export const CONTEXT_MENU_STORAGE_KEY = 'local:context-menu-map_1'
export const MIN_SELECTION_LENGTH_TO_SHOW_WRITING_TOOLS = 10
export const TAB_STORE_STORAGE_KEY_PREFIX = 'tab-store-'
export const SETTINGS_PAGE_WINDOW_WIDTH = 600
export const SETTINGS_PAGE_WINDOW_HEIGHT = 800
export const APP_METADATA_META_TAG_NAME = 'techiemind:app-metadata'
export const SCOPE_STORAGE_ROOT_SCOPE = 'root'
export const MIN_CONTEXT_WINDOW_SIZE = 512
export const FEEDBACK_EMAIL = 'support@techiemind.app'
export const PROMPT_MAX_PAGE_CONTENT_LENGTH = 1000
export const MODELS_NOT_SUPPORTED_FOR_STRUCTURED_OUTPUT = [/gpt-oss/]
export const CONTENT_UI_SHADOW_ROOT_NAME = 'techiemind-container'
export const AGENT_LOOP_COUNT_REFILL_USER_PROMPT = 6 // refill the original user question if agent loop count exceeds this value to avoid context loss

export const INVALID_URLS = [
  /^https:\/\/chromewebstore\.google\.com/,
  /^https:\/\/chrome\.google\.com\/webstore\//,
  /^(?!(https?):\/\/).+/,
]
