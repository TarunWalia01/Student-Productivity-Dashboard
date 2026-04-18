import React, { useState } from "react";
import "../styles/login.css";

function LoginPage({ onLogin, students }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminAccount = {
    email: "admin@dashboard.com",
    password: "admin123",
    name: "Admin User",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (role === "admin") {
      if (email === adminAccount.email && password === adminAccount.password) {
        onLogin({ id: "admin", name: adminAccount.name, email }, "admin");
        return;
      }
      setError("Admin email or password is incorrect.");
      return;
    }

    const student = students.find((studentData) => studentData.email === email);
    if (!student || student.password !== password) {
      setError("Student email or password is incorrect.");
      return;
    }

    onLogin(student, "student");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Select your role and sign in to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => {
              setRole(e.target.value);
              setError("");
              setEmail("");
              setPassword("");
            }}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            {role === "student" ? (
              <select
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                <option value="">Select student account</option>
                {students.map((studentData) => (
                  <option key={studentData.id} value={studentData.email}>
                    {studentData.name} ({studentData.email})
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="email"
                type="email"
                placeholder="admin@dashboard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={role === "admin" ? "Admin password" : "Student password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button className="login-button" type="submit">
            Sign in as {role === "admin" ? "Admin" : "Student"}
          </button>
        </form>

        <div className="login-help">
          <p>Admin credentials: admin@dashboard.com / admin123</p>
          <p>Student password for sample students is student123.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
