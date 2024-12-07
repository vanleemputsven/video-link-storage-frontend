import React from "react";
import "../styles/StaticPage.css";

const Terms = () => {
  return (
    <div className="static-page-container">
      <h1>Gebruiksvoorwaarden</h1>
      <p>
        Bedankt dat u ervoor heeft gekozen om gebruik te maken van Video Link
        Storage. Door toegang te krijgen tot onze website en onze diensten te
        gebruiken, gaat u akkoord met deze gebruiksvoorwaarden. Lees deze
        voorwaarden zorgvuldig door, aangezien ze de basis vormen voor het
        gebruik van onze diensten.
      </p>

      <h2>1. Acceptatie van de voorwaarden</h2>
      <p>
        Door gebruik te maken van de Video Link Storage-website, applicaties of
        diensten verklaart u dat u akkoord gaat met deze gebruiksvoorwaarden. Als
        u niet akkoord gaat met een van de voorwaarden, verzoeken wij u geen
        gebruik te maken van onze diensten.
      </p>

      <h2>2. Doel en gebruik van de diensten</h2>
      <ul>
        <li>
          De inhoud van Video Link Storage is uitsluitend bedoeld voor
          educatieve doeleinden en mag niet worden gebruikt voor commerciële
          doeleinden zonder voorafgaande toestemming.
        </li>
        <li>
          Het kopiëren, verspreiden, wijzigen of openbaar maken van onze video's
          zonder expliciete schriftelijke toestemming is strikt verboden.
        </li>
        <li>
          Gebruikers die zich registreren voor een account dienen correcte en
          actuele informatie te verstrekken. U bent verantwoordelijk voor het
          beschermen van uw inloggegevens.
        </li>
      </ul>

      <h2>3. Intellectueel eigendom</h2>
      <p>
        Alle inhoud, inclusief video's, afbeeldingen, logo's, tekst en andere
        materialen op Video Link Storage, is beschermd door auteursrecht en
        andere toepasselijke wetten. Het gebruik van onze inhoud zonder
        toestemming kan leiden tot juridische stappen.
      </p>

      <h2>4. Gebruikersverantwoordelijkheden</h2>
      <ul>
        <li>
          U stemt ermee in onze diensten niet te gebruiken voor illegale,
          schadelijke of discriminerende activiteiten.
        </li>
        <li>
          Het uploaden van inhoud die inbreuk maakt op auteursrechten,
          handelsmerken of andere eigendomsrechten van derden is niet toegestaan.
        </li>
        <li>
          Wij behouden ons het recht voor om inhoud die in strijd is met onze
          voorwaarden zonder voorafgaande kennisgeving te verwijderen.
        </li>
      </ul>

      <h2>5. Beëindiging van toegang</h2>
      <p>
        Wij behouden ons het recht voor om de toegang tot onze diensten op elk
        moment te beëindigen als u zich niet aan deze gebruiksvoorwaarden houdt
        of als er sprake is van misbruik. Dit kan gebeuren zonder voorafgaande
        waarschuwing of aansprakelijkheid.
      </p>

      <h2>6. Wijzigingen in de voorwaarden</h2>
      <p>
        Video Link Storage behoudt zich het recht voor om deze voorwaarden op
        elk moment te wijzigen. Wij raden u aan deze pagina regelmatig te
        controleren om op de hoogte te blijven van eventuele aanpassingen. Door
        onze diensten te blijven gebruiken na wijzigingen, stemt u in met de
        bijgewerkte voorwaarden.
      </p>

      <h2>7. Contact</h2>
      <p>
        Heeft u vragen over deze gebruiksvoorwaarden? Neem dan contact met ons
        op via onze{" "}
        <a href="/contact" className="static-link">
          contactpagina
        </a>
        . Wij staan klaar om uw vragen te beantwoorden.
      </p>

      <p className="footer-text">
        Deze voorwaarden zijn van kracht vanaf 1 december 2024.
      </p>
    </div>
  );
};

export default Terms;
