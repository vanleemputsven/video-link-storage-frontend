import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Tweede wachtwoordveld
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Feedback voor wachtwoorden
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controleer of wachtwoorden overeenkomen
    if (password !== confirmPassword) {
      setPasswordError("Wachtwoorden komen niet overeen.");
      return;
    }

    setPasswordError(""); // Reset wachtwoordmelding

    try {
      const response = await API.post("/auth/register", {
        email,
        password,
        role,
      });
      setMessage("Registratie succesvol! U wordt doorgestuurd naar de loginpagina.");
      
      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");

      // Navigeer naar de loginpagina na 2 seconden
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Er ging iets mis.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Registreer</h1>
        {message && (
          <p
            className={
              message.includes("succes") ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
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
          <label>Bevestig Wachtwoord:</label>
          <input
            type="password"
            placeholder="Bevestig je wachtwoord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
          <label>Rol (demo):</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Student</option>
            <option value="lecturer">Docent</option>
          </select>
          <button type="submit">Registreer</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
