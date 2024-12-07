import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/VideoEdit.css";

const VideoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        setError("Fout bij het ophalen van de video.");
      }
    };

    fetchVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/videos/${id}`, {
        title,
        description,
      });
      setMessage("Video succesvol bijgewerkt!");
      setTimeout(() => navigate("/"), 2000); // Navigeer naar Home na 2 seconden
    } catch (err) {
      setError(err.response?.data?.message || "Er ging iets mis.");
    }
  };

  return (
    <div className="edit-container">
      <h1>Bewerk Video</h1>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="title">Titel:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschrijving:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
          />
        </div>
        <button type="submit" className="save-button">
          Opslaan
        </button>
      </form>
    </div>
  );
};

export default VideoEdit;
