import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize synchronously from localStorage to prevent flash or false redirects
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('apex_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error('Error loading user from localStorage:', err);
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('apex_user', JSON.stringify(userData));
    } catch (err) {
      console.error('Error saving user to localStorage:', err);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('apex_user');
    } catch (err) {
      console.error('Error removing user from localStorage:', err);
    }
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
