// src/services/quest-api.js
import { API_BASE_URL } from '../config/api-config'; 

export const createRoadmap = async (goal) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/quest/roadmap`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ goal }),
  });
  
  if (!response.ok) {
    throw new Error('Roadmap generation failed');
  }
  
  // The backend (via Gemini-service.js) should return the structured roadmap
  // e.g., { chapters: [{ name: 'html', levels: [...] }, ...] }
  return response.json(); 
};

// ... add functions for fetching level content and submitting answers