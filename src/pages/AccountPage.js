// src/pages/AccountPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AccountPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountPage() {
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  // Haal userEmail en role uit localStorage als je dat al opslaat bij inloggen
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("role") || "user";
    if (userEmail) setEmail(userEmail);
    setRole(userRole);
  }, []);

  // Wachtwoord wijzigen
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setFeedback("Wachtwoord moet minimaal 6 tekens bevatten.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        "/auth/manage/password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback(res.data.message); // "Wachtwoord succesvol gewijzigd."
      setNewPassword("");
    } catch (err) {
      console.error("Fout bij wijzigen wachtwoord:", err);
      setFeedback(
        err.response?.data?.message || "Er ging iets mis, probeer opnieuw."
      );
    }
  };

  // Account verwijderen
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Weet je zeker dat je je account wilt verwijderen?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await API.delete("/auth/manage/account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message); // "Account succesvol verwijderd."
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Fout bij verwijderen account:", err);
      setFeedback(
        err.response?.data?.message || "Er ging iets mis, probeer opnieuw."
      );
    }
  };

  // **NIEUW**: Data exporteren
  const handleExportData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/manage/account-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // res.data = user object
      const userData = JSON.stringify(res.data, null, 2); // JSON met inspringing

      // Maak een Blob van de data
      const blob = new Blob([userData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Maak een tijdelijke link om te downloaden
      const link = document.createElement("a");
      link.href = url;
      link.download = "mijn_account_data.json";
      document.body.appendChild(link);
      link.click();

      // Opruimen
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setFeedback("Je data is succesvol geëxporteerd!");
    } catch (err) {
      console.error("Fout bij exporteren van data:", err);
      setFeedback("Er ging iets mis bij het exporteren van je data.");
    }
  };

  return (
    <div className="account-page-container">
      <h1 className="account-page-title">Beheer Account</h1>
      <p className="account-page-subtitle">
        Pas je wachtwoord aan, exporteer je data of verwijder je account.
      </p>

      {/* Feedback */}
      {feedback && (
        <p
          className={`account-page-message ${
            feedback.toLowerCase().includes("succes") ? "success" : "error"
          }`}
        >
          {feedback}
        </p>
      )}

      {/* (optioneel) Gebruikersprofiel */}
      <div className="account-profile-card">
        <FontAwesomeIcon icon="user-circle" className="profile-icon" />
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {email || "Onbekend"}
          </p>
          <p>
            <strong>Rol:</strong> {role}
          </p>
        </div>
      </div>

      <div className="account-info-text">
        <p>
          Hier kun je jouw wachtwoord wijzigen om je account veilig te houden. 
          Je kunt ook al je gegevens downloaden of je account definitief verwijderen.
        </p>
      </div>

      <div className="account-page-content">
        {/* Form: Wachtwoord wijzigen */}
        <form onSubmit={handleChangePassword} className="account-page-form">
          <label htmlFor="newPassword" className="account-page-label">
            Nieuw Wachtwoord
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Minimaal 6 karakters"
            className="account-page-input"
          />
          <button type="submit" className="account-page-button change-button">
            <FontAwesomeIcon icon="key" />
            <span>Wachtwoord wijzigen</span>
          </button>
        </form>

        <div className="account-page-divider" />

        {/* **Nieuw**: Data exporteren */}
        <button
          type="button"
          className="account-page-button export-button"
          onClick={handleExportData}
        >
          <FontAwesomeIcon icon="file-export" />
          <span>Exporteer mijn data</span>
        </button>

        <div className="account-page-divider" />

        {/* Account verwijderen */}
        <button
          onClick={handleDeleteAccount}
          className="account-page-button delete-button"
        >
          <FontAwesomeIcon icon="user-slash" />
          <span>Account verwijderen</span>
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
