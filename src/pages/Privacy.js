import React from "react";
import "../styles/StaticPage.css";

const Privacy = () => {
  return (
    <div className="static-page-container">
      <h1>Privacybeleid</h1>
      <p>
        Bij Video Link Storage begrijpen we dat uw privacy van groot belang is. Daarom zetten we ons in om uw persoonlijke gegevens te beschermen en transparant te zijn over hoe we deze verzamelen, gebruiken en beveiligen. Lees dit beleid zorgvuldig door om te begrijpen hoe wij met uw gegevens omgaan.
      </p>

      <h2>1. Gegevens die wij verzamelen</h2>
      <p>Om onze diensten te kunnen aanbieden, verzamelen we alleen de gegevens die strikt noodzakelijk zijn. Dit kan onder andere omvatten:</p>
      <ul>
        <li>Uw naam en e-mailadres wanneer u een account aanmaakt.</li>
        <li>Gegevens over uw gebruik van onze diensten, zoals bekeken video's.</li>
        <li>Technische informatie zoals uw IP-adres en browsertype, uitsluitend voor analytische doeleinden.</li>
      </ul>

      <h2>2. Hoe wij uw gegevens gebruiken</h2>
      <p>De verzamelde gegevens worden gebruikt om onze diensten te verbeteren en een optimale gebruikerservaring te bieden. Specifieke toepassingen zijn:</p>
      <ul>
        <li>Het faciliteren van uw toegang tot educatieve video's.</li>
        <li>Het personaliseren van uw gebruikerservaring op ons platform.</li>
        <li>Het verbeteren van onze website en dienstverlening op basis van gebruikersstatistieken.</li>
      </ul>

      <h2>3. Delen van gegevens</h2>
      <p>
        Uw gegevens worden nooit verkocht aan derden. In bepaalde situaties kunnen wij echter genoodzaakt zijn om uw gegevens te delen:
      </p>
      <ul>
        <li>Met uw expliciete toestemming.</li>
        <li>Om te voldoen aan wettelijke verplichtingen of een gerechtelijk bevel.</li>
        <li>Met vertrouwde serviceproviders die ons ondersteunen bij het leveren van onze diensten, zoals hostingbedrijven.</li>
      </ul>

      <h2>4. Beveiliging van uw gegevens</h2>
      <p>
        Wij nemen de beveiliging van uw gegevens serieus. Daarom maken wij gebruik van moderne technologieën en protocollen om uw informatie te beschermen tegen ongeoorloofde toegang, wijziging of vernietiging. Dit omvat onder andere:
      </p>
      <ul>
        <li>Versleuteling van gegevens tijdens verzending.</li>
        <li>Beveiligde servers en opslaglocaties.</li>
        <li>Regelmatige beveiligingsaudits en updates.</li>
      </ul>

      <h2>5. Uw rechten</h2>
      <p>
        U heeft het recht om controle te hebben over uw persoonlijke gegevens. Dit houdt in dat u:
      </p>
      <ul>
        <li>Toegang kunt vragen tot de gegevens die we over u hebben opgeslagen.</li>
        <li>Correcties kunt laten aanbrengen in onjuiste of onvolledige gegevens.</li>
        <li>Een verzoek kunt indienen om uw gegevens volledig te laten verwijderen.</li>
        <li>Zich kunt afmelden voor onze communicatie of nieuwsbrieven.</li>
      </ul>

      <h2>6. Cookies en tracking</h2>
      <p>
        Onze website maakt gebruik van cookies om de functionaliteit en prestaties te verbeteren. U kunt uw cookie-instellingen beheren via uw browser. Voor meer informatie over ons gebruik van cookies, verwijzen wij u naar ons <a href="/cookies" className="static-link">cookiebeleid</a>.
      </p>

      <h2>7. Wijzigingen in dit beleid</h2>
      <p>
        Wij behouden ons het recht voor om dit privacybeleid van tijd tot tijd bij te werken. Wij raden u aan deze pagina regelmatig te controleren om op de hoogte te blijven van eventuele wijzigingen. De laatste update van dit beleid vond plaats op 1 december 2024.
      </p>

      <h2>8. Contact</h2>
      <p>
        Heeft u vragen, opmerkingen of verzoeken met betrekking tot dit privacybeleid? Neem dan contact met ons op via onze{" "}
        <a href="/contact" className="static-link">
          contactpagina
        </a>
        . Wij staan altijd klaar om u te helpen.
      </p>

      <p className="footer-text">
        Dit privacybeleid is van kracht sinds 1 december 2024. Door gebruik te maken van onze diensten, stemt u in met dit beleid.
      </p>
    </div>
  );
};

export default Privacy;
