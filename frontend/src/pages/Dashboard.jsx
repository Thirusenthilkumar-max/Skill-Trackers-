import React from 'react';
import SkillRadar from '../components/charts/SkillRadar';
import { Target, Zap, TrendingUp, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { userProfile } = useUser();
  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 text-glow-cyan">Welcome Back, {userProfile.name.split(' ')[0]}</h1>
          <p className="text-gray-400">Here is your skill progression today.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-full border border-white/10 pr-6">
          <img src={userProfile.avatar} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-neonPink shadow-[0_0_15px_rgba(255,0,255,0.5)]" />
          <div>
            <div className="text-sm font-bold text-white">Level 24</div>
            <div className="w-32 h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neonCyan to-neonPink w-[70%] shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total XP', value: '12,450', icon: Zap, color: 'text-yellow-400' },
          { title: 'Skills Tracked', value: '14', icon: Target, color: 'text-neonCyan' },
          { title: 'Badges Earned', value: '8', icon: Award, color: 'text-neonPink' },
          { title: 'Learning Streak', value: '12 Days', icon: TrendingUp, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between group hover:-translate-y-1 transition-transform cursor-pointer">
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <h3 className={`text-2xl font-bold text-white group-hover:${stat.color} transition-colors`}>{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-white/5 border border-white/10 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Radar */}
        <div className="lg:col-span-1 glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Skill Assessment Radar</h2>
          <SkillRadar />
        </div>

        {/* Right Column: Recommended Actions */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">AI Recommended Actions</h2>
          <div className="space-y-4">
            {[
              { text: "Complete 'React Hooks Advanced' module to level up Frontend Skill.", type: "Learning" },
              { text: "Take the Soft Skills Analyzer quiz to discover leadership strengths.", type: "Assessment" },
              { text: "Update your latest GitHub repository to refresh Portfolio Analysis.", type: "Action" }
            ].map((action, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-neonCyan/20 rounded-lg text-neonCyan">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{action.text}</h4>
                    <span className="text-xs text-neonPink uppercase tracking-wider font-bold mt-1 block">{action.type}</span>
                  </div>
                </div>
                <button className="btn-primary text-sm px-4 py-1">Start</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
