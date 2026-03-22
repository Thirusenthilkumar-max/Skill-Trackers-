import React from 'react';
import { TrendingUp, BarChart2, Star } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '2022', React: 400, Python: 240, NextJS: 0 },
  { name: '2023', React: 600, Python: 280, NextJS: 100 },
  { name: '2024', React: 800, Python: 320, NextJS: 500 },
  { name: '2025 (Proj)', React: 850, Python: 400, NextJS: 900 },
  { name: '2026 (Pred)', React: 900, Python: 450, NextJS: 1200 },
];

const SkillPrediction = () => {
  return (
    <div className="animate-in fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <TrendingUp className="w-10 h-10 text-green-400" />
        <div>
          <h1 className="text-3xl font-bold text-white text-glow-cyan">AI Skill Prediction</h1>
          <p className="text-gray-400">Forecast the future demand of your tech stack based on AI models.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="glass-card p-6 border-l-4 border-neonCyan">
          <h3 className="text-gray-400 font-bold tracking-wider text-sm mb-1">MOST PROMISING</h3>
          <p className="text-2xl font-bold text-white">Next.js</p>
          <span className="text-green-400 text-sm flex items-center mt-2">+140% projected growth</span>
        </div>
        <div className="glass-card p-6 border-l-4 border-yellow-400">
          <h3 className="text-gray-400 font-bold tracking-wider text-sm mb-1">STABLE DEMAND</h3>
          <p className="text-2xl font-bold text-white">React & Python</p>
          <span className="text-gray-400 text-sm flex items-center mt-2">Consistent ~15% YoY growth</span>
        </div>
        <div className="glass-card p-6 border-l-4 border-red-500">
          <h3 className="text-gray-400 font-bold tracking-wider text-sm mb-1">DECLINING</h3>
          <p className="text-2xl font-bold text-white">jQuery</p>
          <span className="text-red-500 text-sm flex items-center mt-2">-45% projected decline</span>
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="text-neonCyan" /> Future Trajectory Model
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1"><Star className="w-3 h-3 text-neonPink" /> AI Prediction Mode</span>
          </div>
        </div>
        
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" />
              <XAxis dataKey="name" scale="band" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', borderColor: '#00f5ff', borderRadius: '10px' }} />
              <Legend />
              <Bar dataKey="React" barSize={20} fill="#00f5ff" />
              <Line type="monotone" dataKey="NextJS" stroke="#ff00ff" strokeWidth={3} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="Python" stroke="#ffcc00" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 p-4 bg-neonPink/10 border border-neonPink/30 rounded-xl text-neonPink text-sm">
           <strong>AI Insight:</strong> Your current skill set is heavily weighted towards React. We project that acquiring <strong>Next.js</strong> skills will yield the highest ROI over the next 24 months.
        </div>
      </div>
    </div>
  );
};

export default SkillPrediction;
