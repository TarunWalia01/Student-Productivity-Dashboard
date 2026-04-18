import React, { useState } from "react";
import "../styles/admin.css";

function AdminDashboard({ students, onAwardReward }) {
  const [selectedId, setSelectedId] = useState(students[0]?.id || null);
  const [search, setSearch] = useState("");
  const [notesByStudent, setNotesByStudent] = useState({});
  const [noteText, setNoteText] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStudent =
    filteredStudents.find((student) => student.id === selectedId) ||
    filteredStudents[0] ||
    students[0];

  const accessStatus = selectedStudent.attendanceReward
    ? "Free attendance granted"
    : "Standard access";

  const savedNotes = notesByStudent[selectedStudent.id] || [];

  const saveNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    setNotesByStudent((currentNotes) => ({
      ...currentNotes,
      [selectedStudent.id]: [...(currentNotes[selectedStudent.id] || []), trimmed],
    }));
    setNoteText("");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>View student profiles, progress data, and manage placement support access.</p>
        </div>
      </div>

      <div className="admin-grid">
        <div className="student-list-panel">
          <div className="student-list-top">
            <h2>Student List</h2>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul className="student-list">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className={student.id === selectedId ? "selected" : ""}
                onClick={() => setSelectedId(student.id)}
              >
                <div>
                  <strong>{student.name}</strong>
                  <span>{student.email}</span>
                </div>
                <div className="student-score">{student.credits} pts</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="student-detail-panel">
          <div className="detail-card">
            <div className="detail-card-head">
              <h2>{selectedStudent.name}</h2>
              <span>{selectedStudent.email}</span>
            </div>

            <div className="detail-grid">
              <div>
                <h3>Placement Status</h3>
                <p>{selectedStudent.placementReady}</p>
              </div>
              <div>
                <h3>Credit Points</h3>
                <p>{selectedStudent.credits}</p>
              </div>
              <div>
                <h3>Contest Streak</h3>
                <p>{selectedStudent.contestStreak}</p>
              </div>
              <div>
                <h3>Attendance Access</h3>
                <p>{accessStatus}</p>
              </div>
              <div>
                <h3>Assignments Completed</h3>
                <p>{selectedStudent.assignmentsCompleted}</p>
              </div>
              <div>
                <h3>Skills Upgraded</h3>
                <p>{selectedStudent.skillsUpgraded}</p>
              </div>
            </div>

            <div className="detail-summary">
              <h3>Student Summary</h3>
              <p>{selectedStudent.summary}</p>
            </div>

            <div className="performance-chart">
              <h3>Performance Overview</h3>
              <div className="chart-row">
                <span>Progress</span>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: `${selectedStudent.progress}%` }} />
                </div>
                <strong>{selectedStudent.progress}%</strong>
              </div>
              <div className="chart-row">
                <span>Credits</span>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: `${Math.min(selectedStudent.credits, 300) / 3}%` }} />
                </div>
                <strong>{selectedStudent.credits}</strong>
              </div>
              <div className="chart-row">
                <span>Assignments</span>
                <div className="chart-bar">
                  <div className="chart-fill" style={{ width: `${Math.min(selectedStudent.assignmentsCompleted, 20) * 5}%` }} />
                </div>
                <strong>{selectedStudent.assignmentsCompleted}</strong>
              </div>
            </div>

            <div className="admin-notes">
              <h3>Admin Notes</h3>
              <div className="notes-list">
                {savedNotes.length ? (
                  savedNotes.map((note, index) => (
                    <div key={`${selectedStudent.id}-${index}`} className="note-item">
                      <span>{note}</span>
                    </div>
                  ))
                ) : (
                  <p className="note-empty">No notes yet. Add one to track this student.</p>
                )}
              </div>
              <textarea
                rows="4"
                placeholder="Add a note for this student"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button className="note-button" onClick={saveNote} disabled={!noteText.trim()}>
                Save Note
              </button>
            </div>

            <div className="admin-actions">
              <button
                className="reward-button"
                onClick={() => onAwardReward(selectedStudent.id)}
                disabled={selectedStudent.credits < 200 || selectedStudent.attendanceReward}
              >
                {selectedStudent.attendanceReward
                  ? "Attendance Reward Granted"
                  : selectedStudent.credits >= 200
                  ? "Grant Free Attendance"
                  : "Need 200 credits to reward"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
