// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo Sectie */}
        <div className="footer-logo-section">
          <img src="/logo-vls.png" alt="Video Link Storage" className="footer-logo-image" />
        </div>

        {/* Footer Tekst */}
        <p className="footer-text">
          © {new Date().getFullYear()} Video Link Storage - Sven Van Leemput. Alle rechten voorbehouden.
        </p>

        {/* Footer Links */}
        <div className="footer-links">
          <Link to="/terms" className="footer-link">Gebruiksvoorwaarden</Link>
          <Link to="/privacy" className="footer-link">Privacybeleid</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        {/* Sociale Media Iconen */}
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Twitter">
            <FontAwesomeIcon icon={["fab", "x-twitter"]} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
