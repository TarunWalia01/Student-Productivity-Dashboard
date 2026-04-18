import React, { useState } from "react";
import "../styles/interview.css";

function InterviewPrep() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());

  const prepMaterials = [
    {
      id: 1,
      category: "Data Structures",
      icon: "🏗️",
      topics: [
        { id: 101, title: "Arrays & Linked Lists", link: "#", difficulty: "Easy" },
        { id: 102, title: "Stacks & Queues", link: "#", difficulty: "Medium" },
        { id: 103, title: "Trees & Graphs", link: "#", difficulty: "Hard" },
        { id: 104, title: "Hash Tables", link: "#", difficulty: "Medium" },
        { id: 105, title: "Heaps & Priority Queues", link: "#", difficulty: "Hard" },
      ],
    },
    {
      id: 2,
      category: "Algorithms",
      icon: "⚙️",
      topics: [
        { id: 201, title: "Sorting Algorithms", link: "#", difficulty: "Easy" },
        { id: 202, title: "Searching Techniques", link: "#", difficulty: "Medium" },
        { id: 203, title: "Dynamic Programming", link: "#", difficulty: "Hard" },
        { id: 204, title: "Greedy Algorithms", link: "#", difficulty: "Medium" },
        { id: 205, title: "Recursion & Backtracking", link: "#", difficulty: "Medium" },
      ],
    },
    {
      id: 3,
      category: "System Design",
      icon: "🎯",
      topics: [
        { id: 301, title: "Scalability Basics", link: "#", difficulty: "Medium" },
        { id: 302, title: "Load Balancing", link: "#", difficulty: "Hard" },
        { id: 303, title: "Database Design", link: "#", difficulty: "Hard" },
        { id: 304, title: "Caching Strategies", link: "#", difficulty: "Hard" },
        { id: 305, title: "API Design", link: "#", difficulty: "Medium" },
      ],
    },
    {
      id: 4,
      category: "Behavioral",
      icon: "💬",
      topics: [
        { id: 401, title: "STAR Method", link: "#", difficulty: "Easy" },
        { id: 402, title: "Tell Me About Yourself", link: "#", difficulty: "Easy" },
        { id: 403, title: "Why This Company?", link: "#", difficulty: "Easy" },
        { id: 404, title: "Handling Conflict", link: "#", difficulty: "Medium" },
        { id: 405, title: "Team Collaboration", link: "#", difficulty: "Medium" },
      ],
    },
  ];

  const toggleTopic = (topicId) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#4caf50";
      case "Medium":
        return "#ff9800";
      case "Hard":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  const getTotalTopicsForCategory = (categoryId) => {
    const category = prepMaterials.find((c) => c.id === categoryId);
    return category ? category.topics.length : 0;
  };

  const getCompletedTopicsForCategory = (categoryId) => {
    const category = prepMaterials.find((c) => c.id === categoryId);
    if (!category) return 0;
    return category.topics.filter((t) => completedTopics.has(t.id)).length;
  };

  return (
    <div className="interview-container">
      <div className="interview-header">
        <h2>Interview Preparation</h2>
        <p>Master all interview topics and become job-ready</p>
      </div>

      <div className="interview-overview">
        <div className="overview-card">
          <h4>📊 Overall Progress</h4>
          <div className="progress-circle">
            <span className="percentage">
              {Math.round((completedTopics.size / 25) * 100)}%
            </span>
            <p className="progress-text">
              {completedTopics.size} of 25 topics completed
            </p>
          </div>
        </div>

        <div className="overview-card">
          <h4>🎯 Study Plan</h4>
          <ul className="study-plan">
            <li>✓ Week 1-2: Data Structures</li>
            <li>✓ Week 3-4: Algorithms</li>
            <li>⏳ Week 5-6: System Design</li>
            <li>→ Week 7: Behavioral Practice</li>
          </ul>
        </div>

        <div className="overview-card">
          <h4>📅 Upcoming Mock Interviews</h4>
          <ul className="mock-interviews">
            <li>
              <span className="date">Mar 28</span>
              <span className="interview-name">Technical Round 1</span>
            </li>
            <li>
              <span className="date">Apr 04</span>
              <span className="interview-name">System Design Round</span>
            </li>
            <li>
              <span className="date">Apr 11</span>
              <span className="interview-name">HR Round</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="prep-categories">
        {prepMaterials.map((category) => (
          <div key={category.id} className="category-section">
            <div
              className="category-header"
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )
              }
            >
              <div className="category-title">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.category}</h3>
              </div>
              <div className="category-stats">
                <span className="progress-text">
                  {getCompletedTopicsForCategory(category.id)}/
                  {getTotalTopicsForCategory(category.id)}
                </span>
                <span
                  className={`expand-icon ${
                    expandedCategory === category.id ? "expanded" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </div>

            <div className="category-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (getCompletedTopicsForCategory(category.id) /
                        getTotalTopicsForCategory(category.id)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {expandedCategory === category.id && (
              <div className="topics-list">
                {category.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`topic-item ${
                      completedTopics.has(topic.id) ? "completed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedTopics.has(topic.id)}
                      onChange={() => toggleTopic(topic.id)}
                      className="topic-checkbox"
                    />
                    <div className="topic-info">
                      <h4>{topic.title}</h4>
                      <p className="topic-link">Learn more ↗</p>
                    </div>
                    <span
                      className="difficulty-badge"
                      style={{
                        backgroundColor: getDifficultyColor(topic.difficulty),
                      }}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="interview-resources">
        <h3>📚 Helpful Resources</h3>
        <div className="resources-grid">
          <a href="#" className="resource-card">
            <span className="resource-icon">📖</span>
            <h4>LeetCode</h4>
            <p>Practice coding problems</p>
          </a>
          <a href="#" className="resource-card">
            <span className="resource-icon">🎥</span>
            <h4>YouTube Channels</h4>
            <p>Interview prep tutorials</p>
          </a>
          <a href="#" className="resource-card">
            <span className="resource-icon">📝</span>
            <h4>System Design Primer</h4>
            <p>Master all concepts</p>
          </a>
          <a href="#" className="resource-card">
            <span className="resource-icon">🤝</span>
            <h4>Mock Interviews</h4>
            <p>Practice with peers</p>
          </a>
        </div>
      </div>

      <div className="interview-tips">
        <h3>💡 Interview Tips & Tricks</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>👔 Before the Interview</h4>
            <ul>
              <li>Research the company thoroughly</li>
              <li>Prepare STAR stories</li>
              <li>Test your audio/video</li>
              <li>Have water available</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>🎤 During the Interview</h4>
            <ul>
              <li>Think out loud</li>
              <li>Ask clarifying questions</li>
              <li>Maintain eye contact</li>
              <li>Be enthusiastic</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>✍️ After the Interview</h4>
            <ul>
              <li>Send thank you email</li>
              <li>Reiterate your interest</li>
              <li>Wait for updates</li>
              <li>Follow up after 1 week</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPrep;
