import React, { useState } from 'react';
import { Map, ArrowRight, CheckCircle, Clock, BookOpen, ExternalLink, FastForward } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIRoadmap = () => {
  const { userProfile } = useUser();
  const [targetRole, setTargetRole] = useState(userProfile?.role || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async () => {
    if (!targetRole.trim()) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_role: targetRole, current_skills: [] })
      });
      if (!res.ok) throw new Error("Network Error");
      const data = await res.json();
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error("AI service failed or not reachable, using fallback:", err);
      const targetLower = targetRole.toLowerCase();
      if (targetLower.includes('ui') || targetLower.includes('ux') || targetLower.includes('design')) {
        setRoadmap({
          role: targetRole,
          duration: "3 Months",
          phases: [
            {
              title: "Module 1: Design Fundamentals & User Research",
              weeks: "Week 1-4",
              description: "Learn visual design principles, color theory, typography, and how to conduct effective user research.",
              resources: [
                { name: "Google UX Design Certificate", url: "https://grow.google/uxdesign/" },
                { name: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/" }
              ]
            },
            {
              title: "Module 2: Wireframing & Prototyping (Figma)",
              weeks: "Week 5-8",
              description: "Master Figma to create low-fidelity wireframes and high-fidelity interactive prototypes.",
              resources: [
                { name: "Figma Official Tutorials", url: "https://www.youtube.com/figmadesign" },
                { name: "Laws of UX", url: "https://lawsofux.com/" }
              ]
            },
            {
              title: "Module 3: Portfolio & Real-World Case Studies",
              weeks: "Week 9-12",
              description: "Apply your skills to build 3 strong case studies for your UI/UX portfolio.",
              resources: [
                { name: "BestFolios Inspiration", url: "https://www.bestfolios.com/portfolios" },
                { name: "Behance UI/UX", url: "https://www.behance.net/galleries/ui-ux" }
              ]
            }
          ]
        });
      } else {
        setRoadmap({
          role: targetRole,
          duration: "3-6 Months",
          phases: [
            {
              title: "Module 1: Foundations",
              weeks: "Week 1-4",
              description: "Learn the basics connecting your current skills to the new role.",
              resources: [{ name: "FreeCodeCamp", url: "https://freecodecamp.org" }]
            },
            {
              title: "Module 2: Advanced Concepts",
              weeks: "Week 5-8",
              description: "Deep dive into production ready patterns for " + targetRole,
              resources: [{ name: "Documentation", url: "#" }]
            }
          ]
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <Map className="w-10 h-10 text-neonCyan" />
        <div>
          <h1 className="text-3xl font-bold text-white text-glow-cyan">AI Learning Roadmap</h1>
          <p className="text-gray-400 mt-1">Generate a personalized step-by-step path to your target career.</p>
        </div>
      </div>

      {!roadmap && (
        <div className="glass-card p-8 flex flex-col items-center justify-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-neonCyan/20 flex items-center justify-center mb-6">
            <FastForward className="w-10 h-10 text-neonCyan" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Where do you want to go?</h2>
          <p className="text-gray-400 text-center mb-8">
            Tell us your target role. We will analyze your current skills and generate a 3-6 month guided track with free resources.
          </p>
          
          <div className="w-full flex gap-4">
            <input 
              type="text" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer, Full Stack Developer..."
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !targetRole.trim()}
              className="btn-primary flex items-center gap-2"
            >
              {isGenerating ? 'Generating...' : 'Generate Path'} 
              {!isGenerating && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-neonCyan border-t-transparent rounded-full animate-spin mb-6"></div>
          <h3 className="text-xl font-bold text-white animate-pulse">Designing your custom curriculum...</h3>
        </div>
      )}

      {roadmap && (
        <div className="animate-in slide-in-from-bottom duration-500">
          <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-neonCyan/20 to-transparent p-6 rounded-2xl border-l-4 border-neonCyan">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Path to: <span className="text-neonCyan">{roadmap.role}</span></h2>
              <p className="text-gray-300 flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4" /> Estimated Duration: {roadmap.duration}
              </p>
            </div>
            <button onClick={() => setRoadmap(null)} className="text-sm text-gray-400 hover:text-white transition-colors">
              Start Over
            </button>
          </div>

          <div className="relative pl-8 space-y-12 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-neonCyan before:to-neonPink">
            {roadmap.phases.map((phase, i) => (
              <div key={i} className="relative glass-card p-6 ml-6 group hover:border-neonCyan transition-all duration-300">
                {/* Node indicator */}
                <div className="absolute top-8 -left-[2.85rem] w-6 h-6 rounded-full bg-darkBg border-2 border-neonCyan flex items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.8)] z-10 group-hover:scale-125 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-neonCyan"></div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-neonCyan tracking-wider uppercase">{phase.weeks}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                  </div>
                  <button className="text-gray-500 hover:text-green-400 transition-colors">
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-gray-400 mb-6">{phase.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-neonPink" /> Recommended Resources
                  </h4>
                  {phase.resources.map((res, j) => (
                    <a key={j} href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors group/link w-full md:w-fit">
                      <span className="text-white text-sm">{res.name}</span>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover/link:text-neonPink transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRoadmap;
