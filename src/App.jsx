import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Yuvraj Singh",
      email: "yuvraj@student.com",
      password: "student123",
      credits: 185,
      progress: 78,
      placementReady: "On Track",
      contestStreak: 4,
      assignmentsCompleted: 9,
      skillsUpgraded: 5,
      attendanceReward: false,
      summary: "Yuvraj is making strong progress in frontend skills and needs consistent contest practice.",
    },
    {
      id: 2,
      name: "Tarun Walia",
      email: "tarun@student.com",
      password: "student123",
      credits: 220,
      progress: 84,
      placementReady: "Ready",
      contestStreak: 6,
      assignmentsCompleted: 12,
      skillsUpgraded: 7,
      attendanceReward: false,
      summary: "Tarun has high placement readiness and is approaching reward eligibility for free attendance.",
    },
    {
      id: 3,
      name: "Sundaram Kumar",
      email: "sundaram@student.com",
      password: "student123",
      credits: 150,
      progress: 65,
      placementReady: "Developing",
      contestStreak: 2,
      assignmentsCompleted: 7,
      skillsUpgraded: 3,
      attendanceReward: true,
      summary: "Sundaram is building foundational skills and has earned attendance rewards.",
    },
    {
      id: 4,
      name: "Gaurav Sharma",
      email: "gaurav@student.com",
      password: "student123",
      credits: 200,
      progress: 80,
      placementReady: "On Track",
      contestStreak: 5,
      assignmentsCompleted: 10,
      skillsUpgraded: 6,
      attendanceReward: false,
      summary: "Gaurav is progressing well and focusing on backend development.",
    },
  ]);

  const handleLogin = (user, role) => {
    setCurrentUser(user);
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole("");
  };

  const handleStudentUpdate = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
      )
    );

    if (currentUser?.id === updatedStudent.id) {
      setCurrentUser(updatedStudent);
    }
  };

  const handleAwardReward = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => {
        if (student.id !== studentId) return student;
        return {
          ...student,
          attendanceReward: true,
          summary: student.summary + " Reward granted by admin.",
        };
      })
    );
  };

  return (
    <>
      <Header user={currentUser} role={currentRole} onLogout={handleLogout} />

      <main>
        {!currentUser && <LoginPage onLogin={handleLogin} students={students} />}

        {currentUser && currentRole === "student" && (
          <Dashboard student={currentUser} onStudentUpdate={handleStudentUpdate} />
        )}

        {currentUser && currentRole === "admin" && (
          <AdminDashboard students={students} onAwardReward={handleAwardReward} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
