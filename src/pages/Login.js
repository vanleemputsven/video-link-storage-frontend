// src/pages/Login.js
import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' of 'error'
  const [fadeOut, setFadeOut] = useState(false); // Voor fade-out animatie
  const navigate = useNavigate(); // Initialiseer navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      setMessage("Login succesvol! Je wordt doorgestuurd...");
      setMessageType("success");

      // Token & Role opslaan
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Gebruikers-e-mail opslaan (in dit voorbeeld nemen we de e-mail uit het invoerveld)
      // Of, als je server email teruggeeft: localStorage.setItem("userEmail", response.data.email)
      localStorage.setItem("userEmail", email);

      // Navigeer naar de homepage na een korte vertraging
      setTimeout(() => {
        navigate("/");
      }, 1500);
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
      }, 4500);

      const removeTimer = setTimeout(() => {
        setMessage("");
        setMessageType("");
        setFadeOut(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Meldingen */}
        {message && (
          <div
            className={`info-message ${messageType} ${fadeOut ? "fade-out" : ""}`}
          >
            {message}
          </div>
        )}

        <h1 className="login-title">Welkom terug</h1>
        <p className="login-subtitle">Log in om verder te gaan.</p>

        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        <div className="login-footer">
          <p>
            Nog geen account? <a href="/register">Registreer hier</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
