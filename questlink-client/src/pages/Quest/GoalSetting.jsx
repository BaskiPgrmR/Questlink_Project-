// src/pages/Quest/GoalSetting.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoadmap } from '../../services/quest-api'; // Needs implementation

const GoalSetting = () => {
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to the backend, which talks to the Gemini-service
      const roadmap = await createRoadmap(goal); 
      // Save roadmap data to a global store/context for RoadmapView to use
      console.log('Roadmap created:', roadmap); 
      navigate('/roadmap'); // Move to the next step
    } catch (error) {
      alert('Failed to create roadmap: ' + error.message);
    }
  };

  return (
    <div className="goal-container">
      <h1>Define Your Quest!</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="I want to learn HTML, CSS, and JavaScript basics to build a simple portfolio website."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        ></textarea>
        <button type="submit">Forge Roadmap</button>
      </form>
    </div>
  );
};

export default GoalSetting;