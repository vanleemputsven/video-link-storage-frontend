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
        <h1 className="login-title">Log in</h1>
        {message && (
          <p
            className={
              message.includes("succes") ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Voer je e-mailadres in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Wachtwoord:</label>
          <input
            type="password"
            placeholder="Voer je wachtwoord in"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
