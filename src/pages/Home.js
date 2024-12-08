import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faVideo,
  faUsers,
  faDownload,
  faInfoCircle,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

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
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchVideos = async (query = "") => {
    setLoading(true);
    try {
      const response = query
        ? await API.get(`/videos/search?query=${query}`)
        : await API.get("/videos");
      setVideos(response.data);
      setError("");
    } catch (err) {
      setError("Fout bij het ophalen van video's. Log in om toegang te krijgen.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchVideos();
    } else {
      setError("Je bent niet ingelogd. Log in om video's te bekijken.");
      setLoading(false);
    }
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  const handleLoadMore = () => {
    setVisibleVideos((prevVisible) => prevVisible + 6);
  };

  if (loading) return <p className="loading-message">Video's laden...</p>;

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Welkom bij <span className="highlight">Video Link Storage</span>
          </h1>
          <p>
            Ontdek een uitgebreide bibliotheek van educatieve video's, speciaal
            gemaakt door docenten voor studenten. Blader door, zoek en leer!
          </p>
          {token && (
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Zoek naar video's..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Zoek
              </button>
            </form>
          )}
        </div>
        <div className="hero-icons">
          <div className="icon-container">
            <FontAwesomeIcon icon={faGraduationCap} className="hero-icon" />
            <p>Educatie</p>
          </div>
          <div className="icon-container">
            <FontAwesomeIcon icon={faVideo} className="hero-icon" />
            <p>Video's</p>
          </div>
          <div className="icon-container">
            <FontAwesomeIcon icon={faUsers} className="hero-icon" />
            <p>Community</p>
          </div>
        </div>
      </section>

      <section className="videos-section">
        <h2>Bekijk onze video's</h2>
        {error && (
          <div className="info-message">
            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />{" "}
            {error} <br />
            <Link to="/login">Log in</Link> of{" "}
            <Link to="/register">registreer</Link> om toegang te krijgen.
          </div>
        )}
        <div className="video-grid">
          {videos.slice(0, visibleVideos).map((video) => (
            <div className="video-card" key={video._id}>
              <video src={video.fileUrl} controls className="video-thumbnail" />
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">
                {video.description.length > 80
                  ? `${video.description.substring(0, 80)}...`
                  : video.description}
              </p>
              <div className="video-actions">
                <Link to={`/video/${video._id}`} className="details-link">
                  <FontAwesomeIcon icon={faInfoCircle} className="icon" />{" "}
                  Details
                </Link>
                <a href={video.fileUrl} download className="download-button">
                  <FontAwesomeIcon icon={faDownload} className="icon" />{" "}
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
        {visibleVideos < videos.length && (
  <button onClick={handleLoadMore} className="load-more-button">
    <FontAwesomeIcon icon={faChevronDown} className="icon" /> Laad Meer Video's
  </button>
)}
      </section>

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
      <FontAwesomeIcon icon={faGraduationCap} className="feature-icon" />
      <h3>Educatief materiaal</h3>
      <p>
        Toegang tot video's die speciaal zijn ontworpen om je leerervaring
        te verbeteren.
      </p>
    </div>
    <div className="feature-card">
      <FontAwesomeIcon icon={faUsers} className="feature-icon" />
      <h3>Gebruiksvriendelijke interface</h3>
      <p>
        Navigeer moeiteloos door onze collectie met een modern en strak
        ontwerp.
      </p>
    </div>
    <div className="feature-card">
      <FontAwesomeIcon icon={faVideo} className="feature-icon" />
      <h3>Docenten dashboard</h3>
      <p>
        Beheer eenvoudig je eigen video's en krijg inzicht in
        gebruiksstatistieken.
      </p>
    </div>
    <div className="feature-card">
      <FontAwesomeIcon icon={faDownload} className="feature-icon" />
      <h3>Onbeperkte downloads</h3>
      <p>
        Download video's in hoge kwaliteit en bekijk ze offline wanneer je maar wilt.
      </p>
    </div>
    <div className="feature-card">
      <FontAwesomeIcon icon={faInfoCircle} className="feature-icon" />
      <h3>Veilige opslag</h3>
      <p>
        Je video's worden veilig opgeslagen in de cloud met privacy als hoogste prioriteit.
      </p>
    </div>
    <div className="feature-card">
      <FontAwesomeIcon icon={faUsers} className="feature-icon" />
      <h3>Community support</h3>
      <p>
        Krijg hulp van medegebruikers en deel je eigen tips en kennis.
      </p>
    </div>
        </Carousel>
      </section>

      <FAQSection />
    </div>
  );
};

export default Home;
