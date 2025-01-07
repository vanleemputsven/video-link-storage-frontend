// src/pages/Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState(""); // Meldingstekst
  const [messageType, setMessageType] = useState(""); // 'success' of 'error'
  const [fadeOut, setFadeOut] = useState(false); // Voor fade-out animatie
  const navigate = useNavigate(); // Initialiseer navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controleer of wachtwoorden overeenkomen
    if (password !== confirmPassword) {
      setMessage("Wachtwoorden komen niet overeen.");
      setMessageType("error");
      return;
    }

    setMessage("");
    setMessageType("");

    try {
      await API.post("/auth/register", {
        email,
        password,
        role,
      });

      setMessage("Registratie succesvol! Je wordt doorgestuurd naar de loginpagina.");
      setMessageType("success");

      // Reset formulier
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");

      // Navigeer naar de loginpagina na een korte vertraging
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Er ging iets mis.");
      setMessageType("error");
    }
  };

  // Automatisch de melding verwijderen na 5 seconden met fade-out
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 4500); // Start fade-out na 4.5 seconden

      const removeTimer = setTimeout(() => {
        setMessage("");
        setMessageType("");
        setFadeOut(false);
      }, 5000); // Verwijder melding na 5 seconden

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Meldingen */}
        {message && (
          <div
            className={`info-message ${messageType} ${fadeOut ? "fade-out" : ""}`}
          >
            {message}
          </div>
        )}

        <h1 className="register-title">Maak een account</h1>
        <p className="register-subtitle">Registreer je om toegang te krijgen.</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">E-mailadres:</label>
            <input
              id="email"
              type="email"
              placeholder="Voer je e-mailadres in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Wachtwoord:</label>
            <input
              id="password"
              type="password"
              placeholder="Voer je wachtwoord in"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Bevestig Wachtwoord:</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Bevestig je wachtwoord"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* Verwijderd: {passwordError && <p className="password-error">{passwordError}</p>} */}
          </div>
          <div className="form-group">
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Student</option>
              <option value="lecturer">Docent</option>
            </select>
            <small className="role-note">(Alleen voor demo doeleinden)</small>
          </div>
          <button type="submit" className="register-button">
            Registreer
          </button>
        </form>
        <div className="register-footer">
          <p>
            Heb je al een account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
