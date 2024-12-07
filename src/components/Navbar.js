import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-section">
          <Link to="/" className="navbar-logo">
            <img src="/logo-vls.png" alt="Video Link Storage" className="navbar-logo-image" />
          </Link>
        </div>
        <div className="navbar-links">
          {!token ? (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link">Home</Link>
              {role === "lecturer" && (
                <Link to="/upload" className="navbar-link">Upload Video</Link>
              )}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="navbar-logout-button"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-dialog">
            <p>Weet je zeker dat je wilt uitloggen?</p>
            <div className="logout-confirm-buttons">
              <button onClick={handleLogout} className="logout-confirm-yes">
                Ja, uitloggen
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="logout-confirm-no"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
