import React, { useState } from "react";
import API from "../services/api";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      setMessage("Login succesvol!");

      // Token en rol opslaan
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Navigeer naar de homepage
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Er ging iets mis.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welkom terug</h1>
        <p className="login-subtitle">Log in om verder te gaan.</p>
        {message && (
          <p
            className={`message ${
              message.includes("succes") ? "success-message" : "error-message"
            }`}
          >
            {message}
          </p>
        )}
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
          <p>Nog geen account? <a href="/register">Registreer hier</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
