from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.resume_parser import analyze_resume
from services.openai_service import get_chatbot_reply, generate_roadmap
from services.github_service import analyze_github_portfolio
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Skill Trackers AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list = []

class RoadmapRequest(BaseModel):
    target_role: str
    current_skills: list[str]

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "AI Engine"}

class PortfolioRequest(BaseModel):
    username: str

@app.post("/api/ai/portfolio-analyze")
async def analyze_portfolio_endpoint(req: PortfolioRequest):
    result = await analyze_github_portfolio(req.username)
    return result

@app.post("/api/ai/resume-analyze")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file format")
    
    contents = await file.read()
    # Mocking advanced parsing for safety and speed here. In absolute production this parses PDF bytes.
    # For now we use our spacy logic.
    result = analyze_resume(contents, file.filename)
    return result

@app.post("/api/ai/chat")
async def chat_endpoint(req: ChatRequest):
    reply = get_chatbot_reply(req.message, req.history)
    return {"reply": reply}

@app.post("/api/ai/roadmap")
async def roadmap_endpoint(req: RoadmapRequest):
    roadmap = generate_roadmap(req.target_role, req.current_skills)
    return {"roadmap": roadmap}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
