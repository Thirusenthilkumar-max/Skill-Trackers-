import React from 'react';
import { Briefcase, Building, MapPin, CheckCircle, ArrowRight, ExternalLink, Percent } from 'lucide-react';

const JobMatching = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior React Engineer",
      company: "TechNova Inc.",
      location: "San Francisco, CA (Remote)",
      matchScore: 94,
      missingSkills: ["GraphQL"],
      salary: "$140k - $160k",
      type: "Full-Time"
    },
    {
      id: 2,
      title: "Frontend Developer (Tailwind & Next.js)",
      company: "DesignShift",
      location: "New York, NY",
      matchScore: 88,
      missingSkills: ["Next.js (SSG)"],
      salary: "$120k - $140k",
      type: "Hybrid"
    },
    {
      id: 3,
      title: "Full Stack Engineer (Node/React)",
      company: "StartupZ",
      location: "Austin, TX",
      matchScore: 75,
      missingSkills: ["PostgreSQL", "Docker"],
      salary: "$130k - $150k",
      type: "Remote"
    }
  ];

  return (
    <div className="animate-in fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Briefcase className="w-10 h-10 text-neonCyan" />
        <div>
          <h1 className="text-3xl font-bold text-white text-glow-cyan">AI Job Matching</h1>
          <p className="text-gray-400">We analyze your skills and bridge the gap to high-paying jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 flex items-center justify-between border-b-2 border-green-400">
          <div>
            <p className="text-gray-400 text-sm font-bold tracking-wider">Perfect Matches</p>
            <h3 className="text-3xl font-bold text-white mt-1">12</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-400/20 text-green-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="glass-card p-6 flex items-center justify-between border-b-2 border-yellow-400">
          <div>
            <p className="text-gray-400 text-sm font-bold tracking-wider">Good Matches (&gt;75%)</p>
            <h3 className="text-3xl font-bold text-white mt-1">45</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
        </div>
        <div className="glass-card p-6 flex items-center justify-between border-b-2 border-neonPink">
          <div>
            <p className="text-gray-400 text-sm font-bold tracking-wider">Requires Upskilling</p>
            <h3 className="text-3xl font-bold text-white mt-1">18</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-neonPink/20 text-neonPink flex items-center justify-center">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 relative group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <div className={`absolute top-0 right-0 w-2 h-full ${
              job.matchScore >= 90 ? 'bg-green-400' : job.matchScore >= 80 ? 'bg-yellow-400' : 'bg-red-500'
            }`}></div>
            
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Building className="w-10 h-10 text-gray-500" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-neonCyan transition-colors">{job.title}</h2>
                <div className="bg-black/50 border border-white/10 rounded-full px-3 py-1 flex items-center gap-2">
                  <span className={`font-bold ${job.matchScore >= 90 ? 'text-green-400' : job.matchScore >= 80 ? 'text-yellow-400' : 'text-red-500'}`}>
                    {job.matchScore}% Match
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4 border-b border-white/10 pb-4">
                <span className="flex items-center gap-1 font-bold text-white"><Building className="w-4 h-4" /> {job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                <span className="flex items-center gap-1 text-neonPink font-bold">{job.salary}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-white">{job.type}</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  {job.missingSkills.length > 0 ? (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-gray-500">Missing tags:</span>
                      {job.missingSkills.map((skill, i) => (
                        <span key={i} className="border border-red-500/50 text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                      <CheckCircle className="w-4 h-4" /> You meet all requirements!
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                  {job.missingSkills.length > 0 && (
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 transition-colors">
                      Learn Missing Skills
                    </button>
                  )}
                  <button className="flex-1 md:flex-none btn-primary px-6 py-2 text-sm flex items-center justify-center gap-2">
                    Apply <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobMatching;
