import React, { useState } from "react";
import "../styles/goals.css";

function CareerGoals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Land Internship at FAANG",
      description: "Secure an internship at Google, Facebook, Amazon, Apple, or Netflix",
      progress: 75,
      deadline: "May 2026",
      priority: "High",
      category: "Career",
    },
    {
      id: 2,
      title: "Complete System Design Course",
      description: "Master system design patterns and architecture",
      progress: 45,
      deadline: "June 2026",
      priority: "High",
      category: "Learning",
    },
    {
      id: 3,
      title: "Build Portfolio Projects",
      description: "Create 3 impressive portfolio projects showcasing skills",
      progress: 60,
      deadline: "April 2026",
      priority: "Medium",
      category: "Projects",
    },
    {
      id: 4,
      title: "Get 500 LinkedIn Connections",
      description: "Build professional network",
      progress: 35,
      deadline: "July 2026",
      priority: "Medium",
      category: "Networking",
    },
    {
      id: 5,
      title: "Complete AWS Certification",
      description: "Pass AWS Solutions Architect Associate exam",
      progress: 20,
      deadline: "August 2026",
      priority: "Low",
      category: "Certifications",
    },
  ]);

  const [newGoal, setNewGoal] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
          title: newGoal,
          description: "Update description",
          progress: 0,
          deadline: "TBD",
          priority: "Medium",
          category: "Other",
        },
      ]);
      setNewGoal("");
      setShowForm(false);
    }
  };

  const handleUpdateProgress = (id, newProgress) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, progress: newProgress } : goal)));
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ff6b6b";
      case "Medium":
        return "#ffd93d";
      case "Low":
        return "#6bcf7f";
      default:
        return "#94a3b8";
    }
  };

  const categories = [...new Set(goals.map((g) => g.category))];
  const totalProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);

  return (
    <div className="goals-container">
      <div className="goals-header">
        <div>
          <h2>Career Goals</h2>
          <p>Define and track your career milestones</p>
        </div>
        <button
          className="btn-add-goal"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Goal
        </button>
      </div>

      {showForm && (
        <div className="goal-form">
          <input
            type="text"
            placeholder="Enter your career goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
          />
          <div className="form-buttons">
            <button onClick={handleAddGoal} className="btn-submit">
              Add
            </button>
            <button onClick={() => setShowForm(false)} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="goals-summary">
        <div className="summary-box">
          <div className="summary-stat">
            <span className="stat-label">Total Goals</span>
            <span className="stat-value">{goals.length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Overall Progress</span>
            <span className="stat-value">{totalProgress}%</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">On Track</span>
            <span className="stat-value">{goals.filter((g) => g.progress >= 50).length}</span>
          </div>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="goals-category">
          <h3>{category}</h3>
          <div className="goals-list">
            {goals
              .filter((goal) => goal.category === category)
              .map((goal) => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-header">
                    <h4>{goal.title}</h4>
                    <div className="goal-badges">
                      <span
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(goal.priority) }}
                      >
                        {goal.priority}
                      </span>
                      <span className="deadline-badge">{goal.deadline}</span>
                    </div>
                  </div>
                  <p className="goal-description">{goal.description}</p>
                  <div className="goal-progress-section">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-input">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
                      />
                      <span className="progress-percent">{goal.progress}%</span>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="goals-tips">
        <h3>💡 Tips for Success</h3>
        <ul>
          <li>Break large goals into smaller milestones</li>
          <li>Set realistic deadlines</li>
          <li>Review and adjust goals monthly</li>
          <li>Celebrate small wins</li>
          <li>Stay consistent with your learning</li>
        </ul>
      </div>
    </div>
  );
}

export default CareerGoals;
