// This service handles communication with the backend's authentication routes.
// It is responsible for exchanging the client-side Google ID token for a secure server-side JWT.

// IMPORTANT: Ensure your backend is running on this URL!
const BACKEND_URL = 'http://localhost:3000/api';

interface UserData {
  userId: string;
  displayName: string;
  email: string;
  xp: number;
  level: number;
}

interface AuthResponse {
  token: string;
  user: UserData;
}

/**
 * Sends the Google ID token to the backend for verification and custom token generation.
 * @param googleIdToken The token received from the Firebase client-side sign-in pop-up.
 * @returns A promise resolving to the custom JWT and user data.
 */
export const googleLoginService = async (googleIdToken: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleIdToken }),
    });

    if (!response.ok) {
      // Handle non-200 responses (e.g., 401 unauthorized, 500 server error)
      const errorData = await response.json().catch(() => ({ message: 'Server failed to respond.' }));
      throw new Error(errorData.message || 'Authentication failed on backend.');
    }

    // The backend returns { token: JWT, user: { ... } }
    return response.json();
  } catch (error) {
    console.error('Network Error during Google Login:', error);
    throw new Error('Could not connect to the QuestLink server. Check network connection.');
  }
};
