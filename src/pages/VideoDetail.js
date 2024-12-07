import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/VideoDetail.css";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${id}`);
        setVideo(response.data);

        // Verhoog views
        await API.patch(`/videos/${id}/views`);
      } catch (err) {
        setError("Fout bij het ophalen van de video.");
      }
    };
    fetchVideo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/videos/${id}`);
      setShowDeleteModal(false);
      navigate("/"); // Navigeer terug naar de homepagina
    } catch (err) {
      alert("Fout bij het verwijderen van de video.");
    }
  };

  if (error)
    return <p className="error-message">Fout bij het ophalen van de video.</p>;
  if (!video)
    return <p className="loading-message">Video laden...</p>;

  return (
    <div className="video-detail-container">
      <div className="video-header">
        <h1>{video.title}</h1>
        <p className="views-count">Bekeken: {video.views}</p>
      </div>
      <video controls src={video.fileUrl} className="video-player" />
      <div className="video-description">
        <h2>Beschrijving</h2>
        <p>{video.description}</p>
      </div>

      {role === "lecturer" && (
        <div className="video-actions">
          <Link to={`/video/edit/${video._id}`} className="edit-button">
            Bewerken
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="delete-button"
          >
            Verwijderen
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Bevestig Verwijderen</h2>
            <p>Weet je zeker dat je deze video wilt verwijderen?</p>
            <div className="modal-actions">
              <button
                onClick={handleDelete}
                className="confirm-delete-button"
              >
                Verwijderen
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cancel-button"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetail;
