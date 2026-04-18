import React, { useState, useEffect } from "react";
import "../styles/skills.css";

function SkillsTracker() {
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", level: 90, category: "Programming", lastLevel: 90 },
    { id: 2, name: "React", level: 85, category: "Frontend", lastLevel: 85 },
    { id: 3, name: "Python", level: 80, category: "Programming", lastLevel: 80 },
    { id: 4, name: "SQL", level: 75, category: "Database", lastLevel: 75 },
    { id: 5, name: "CSS/HTML", level: 88, category: "Frontend", lastLevel: 88 },
    { id: 6, name: "Node.js", level: 78, category: "Backend", lastLevel: 78 },
    { id: 7, name: "Git", level: 82, category: "Tools", lastLevel: 82 },
    { id: 8, name: "Communication", level: 85, category: "Soft Skills", lastLevel: 85 },
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedSkillId, setDraggedSkillId] = useState(null);
  const [dragOverSkillId, setDragOverSkillId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [animatingSkills, setAnimatingSkills] = useState(new Set());

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
  }, []);

  // Save dark mode preference
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([
        ...skills,
        {
          id: skills.length + 1,
          name: newSkill,
          level: newLevel,
          category: "Other",
        },
      ]);
      setNewSkill("");
      setNewLevel(50);
    }
  };

  const handleUpdateLevel = (id, newLevel) => {
    setSkills(skills.map((skill) => {
      if (skill.id === id) {
        const updatedSkill = { 
          ...skill, 
          level: newLevel,
          lastLevel: skill.level // Store previous level for animation
        };
        
        // Trigger animation
        setAnimatingSkills(prev => new Set([...prev, id]));
        setTimeout(() => {
          setAnimatingSkills(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 1000); // Animation duration
        
        return updatedSkill;
      }
      return skill;
    }));
  };

  const getBadge = (level) => {
    if (level >= 95) return { name: "Master", color: "#FFD700" };
    if (level >= 90) return { name: "Expert", icon: "", color: "#C0C0C0" };
    if (level >= 80) return { name: "Advanced", icon: "", color: "#CD7F32" };
    if (level >= 70) return { name: "Proficient", icon: "", color: "#4169E1" };
    if (level >= 50) return { name: "Intermediate", icon: "", color: "#32CD32" };
    return { name: "Beginner", icon: "", color: "#FF6347" };
  };

  const getCategory = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  const filteredSkills = skills.filter((skill) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      skill.name.toLowerCase().includes(query) ||
      skill.category.toLowerCase().includes(query)
    );
  });

  const categories = [...new Set(filteredSkills.map((s) => s.category))];

  const handleDragStart = (event, skill) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", skill.id);
    setDraggedSkillId(skill.id);
  };

  const handleDragOver = (e, skill) => {
    e.preventDefault();
    setDragOverSkillId(skill.id);
  };

  const handleDrop = (e, targetSkill) => {
    e.preventDefault();
    if (draggedSkillId === null || draggedSkillId === targetSkill.id) {
      setDragOverSkillId(null);
      return;
    }

    const originalIndex = skills.findIndex((skill) => skill.id === draggedSkillId);
    const dropIndex = skills.findIndex((skill) => skill.id === targetSkill.id);
    if (originalIndex === -1 || dropIndex === -1) {
      setDragOverSkillId(null);
      return;
    }

    const reordered = [...skills];
    const [dragged] = reordered.splice(originalIndex, 1);
    const insertIndex = dropIndex > originalIndex ? dropIndex - 1 : dropIndex;
    reordered.splice(insertIndex, 0, dragged);

    setSkills(reordered);
    setDraggedSkillId(null);
    setDragOverSkillId(null);
  };

  const handleDragLeave = () => {
    setDragOverSkillId(null);
  };

  return (
    <div className={`skills-container ${darkMode ? 'dark' : ''}`}>
      <div className="skills-header">
        <div className="header-content">
          <div>
            <h2>Skills Tracker</h2>
            <p>Track and improve your professional skills</p>
          </div>
          <button 
            className="dark-mode-toggle" 
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="add-skill">
        <input
          type="search"
          placeholder="Search skills or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add new skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={newLevel}
          onChange={(e) => setNewLevel(parseInt(e.target.value))}
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>

      {filteredSkills.length === 0 ? (
        <div className="empty-state">No skills match your search. Try a different name or category.</div>
      ) : (
        categories.map((category) => (
          <div key={category} className="skills-category">
            <h3>{category}</h3>
            <div className="skills-list">
              {filteredSkills
                .filter((skill) => skill.category === category)
                .map((skill) => {
                const badge = getBadge(skill.level);
                const isAnimating = animatingSkills.has(skill.id);
                const levelChanged = skill.level !== skill.lastLevel;
                const isDragOver = dragOverSkillId === skill.id;
                
                return (
                  <div
                    key={skill.id}
                    className={`skill-item ${isAnimating ? 'animating' : ''} ${isDragOver ? 'drag-over' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDragOver={(e) => handleDragOver(e, skill)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, skill)}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-badges">
                          <span className={`skill-badge ${badge.name.toLowerCase()}`} style={{ backgroundColor: badge.color }}>
                            {badge.icon} {badge.name}
                          </span>
                          <span className={`skill-level ${getCategory(skill.level).toLowerCase()}`}>
                            {getCategory(skill.level)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="progress-container">
                        <div 
                          className={`progress-bar ${levelChanged ? 'level-changed' : ''}`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="progress-fill"></div>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleUpdateLevel(skill.id, parseInt(e.target.value))}
                        className="skill-input"
                      />
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )))}

      <div className="skills-summary">
        <div className="summary-card">
          <h4> Skill Recommendations</h4>
          <ul>
            <li>Master TypeScript for better code quality</li>
            <li>Learn Docker for containerization</li>
            <li>Explore AWS for cloud deployment</li>
            <li>Study System Design patterns</li>
          </ul>
        </div>

        <div className="summary-card">
          <h4> Learning Path</h4>
          <div className="learning-path">
            <div className="path-item completed">
              <span>HTML/CSS Basics</span>
              <span>✓</span>
            </div>
            <div className="path-item completed">
              <span>JavaScript Fundamentals</span>
              <span>✓</span>
            </div>
            <div className="path-item in-progress">
              <span>React Advanced</span>
              <span></span>
            </div>
            <div className="path-item pending">
              <span>Node.js Backend</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsTracker;



