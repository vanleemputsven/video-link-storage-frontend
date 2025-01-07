// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Hulpfunctie om te checken of token is verlopen
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      return true;
    }
  } catch (err) {
    return true;
  }
  return false;
}

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // we lezen role alleen als user ingelogd is
  const [currentRole, setCurrentRole] = useState(localStorage.getItem("role") || null);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      // Als er geen token is, of hij is verlopen => niet ingelogd
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAuthenticated(false);
      setCurrentRole(null);
    } else {
      // Token nog geldig
      setIsAuthenticated(true);
      setCurrentRole(localStorage.getItem("role")); 
    }
  };

  useEffect(() => {
    // Check direct bij laden
    checkAuthentication();

    // Check elke 5 sec
    const interval = setInterval(() => {
      checkAuthentication();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setCurrentRole(null);
    setShowLogoutConfirm(false);
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-section">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              src="/logo-vls.png"
              alt="Video Link Storage"
              className="navbar-logo-image"
            />
          </NavLink>
        </div>
        <div
          className="navbar-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") toggleMobileMenu();
          }}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? "times" : "bars"} />
        </div>
        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon="sign-in-alt" /> Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon="user-plus" /> Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon="home" /> Home
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon="heart" /> Favorieten
              </NavLink>
              {currentRole === "lecturer" && (
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  <FontAwesomeIcon icon="upload" /> Upload Video
                </NavLink>
              )}

              {/* NIEUW: Beheer Account */}
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon="user-cog" /> Beheer Account
              </NavLink>

              {/* Logout-knop */}
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  closeMobileMenu();
                }}
                className="navbar-logout-button"
              >
                <FontAwesomeIcon icon="sign-out-alt" /> Logout
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
