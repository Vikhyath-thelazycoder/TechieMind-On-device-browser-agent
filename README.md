<!-- Repository: https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent -->

<div align="center">

<h1 align="center">
  <a href="https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent" style="text-decoration: none; color: inherit;">TechieMind</a><br>
  Private, On-device AI Assistant & Browser Agent
</h1>

*TechieMind is a private, open-source, on-device AI browser assistant and autonomous agent built on Ollama and local models — bringing intelligence into your browsing workflow with zero data sent to the cloud.*

[![Privacy First](https://img.shields.io/badge/Privacy-First-brightgreen?style=flat&logo=security&logoColor=white)]()
[![No Tracking](https://img.shields.io/badge/Tracking-None-success?style=flat&logo=shield&logoColor=white)]()
[![Data](https://img.shields.io/badge/Data-On%20Device-blue?style=flat&logo=lock&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Ollama](https://img.shields.io/badge/Ollama-Integrated-orange?style=flat&logo=llama&logoColor=white)](https://github.com/ollama/ollama)
[![WebLLM](https://img.shields.io/badge/WebLLM-Supported-purple?style=flat&logo=webassembly&logoColor=white)](https://github.com/mlc-ai/web-llm)

---
**The Future of Private AI is Here, Running Entirely on Your Device**

*TechieMind delivers cutting-edge intelligence without cloud dependencies—**faster responses, zero tracking, unlimited usage**—all running quietly in your browser while you stay in **complete** control.*

</div>

## ✨ Core Features

### 🤖 **Autonomous AI Agent - Your Intelligent Co-pilot**
- **Autonomous Task Execution**: AI agents that break down complex web queries into structured actions.
- **Interactive Page Clicking & Navigation**: Autonomously click links, fetch pages, and parse DOM structures using Accessible Markdown.
- **Context-Aware Decision Making**: Agents understand your active tab context and make intelligent decisions.
- **Multi-Step Problem Solving**: Run multi-step research workflows using integrated search and page analysis.

### 💬 **Browse Smarter with Local AI**
- **Contextual Awareness Across Tabs**: Continue AI conversations with memory that spans across your active tabs.
- **Smart Page Understanding**: Instantly summarize, inspect, and extract key information from any webpage.
- **Bilingual Translation**: Translate full pages or selected text with side-by-side view.
- **Quick In-Page Actions**: Highlight text on any website to summarize, rewrite, polish, or ask questions instantly.

### ✍️ **Productivity & Media Tools**
- **Chat with PDFs**: Ask questions directly about PDF files with client-side text extraction.
- **Chat with Screenshots & Images**: Upload images or capture tab screenshots for instant visual analysis (using vision models like Gemma 3).
- **Advanced Writing Suite**: Comprehensive writing assistance including grammar correction, tone adjustment, and creative rephrasing.

### 🧠 **Run Your Own Models Locally**
- **100% Offline-First**: All reasoning happens on your local hardware. Your private browsing history never leaves your device.
- **Flexible Model Selection**: Seamlessly switch between Gemma 3, Qwen 2.5 / Qwen 3, Llama 3.2, DeepSeek-R1, and more.

---

## 📦 Supported Browsers

TechieMind is built with Manifest V3 and runs on:
* **Google Chrome**
* **Brave Browser**
* **Microsoft Edge**
* **Mozilla Firefox**

---

## 🚀 Quick Start

### 1. Install & Run Ollama
TechieMind connects locally to [Ollama](https://ollama.com):

```bash
# Pull your preferred local model
ollama run qwen3:8b
# or
ollama run deepseek-r1:7b
```

### 2. Load the Extension
1. Open `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top right toggle).
3. Click **Load unpacked** (top left).
4. Select the `.output/chrome-mv3` folder inside this repository.
5. Open the TechieMind sidebar and start browsing!

---

## 🛠️ For Developers

### Technology Stack

| Component | Technologies |
| :--- | :--- |
| **Framework & Build** | [WXT (Web Extension Tools)](https://wxt.dev) + Vite 6 |
| **UI Components** | Vue 3 + TypeScript + TailwindCSS |
| **Architecture** | Bi-directional RPC (`birpc`) + IndexedDB (`idb`) |
| **AI Integration** | Vercel AI SDK + Ollama API + WebLLM |
| **Package Manager** | PNPM |

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Vikhyath-thelazycoder/TechieMind-On-device-browser-agent.git
cd TechieMind-On-device-browser-agent
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev         # Chrome development (default)
pnpm dev:firefox # Firefox development
pnpm dev:edge    # Edge development
```

### Production Build

```bash
# Build production extension package
pnpm build:prod

# Create zip archive for browser stores
pnpm zip:prod
```
The compiled extension will be output to `.output/chrome-mv3`.

### Running Tests

```bash
# Run unit tests
pnpm test:unit

# Type check
pnpm compile
```

---

## 🔒 Privacy & Architecture

* **Zero Cloud Transmissions**: Every prompt, summary, and page interaction is processed on your local machine.
* **No Telemetry / No Tracking**: TechieMind does not collect analytics, telemetry, or user metrics.
* **Transparent Codebase**: Fully open source under the MIT license.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
