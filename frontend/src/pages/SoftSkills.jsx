import React, { useState } from 'react';
import { UserCheck, MessageCircle, Users, CheckCircle } from 'lucide-react';

const SoftSkillAnalyzer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      q: "A team member is constantly missing deadlines. How do you respond?",
      options: [
        { text: "Report them to the manager immediately.", value: 0 },
        { text: "Have a private, empathetic 1-on-1 to understand their blockers.", value: 10 },
        { text: "Take over their work to make sure the project succeeds.", value: 5 },
      ]
    },
    {
      q: "Your code review receives harsh criticism. What is your reaction?",
      options: [
        { text: "Argue why my approach is right.", value: 2 },
        { text: "Ignore the comments and merge anyway.", value: 0 },
        { text: "Thank the reviewer, ask clarifying questions, and implement fixes.", value: 10 },
      ]
    },
    {
      q: "You are presenting a complex technical concept to a non-technical stakeholder.",
      options: [
        { text: "Use analogies and focus on business value.", value: 10 },
        { text: "Explain the deep technical architecture in detail.", value: 2 },
        { text: "Tell them they wouldn't understand and skip it.", value: 0 },
      ]
    }
  ];

  const handleSelect = (value) => {
    setScore(score + value);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="animate-in fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <UserCheck className="w-10 h-10 text-neonPink" />
        <div>
          <h1 className="text-3xl font-bold text-white text-glow-cyan">Soft Skills Analyzer</h1>
          <p className="text-gray-400">Evaluate your communication, teamwork, and leadership skills.</p>
        </div>
      </div>

      {!finished ? (
        <div className="glass-card p-10 mt-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <div 
              className="h-full bg-neonPink transition-all duration-500" 
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>

          <span className="text-neonPink font-bold text-sm tracking-wider uppercase mb-4 block">Question {currentQuestion + 1} of {questions.length}</span>
          <h2 className="text-2xl font-bold text-white mb-8">{questions[currentQuestion].q}</h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleSelect(opt.value)}
                className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-neonPink/20 hover:border-neonPink transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-gray-400 group-hover:border-neonPink"></div>
                  {opt.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-10 mt-8 text-center animate-in zoom-in duration-500">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Analysis Complete!</h2>
          <div className="inline-block p-6 bg-white/5 rounded-2xl border border-neonPink mb-8">
            <p className="text-gray-400 mb-2">Your Soft Skills Score</p>
            <h3 className="text-5xl font-bold text-neonPink">{score}/30</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <MessageCircle className="w-8 h-8 text-neonCyan mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Communication</h4>
              <p className="text-gray-400">Excellent. You demonstrate strong empathy and clear articulation of complex topics.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Users className="w-8 h-8 text-yellow-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Collaboration</h4>
              <p className="text-gray-400">Great teamwork approach. You prioritize team success over individual ego.</p>
            </div>
          </div>
          
          <button onClick={() => { setFinished(false); setScore(0); setCurrentQuestion(0); }} className="mt-8 btn-primary">
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default SoftSkillAnalyzer;
