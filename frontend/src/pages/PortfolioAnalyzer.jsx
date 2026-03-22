import React, { useState } from 'react';
import { Github, Star, Target, AlertTriangle, CheckCircle, XCircle, Code, BookOpen, Briefcase, Zap } from 'lucide-react';

const PortfolioAnalyzer = () => {
  const [username, setUsername] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    if (!username) return;
    setIsAnalyzing(true);
    let parsedUsername = username.trim();
    if (parsedUsername.includes('github.com/')) {
      parsedUsername = parsedUsername.split('github.com/')[1].split('/')[0];
    }
    try {
      const res = await fetch('http://localhost:8000/api/ai/portfolio-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: parsedUsername })
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze portfolio. Please make sure the AI backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-in fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Github className="w-10 h-10 text-white" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">GitHub Portfolio Analyzer</h1>
          <p className="text-gray-400">Get an expert, recruiter-focused evaluation of your GitHub profile.</p>
        </div>
      </div>

      <div className="glass-card p-6 mb-8 flex gap-4">
        <input 
          type="text" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter GitHub Username or URL..."
          className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan focus:ring-1"
        />
        <button 
          onClick={handleAnalyze}
          disabled={!username || isAnalyzing}
          className="btn-primary"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Profile'}
        </button>
      </div>

      {data && (
        <div className="animate-in slide-in-from-bottom space-y-8">
          {/* Validity Check */}
          {!data.isValidProfile && (
            <div className="glass-card p-6 border-l-4 border-red-500 bg-red-500/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <XCircle className="text-red-500" /> Invalid Profile
              </h2>
              <p className="text-gray-300">{data.profileSummary}</p>
              <div className="mt-4">
                <h4 className="font-bold text-white mb-2">How to fix:</h4>
                <ul className="list-disc pl-5 text-gray-400">
                  {data.improvementSuggestions?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          )}

          {data.isValidProfile && (
            <>
              {/* Header Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center justify-between border-l-4 border-neonCyan">
                  <div>
                    <p className="text-gray-400 mb-1 font-bold text-xs uppercase tracking-wider">Profile Score</p>
                    <h3 className="text-4xl font-bold text-white">{data.profileScore}<span className="text-xl text-gray-500">/100</span></h3>
                  </div>
                  <Star className="w-8 h-8 text-neonCyan" />
                </div>
                <div className="glass-card p-6 flex items-center justify-between border-l-4 border-neonPink">
                  <div>
                    <p className="text-gray-400 mb-1 font-bold text-xs uppercase tracking-wider">Developer Level</p>
                    <h3 className="text-2xl font-bold text-white">{data.profileLevel}</h3>
                  </div>
                  <Target className="w-8 h-8 text-neonPink" />
                </div>
                <div className="glass-card p-6 flex items-center justify-between border-l-4 border-yellow-400">
                  <div>
                    <p className="text-gray-400 mb-1 font-bold text-xs uppercase tracking-wider">Career Readiness</p>
                    <h3 className="text-xl font-bold text-white">{data.careerReadiness}</h3>
                  </div>
                  <Briefcase className="w-8 h-8 text-yellow-400" />
                </div>
              </div>

              {/* Main Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass-card p-8 bg-gradient-to-br from-white/5 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-4">Executive Summary</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{data.profileSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="glass-card p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="text-green-400 w-5 h-5"/> Strengths
                        </h4>
                        <ul className="space-y-3">
                          {data.strengths.map((s, i) => (
                            <li key={i} className="text-gray-400 text-sm flex gap-2">
                              <span className="text-green-400">•</span> {s}
                            </li>
                          ))}
                        </ul>
                     </div>
                     <div className="glass-card p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <AlertTriangle className="text-yellow-400 w-5 h-5"/> Areas to Improve
                        </h4>
                        <ul className="space-y-3">
                          {data.weaknesses.map((w, i) => (
                            <li key={i} className="text-gray-400 text-sm flex gap-2">
                              <span className="text-yellow-400">•</span> {w}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>

                  <div className="glass-card p-8 border border-neonCyan/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neonCyan/10 blur-[80px] rounded-full pointer-events-none"></div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Zap className="text-neonCyan" /> Top Recommended Project
                    </h3>
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-neonPink">{data.bestProjectRecommendation.title}</h4>
                      <p className="text-gray-300 mt-2">{data.bestProjectRecommendation.reason}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-6">
                      <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full text-white">
                        Difficulty: {data.bestProjectRecommendation.difficulty}
                      </span>
                      <div className="flex gap-2">
                        {data.bestProjectRecommendation.suggestedTechStack.map((tech, i) => (
                          <span key={i} className="text-xs font-bold text-neonCyan border border-neonCyan/30 bg-neonCyan/10 px-3 py-1.5 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-400" /> Language Distribution
                    </h3>
                    <div className="space-y-5">
                      {data.languageDistribution.length > 0 ? data.languageDistribution.map((lang, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white font-medium">{lang.language}</span>
                            <span className="text-gray-400">{lang.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${lang.percentage}%` }}></div>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-500 text-sm">No significant language data available.</p>
                      )}
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-400" /> Missing Skills
                    </h3>
                    <div className="space-y-4">
                      {data.missingSkillsSuggestion.map((skill, i) => (
                        <div key={i} className="border-l-2 border-purple-400 pl-4 py-1">
                          <h5 className="font-bold text-white text-md mb-1">{skill.skill}</h5>
                          <p className="text-xs text-gray-400">{skill.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6">
                     <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" /> Top Repository
                     </h3>
                     <h4 className="font-bold text-neonCyan text-lg mb-2">{data.topRepository.name}</h4>
                     <p className="text-sm text-gray-300 mb-4">{data.topRepository.reason}</p>
                     <div className="flex flex-wrap gap-2">
                        {data.topRepository.strengths.map((s, i) => (
                          <span key={i} className="text-[10px] bg-white/10 text-gray-300 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                            {s}
                          </span>
                        ))}
                     </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalyzer;
