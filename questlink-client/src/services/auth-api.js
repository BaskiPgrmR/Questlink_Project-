// src/services/auth-api.js
import { API_BASE_URL } from '../config/api-config'; // Needs implementation

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  // Returns token and user data
  return response.json(); 
};

// ... add registerUser and logoutUser functions