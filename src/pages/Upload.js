import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Upload.css";

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

    if (video.size > 104857600) {
      setMessage("De video mag niet groter zijn dan 100MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    const source = API.CancelToken.source(); // Maak een cancel token
    setCancelTokenSource(source);

    try {
      const response = await API.post("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: source.token, // Voeg de cancel token toe
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
      setTimeout(() => navigate("/"), 2000); // Navigeer naar Home na 2 seconden
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
      <h1>Video Uploaden</h1>
      {message && (
        <p className={message.includes("succes") ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Beschrijving:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            ref={fileInputRef}
            required
          />
        </div>
        {progress > 0 && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}
        <button type="submit">Upload Video</button>
        {progress > 0 && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Annuleer Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default Upload;
