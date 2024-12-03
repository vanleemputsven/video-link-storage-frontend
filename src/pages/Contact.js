import React, { useState } from "react";
import "../styles/StaticPage.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Bedankt voor uw bericht! We nemen snel contact met u op.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="static-page-container">
      <h1>Contact</h1>
      <p>Heeft u vragen of opmerkingen? Neem contact met ons op via het onderstaande formulier:</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Naam:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bericht:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Verzenden
        </button>
      </form>
    </div>
  );
};

export default Contact;
