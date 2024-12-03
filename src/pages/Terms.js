import React from "react";
import "../styles/StaticPage.css";

const Terms = () => {
  return (
    <div className="static-page-container">
      <h1>Gebruiksvoorwaarden</h1>
      <p>
        Welkom bij Video Link Storage. Door gebruik te maken van onze diensten,
        gaat u akkoord met de volgende voorwaarden:
      </p>
      <ul>
        <li>
          U mag onze video's alleen gebruiken voor educatieve en niet-commerciële doeleinden.
        </li>
        <li>
          Het is verboden om onze inhoud te kopiëren, verspreiden of verkopen zonder toestemming.
        </li>
        <li>
          Bij misbruik behouden wij ons het recht voor om uw account te beëindigen.
        </li>
      </ul>
      <p>
        Voor meer informatie kunt u contact met ons opnemen via onze{" "}
        <a href="/contact">contactpagina</a>.
      </p>
    </div>
  );
};

export default Terms;
