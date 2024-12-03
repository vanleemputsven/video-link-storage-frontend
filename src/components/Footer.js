import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-text">
          © {new Date().getFullYear()} Video Link Storage. Alle rechten voorbehouden.
        </p>
        <div className="footer-links">
          <a href="/terms" className="footer-link">Gebruiksvoorwaarden</a>
          <a href="/privacy" className="footer-link">Privacybeleid</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
