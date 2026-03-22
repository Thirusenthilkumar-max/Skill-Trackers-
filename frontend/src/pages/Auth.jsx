import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

const Auth = ({ type }) => {
  const isLogin = type === 'login';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg to-darkSurface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neon Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonCyan/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonPink/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="glass-card w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <BrainCircuit className="w-12 h-12 text-neonCyan" />
            <div className="absolute inset-0 bg-neonCyan opacity-30 blur-xl rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-neonPink">
            Skill Trackers
          </h1>
          <p className="text-gray-400 mt-2 text-center text-sm">
            {isLogin ? 'Welcome back! Accelerate your career.' : 'Join the ultimate AI career platform.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="email" 
              placeholder="Email Address"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="password" 
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-3 flex justify-center items-center gap-2"
          >
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <button className="w-full mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl flex justify-center items-center gap-3 transition-colors">
          <Github className="w-5 h-5" /> Continue with GitHub
        </button>

        <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl flex justify-center items-center gap-3 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? '/signup' : '/login'} className="text-neonCyan hover:text-neonPink transition-colors font-bold">
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
