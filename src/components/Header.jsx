import React from "react";
import "../styles/header.css";

function Header({ user, role, onLogout }) {
  return (
    <header className="header">
      <div className="logo">Student Productivity Dashboard</div>

      {user ? (
        <div className="header-right">
          <span className="user-badge">
            {role === "admin" ? "Admin" : "Student"}: {user.name}
          </span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <nav>
          <ul className="nav-links">
            <li>Login</li>
            {/* <li>Student</li> */}
            {/* <li>Admin</li> */}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;