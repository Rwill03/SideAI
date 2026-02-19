
<div align="center">

#SideAI

### AI-Powered Desktop Automation with Real-Time Visualization

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[![E2B](https://img.shields.io/badge/Powered_by-E2B-FF6B6B?style=for-the-badge)](https://e2b.dev/)
[![smolagents](https://img.shields.io/badge/Built_with-smolagents-FFD700?style=for-the-badge)](https://github.com/huggingface/smolagents)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**SideAI** is a cutting-edge AI automation platform that enables AI agents to operate desktop environments in real-time. Built for researchers and developers, SideAI provides intuitive visualization and annotation tools for advancing agentic AI research.

### 🎯 Key Highlights

- 🖥️ **Real-time Desktop Control** - AI agents operate full desktop environments through E2B sandboxes
- 🎥 **Live VNC Streaming** - Watch agents work in real-time with desktop streaming
- 📊 **Step-by-Step Visualization** - Track every action with detailed execution logs
- 🎨 **Modern UI** - Tailscale-inspired warm crème interface with smooth animations
- 🔄 **WebSocket Integration** - Real-time bidirectional communication
- 📝 **Data Annotation** - Export traces for training and research purposes
- 🤖 **Multi-Model Support** - OpenAI, Anthropic, HuggingFace, and more

---

## ✨ Features

### 🚀 Core Capabilities

| Feature | Description |
|---------|-------------|
| **Desktop Automation** | Full control over desktop environments with mouse, keyboard, and application interactions |
| **GUI Agents** | AI agents that understand and interact with graphical user interfaces |
| **Real-time Streaming** | Live VNC feed showing agent actions as they happen |
| **Task Execution** | Natural language task processing with intelligent step breakdown |
| **Sandbox Isolation** | Secure E2B sandboxes for each session |
| **Multi-session Support** | Handle multiple concurrent agent sessions |
| **Error Recovery** | Automatic retry and error handling mechanisms |
| **Export Capabilities** | Download execution traces as JSON or GIF animations |

### 🎨 User Interface

- **Warm Crème Design** - Professional engineering-first aesthetic
- **Inter Font** - Clean, modern typography with -webkit-font-smoothing
- **Framer Motion Animations** - Smooth, spring-based transitions
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Real-time Updates** - WebSocket-powered live status indicators
- **Connection Status** - Visual feedback for backend connectivity

### 🛠️ Technical Stack

#### Backend
- **FastAPI** - High-performance async Python web framework
- **Python 3.10+** - Modern Python with type hints
- **E2B Desktop SDK** - Sandboxed desktop environments
- **smolagents** - Agentic AI orchestration framework
- **WebSockets** - Real-time bidirectional communication
- **Uvicorn** - ASGI server with production-ready performance

#### Frontend
- **React 18** - Modern component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - Comprehensive component library
- **Framer Motion** - Production-ready animation library
- **Vite** - Lightning-fast build tool
- **Zustand** - Lightweight state management

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 20+**
- **E2B API Key** ([Get one free](https://e2b.dev/dashboard))
- **HuggingFace Token** (Optional, [get here](https://huggingface.co/settings/tokens))

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Rwill03/SideAI.git
cd SideAI
```

#### 2. Backend Setup

```bash
# Navigate to backend
cd cua2-core

# Create .env file
cp env.example .env

# Edit .env and add your keys:
# E2B_API_KEY=your_e2b_api_key_here
# HF_TOKEN=your_hf_token_here
# OPENAI_API_KEY=your_openai_key_here (optional)

# Install dependencies
pip install -e .

# Start backend
python -m uvicorn cua2_core.main:app --host 0.0.0.0 --port 8000
```

#### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd cua2-front

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Open Your Browser

Navigate to **http://localhost:8081** and start automating! 🎉

---

## 📚 Documentation

### 🔧 Configuration

#### Environment Variables

Create a `.env` file in `cua2-core/`:

```bash
# Required
E2B_API_KEY=your_e2b_api_key_here        # Get from https://e2b.dev/dashboard

# Optional - At least one AI provider key required
OPENAI_API_KEY=your_openai_key           # OpenAI models
ANTHROPIC_API_KEY=your_anthropic_key     # Claude models
HF_TOKEN=your_hf_token                   # HuggingFace models

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=true

# Agent Settings
AGENT_TIMEOUT=300                        # Task timeout in seconds
MAX_CONCURRENT_TASKS=5                   # Max parallel tasks
LOG_LEVEL=INFO
```

### 🎨 UI Customization

The interface uses a Tailscale-inspired design system. Customize in `cua2-front/src/theme.ts`:

```typescript
// Warm crème palette
background.default: "hsl(40, 20%, 97%)"  // Warm off-white
primary.main: "hsl(0, 0%, 12%)"          // Near-black CTAs
secondary.main: "hsl(40, 15%, 93%)"      // Soft crème
```

### 🔌 API Reference

#### WebSocket Connection

```typescript
// Connect to backend
const ws = new WebSocket('ws://localhost:8000/ws');

// Send task
ws.send(JSON.stringify({
  type: 'task',
  instruction: 'Open Firefox',
  model_id: 'gpt-4'
}));

// Receive updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Agent update:', data);
};
```

#### REST Endpoints

```bash
# Health check
GET /health

# Get available models
GET /api/models

# Generate random task
GET /api/random-task

# Get sandbox stream URL
GET /api/sandbox/{session_hash}/stream
```

### 📊 Data Export

Export execution traces for research:

```typescript
// Export as JSON
const trace = await fetch('/api/export/json').then(r => r.json());

// Export as GIF animation
const gif = await fetch('/api/export/gif').then(r => r.blob());
```

---

## 🏗️ Project Structure

```
SideAI/
├── cua2-core/              # Backend (Python/FastAPI)
│   ├── src/
│   │   └── cua2_core/
│   │       ├── main.py           # FastAPI application
│   │       ├── app.py            # App initialization
│   │       ├── models/           # Pydantic models
│   │       ├── routes/           # API routes
│   │       │   ├── routes.py
│   │       │   └── websocket.py  # WebSocket handler
│   │       ├── services/         # Business logic
│   │       │   ├── agent_service.py      # Agent orchestration
│   │       │   ├── sandbox_service.py    # E2B sandbox management
│   │       │   ├── archival_service.py   # Data storage
│   │       │   └── agent_utils/          # Agent utilities
│   │       └── websocket/        # WebSocket management
│   ├── tests/                    # Backend tests
│   ├── pyproject.toml
│   └── .env.example
│
├── cua2-front/             # Frontend (React/TypeScript)
│   ├── src/
│   │   ├── App.tsx               # Main app component
│   │   ├── theme.ts              # MUI theme (Tailscale-inspired)
│   │   ├── components/           # React components
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ConnectionStatus.tsx
│   │   │   ├── sandbox/          # Desktop viewer
│   │   │   └── steps/            # Task execution steps
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useAgentWebSocket.ts
│   │   │   └── useSendTask.ts
│   │   ├── services/             # API services
│   │   ├── stores/               # Zustand state management
│   │   └── pages/                # Route pages
│   ├── package.json
│   └── vite.config.ts
│
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Local development
├── nginx.conf              # Nginx configuration
├── pyproject.toml          # Workspace configuration
└── README.md               # This file
```

---

## 🐳 Docker Deployment

### Local Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:7860
```

### Hugging Face Spaces

The project is ready for Hugging Face Spaces deployment:

1. **Create a new Space** on [Hugging Face](https://huggingface.co/new-space)
2. **Select Docker SDK**
3. **Push your code** or link your GitHub repo
4. **Add Secrets** in Space Settings:
   - `E2B_API_KEY`
   - `HF_TOKEN`
   - `OPENAI_API_KEY` (optional)
5. **Deploy!** 🚀

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/SideAI.git
cd SideAI

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes

# Run tests
cd cua2-core && pytest
cd ../cua2-front && npm test

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### Code Style

- **Python**: Black, isort, flake8, mypy
- **TypeScript**: ESLint, Prettier
- **Commits**: Conventional Commits format

### Areas for Contribution

- 🐛 **Bug Fixes** - Find and fix issues
- ✨ **New Features** - Add new capabilities
- 📚 **Documentation** - Improve docs
- 🎨 **UI/UX** - Enhance the interface
- 🧪 **Testing** - Add test coverage
- 🌐 **Translations** - Multi-language support

---

## 🔬 Research & Citation

If you use SideAI in your research, please cite:

```bibtex
@software{sideai_2026,
  title = {SideAI: AI-Powered Desktop Automation},
  author = {Will R.},
  year = {2026},
  url = {https://github.com/Rwill03/SideAI}
}
```

---

## 🛡️ Security

- All agent actions run in **isolated E2B sandboxes**
- No persistent storage in sandboxes
- Sandboxes auto-expire after timeout
- WebSocket connections authenticated
- Rate limiting on API endpoints

**⚠️ Important**: Do not enter personal information in task descriptions. All traces may be stored for research purposes.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with amazing open-source projects:

- **[smolagents](https://github.com/huggingface/smolagents)** - Agentic AI framework by Hugging Face
- **[E2B](https://e2b.dev/)** - Secure sandboxed environments
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[React](https://reactjs.org/)** - UI library
- **[Material-UI](https://mui.com/)** - React component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

Inspired by the clean design philosophy of [Tailscale](https://tailscale.com/), [Linear](https://linear.app/), and [Vercel](https://vercel.com/).

---

## 📞 Support

- 📧 **Email**: williamrogov@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Rwill03/SideAI/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Rwill03/SideAI/discussions)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by [Will R.](https://github.com/Rwill03)

</div>
