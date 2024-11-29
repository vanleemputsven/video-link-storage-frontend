import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Toegevoegde zoekterm
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Functie om video's op te halen
  const fetchVideos = async (query = "") => {
    setLoading(true);
    try {
      const response = query
        ? await API.get(`/videos/search?query=${query}`)
        : await API.get("/videos");
      setVideos(response.data);
      setError("");
    } catch (err) {
      setError("Fout bij het ophalen van video's.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Laad video's bij het laden van de pagina
  useEffect(() => {
    fetchVideos();
  }, []);

  // Functie om te zoeken
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  if (loading) return <p>Video's laden...</p>;

  return (
    <div className="home-container">
      <h1>Video Overzicht</h1>
      {/* Zoekbalk */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Zoek video's..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Zoek
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video._id}>
            <video
              src={video.fileUrl}
              controls
              width="100%"
              height="auto"
              className="video-thumbnail"
            />
            <h3 className="video-title">{video.title}</h3>
            <p className="video-description">
              {video.description.length > 100
                ? `${video.description.substring(0, 100)}...`
                : video.description}
            </p>
            <Link to={`/video/${video._id}`} className="details-link">
              Bekijk details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
