import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import GoalSetting from './pages/Quest/GoalSetting.jsx';
import RoadmapView from './pages/Quest/RoadmapView.jsx';
import Level1 from './pages/Quest/Level1.jsx';
import Level2 from './pages/Quest/Level2.jsx';
import BossMode from './pages/Quest/BossMode.jsx';

// Placeholder for basic authentication state
const isAuthenticated = true; // Replace with actual auth logic (e.g., useAuth hook)

const App = () => {
  return (
    <Router>
      <Routes>
        {/* --- QuestLink Diagram Start --- */}
        <Route path="/" element={<LandingPage />} />
        
        {/* --- Authentication Path --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Goal and Roadmap Path (Requires Auth) --- */}
        <Route 
          path="/goal" 
          element={isAuthenticated ? <GoalSetting /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/roadmap" 
          element={isAuthenticated ? <RoadmapView /> : <Navigate to="/login" />} 
        />

        {/* --- Learning Path (Levels) --- */}
        <Route 
          path="/quest/level1" 
          element={isAuthenticated ? <Level1 /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/quest/level2" 
          element={isAuthenticated ? <Level2 /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/quest/boss-mode" 
          element={isAuthenticated ? <BossMode /> : <Navigate to="/login" />} 
        />
        {/* 'level 6' will be the final screen/summary, perhaps routed here */}
        <Route path="/quest/level6" element={<h1>Quest Complete!</h1>} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;