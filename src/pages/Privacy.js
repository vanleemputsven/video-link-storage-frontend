import React from "react";
import "../styles/StaticPage.css";

const Privacy = () => {
  return (
    <div className="static-page-container">
      <h1>Privacybeleid</h1>
      <p>
        Bij Video Link Storage hechten we veel waarde aan uw privacy. Dit is
        hoe we uw gegevens gebruiken:
      </p>
      <ul>
        <li>
          We verzamelen alleen de minimale informatie die nodig is voor onze
          diensten, zoals uw e-mailadres.
        </li>
        <li>
          Uw gegevens worden nooit gedeeld met derden zonder uw toestemming.
        </li>
        <li>
          U kunt op elk moment verzoeken om uw gegevens te laten verwijderen.
        </li>
      </ul>
      <p>
        Heeft u vragen? Bezoek onze <a href="/contact">contactpagina</a>.
      </p>
    </div>
  );
};

export default Privacy;
