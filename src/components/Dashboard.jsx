import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import StatsCards from "./StatsCards";
import SkillsTracker from "./SkillsTracker";
import CareerGoals from "./CareerGoals";
import JobOpportunities from "./JobOpportunities";
import InterviewPrep from "./InterviewPrep";

function Dashboard({ student, onStudentUpdate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [actionMessage, setActionMessage] = useState("");
  const [studentState, setStudentState] = useState({
    name: "Student",
    credits: 0,
    progress: 0,
    placementReady: "Starting",
    contestStreak: 0,
    assignmentsCompleted: 0,
    skillsUpgraded: 0,
  });

  useEffect(() => {
    if (student) {
      setStudentState(student);
    }
  }, [student]);

  const updateStudent = (updatedFields, message) => {
    const updated = {
      ...studentState,
      ...updatedFields,
    };

    setStudentState(updated);
    setActionMessage(message);
    onStudentUpdate?.(updated);

    window.setTimeout(() => {
      setActionMessage("");
    }, 3000);
  };

  const handleCompleteContest = () => {
    updateStudent(
      {
        credits: studentState.credits + 30,
        contestStreak: studentState.contestStreak + 1,
        progress: Math.min(100, studentState.progress + 5),
      },
      "Contest completed! +30 credit points earned."
    );
  };

  const handleCompleteAssignment = () => {
    updateStudent(
      {
        credits: studentState.credits + 18,
        assignmentsCompleted: studentState.assignmentsCompleted + 1,
        progress: Math.min(100, studentState.progress + 3),
      },
      "Assignment completed! +18 credit points earned."
    );
  };

  const handleUpgradeSkill = () => {
    updateStudent(
      {
        credits: studentState.credits + 25,
        skillsUpgraded: studentState.skillsUpgraded + 1,
        progress: Math.min(100, studentState.progress + 4),
      },
      "Skill upgraded! +25 credit points earned."
    );
  };

  const rewardReady = studentState.credits >= 200;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {studentState.name}</h1>
        <p>Track your placement preparation, earn credits, and level up your skills.</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-panel">
          <h3>Credit Points</h3>
          <p>{studentState.credits}</p>
        </div>
        <div className="summary-panel">
          <h3>Placement Readiness</h3>
          <p>{studentState.placementReady}</p>
        </div>
        <div className="summary-panel">
          <h3>Progress</h3>
          <p>{studentState.progress}%</p>
        </div>
        <div className="summary-panel">
          <h3>Reward Status</h3>
          <p>{rewardReady ? "Ready to redeem" : "Keep earning"}</p>
        </div>
      </div>

      <div className="game-grid">
        <div className="game-card contest-card">
          <h2>Daily Contest</h2>
          <p>Compete in today's contest to earn credit points and boost placement readiness.</p>
          <button onClick={handleCompleteContest}>Complete Contest +30</button>
        </div>
        <div className="game-card assignment-card">
          <h2>Assignment Challenge</h2>
          <p>Finish an assignment to strengthen your resume and earn more credits.</p>
          <button onClick={handleCompleteAssignment}>Complete Assignment +18</button>
        </div>
        <div className="game-card skill-card">
          <h2>Skill Upgrade</h2>
          <p>Upgrade a skill to unlock a new badge and gain extra points.</p>
          <button onClick={handleUpgradeSkill}>Upgrade Skill +25</button>
        </div>
      </div>

      {actionMessage && <div className="action-message">{actionMessage}</div>}

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
           Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
           Skills
        </button>
        <button
          className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
          onClick={() => setActiveTab("goals")}
        >
           Goals
        </button>
        <button
          className={`tab-btn ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => setActiveTab("jobs")}
        >
           Opportunities
        </button>
        <button
          className={`tab-btn ${activeTab === "interview" ? "active" : ""}`}
          onClick={() => setActiveTab("interview")}
        >
           Interviews
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && <StatsCards student={studentState} />}
        {activeTab === "skills" && <SkillsTracker />}
        {activeTab === "goals" && <CareerGoals />}
        {activeTab === "jobs" && <JobOpportunities />}
        {activeTab === "interview" && <InterviewPrep />}
      </div>
    </div>
  );
}

export default Dashboard;
