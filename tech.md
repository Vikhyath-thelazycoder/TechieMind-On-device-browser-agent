# 🛠️ TechieMind: Technology Stack & Architectural Decisions

This document outlines the complete technology stack used in **TechieMind** and briefly explains why each technology was chosen.

---

## 1. Core Framework & Build System

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **WXT (Web Extension Tools)** | Modern browser extension framework built on Vite. Automates Manifest V3 configurations, multi-browser targeting (Chrome, Firefox, Edge, Brave), and cross-world endpoint bundling. |
| **Vite 6** | High-performance build tool and bundler. Powers rapid development, Hot Module Replacement (HMR), and optimized tree-shaken production bundles. |
| **TypeScript (v5.8)** | Enforces strict static type safety across asynchronous message channels, RPC calls, and LLM structured schemas. |
| **pnpm** | Fast, disk-space-efficient package manager with strict dependency resolution. |

---

## 2. Frontend & User Interface

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Vue 3 (Composition API / `<script setup>`)** | High-performance reactive UI library driving the Sidepanel, Popup, Onboarding, and Settings dashboard. |
| **TailwindCSS (v4)** | Modern utility-first CSS engine for responsive, consistent, and lightweight interface styling. |
| **Pinia** | Centralized, reactive state management for active chat sessions, backend connection status, and LLM preferences. |
| **Vue Router (v4)** | Client-side routing enabling tabbed navigation within the extension settings page. |
| **VueUse** | Collection of composable reactive utilities (async state management, debouncing, scroll observers). |
| **Motion-V** | Declarative animation library for fluid transitions, modals, and streaming response cards. |
| **Vue Shadow DOM** | Encapsulates in-page injected UI components (e.g., Gmail assistant, inline writing tools) inside isolated Shadow DOMs to avoid CSS conflicts with host websites. |

---

## 3. Local On-Device AI Runtimes

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Ollama (`ollama`)** | Primary local inference backend. Communicates directly with local daemons (`:11434`) for high-speed token streaming of open-weights models (Qwen, DeepSeek, Gemma, Llama). |
| **LM Studio SDK (`@lmstudio/sdk`)** | Dedicated SDK connecting to LM Studio's local server (`:1234`), allowing users to run local GGUF models. |
| **WebLLM (`@mlc-ai/web-llm`)** | In-browser, zero-installation AI execution using WebGPU and WebAssembly. Provides an immediate on-device experience without external daemons. |
| **Vercel AI SDK (`ai`, `@ai-sdk/provider`)** | Standardized, unified abstraction layer for streaming tokens, handling tool definitions, and building prompt-based agent loops. |
| **Transformers.js (`@huggingface/transformers`)** | Runs state-of-the-art Hugging Face models (like local text embeddings) directly in the browser's JavaScript sandbox. |

---

## 4. DOM Parsing & Content Extraction

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Turndown** | HTML-to-Markdown converter. Compresses complex web DOM trees into concise, token-efficient Markdown for local LLM ingestion. |
| **@mozilla/readability** | Mozilla’s standalone article parser (from Firefox Reader View). Strips out navigation bars, sidebars, and ads to extract core webpage content. |
| **Cheerio** | Fast server-style jQuery/HTML parser used in background worker contexts where full browser DOMs are unavailable. |
| **Morphdom** | Lightweight DOM diffing algorithm for fast, non-destructive DOM patching. |

---

## 5. Storage, Caching & IPC (Inter-Process Communication)

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **birpc** | Ultra-lightweight, strongly-typed bi-directional RPC framework. Handles seamless communication between Background Service Worker, Content Scripts, and Sidepanel. |
| **idb (IndexedDB)** | Promised-based wrapper for IndexedDB. Persists local conversation histories, session metadata, and translation caches locally. |
| **LRU-Cache** | High-speed in-memory cache with Least-Recently-Used eviction for active sessions, tab contents, and translation chunks. |

---

## 6. Document, Image & Markdown Processing

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Marked & Extensions** | Modular markdown parsing pipeline (`marked-highlight`, `marked-katex-extension`, `marked-directive`) for rendering formatted AI responses. |
| **KaTeX** | Fast math typesetting library to render LaTeX equations and mathematical expressions. |
| **Highlight.js** | Syntax highlighting engine for code snippets generated in the AI chat stream. |
| **DOMPurify** | Security sanitizer preventing Cross-Site Scripting (XSS) by cleaning raw HTML before rendering. |
| **unpdf** | Lightweight PDF text extractor for reading local and online PDF documents on-device. |
| **Jimp** | Pure JavaScript image processing library for image resizing, cropping, and MIME-type conversion without native C++ dependencies. |

---

## 7. Utilities, Validation & Localization

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Zod** | Type-safe schema definition and validation engine for tool parameters and structured LLM outputs. |
| **Day.js** | Minimalist datetime manipulation library for conversation timestamps and scheduling. |
| **Vue-i18n** | Internationalization library supporting 12+ languages (English, Spanish, French, Chinese, Japanese, etc.). |
| **es-toolkit** | Modern, high-performance Lodash replacement for array and object manipulation. |

---

## 8. Quality Assurance & Tooling

| Technology | Purpose & Why It Is Used |
| :--- | :--- |
| **Vitest** | Native Vite-powered unit testing framework for lightning-fast test execution. |
| **Playwright** | Headless browser testing framework for end-to-end extension verification in Chrome and Firefox. |
| **ESLint & Prettier** | Enforces consistent code quality, import sorting, and linting rules. |
| **Husky** | Git hook manager running validation checks before commits. |
