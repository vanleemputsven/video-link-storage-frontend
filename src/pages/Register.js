import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Wachtwoorden komen niet overeen.");
      return;
    }

    setPasswordError("");

    try {
      await API.post("/auth/register", {
        email,
        password,
        role,
      });

      setMessage("Registratie succesvol! U wordt doorgestuurd naar de loginpagina.");

      // Reset formulier
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");

      // Navigeer naar de loginpagina
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Er ging iets mis.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Maak een account</h1>
        <p className="register-subtitle">Registreer je om toegang te krijgen.</p>
        {message && (
          <p
            className={`message ${
              message.includes("succes") ? "success-message" : "error-message"
            }`}
          >
            {message}
          </p>
        )}
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
            {passwordError && <p className="password-error">{passwordError}</p>}
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
          </div>
          <button type="submit" className="register-button">
            Registreer
          </button>
        </form>
        <div className="register-footer">
          <p>Heb je al een account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
