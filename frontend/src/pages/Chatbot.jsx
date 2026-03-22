import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your AI Career Mentor. I can help you with learning roadmaps, resume feedback, and job market insights. What would you like to focus on today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I can certainly help with that. To give you the best advice on "${userMsg}", we should first review your current skill set. Would you like me to generate a personalized learning path based on your resume?` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-8 h-8 text-neonPink" />
        <div>
          <h1 className="text-3xl font-bold text-white text-glow-cyan">AI Career Mentor</h1>
          <p className="text-gray-400 text-sm mt-1">Powered by OpenAI GPT-4</p>
        </div>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' 
                  ? 'bg-neonPink/20 border border-neonPink/50 text-neonPink shadow-[0_0_10px_rgba(255,0,255,0.3)]' 
                  : 'bg-neonCyan/20 border border-neonCyan/50 text-neonCyan shadow-[0_0_10px_rgba(0,245,255,0.3)]'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              
              <div className={`max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'assistant' 
                  ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none' 
                  : 'bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-white rounded-tr-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-neonPink/20 border border-neonPink/50 text-neonPink flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-neonPink rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neonPink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-neonPink rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-black/40 border-t border-white/10">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about skills, resumes, or career paths..."
              className="w-full bg-white/5 border border-white/20 text-white rounded-full pl-6 pr-16 py-4 focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 p-3 bg-gradient-to-r from-neonCyan to-blue-500 rounded-full text-white hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-500" /> Responses are AI-generated for testing purposes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
