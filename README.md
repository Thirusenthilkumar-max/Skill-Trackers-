# Skill Trackers Platform

**Tagline**: Learning + Skill + Career.

A production-ready SaaS application with an AI-powered Career Mentor, Resume Analyzer, Goal Roadmap generator, and immersive Gamification built entirely using modern full-stack technologies.

## Technology Stack
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion + Recharts (Glassmorphism layout).
- **Backend API**: Node.js + Express + Supabase.
- **AI Microservice**: Python + FastAPI + spaCy + OpenAI.
- **Database**: Supabase PostgreSQL.

## Features
- 13 unique pages containing dynamic, glowing neon responsive layouts.
- NLP-infused Resume Analyzer using `spaCy` to map your CV content to market skills.
- AI Chatbot via `OpenAI` to guide career transitions and learning topics.
- GitHub API integration scanning for metrics to score your open-source presence.
- RapidAPI integration to monitor live job market trend lines (displayed in Recharts).

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.11+)

### 1. Supabase Setup
You need a Supabase project. The project schema should be populated with the provided `supabase/seed.sql` file.
1. Copy the URL and Anon Key into the environment variables.
2. In Supabase Dashboard, run the contents of `supabase/seed.sql` in the SQL Editor.

### 2. Running the AI Microservice (Python)
Ensure Python 3 is installed.
```bash
cd ai-service
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
pip install -r requirements.txt # (fastapi, uvicorn, spacy, openai, python-dotenv)
python -m spacy download en_core_web_sm
```
Create an `ai-service/.env` file with `OPENAI_API_KEY=your_key_here`.
Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Running the Main Backend (Node.js)
```bash
cd backend
npm install
```
Ensure `backend/.env` has `SUPABASE_URL` and `SUPABASE_KEY`.
Start the server:
```bash
npm start
```

### 4. Running the Frontend (React/Vite)
```bash
cd frontend
npm install
```
Start the frontend interface:
```bash
npm run dev
```
Access the application on `http://localhost:5173`.
