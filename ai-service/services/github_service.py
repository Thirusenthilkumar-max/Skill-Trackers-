import httpx
from services.openai_service import client

async def get_github_data(username: str) -> dict:
    async with httpx.AsyncClient() as http_client:
        try:
            # Note: Unauthenticated GitHub API has rate limits
            user_resp = await http_client.get(f"https://api.github.com/users/{username}")
            if user_resp.status_code != 200:
                return {}
            user_data = user_resp.json()
            
            repos_resp = await http_client.get(f"https://api.github.com/users/{username}/repos?per_page=100")
            repos_data = repos_resp.json() if repos_resp.status_code == 200 else []
            
            return {
                "public_repos": user_data.get("public_repos", 0),
                "followers": user_data.get("followers", 0),
                "public_gists": user_data.get("public_gists", 0),
                "repos": [{"name": r.get("name"), "language": r.get("language"), "stargazers_count": r.get("stargazers_count")} for r in repos_data[:20]]
            }
        except Exception:
            return {}

async def analyze_github_portfolio(username: str) -> dict:
    github_data = await get_github_data(username)
    
    prompt = f"""
You are an expert GitHub portfolio analyzer, recruiter, and software mentor.

Your task is to analyze the provided GitHub profile data and return a unique, evidence-based evaluation for each profile.

Important rules:
- Do not use static or repeated output.
- Do not generate the same analysis for different GitHub usernames.
- Base everything only on the provided GitHub profile data.
- If the profile is fake, invalid, missing, or not found, do not create a normal portfolio analysis.
- For invalid profiles, return a separate invalid-profile response.
- Be practical, accurate, recruiter-focused, and student-friendly.
- Return only valid JSON.
- Do not include markdown.
- Do not include explanations outside JSON.

For valid profiles, return JSON in this structure:
{{
  "isValidProfile": true,
  "profileScore": 0,
  "profileLevel": "",
  "profileSummary": "",
  "topRepository": {{
    "name": "",
    "reason": "",
    "strengths": []
  }},
  "bestProjectRecommendation": {{
    "title": "",
    "reason": "",
    "suggestedTechStack": [],
    "difficulty": ""
  }},
  "missingSkillsSuggestion": [
    {{
      "skill": "",
      "reason": ""
    }}
  ],
  "languageDistribution": [
    {{
      "language": "",
      "percentage": 0
    }}
  ],
  "strengths": [],
  "weaknesses": [],
  "improvementSuggestions": [],
  "recentActivity": "",
  "readmeCoverage": "",
  "careerReadiness": ""
}}

For invalid or fake profiles, return JSON in this structure:
{{
  "isValidProfile": false,
  "profileScore": 0,
  "profileLevel": "Unavailable",
  "profileSummary": "The GitHub profile could not be found or the provided URL is invalid.",
  "topRepository": {{
    "name": "N/A",
    "reason": "No repository data available.",
    "strengths": []
  }},
  "bestProjectRecommendation": {{
    "title": "Create your first portfolio-ready project",
    "reason": "No valid GitHub repositories were available to analyze.",
    "suggestedTechStack": ["HTML", "CSS", "JavaScript"],
    "difficulty": "Beginner"
  }},
  "missingSkillsSuggestion": [
    {{
      "skill": "GitHub profile setup",
      "reason": "A valid public GitHub profile is required for analysis."
    }},
    {{
      "skill": "Project documentation",
      "reason": "Repositories need descriptions and README files."
    }}
  ],
  "languageDistribution": [],
  "strengths": [],
  "weaknesses": [
    "No valid GitHub profile data available"
  ],
  "improvementSuggestions": [
    "Check whether the GitHub username is correct",
    "Make sure the profile exists and is public",
    "Add real repositories before requesting analysis"
  ],
  "recentActivity": "Unavailable",
  "readmeCoverage": "Unavailable",
  "careerReadiness": "Unavailable"
}}

Scoring rules for valid profiles:
- profileScore must be out of 100
- profileLevel must be one of: Beginner, Intermediate, Advanced
- topRepository must be selected based on project quality, usefulness, documentation, and career value
- bestProjectRecommendation must match the student's current skill gap
- missingSkillsSuggestion must be practical and based on portfolio gaps
- languageDistribution must come only from actual repository data
- improvementSuggestions must be specific to the profile, not generic
- if data is limited, mention it honestly in profileSummary

Special invalid-profile rule:
If isProfileFound is false, or if profile data is missing, empty, fake, or invalid:
- never generate fake strengths
- never generate fake language distribution
- never generate fake repository analysis
- return only the invalid-profile JSON structure

GitHub profile data:
{github_data}
"""
    
    if not client:
        # Mocking the response if OpenAI is not configured
        if not github_data or "public_repos" not in github_data:
            return {
                "isValidProfile": False,
                "profileScore": 0,
                "profileLevel": "Unavailable",
                "profileSummary": "The GitHub profile could not be found or the provided URL is invalid.",
                "topRepository": {
                    "name": "N/A",
                    "reason": "No repository data available.",
                    "strengths": []
                },
                "bestProjectRecommendation": {
                    "title": "Create your first portfolio-ready project",
                    "reason": "No valid GitHub repositories were available to analyze.",
                    "suggestedTechStack": ["HTML", "CSS", "JavaScript"],
                    "difficulty": "Beginner"
                },
                "missingSkillsSuggestion": [
                    {
                        "skill": "GitHub profile setup",
                        "reason": "A valid public GitHub profile is required for analysis."
                    },
                    {
                        "skill": "Project documentation",
                        "reason": "Repositories need descriptions and README files."
                    }
                ],
                "languageDistribution": [],
                "strengths": [],
                "weaknesses": [
                    "No valid GitHub profile data available"
                ],
                "improvementSuggestions": [
                    "Check whether the GitHub username is correct",
                    "Make sure the profile exists and is public",
                    "Add real repositories before requesting analysis"
                ],
                "recentActivity": "Unavailable",
                "readmeCoverage": "Unavailable",
                "careerReadiness": "Unavailable"
            }
        
        return {
            "isValidProfile": True,
            "profileScore": 75,
            "profileLevel": "Intermediate",
            "profileSummary": f"A solid portfolio for {username} showing strong foundational skills but lacking deep architectural complexity.",
            "topRepository": {
                "name": github_data.get("repos", [{"name": "skil-tracker"}])[0].get("name", "skill-tracker"),
                "reason": "Shows usage of multiple technologies and active commits.",
                "strengths": ["Clean structure", "Good use of frameworks"]
            },
            "bestProjectRecommendation": {
                "title": "Full-stack SaaS application with role-based auth",
                "reason": "To demonstrate production-readiness and database architecture.",
                "suggestedTechStack": ["React", "Node.js", "PostgreSQL", "Docker"],
                "difficulty": "Advanced"
            },
            "missingSkillsSuggestion": [
                {
                    "skill": "Testing",
                    "reason": "No automated testing frameworks (like Jest or Cypress) detected in repositories."
                },
                {
                    "skill": "CI/CD",
                    "reason": "Missing GitHub Actions or deployment pipelines for continuous integration."
                }
            ],
            "languageDistribution": [
                {"language": "JavaScript", "percentage": 60},
                {"language": "Python", "percentage": 25},
                {"language": "HTML/CSS", "percentage": 15}
            ],
            "strengths": [
                "Versatile across Frontend and Backend",
                "Consistent contribution history"
            ],
            "weaknesses": [
                "Most repositories lack comprehensive READMEs",
                "No visible testing setup"
            ],
            "improvementSuggestions": [
                "Write deep, descriptive READMEs for your top 3 projects.",
                "Add a testing suite (Jest) to your largest repository."
            ],
            "recentActivity": "Active",
            "readmeCoverage": "Needs Improvement",
            "careerReadiness": "High potential, needs polish"
        }
    
    # Production fallback
    return {}
