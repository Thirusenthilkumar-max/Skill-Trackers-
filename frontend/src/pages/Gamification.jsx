import React from 'react';
import { Trophy, Medal, Star, Target, Zap } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Gamification = () => {
  const { userProfile } = useUser();
  const leaderboard = [
    { rank: 1, name: userProfile.name, xp: "12,450", level: 24, badge: "Master", avatar: userProfile.avatar, isMe: true },
    { rank: 2, name: "Sarah Jenkins", xp: "11,200", level: 22, badge: "Expert", avatar: "5" },
    { rank: 3, name: "David Kim", xp: "10,850", level: 21, badge: "Expert", avatar: "8" },
    { rank: 4, name: "Emily Watson", xp: "9,500", level: 19, badge: "Pro", avatar: "1" },
    { rank: 5, name: "Michael Ross", xp: "8,900", level: 18, badge: "Pro", avatar: "12" },
  ];

  return (
    <div className="animate-in fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="w-10 h-10 text-yellow-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Leaderboard & Achievements</h1>
          <p className="text-gray-400">Earn XP, unlock badges, and rank up against other developers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard Column */}
        <div className="lg:col-span-2 glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Global Leaderboard</h2>
          <div className="space-y-4">
            {leaderboard.map((user, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${
                user.rank === 1 ? 'bg-yellow-400/10 border-yellow-400' :
                user.rank === 2 ? 'bg-gray-300/10 border-gray-300' :
                user.rank === 3 ? 'bg-orange-600/10 border-orange-600' :
                'bg-white/5 border-white/5'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`text-xl font-bold w-6 text-center ${
                    user.rank === 1 ? 'text-yellow-400' :
                    user.rank === 2 ? 'text-gray-300' :
                    user.rank === 3 ? 'text-orange-600' :
                    'text-gray-500'
                  }`}>
                    #{user.rank}
                  </div>
                  <img src={user.isMe ? user.avatar : `https://i.pravatar.cc/150?img=${user.avatar}`} alt="Avatar" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                  <div>
                    <h4 className="text-white font-bold">{user.name}</h4>
                    <span className="text-xs text-gray-400">{user.badge} Rank</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{user.xp} XP</div>
                  <div className="text-xs text-neonCyan">Level {user.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Column */}
        <div className="col-span-1 space-y-6">
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-neonCyan/10 to-transparent">
            <div className="w-24 h-24 rounded-full border-4 border-neonCyan flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,245,255,0.4)] relative">
              <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              <div className="absolute -bottom-2 bg-neonCyan text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-darkBg">LVL 24</div>
            </div>
            <h3 className="text-xl font-bold text-white">{userProfile.name}</h3>
            <p className="text-gray-400 mb-4">Current XP: 12,450</p>
            <div className="w-full h-2 bg-black rounded-full overflow-hidden">
              <div className="h-full bg-neonCyan w-[70%]"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">2,550 XP to Level 25</p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Recent Badges Earned</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center">
                <Medal className="w-8 h-8 text-yellow-400 mb-2" />
                <span className="text-xs font-bold text-white">React Pro</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center">
                <Target className="w-8 h-8 text-neonPink mb-2" />
                <span className="text-xs font-bold text-white">10 Day Streak</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center">
                <Star className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-xs font-bold text-white">Top 5%</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                <Zap className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-xs font-bold text-white">100k XP Club</span>
                <span className="text-[10px] block mt-1">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
