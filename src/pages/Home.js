// src/pages/Home.js
import React, { useEffect, useState } from "react";
import API, { addFavorite, removeFavorite, getFavorites } from "../services/api";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Hulpfunctie om te checken of token is verlopen
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp in seconden, Date.now() in ms
    if (payload.exp * 1000 < Date.now()) {
      return true;
    }
  } catch (err) {
    return true;
  }
  return false;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "Hoe upload ik een video?",
      answer:
        "Log in met uw account en klik op 'Upload Video' in de navigatiebalk. Selecteer vervolgens een videobestand en voeg een titel en beschrijving toe.",
    },
    {
      question: "Kan ik video's downloaden?",
      answer:
        "Ja, u kunt video's downloaden door op de 'Download'-knop onder de video te klikken.",
    },
    {
      question: "Is deze dienst gratis te gebruiken?",
      answer:
        "Ja, Video Link Storage is gratis te gebruiken. Registratie is vereist om toegang te krijgen tot alle functies.",
    },
    {
      question: "Welke bestandsformaten worden ondersteund?",
      answer:
        "Video's in de formaten MP4, AVI en MOV worden ondersteund. Zorg ervoor dat uw bestand niet groter is dan 100MB.",
    },
  ];

  return (
    <section className="faq-section">
      <h2>Veelgestelde Vragen</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleFAQ(index);
            }}
            aria-expanded={activeIndex === index}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // We lezen de token uit localStorage en checken periodiek of hij geldig is
  const [currentToken, setCurrentToken] = useState(localStorage.getItem("token"));
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Haal video's op (eventueel met zoekquery)
  const fetchVideos = async (query = "") => {
    setLoading(true);
    try {
      // Als de token verlopen is, loggen we uit
      if (currentToken && isTokenExpired(currentToken)) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setCurrentToken(null);
      }

      const response = query
        ? await API.get(`/videos/search?query=${encodeURIComponent(query)}`)
        : await API.get("/videos");
      setVideos(response.data);
      setError("");

      // Favorieten ophalen als user ingelogd is
      if (currentToken && !isTokenExpired(currentToken)) {
        const favResponse = await getFavorites();
        setFavorites(favResponse.data.map((vid) => vid._id));
      }
    } catch (err) {
      if (!currentToken || isTokenExpired(currentToken)) {
        setError("Je bent niet ingelogd. Log in om video's te bekijken.");
      } else {
        setError("Fout bij het ophalen van video's. Probeer het later opnieuw.");
      }
      setVideos([]);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    fetchVideos();
  };

  // Bij het laden + wanneer token wijzigt, video's opnieuw ophalen
  useEffect(() => {
    fetchVideos();
  }, [currentToken]);

  // Elke 5s checken of de token nog geldig is
  useEffect(() => {
    const interval = setInterval(() => {
      const tokenInStorage = localStorage.getItem("token");
      if (tokenInStorage && isTokenExpired(tokenInStorage)) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setCurrentToken(null);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Toon de "Back to Top"-knop als we ver scrollen
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  const handleLoadMore = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const handleFavorite = async (videoId) => {
    try {
      if (favorites.includes(videoId)) {
        await removeFavorite(videoId);
        setFavorites((prev) => prev.filter((id) => id !== videoId));
      } else {
        await addFavorite(videoId);
        setFavorites((prev) => [...prev, videoId]);
      }
    } catch (err) {
      console.error("Fout bij beheren van favorieten:", err);
      setError("Fout bij beheren van favorieten.");
    }
  };

  // preload="metadata" voor snellere laadtijd van video's
  const getDownloadUrl = (fileUrl) => {
    const parts = fileUrl.split("/upload/");
    if (parts.length !== 2) return fileUrl;
    return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const userLoggedIn = currentToken && !isTokenExpired(currentToken);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Video's laden...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Welkom bij <span className="highlight">Video Link Storage</span>
          </h1>
          <p>
            Ontdek een uitgebreide bibliotheek van educatieve video's, speciaal
            gemaakt door docenten voor studenten. Blader door, zoek en leer!
          </p>

          {userLoggedIn ? (
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Typ een titel of onderwerp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Zoek naar video's"
              />
              <div className="search-buttons-wrapper">
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon="search" /> Zoek
              </button>
              {searchQuery && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                  aria-label="Wis zoekresultaten"
                >
                  <FontAwesomeIcon icon="times" /> Clear
                </button>
              )}
              </div>
            </form>
          ) : (
            <div className="hero-cta-frame">
              <div className="hero-cta">
                <FontAwesomeIcon icon="user-plus" className="hero-cta-icon" />
                <p className="hero-cta-text">
                  Word lid en profiteer direct van alle mogelijkheden!
                </p>
                <Link to="/register" className="hero-cta-button">
                  Registreer Nu <FontAwesomeIcon icon="arrow-right" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/** 
       * Stats Summary 
       * Nu alleen tonen als user ingelogd is
       */}
      {userLoggedIn && (
        <section className="stats-summary">
          <div className="stats-item">
            <FontAwesomeIcon icon="film" className="stats-icon" />
            <span className="stats-text">
              Beschikbare video's: {videos.length}
            </span>
          </div>
          <div className="stats-item">
            <FontAwesomeIcon icon="heart" className="stats-icon" />
            <span className="stats-text">
              Mijn favorieten: {favorites.length}
            </span>
          </div>
        </section>
      )}

      {/* Video's */}
      <section className="videos-section">
        <h2>Bekijk onze video's</h2>
        <div className="video-grid">
          {error && (
            <div
              className={`home-info-message ${
                userLoggedIn ? "error" : "info"
              }`}
            >
              <FontAwesomeIcon icon="info-circle" className="info-icon" />
              {error}{" "}
              {!userLoggedIn && (
                <>
                  <br />
                  <Link to="/login">Log in</Link> of{" "}
                  <Link to="/register">registreer</Link> om toegang te krijgen.
                </>
              )}
            </div>
          )}

          {videos.slice(0, visibleVideos).map((video) => (
            <div className="video-card" key={video._id}>
              <div className="video-thumbnail-container">
                <video
                  src={video.fileUrl}
                  controls
                  preload="metadata"
                  className="video-thumbnail"
                />
                {userLoggedIn && (
                  <button
                    className={`favorite-button ${
                      favorites.includes(video._id) ? "favorited" : ""
                    }`}
                    onClick={() => handleFavorite(video._id)}
                    aria-label={
                      favorites.includes(video._id)
                        ? "Verwijder uit favorieten"
                        : "Voeg toe aan favorieten"
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        favorites.includes(video._id)
                          ? "heart"
                          : ["far", "heart"]
                      }
                    />
                  </button>
                )}
              </div>

              {/* Titel, auteur en beschrijving */}
              <h3 className="video-title">{video.title}</h3>
              {/* AUTEURREGEL TOEGEVOEGD: -------------------------------- */}
              <p className="video-author">
                <FontAwesomeIcon icon="user" className="video-author-icon" />
                Geüpload door: <span className="video-author-name">
                  {video.author || "Onbekend"}
                </span>
              </p>
              {/* -------------------------------------------------------- */}

              <p className="video-description">
                {video.description.length > 80
                  ? `${video.description.substring(0, 80)}...`
                  : video.description}
              </p>

              <div className="video-actions">
                <Link to={`/video/${video._id}`} className="details-link">
                  <FontAwesomeIcon icon="info-circle" className="icon" /> Details
                </Link>
                <a
                  href={getDownloadUrl(video.fileUrl)}
                  className="download-button"
                >
                  <FontAwesomeIcon icon="download" className="icon" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleVideos < videos.length && (
          <button onClick={handleLoadMore} className="load-more-button">
            <FontAwesomeIcon icon="chevron-down" className="icon" /> Laad Meer
            Video's
          </button>
        )}
      </section>

      {/* Features (Carousel) */}
      <section className="features-section">
        <h2>Waarom Video Link Storage?</h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={10000}
          showStatus={false}
          stopOnHover
        >
          <div className="feature-card">
            <FontAwesomeIcon icon="graduation-cap" className="feature-icon" />
            <h3>Educatief materiaal</h3>
            <p>
              Toegang tot video's die speciaal zijn ontworpen om je leerervaring te
              verbeteren.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="users" className="feature-icon" />
            <h3>Gebruiksvriendelijke interface</h3>
            <p>
              Navigeer moeiteloos door onze collectie met een modern en strak ontwerp.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="video" className="feature-icon" />
            <h3>Docenten dashboard</h3>
            <p>
              Beheer eenvoudig je eigen video's en krijg inzicht in
              gebruiksstatistieken.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="download" className="feature-icon" />
            <h3>Onbeperkte downloads</h3>
            <p>
              Download video's in hoge kwaliteit en bekijk ze offline wanneer je maar
              wilt.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="info-circle" className="feature-icon" />
            <h3>Veilige opslag</h3>
            <p>
              Je video's worden veilig opgeslagen in de cloud met privacy als hoogste
              prioriteit.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon="users" className="feature-icon" />
            <h3>Community support</h3>
            <p>
              Krijg hulp van medegebruikers en deel je eigen tips en kennis.
            </p>
          </div>
        </Carousel>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Back-to-Top */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Terug naar boven"
        >
          <FontAwesomeIcon icon="arrow-up" />
        </button>
      )}
    </div>
  );
};

export default Home;
