import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader, ShieldAlert, Star, Target, BookOpen, Zap, Briefcase, Activity, Check, AlertTriangle } from 'lucide-react';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/ai/resume-analyze', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume. Please make sure the AI backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-white mb-2 text-glow-cyan flex items-center gap-3">
              <FileText className="text-neonCyan w-8 h-8" /> ATS Deep Resume Analyzer
            </h1>
            <p className="text-gray-400">
              Upload your PDF docs. Our AI engine evaluates readability, keyword coverage, and provides ATS metrics.
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Upload UI */}
        <div className="lg:col-span-1">
           <div className="glass-card p-8 flex flex-col items-center justify-center border-dashed border-2 border-white/20 relative group hover:border-neonCyan transition-colors min-h-[300px]">
             <input 
               type="file" 
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
               accept=".pdf,.docx"
               onChange={(e) => setFile(e.target.files[0])}
               onDragOver={(e) => e.preventDefault()}
               onDrop={handleDrop}
             />
             <Upload className="w-16 h-16 text-gray-500 group-hover:text-neonCyan mb-4 transition-colors" />
             <h3 className="text-xl text-white font-bold mb-2 text-center">Drag & Drop Resume</h3>
             <p className="text-sm text-gray-400 text-center mb-6">PDF, DOCX (Max 5MB)</p>
             
             {file && (
               <div className="w-full bg-white/5 p-4 rounded-xl flex items-center justify-between border border-neonCyan/30 relative z-20">
                 <span className="text-white text-sm truncate pr-2">{file.name}</span>
                 <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
               </div>
             )}

             <button 
               onClick={handleAnalyze}
               disabled={!file || isAnalyzing}
               className={`mt-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all relative z-20 ${
                 !file 
                   ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                   : 'bg-gradient-to-r from-neonCyan to-blue-500 text-white shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:shadow-[0_0_25px_rgba(0,245,255,0.6)]'
               }`}
             >
               {isAnalyzing ? <Loader className="animate-spin w-5 h-5" /> : <FileText className="w-5 h-5" />}
               {isAnalyzing ? 'Scanning Document...' : 'Analyze Now'}
             </button>
           </div>
        </div>

        {/* Right Col: Results UI */}
        <div className="lg:col-span-2 space-y-8">
          {!results && !isAnalyzing && (
             <div className="glass-card h-full flex flex-col items-center justify-center p-12 text-gray-500 opacity-60 min-h-[300px]">
                <AlertCircle className="w-16 h-16 mb-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Awaiting Document</h3>
                <p className="text-center max-w-md">Upload your resume to instantly see exactly how an ATS system parses and ranks your profile.</p>
             </div>
          )}

          {isAnalyzing && (
             <div className="glass-card h-full flex flex-col items-center justify-center p-12 min-h-[300px]">
               <div className="w-20 h-20 border-4 border-neonCyan border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(0,245,255,0.5)]"></div>
               <h3 className="text-xl font-bold text-white mb-2 animate-pulse text-glow-cyan">Parsing Resume...</h3>
               <p className="text-gray-400">Extracting semantic entities and ATS metrics</p>
             </div>
          )}

          {results && !results.isValidResume && (
            <div className="glass-card p-8 border-l-4 border-red-500 bg-red-500/5 animate-in slide-in-from-right">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <ShieldAlert className="text-red-500 w-8 h-8" /> Invalid Resume Detected
              </h2>
              <p className="text-gray-300 text-lg mb-6">{results.profileSummary}</p>
              <div className="bg-black/30 p-6 rounded-xl border border-red-500/20">
                 <h4 className="font-bold text-white mb-3">Fixes required:</h4>
                 <ul className="space-y-3">
                   {results.improvementSuggestions?.map((s, i) => (
                     <li key={i} className="flex gap-3 text-red-200">
                       <span className="text-red-500">→</span> {s}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          )}

          {results && results.isValidResume && (
            <div className="animate-in slide-in-from-right duration-500 space-y-6">
               {/* Top Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 border-t-4 border-neonCyan bg-gradient-to-b from-neonCyan/5 to-transparent flex flex-col items-center text-center">
                    <p className="text-gray-400 mb-2 font-bold text-xs uppercase tracking-wider">ATS Score</p>
                    <h3 className="text-5xl font-black text-white">{results.resumeScore}</h3>
                  </div>
                  <div className="glass-card p-6 border-t-4 border-neonPink bg-gradient-to-b from-neonPink/5 to-transparent flex flex-col items-center text-center justify-center">
                    <p className="text-gray-400 mb-2 font-bold text-xs uppercase tracking-wider">Candidate Level</p>
                    <h3 className="text-2xl font-bold text-white">{results.candidateLevel}</h3>
                  </div>
                  <div className="glass-card p-6 border-t-4 border-yellow-400 bg-gradient-to-b from-yellow-400/5 to-transparent flex flex-col items-center text-center justify-center">
                    <p className="text-gray-400 mb-2 font-bold text-xs uppercase tracking-wider">Readability</p>
                    <h3 className="text-2xl font-bold text-white">{results.atsReadability}</h3>
                  </div>
               </div>

               {/* Summary */}
               <div className="glass-card p-8 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" /> Professional Summary
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{results.profileSummary}</p>
               </div>

               {/* Metrics Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 flex items-center gap-4">
                    <Activity className="text-green-400 w-8 h-8" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Keyword Match</p>
                      <p className="text-xl font-bold text-white">{results.keywordCoverage}</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 flex items-center gap-4">
                    <Target className="text-purple-400 w-8 h-8" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Section Quality</p>
                      <p className="text-sm font-bold text-white mt-1">{results.resumeSectionQuality}</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 flex items-center gap-4">
                    <Zap className="text-yellow-400 w-8 h-8" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Project Quality</p>
                      <p className="text-sm font-bold text-white mt-1">{results.projectQuality}</p>
                    </div>
                  </div>
               </div>

               {/* Strengths / Weaknesses */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 border border-green-500/20 bg-green-500/5">
                     <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                       <Check className="text-green-400 w-5 h-5"/> Core Strengths
                     </h4>
                     <ul className="space-y-3">
                       {results.topStrengths.map((s, i) => (
                         <li key={i} className="text-gray-300 text-sm flex gap-2">
                           <span className="text-green-400">•</span> {s}
                         </li>
                       ))}
                     </ul>
                  </div>
                  <div className="glass-card p-6 border border-red-500/20 bg-red-500/5">
                     <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                       <AlertTriangle className="text-red-400 w-5 h-5"/> Key Weaknesses
                     </h4>
                     <ul className="space-y-3">
                       {results.weaknesses.map((w, i) => (
                         <li key={i} className="text-gray-300 text-sm flex gap-2">
                           <span className="text-red-400">•</span> {w}
                         </li>
                       ))}
                     </ul>
                  </div>
               </div>

               {/* Skills & Next Steps */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                     <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                       <BookOpen className="text-neonPink w-5 h-5"/> Missing Skills
                     </h4>
                     <div className="flex flex-wrap gap-2">
                       {results.missingSkills.map((skill, i) => (
                         <span key={i} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                           {skill}
                         </span>
                       ))}
                     </div>
                  </div>
                  <div className="glass-card p-6">
                     <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                       <Briefcase className="text-neonCyan w-5 h-5"/> Suitable Roles
                     </h4>
                     <div className="flex flex-wrap gap-2">
                       {results.bestSuitableRoles.map((role, i) => (
                         <span key={i} className="bg-neonCyan/10 text-neonCyan border border-neonCyan/30 px-3 py-1 rounded-full text-sm font-medium">
                           {role}
                         </span>
                       ))}
                     </div>
                  </div>
               </div>

               {/* Action Plan */}
               <div className="glass-card p-8 border-l-4 border-blue-500 bg-blue-500/5">
                  <h3 className="text-xl font-bold text-white mb-6">Actionable Improvements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <h4 className="text-sm text-gray-400 font-bold uppercase mb-3">Resume Edits</h4>
                       <ul className="space-y-3">
                         {results.improvementSuggestions.map((s, i) => (
                           <li key={i} className="text-gray-300 text-sm flex gap-2">
                             <span className="text-blue-400">→</span> {s}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h4 className="text-sm text-gray-400 font-bold uppercase mb-3">Career Next Steps</h4>
                       <ul className="space-y-3">
                         {results.recommendedNextSteps.map((s, i) => (
                           <li key={i} className="text-gray-300 text-sm flex gap-2">
                             <span className="text-neonCyan">→</span> {s}
                           </li>
                         ))}
                       </ul>
                     </div>
                  </div>
               </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResumeAnalyzer;
