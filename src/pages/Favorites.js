// src/pages/Favorites.js
import React, { useEffect, useState } from "react";
import API, { removeFavorite } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/Favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await API.get("/favorites");
      setFavorites(response.data);
      setError("");
    } catch (err) {
      setError("Fout bij het ophalen van favorieten. Log in om toegang te krijgen.");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      setError("Je bent niet ingelogd. Log in om favorieten te bekijken.");
      setLoading(false);
    }
  }, [token]);

  const handleRemoveFavorite = async (videoId) => {
    try {
      await removeFavorite(videoId);
      setFavorites((prev) => prev.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Fout bij verwijderen van favorieten:", err);
      setError("Fout bij het verwijderen van favorieten.");
    }
  };

  // Functie om 'fl_attachment' toe te voegen aan de Cloudinary URL
  const getDownloadUrl = (fileUrl) => {
    const parts = fileUrl.split("/upload/");
    if (parts.length !== 2) return fileUrl;
    return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
  };

  if (loading) return <p className="loading-message">Favorieten laden...</p>;

  return (
    <div className="favorites-container">
      <h2>Mijn Favorieten</h2>
      {error && (
        <div className="info-message">
          <FontAwesomeIcon icon="info-circle" className="info-icon" />{" "}
          {error}
          {" "}
          <br />
          <Link to="/login">Log in</Link> of{" "}
          <Link to="/register">registreer</Link> om favorieten te beheren.
        </div>
      )}
      {favorites.length === 0 && !error ? (
        <p className="no-favorites-message">Je hebt nog geen favoriete video's.</p>
      ) : (
        <div className="video-grid">
          {favorites.map((video) => (
            <div className="video-card" key={video._id}>
              <div className="video-thumbnail-container">
                {/* preload="metadata" voor snellere initiële weergave */}
                <video
                  src={video.fileUrl}
                  controls
                  preload="metadata"
                  className="video-thumbnail"
                />
                {/* Favoriet-Knop Overlay */}
                <button
                  className="favorite-button favorited"
                  onClick={() => handleRemoveFavorite(video._id)}
                  aria-label="Verwijder uit favorieten"
                >
                  <FontAwesomeIcon icon="heart" />
                </button>
              </div>
              
              <h3 className="video-title">{video.title}</h3>
              
              {/* Toegevoegde auteur-regel */}
              <p className="video-author">
                <FontAwesomeIcon icon="user" className="video-author-icon" />
                Geüpload door:{" "}
                <span className="video-author-name">{video.author || "Onbekend"}</span>
              </p>

              <p className="video-description">
                {video.description.length > 80
                  ? `${video.description.substring(0, 80)}...`
                  : video.description}
              </p>
              
              <div className="video-actions">
                <Link to={`/video/${video._id}`} className="details-link">
                  <FontAwesomeIcon icon="info-circle" className="icon" /> Details
                </Link>
                <a href={getDownloadUrl(video.fileUrl)} className="download-button">
                  <FontAwesomeIcon icon="download" className="icon" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
