import React, { useState } from 'react';
import { User, Mail, Camera, Save, MapPin, Briefcase } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { userProfile, setUserProfile } = useUser();
  const [profile, setProfile] = useState(userProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [avatar, setAvatar] = useState(userProfile.avatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatar = URL.createObjectURL(file);
      setAvatar(newAvatar);
      setUserProfile(prev => ({ ...prev, avatar: newAvatar }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setUserProfile({ ...profile, avatar });
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="animate-in fade-in max-w-4xl mx-auto px-2 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-glow-cyan text-center md:text-left">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="col-span-1 space-y-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-neonCyan overflow-hidden">
                <img src={avatar} alt="Profile" className="w-full h-full object-cover group-hover:opacity-50 transition-all" />
              </div>
              <input 
                type="file" 
                id="profile-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
              <button 
                onClick={() => document.getElementById('profile-upload').click()}
                className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded">Change</span>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-neonCyan text-sm font-bold mb-4">{profile.role}</p>
            <div className="w-full h-px bg-white/10 mb-4"></div>
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-gray-500" /> {profile.email}
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" /> {profile.location}
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Briefcase className="w-4 h-4 text-gray-500" /> 3 Yrs Experience
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="col-span-1 md:col-span-2 glass-card p-5 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/10 gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="text-neonPink" /> Personal Information
            </h3>
            <button 
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 py-1.5 px-4 text-sm"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Role</label>
                <input 
                  type="text" 
                  value={profile.role}
                  onChange={e => setProfile({...profile, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                <input 
                  type="text" 
                  value={profile.location}
                  onChange={e => setProfile({...profile, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bio</label>
              <textarea 
                value={profile.bio}
                onChange={e => setProfile({...profile, bio: e.target.value})}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
