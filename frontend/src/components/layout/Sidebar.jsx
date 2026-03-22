import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  Github, 
  Map, 
  Briefcase, 
  TrendingUp, 
  MessageSquare, 
  Award,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Resume Analyzer', path: '/resume-analyzer', icon: FileText },
    { name: 'Portfolio Analyzer', path: '/portfolio-analyzer', icon: Github },
    { name: 'AI Roadmap', path: '/roadmap', icon: Map },
    { name: 'Job Market', path: '/jobs', icon: Briefcase },
    { name: 'Skill Prediction', path: '/predictions', icon: TrendingUp },
    { name: 'Soft Skills', path: '/soft-skills', icon: UserCircle },
    { name: 'AI Mentor', path: '/chatbot', icon: MessageSquare },
    { name: 'Gamification', path: '/gamification', icon: Award },
    { name: 'Job Matching', path: '/job-matching', icon: Briefcase },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#0f0f0f]/80 backdrop-blur-md border-r border-white/10 p-5 flex flex-col z-50">
      
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 mb-10 px-2 py-4 border-b border-white/10">
        <div className="relative">
          <img src={`/logo.png?v=${new Date().getTime()}`} alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
          <div className="absolute inset-0 bg-neonCyan opacity-20 blur-xl rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-neonPink drop-shadow-[0_0_10px_rgba(0,245,255,0.4)]">
          Skill Trackers
        </h1>
      </div>

      <div className="text-xs text-gray-400 font-semibold mb-4 tracking-wider">MAIN MENU</div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-neonCyan/20 to-transparent text-neonCyan border-l-4 border-neonCyan shadow-[0_0_10px_rgba(0,245,255,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Auth / Logout */}
      <div className="pt-6 border-t border-white/10 mt-auto">
        <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-neonPink hover:bg-white/5 transition-all duration-300">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
