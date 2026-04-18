import React, { useState } from "react";
import "../styles/jobs.css";

function JobOpportunities() {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      company: "Google",
      logo: "🔍",
      position: "Software Engineer Internship",
      location: "Mountain View, CA",
      type: "Internship",
      salary: "$25-30/hr",
      description: "Work on cutting-edge projects with Google's brightest minds",
      skills: ["JavaScript", "Python", "System Design"],
      applied: true,
      date: "2026-03-15",
    },
    {
      id: 2,
      company: "Microsoft",
      logo: "⚡",
      position: "Data Analyst",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$120-140k",
      description: "Analyze data and drive business insights",
      skills: ["SQL", "Python", "Excel", "Tableau"],
      applied: false,
      date: "2026-03-20",
    },
    {
      id: 3,
      company: "Amazon",
      logo: "📦",
      position: "SDE Intern",
      location: "Seattle, WA",
      type: "Internship",
      salary: "$28-32/hr",
      description: "Build scalable systems for millions of customers",
      skills: ["Java", "AWS", "Database Design"],
      applied: true,
      date: "2026-03-18",
    },
    {
      id: 4,
      company: "Meta",
      logo: "👤",
      position: "Full Stack Engineer",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$160-200k",
      description: "Shape the future of social technology",
      skills: ["React", "Node.js", "GraphQL"],
      applied: false,
      date: "2026-03-22",
    },
    {
      id: 5,
      company: "Apple",
      logo: "🍎",
      position: "iOS Developer Intern",
      location: "Cupertino, CA",
      type: "Internship",
      salary: "$26-30/hr",
      description: "Create beautiful iOS applications",
      skills: ["Swift", "iOS Development", "UIKit"],
      applied: false,
      date: "2026-03-25",
    },
  ]);

  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApply = (id) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, applied: !opp.applied } : opp
      )
    );
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = filterType === "all" || opp.type === filterType;
    const matchesSearch =
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    total: opportunities.length,
    applied: opportunities.filter((o) => o.applied).length,
    available: opportunities.filter((o) => !o.applied).length,
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>Job & Internship Opportunities</h2>
        <p>Explore amazing career opportunities</p>
      </div>

      <div className="jobs-stats">
        <div className="stat-box">
          <span className="stat-label">Total Opportunities</span>
          <span className="stat-num">{stats.total}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Applied</span>
          <span className="stat-num">{stats.applied}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">To Apply</span>
          <span className="stat-num">{stats.available}</span>
        </div>
      </div>

      <div className="jobs-filter">
        <input
          type="text"
          placeholder="Search by company or position..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      <div className="jobs-list">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((job) => (
            <div key={job.id} className={`job-card ${job.applied ? "applied" : ""}`}>
              <div className="job-header">
                <div className="job-company-section">
                  {/* <span className="company-logo">{job.logo}</span> */}
                  <div>
                    <h3>{job.company}</h3>
                    <p className="job-position">{job.position}</p>
                  </div>
                </div>
                <div className="job-badges">
                  <span className="job-type">{job.type}</span>
                  {job.applied && <span className="badge-applied">✓ Applied</span>}
                </div>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-details">
                <span className="detail"> {job.location}</span>
                <span className="detail"> {job.salary}</span>
                <span className="detail"> Posted: {job.date}</span>
              </div>

              <div className="job-skills">
                <span className="skills-label">Required Skills:</span>
                <div className="skills-tags">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="job-actions">
                <button
                  className={`btn-apply ${job.applied ? "applied" : ""}`}
                  onClick={() => handleApply(job.id)}
                >
                  {job.applied ? "✓ Applied" : "Apply Now"}
                </button>
                <button className="btn-save">Save</button>
                <button className="btn-share"> Share</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No opportunities found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="job-tips">
        <h3>Application Tips</h3>
        <ul>
          <li>Customize your resume for each position</li>
          <li>Research the company before applying</li>
          <li>Follow up after 2 weeks if no response</li>
          <li>Practice common interview questions</li>
          <li>Keep track of all applications</li>
        </ul>
      </div>
    </div>
  );
}

export default JobOpportunities;
