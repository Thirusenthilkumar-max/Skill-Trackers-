import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem('skillTrackerProfile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to load profile from localStorage:", e);
      return null;
    }
  };

  const defaultState = {
    name: 'Thiru',
    email: 'kumar3008.2007@gmail.com',
    role: 'Frontend Developer',
    location: 'TamilNadu',
    bio: 'Passionate frontend engineer specializing in React and modern UI/UX design. Currently learning Next.js and Tailwind.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  };

  const [userProfile, setUserProfile] = useState(() => loadInitialState() || defaultState);

  // Sync back to local storage whenever profile is updated
  useEffect(() => {
    localStorage.setItem('skillTrackerProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
