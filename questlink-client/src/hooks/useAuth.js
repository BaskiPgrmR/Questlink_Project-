// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { loginUser } from '../services/auth-api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle login
  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      // Store token (e.g., in localStorage) and update state
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Check initial login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with the backend here
      // For now, assume a token means authenticated
      setUser({ username: 'PlaceholderUser' }); 
    }
    setIsLoading(false);
  }, []);

  return { user, isLoading, login, /* ... add logout, register */ };
};

export default useAuth;