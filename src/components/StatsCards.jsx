import React from "react";
import "../styles/stats.css";

function StatsCards({ student }) {
  const safeStudent = {
    credits: student?.credits ?? 0,
    progress: student?.progress ?? 0,
    assignmentsCompleted: student?.assignmentsCompleted ?? 0,
    skillsUpgraded: student?.skillsUpgraded ?? 0,
    contestStreak: student?.contestStreak ?? 0,
  };

  const stats = [
    {
      id: 1,
      icon: "🪙",
      title: "Credit Points",
      value: `${safeStudent.credits}`,
      color: "#667eea",
      trend: `${safeStudent.contestStreak} contests completed`,
    },
    {
      id: 2,
      icon: "📈",
      title: "Progress",
      value: `${safeStudent.progress}%`,
      color: "#764ba2",
      trend: `${safeStudent.assignmentsCompleted} assignments completed`,
    },
    {
      id: 3,
      icon: "🎓",
      title: "Skills Upgraded",
      value: `${safeStudent.skillsUpgraded}`,
      color: "#f093fb",
      trend: `Learn and improve every day`,
    },
    {
      id: 4,
      icon: "🚀",
      title: "Placement Boost",
      value: "On track",
      color: "#4facfe",
      trend: "Reward points unlock perks",
    },
  ];

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="stat-card"
            style={{ borderLeftColor: stat.color }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className="stat-trend">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Recent Applications</h2>
          <ul className="applications-list">
            <li>
              <span className="company">Google</span>
              <span className="role">Software Engineer Intern</span>
              <span className="status pending">Pending</span>
            </li>
            <li>
              <span className="company">Microsoft</span>
              <span className="role">Data Analyst</span>
              <span className="status rejected">Rejected</span>
            </li>
            <li>
              <span className="company">Amazon</span>
              <span className="role">SDE Intern</span>
              <span className="status accepted">Accepted</span>
            </li>
            <li>
              <span className="company">Meta</span>
              <span className="role">Full Stack Engineer</span>
              <span className="status pending">Pending</span>
            </li>
          </ul>
        </div>

        <div className="dashboard-section">
          <h2>Upcoming Events</h2>
          <ul className="events-list">
            <li>
              <div className="event-date">Mar 28</div>
              <div>
                <p className="event-title">Google Interview - Round 1</p>
                <p className="event-time">2:00 PM - Video Call</p>
              </div>
            </li>
            <li>
              <div className="event-date">Mar 30</div>
              <div>
                <p className="event-title">Resume Review Session</p>
                <p className="event-time">4:00 PM - In Person</p>
              </div>
            </li>
            <li>
              <div className="event-date">Apr 02</div>
              <div>
                <p className="event-title">Networking Event - Tech Meetup</p>
                <p className="event-time">6:00 PM - Virtual</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
