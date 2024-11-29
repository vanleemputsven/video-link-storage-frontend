import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Voor navigatie
import API from "../services/api";
import "../styles/Register.css"; // Zorg ervoor dat dit correct wordt geladen

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Gebruik de `useNavigate` hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", {
        email,
        password,
        role,
      });
      setMessage("Registratie succesvol! U wordt doorgestuurd naar de loginpagina.");
      console.log(response.data); // Bevat de serverrespons

      // Reset form
      setEmail("");
      setPassword("");
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
    <div className="register-container">
      <h1>Registreer</h1>
      {message && (
        <p
          className={message.includes("succes") ? "success-message" : "error-message"}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Wachtwoord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Gebruiker</option>
            <option value="lecturer">Docent</option>
          </select>
        </div>
        <button type="submit">Registreer</button>
      </form>
    </div>
  );
};

export default Register;
