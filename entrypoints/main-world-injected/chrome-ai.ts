// Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent

/// <reference types="@types/dom-chromium-ai" />

import EventEmitter from 'events'

import logger from '@/utils/logger'
import { chromeAISummarizer } from '@/utils/prompts'

import { checkBackendModel, exposeToGlobal, generateText } from './utils'

const log = logger.child('chrome-ai-polyfill')

class SummarizerMonitor extends EventEmitter implements CreateMonitor {
  private onDownloadProgressCb: ((ev: Event) => void) | null = null

  set ondownloadprogress(cb: ((ev: Event) => void) | null) {
    if (cb === null) {
      if (this.onDownloadProgressCb !== null) {
        this.off('downloadprogress', this.onDownloadProgressCb)
      }
      this.onDownloadProgressCb = null
      return
    }
    if (this.onDownloadProgressCb === cb) return
    if (this.onDownloadProgressCb !== null) {
      this.off('downloadprogress', this.onDownloadProgressCb)
    }
    this.onDownloadProgressCb = cb
    this.on('downloadprogress', cb)
  }

  get ondownloadprogress() {
    return this.onDownloadProgressCb
  }

  addEventListener(event: string, listener: (...args: any[]) => void): void {
    this.on(event, listener)
  }

  removeEventListener(event: string, listener: (...args: any[]) => void): void {
    this.off(event, listener)
  }

  dispatchEvent(event: Event): boolean {
    this.emit(event.type, event)
    return true
  }
}

export class PatchSummarizer implements Summarizer {
  private _readyPromiseResolver: ReturnType<typeof Promise.withResolvers<void>> | null = null
  private _monitor: CreateMonitor = new SummarizerMonitor()
  private _options: SummarizerCreateOptions = {}
  private _input: string[] = []
  get sharedContext() {
    return this._options.sharedContext ?? ''
  }

  get type() {
    return this._options.type ?? 'tldr'
  }

  get format() {
    return this._options.format ?? 'markdown'
  }

  get length() {
    return this._options.length ?? 'medium'
  }

  get ready() {
    return this._readyPromiseResolver?.promise
  }

  get inputQuota() {
    return this._input.reduce((acc, curr) => acc + curr.length, 0)
  }

  private constructor() {}

  static async create(options?: SummarizerCreateOptions): Promise<Summarizer> {
    const summarizer = new PatchSummarizer()
    summarizer._readyPromiseResolver = Promise.withResolvers<void>()
    summarizer._readyPromiseResolver.resolve()
    options?.monitor?.(summarizer._monitor)
    return summarizer
  }

  destroy(): void {}

  measureInputUsage(input: string, _options?: SummarizerSummarizeOptions) {
    // This is a placeholder for the actual implementation
    return Promise.resolve(input.length)
  }

  async summarize(text: string, options?: {
    context?: string
  }) {
    this._input.push(text)
    const prompt = await chromeAISummarizer(text)
    const resp = await generateText({
      prompt: prompt.user.extractText(),
      system: options?.context ?? prompt.system,
    })
    return resp.text
  }

  summarizeStreaming(input: string, options?: SummarizerSummarizeOptions) {
    const summarize = this.summarize.bind(this)
    const readable = new ReadableStream({
      async start(controller) {
        const resp = await summarize(input, options)
        controller.enqueue(resp)
        controller.close()
      },
    })
    return readable
  }

  availability() {
    return 'available'
  }

  static async capabilities() {
    const ready = await checkBackendModel()
    return {
      available: ready.backend && ready.model ? 'readily' : 'unavailable',
    }
  }
}

export class PatchLanguageModel extends EventEmitter implements LanguageModel {
  private _readyPromiseResolver: ReturnType<typeof Promise.withResolvers<void>> | null = null
  private _options: LanguageModelCreateOptions = {}
  private _input: LanguageModelMessage[] = []

  get inputUsage() {
    return this._input.reduce((acc, curr) => acc + (typeof curr.content === 'string' ? curr.content.length : 0), 0)
  }

  get inputQuota() {
    return this.inputUsage
  }

  get ready() {
    return this._readyPromiseResolver?.promise
  }

  get topK() {
    return this._options.topK ?? 0
  }

