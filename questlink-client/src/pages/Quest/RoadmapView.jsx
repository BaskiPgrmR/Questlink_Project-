// src/pages/Quest/RoadmapView.jsx
import ChapterCard from '../../components/quest/ChapterCard.jsx';

// Placeholder roadmap data (replace with actual data from your global store)
const mockRoadmap = [
  { name: 'HTML', status: 'In Progress', route: '/quest/level1' },
  { name: 'CSS', status: 'Locked', route: '/quest/level2' },
  { name: 'JavaScript', status: 'Locked', route: '/quest/boss-mode' },
];

const RoadmapView = () => {
  return (
    <div className="roadmap-container">
      <h1>Your Personalized Quest Map 🗺️</h1>
      <p>Click a chapter to begin your training!</p>
      <div className="chapters-grid">
        {mockRoadmap.map((chapter) => (
          <ChapterCard key={chapter.name} chapter={chapter} />
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;