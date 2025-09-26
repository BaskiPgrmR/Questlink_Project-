// src/pages/Quest/Level1.jsx
import { useState, useEffect } from 'react';
import QuestionBlock from '../../components/quest/QuestionBlock.jsx';
// Import quest-api functions for fetching content and submitting answers

const Level1 = () => {
  const [levelContent, setLevelContent] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // 1. Fetch the content for Level 1 (HTML Chapter) from the API
    // fetchLevelContent('html', 1).then(data => setLevelContent(data));

    // Mock data structure matching diagram: Goal/Lesson + Questions
    setLevelContent({
      goal: "Master HTML basic structure (Goal)",
      questions: [
        { id: 1, prompt: "What is the purpose of the <html> tag?", content: "Lesson content about HTML structure..." },
        { id: 2, prompt: "Write the code for a paragraph element (*qns)", content: "Simple text prompt..." },
        { id: 3, prompt: "Explain the difference between <div> and <span> (**qns)", content: "More complex prompt..." },
      ],
    });
  }, []);

  const handleAnswerSubmit = (questionId, submittedAnswer) => {
    // 2. Send the answer to the backend API for grading (quest-controller)
    // submitAnswer(questionId, submittedAnswer); 

    // 3. Move to the next question upon success
    if (currentQuestionIndex < levelContent.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      alert('Level 1 Complete! Heading to Level 2.');
      // Navigate to /quest/level2
    }
  };

  if (!levelContent) return <div>Loading Quest...</div>;

  return (
    <div className="level-container">
      <h2>Chapter: HTML - Level 1: {levelContent.goal}</h2>
      
      <QuestionBlock
        question={levelContent.questions[currentQuestionIndex]}
        onAnswerSubmit={handleAnswerSubmit}
      />
    </div>
  );
};

export default Level1;