  get temperature() {
    return this._options.temperature ?? 1
  }

  dispatchEvent(event: Event): boolean {
    this.emit(event.type, event)
    return true
  }

  addEventListener(event: string, listener: (...args: any[]) => void): void {
    this.on(event, listener)
  }

  removeEventListener(type: unknown, listener: unknown): void {
    this.off(type as string, listener as (...args: any[]) => void)
  }

  async clone() {
    const cloned = new PatchLanguageModel()
    cloned._options = { ...this._options }
    cloned._input = [...this._input]
    cloned._readyPromiseResolver = Promise.withResolvers<void>()
    cloned._readyPromiseResolver.resolve()
    return cloned
  }

  destroy(): undefined {
    this._readyPromiseResolver = null
  }

  onquotaoverflow: ((this: LanguageModel, ev: Event) => unknown) | null = null

  private convertMessage(msgs: LanguageModelMessage[]) {
    return msgs.map((msg) => {
      const content = typeof msg.content === 'string' ? msg.content : msg.content.filter((c) => c.type === 'text').map((c) => c.value).join('')
      return {
        role: msg.role,
        content,
      }
    })
  }

  private get messages() {
    return this.convertMessage(this._input)
  }

  async measureInputUsage(input: LanguageModelPrompt, _options?: LanguageModelPromptOptions): Promise<number> {
    if (typeof input === 'string') {
      return input.length
    }
    else {
      return this.convertMessage(input).reduce((acc, msg) => {
        return acc + msg.content.length
      }, 0)
    }
  }

  execute(input: LanguageModelPrompt, _options?: LanguageModelPromptOptions) {
    return this.prompt(input, _options)
  }

  async prompt(input: LanguageModelPrompt, _options?: LanguageModelPromptOptions) {
    log.debug('Executing language model prompt', { input, options: _options })
    const messages = typeof input === 'string'
      ? [{ role: 'user' as const, content: input }]
      : input.filter((msg) => typeof msg.content === 'string').map((msg) => ({
          role: msg.role,
          content: msg.content as string,
        }))

    const resp = await generateText({
      messages,
      topK: this.topK,
      temperature: this.temperature,
    })
    return resp.text
  }

  promptStreaming(input: LanguageModelPrompt, options?: LanguageModelPromptOptions) {
    log.debug('Executing language model promptStreaming', { input, options: options })
    const prompt = this.prompt.bind(this)
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const resp = await prompt(input, options)
          controller.enqueue(resp)
          controller.close()
        }
        catch (error) {
          controller.error(error)
        }
      },
    })
    return readable
  }

  append(input: LanguageModelPrompt, _options?: LanguageModelPromptOptions): Promise<undefined> {
    const msg = (typeof input === 'string' ? [{ role: 'user' as const, content: input }] : input)
    this._input.push(...msg)
    return Promise.resolve(undefined)
  }

  static async create(options: LanguageModelCreateOptions): Promise<LanguageModel> {
    const model = new PatchLanguageModel()
    model._options = options || {}
    model._readyPromiseResolver = Promise.withResolvers<void>()
    model._readyPromiseResolver.resolve()
    return model
  }

  static async availability() {
    const ready = await checkBackendModel()
    return ready.backend && ready.model ? 'available' : 'unavailable'
  }

  static async capabilities() {
    const ready = await checkBackendModel()
    return {
      available: ready.backend && ready.model ? 'readily' : 'unavailable',
    }
  }
}

export async function canCreateTextSession() {
  const ready = await checkBackendModel()
  return ready.backend && ready.model ? 'readily' : 'unavailable'
}

export function polyfillForBuiltInAI() {
  if (!('Summarizer' in self)) {
    exposeToGlobal({ Summarizer: PatchSummarizer }, { skipExistedKey: true })
  }
  if (!('ai' in self) || !('createTextSession' in (self as { ai: object }).ai)) {
    const ai = {
      summarizer: PatchSummarizer,
      canCreateTextSession,
      createTextSession: PatchLanguageModel.create.bind(PatchLanguageModel),
      languageModel: PatchLanguageModel,
    }

    exposeToGlobal({ ai }, { skipExistedKey: true })
  }
}
