# Skill Trackers API Documentation

## AI Microservice (Python/FastAPI)

Base URL: `http://localhost:8000`

### 1. Health Check
`GET /health`
Returns status of the NLP engine.
**Response**:
```json
{"status": "ok", "service": "AI Engine"}
```

### 2. Resume Analyzer
`POST /api/ai/resume-analyze`
Uploads a Resume (PDF/DOCX) for NLP skill extraction via spaCy.
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (File object)

**Response**:
```json
{
  "score": 85,
  "foundSkills": ["React", "Python", "Communication"],
  "missingSkills": ["AWS", "Docker"],
  "suggestions": ["Add more cloud experience"]
}
```

### 3. AI Chatbot Mentor
`POST /api/ai/chat`
Ask career or skill related questions to the OpenAI integration.
**Request**:
```json
{
  "message": "How do I become a Data Scientist?",
  "history": [{"role": "assistant", "content": "Hello!"}]
}
```

### 4. Learning Roadmap Generator
`POST /api/ai/roadmap`
Generate a step-by-step career roadmap.
**Request**:
```json
{
  "target_role": "Full Stack Engineer",
  "current_skills": ["HTML", "CSS", "JS"]
}
```

---

## Node.js Core Backend

Base URL: `http://localhost:5000`

### 1. Health
`GET /api/health`
Returns Node backend status.

*(Endpoints for `/users`, `/progress`, `/jobs` are mapped directly to Supabase PostgREST endpoints in standard deployments, or handled via custom controllers in `/api/*` here.)*
