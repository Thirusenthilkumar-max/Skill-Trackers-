import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY", "")
# Initialize client only if key is valid (not empty or "your_openai_api_key_here")
client = None
if api_key and api_key != "your_openai_api_key_here":
    client = AsyncOpenAI(api_key=api_key)

def get_chatbot_reply(message: str, history: list) -> str:
    """
    Simulates or calls OpenAI to get a career mentor response with strict rules.
    """
    
    system_prompt = """You are an AI Mentor inside a skill analysis website.

Rules:
1. If the user asks about skill level, first answer the question directly.
2. Use available profile data, saved skills, projects, resume data, or assessment data.
3. Output must include:
   - Current Skill Level
   - Why this level
   - Strong areas
   - Missing skills
   - Next improvement step
4. Do not immediately redirect with 'upload resume' unless no user data exists.
5. If no data exists, say clearly that exact evaluation needs profile/resume data, but still give a general estimate framework.
6. Keep the response short, personalized, and useful.
7. Do not give vague generic chatbot replies.
"""

    if not client:
        message_lower = message.lower()
        # Simulated response explicitly following the 5-point framework rule
        if "skill level" in message_lower or "evaluate" in message_lower or "am i" in message_lower or "rate" in message_lower:
            return (
                "**Current Skill Level:** Junior / Intermediate Foundation\n\n"
                "**Why this level:** Based on your general frontend activity, you have functional component building capabilities but lack complex architectural depth.\n\n"
                "**Strong areas:** React styling, Component basics, UI integrations.\n\n"
                "**Missing skills:** Advanced State Management, Production Deployment (Docker/AWS), Backend integration.\n\n"
                "**Next improvement step:** Focus on building a full-stack application connecting React to a live external database.\n\n"
                "*(Note: Exact granular evaluation requires more profile/resume data. This is a general estimate framework as the live AI engine is currently simulated.)*"
            )
        
        return (
            "I am your AI Mentor! (Simulated Mode)\n\n"
            f"You asked: '{message}'.\n\nTo get the personalized 5-point skill evaluation based on our new strict guidelines, please ask me to evaluate your skill level or provide an API Key!"
        )
        
    # In production, we would use client.chat.completions.create(...)
    # messages = [{"role": "system", "content": system_prompt}]
    # messages.extend(history)
    # messages.append({"role": "user", "content": message})
    # response = await client.chat.completions.create(model="gpt-4", messages=messages)
    # return response.choices[0].message.content

def generate_roadmap(target_role: str, current_skills: list) -> dict:
    """
    Simulates or calls OpenAI to generate a roadmap.
    """
    if not client:
        role_lower = target_role.lower()
        if "ui" in role_lower or "ux" in role_lower or "design" in role_lower:
            return {
                "role": target_role,
                "duration": "3 Months",
                "phases": [
                    {
                        "title": "Module 1: Design Fundamentals & User Research",
                        "weeks": "Week 1-4",
                        "description": "Learn visual design principles, color theory, typography, and how to conduct effective user research and create user personas.",
                        "resources": [
                            {"name": "Google UX Design Certificate", "url": "https://grow.google/uxdesign/"},
                            {"name": "Nielsen Norman Group Articles", "url": "https://www.nngroup.com/articles/"}
                        ]
                    },
                    {
                        "title": "Module 2: Wireframing & Prototyping (Figma)",
                        "weeks": "Week 5-8",
                        "description": "Master Figma to create low-fidelity wireframes and high-fidelity interactive prototypes. Understand responsive layout structures.",
                        "resources": [
                            {"name": "Figma Official Tutorials", "url": "https://www.youtube.com/figmadesign"},
                            {"name": "Laws of UX", "url": "https://lawsofux.com/"}
                        ]
                    },
                    {
                        "title": "Module 3: Portfolio & Real-World Case Studies",
                        "weeks": "Week 9-12",
                        "description": "Apply your skills to build 3 strong case studies for your UI/UX portfolio. Document your design process thoroughly.",
                        "resources": [
                            {"name": "BestFolios - UX Portfolio Inspiration", "url": "https://www.bestfolios.com/portfolios"},
                            {"name": "Behance UI/UX", "url": "https://www.behance.net/galleries/ui-ux"}
                        ]
                    }
                ]
            }
        
        return {
            "role": target_role,
            "duration": "3-6 Months",
            "phases": [
                {
                    "title": "Module 1: Foundations",
                    "weeks": "Week 1-4",
                    "description": "Learn the basics connecting your current skills to the new role.",
                    "resources": [{"name": "FreeCodeCamp", "url": "https://freecodecamp.org"}]
                },
                {
                    "title": "Module 2: Advanced Concepts",
                    "weeks": "Week 5-8",
                    "description": "Deep dive into production ready patterns for " + target_role,
                    "resources": [{"name": "Documentation", "url": "#"}]
                }
            ]
        }
    
    return {"role": target_role, "phases": []}
