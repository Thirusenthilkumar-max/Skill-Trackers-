import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AIChatbot from './pages/Chatbot';
import AIRoadmap from './pages/Roadmap';
import PortfolioAnalyzer from './pages/PortfolioAnalyzer';
import JobMarket from './pages/JobMarket';
import SoftSkillAnalyzer from './pages/SoftSkills';
import Gamification from './pages/Gamification';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import SkillPrediction from './pages/SkillPrediction';
import JobMatching from './pages/JobMatching';

import { UserProvider } from './context/UserContext';

const AppLayout = ({ children }) => (
  <div className="flex bg-gradient-to-br from-darkBg to-darkSurface min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 p-6 overflow-y-auto">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/signup" element={<Auth type="signup" />} />
          
          {/* Protected Routes (Wrapper) */}
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/resume-analyzer" element={<AppLayout><ResumeAnalyzer /></AppLayout>} />
          <Route path="/portfolio-analyzer" element={<AppLayout><PortfolioAnalyzer /></AppLayout>} />
          <Route path="/roadmap" element={<AppLayout><AIRoadmap /></AppLayout>} />
          <Route path="/jobs" element={<AppLayout><JobMarket /></AppLayout>} />
          <Route path="/predictions" element={<AppLayout><SkillPrediction /></AppLayout>} />
          <Route path="/soft-skills" element={<AppLayout><SoftSkillAnalyzer /></AppLayout>} />
          <Route path="/chatbot" element={<AppLayout><AIChatbot /></AppLayout>} />
          <Route path="/gamification" element={<AppLayout><Gamification /></AppLayout>} />
          <Route path="/job-matching" element={<AppLayout><JobMatching /></AppLayout>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
