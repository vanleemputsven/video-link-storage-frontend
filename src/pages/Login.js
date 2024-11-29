import React, { useState } from "react";
import API from "../services/api";
import "../styles/Login.css"; // Zorg ervoor dat dit correct wordt geladen

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      setMessage("Login succesvol!");
      console.log(response.data); // Bevat token

      // Token en rol opslaan
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Navigeer naar de homepage en herlaad de pagina
      setTimeout(() => {
        window.location.href = "/"; // Dit herlaadt de pagina volledig
      }, 1000); // Wacht 1 seconde voordat de gebruiker wordt doorgestuurd
    } catch (err) {
      setMessage(err.response?.data?.message || "Er ging iets mis.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {message && (
        <p
          className={
            message.includes("succes") ? "success-message" : "error-message"
          }
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
