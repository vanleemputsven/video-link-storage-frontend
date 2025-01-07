// src/pages/Upload.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [cancelTokenSource, setCancelTokenSource] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage("Selecteer een videobestand.");
      return;
    }

    if (video.size > 104857600) { // 100MB
      setMessage("De video mag niet groter zijn dan 100MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    const source = API.CancelToken.source();
    setCancelTokenSource(source);

    try {
      await API.post("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: source.token,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          setMessage(`Uploaden: ${percentCompleted}% voltooid`);
        },
      });

      setMessage("Video succesvol geüpload!");
      setTitle("");
      setDescription("");
      setVideo(null);
      fileInputRef.current.value = "";
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (API.isCancel(error)) {
        setMessage("Upload geannuleerd.");
      } else {
        setMessage(
          error.response?.data?.message || "Er is een fout opgetreden bij het uploaden."
        );
      }
      setProgress(0);
    }
  };

  const handleCancel = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("De gebruiker heeft de upload geannuleerd.");
      setCancelTokenSource(null);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Video Uploaden</h1>
      <p className="upload-subtitle">Upload je video en deel hem met anderen.</p>
      {message && (
        <p
          className={`upload-message ${
            message.includes("succes") ? "success-message" : "error-message"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Titel:</label>
          <input
            id="title"
            type="text"
            placeholder="Titel van de video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschrijving:</label>
          <textarea
            id="description"
            placeholder="Beschrijf de inhoud van de video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="video">Video:</label>
          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            ref={fileInputRef}
            required
            className="form-input"
          />
        </div>
        {progress > 0 && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}
        <div className="form-actions">
          <button type="submit" className="upload-button">
            <FontAwesomeIcon icon="upload" className="icon" /> Upload Video
          </button>
          {progress > 0 && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon="times-circle" className="icon" /> Annuleer Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Upload;
