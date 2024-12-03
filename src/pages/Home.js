import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faVideo, faUsers } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [videos, setVideos] = useState([]);
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

  if (loading) return <p className="loading-message">Video's laden...</p>;

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welkom bij <span className="highlight">Video Link Storage</span></h1>
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

      {/* Video-grid */}
      <section className="videos-section">
        <h2>Bekijk onze video's</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video._id}>
              <video
                src={video.fileUrl}
                controls
                className="video-thumbnail"
              />
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">
                {video.description.length > 80
                  ? `${video.description.substring(0, 80)}...`
                  : video.description}
              </p>
              <Link to={`/video/${video._id}`} className="details-link">
                Bekijk details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features-sectie */}
      <section className="features-section">
        <h2>Waarom Video Link Storage?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Educatief materiaal</h3>
            <p>
              Toegang tot video's die speciaal zijn ontworpen om je leerervaring
              te verbeteren.
            </p>
          </div>
          <div className="feature-card">
            <h3>Gebruiksvriendelijke interface</h3>
            <p>
              Navigeer moeiteloos door onze collectie met een modern en strak
              ontwerp.
            </p>
          </div>
          <div className="feature-card">
            <h3>Docenten dashboard</h3>
            <p>
              Beheer eenvoudig je eigen video's en krijg inzicht in
              gebruiksstatistieken.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
