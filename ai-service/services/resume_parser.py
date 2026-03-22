import spacy
from typing import Dict, Any

# Load English NLP model. We wrap in try block in case it hasn't downloaded completely yet.
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    nlp = None

KNOWN_SKILLS = {
    "react", "node.js", "python", "javascript", "typescript", "aws", "docker",
    "sql", "machine learning", "communication", "leadership", "agile", "c++", "java"
}

def analyze_resume(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Simulates text extraction and applies NLP to detect skills.
    In a full production scenario with PyMuPDF:
    import fitz
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = "".join(page.get_text() for page in doc)
    """
    
    # We will simulate the extracted text for demonstration if extraction fails
    # In reality we'd parse the PDF/DOCX bytes here
    simulated_text = "I am an experienced React and Node.js developer with soft skills like leadership and communication."
    
    found_skills = set()
    
    if nlp is not None:
        doc = nlp(simulated_text.lower())
        for token in doc:
            if token.text in KNOWN_SKILLS:
                found_skills.add(token.text.title())
    else:
        # Fallback if spacy is not loaded
        for skill in KNOWN_SKILLS:
            if skill.lower() in simulated_text.lower():
                found_skills.add(skill.title())

    prompt = f"""
You are an expert ATS resume analyzer, recruiter, and software career mentor.

Analyze this resume strictly based on the actual resume text.

Important rules:
- Never use static or repeated output.
- Never invent content not present in the resume.
- Base all conclusions only on the provided resume text.
- If the resume text is invalid or unreadable, return an invalid-resume response.
- Be practical, recruiter-focused, and student-friendly.
- Do not overrate the candidate.
- If the resume says Fresher, do not label the candidate as Intermediate or Mid-level unless strong evidence exists.
- Do not invent cloud, AWS, Docker, CI/CD, or software engineering experience unless explicitly present.
- Suitable roles must match the actual evidence in the resume.
- Missing skills must be relevant to the candidate's target path and current profile.
- Return realistic ATS-style analysis for a student/fresher profile.
- Return valid JSON only.

Return these fields:
- isValidResume
- resumeScore
- candidateLevel
- profileSummary
- topStrengths
- weaknesses
- missingSkills
- improvementSuggestions
- bestSuitableRoles
- atsReadability
- keywordCoverage
- projectQuality
- resumeSectionQuality
- recommendedNextSteps

Resume Text:
{simulated_text}
"""

    if not file_bytes:
        return {
            "isValidResume": False,
            "resumeScore": 0,
            "candidateLevel": "Unavailable",
            "profileSummary": "The uploaded file is empty or could not be read.",
            "topStrengths": [],
            "weaknesses": ["No text detected in document."],
            "missingSkills": [],
            "improvementSuggestions": ["Please upload a valid PDF with selectable text.", "Ensure the document is not an image-only PDF."],
            "bestSuitableRoles": [],
            "atsReadability": "Poor",
            "keywordCoverage": "0%",
            "projectQuality": "Unavailable",
            "resumeSectionQuality": "Unavailable",
            "recommendedNextSteps": ["Convert your resume to a standard PDF and re-upload."]
        }
        
    # Simulated logic
    return {
        "isValidResume": True,
        "resumeScore": 65,
        "candidateLevel": "Fresher / Entry-Level",
        "profileSummary": "An entry-level resume showing foundational knowledge in JavaScript and React, but lacking professional experience and advanced project complexity.",
        "topStrengths": [
            "Good foundational understanding of frontend web technologies",
            "Clear mention of soft skills like communication"
        ],
        "weaknesses": [
            "No prior internship or professional engineering experience",
            "Projects listed lack depth and quantifiable metrics"
        ],
        "missingSkills": ["Version Control (Git/GitHub)", "API Integration", "Basic Testing (Jest)"],
        "improvementSuggestions": [
            "Build and list a more complex full-stack project (e.g., using Node.js or Firebase).",
            "Include links to your live projects or GitHub repositories.",
            "List any relevant coursework if you are a recent graduate."
        ],
        "bestSuitableRoles": [
            "Junior Frontend Developer",
            "Web Development Intern"
        ],
        "atsReadability": "Good",
        "keywordCoverage": "40%",
        "projectQuality": "Beginner",
        "resumeSectionQuality": "Basic",
        "recommendedNextSteps": [
            "Complete a structured internship or open-source contribution.",
            "Create a GitHub portfolio to showcase your code quality."
        ]
    }
