import React, { useState } from "react";
import "../styles/StaticPage.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basisvalidatie voor extra feedback
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Vul alle velden in voordat u het formulier verzendt.");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Voer een geldig e-mailadres in.");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    // Simulatie van succesvolle verzending
    setSuccessMessage(
      "Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op."
    );
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="static-page-container">
      <h1>Contact</h1>
      <p>
        Heeft u vragen, opmerkingen, of wilt u meer weten over onze diensten?
        Vul het onderstaande formulier in en we nemen zo spoedig mogelijk
        contact met u op.
      </p>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Naam:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Uw volledige naam"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Uw e-mailadres"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Bericht:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            placeholder="Typ hier uw bericht of vraag"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Verzenden
        </button>
      </form>

      <section className="additional-contact-info">
        <h2>Alternatieve contactmethoden</h2>
        <p>
          U kunt ons ook bereiken via de volgende kanalen:
        </p>
        <ul>
          <li>Email: <a href="mailto:info@videolinkstorage.com">info@videolinkstorage.com</a></li>
          <li>Telefoon: +32 123 456 789</li>
          <li>Adres: 1234 Educatie Straat, Leuven, België</li>
        </ul>
        <p>
          We zijn beschikbaar van maandag tot vrijdag, van 9:00 tot 17:00 uur.
        </p>
      </section>
    </div>
  );
};

export default Contact;
