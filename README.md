# MoodMatrix AI - Mental Wellness Journaling Platform

[![IntelliAI Arena 2026](https://img.shields.io/badge/IntelliAI-Arena%202026-blue)](https://intelliarena.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered mental wellness journal that transforms daily reflections into actionable emotional insights.

## 🌟 Features

- 🤖 **AI Sentiment Analysis** - Google Gemini 2.5 Flash powered emotional intelligence
- 📊 **Mood Tracking** - Interactive charts and calendar heatmap
- 💡 **Personalized Recommendations** - AI-generated self-care suggestions
- 🔒 **Privacy-First** - End-to-end encryption, your data stays yours
- 📱 **Offline Support** - Write anywhere, sync automatically
- 🌍 **Multi-Language** - English, Hindi, Bengali, Tamil, Telugu, Malayalam
- 🎨 **Aurora Night Theme** - Beautiful dark UI with glassmorphism

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Google Gemini API key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/moodmatrix-ai.git
cd moodmatrix-ai
```

2. **Backend Setup**
```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Gemini API key
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your Gemini API key
```

4. **Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

5. **Open the app**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📦 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Frontend (.env)
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🏗️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS (Custom Aurora Night theme)
- Framer Motion (Animations)
- Recharts (Data visualization)
- IndexedDB (Offline storage)
- i18next (Internationalization)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Helmet.js (Security)
- Express Rate Limit

**AI:**
- Google Gemini 2.5 Flash API

## 📱 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy!

### Backend (Railway/Render)
1. Push code to GitHub
2. Create new service on [Railway](https://railway.app) or [Render](https://render.com)
3. Add environment variables (MongoDB, JWT, Gemini API)
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 📄 License

This project is licensed under the MIT License.

## 🏆 Built For

**IntelliAI Arena 2026**

### Powered By
- 🏛️ Acropolis - Enlightening Wisdom
- 🤖 AiML
- 🎓 Major League Hacking (MLH)
- 🧠 AI Nexus

## 📞 Contact

**Project Lead:** [Your Name]  
**Email:** [Your Email]  
**GitHub:** [Your GitHub Profile]

---

Made with ❤️ for mental wellness
