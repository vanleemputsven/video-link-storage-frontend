// src/pages/VideoDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/VideoDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helper: check of token verlopen is
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      return true;
    }
  } catch (err) {
    return true;
  }
  return false;
}

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userLoggedIn = token && !isTokenExpired(token);

  // Gebruikers-ID opslaan om te checken of een comment 'van jou' is
  // (Wordt niet standaard opgeslagen, maar we kunnen hem decoden of opslaan)
  const [currentUserId, setCurrentUserId] = useState(null);

  // ========== Comments State ==========
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState("");

  // Haal video + views
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${id}`);
        setVideo(response.data);

        // Views verhogen
        await API.patch(`/videos/${id}/views`);
      } catch (err) {
        setError("Fout bij het ophalen van de video.");
      }
    };
    fetchVideo();
  }, [id]);

  // Haal comments op
  useEffect(() => {
    const fetchComments = async () => {
      if (!userLoggedIn) return;
      try {
        const resp = await API.get(`/videos/${id}/comments`);
        setComments(resp.data);
      } catch (err) {
        console.error("Fout bij ophalen van comments:", err);
      }
    };
    fetchComments();
  }, [id, userLoggedIn]);

  // Bepaal currentUserId uit token (optioneel: decode token op client)
  useEffect(() => {
    if (!userLoggedIn) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // payload.id bevat de user._id
      setCurrentUserId(payload.id);
    } catch (err) {
      console.error("Kon userID niet decoden uit token:", err);
    }
  }, [userLoggedIn, token]);

  // Video verwijderen (alleen docenten)
  const handleDelete = async () => {
    try {
      await API.delete(`/videos/${id}`);
      setShowDeleteModal(false);
      navigate("/");
    } catch (err) {
      alert("Fout bij het verwijderen van de video.");
    }
  };

  // Reactie posten
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setCommentError("Reactie mag niet leeg zijn.");
      return;
    }
    try {
      await API.post(`/videos/${id}/comments`, { content: commentContent });
      setCommentContent("");
      setCommentError("");

      // Haal de comments opnieuw op
      const resp = await API.get(`/videos/${id}/comments`);
      setComments(resp.data);
    } catch (err) {
      console.error("Fout bij toevoegen van comment:", err);
      setCommentError("Er ging iets mis bij het toevoegen van je reactie.");
    }
  };

  // Reactie verwijderen
  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/videos/${id}/comments/${commentId}`);
      // Refresh comment list
      const resp = await API.get(`/videos/${id}/comments`);
      setComments(resp.data);
    } catch (err) {
      console.error("Fout bij verwijderen van comment:", err);
      setCommentError("Kon de reactie niet verwijderen. Probeer opnieuw.");
    }
  };

  // ========== Render ==========

  if (error) {
    return <p className="error-message">{error}</p>;
  }
  if (!video) {
    return <p className="loading-message">Video laden...</p>;
  }

  return (
    <div className="video-detail-container">
      {/* Terug naar Home Knop */}
      <div className="back-home-button">
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon="arrow-left" /> Terug naar Home
        </Link>
      </div>

      {/* Videotitel + views */}
      <div className="video-header">
        <h1>{video.title}</h1>
        <p className="views-count">Bekeken: {video.views}</p>
      </div>

      {/* Videospeler */}
      <video controls src={video.fileUrl} className="video-player" />

      {/* Auteur-informatie */}
      <div className="video-info">
        <FontAwesomeIcon icon="user" className="video-author-icon" />
        <p className="video-author">
          Geüpload door:{" "}
          <span className="video-author-name">
            {video.author || "Onbekend"}
          </span>
        </p>
      </div>

      {/* Beschrijving */}
      <div className="video-description">
        <h2>Beschrijving</h2>
        <p>{video.description}</p>
      </div>

      {/* Als role=lecturer => bewerken/verwijderen video */}
      {role === "lecturer" && (
        <div className="video-actions">
          <Link to={`/video/edit/${video._id}`} className="edit-button">
            <FontAwesomeIcon icon="edit" /> Bewerken
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="delete-button"
          >
            <FontAwesomeIcon icon="trash" /> Verwijderen
          </button>
        </div>
      )}

      {/* ================== NIEUW: Comment-sectie ================== */}
      <div className="comment-section">
        <h2>Reacties</h2>
        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="no-comments">Er zijn nog geen reacties.</p>
          ) : (
            comments.map((cmt) => (
              <div key={cmt._id} className="comment-item">
                <p className="comment-meta">
                  <FontAwesomeIcon icon="user" className="comment-user-icon" />
                  {cmt.userEmail || "Onbekend"}{" "}
                  <span className="comment-date">
                    {new Date(cmt.createdAt).toLocaleString("nl-BE")}
                  </span>
                </p>
                <p className="comment-content">{cmt.content}</p>

                {/* Verwijder-knop als user=comment.user of role=lecturer */}
                {(role === "lecturer" ||
                  (currentUserId && currentUserId === cmt.user)) && (
                  <button
                    className="comment-delete-button"
                    onClick={() => handleDeleteComment(cmt._id)}
                  >
                    <FontAwesomeIcon icon="trash" /> Verwijder Reactie
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Nieuw comment formulier, alleen als ingelogd */}
        {userLoggedIn ? (
          <form onSubmit={handlePostComment} className="comment-form">
            <label htmlFor="commentContent" className="comment-label">
              Plaats een Reactie:
            </label>
            <textarea
              id="commentContent"
              className="comment-textarea"
              rows={3}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Stel je vraag of laat een reactie achter..."
            />
            {commentError && <p className="comment-error">{commentError}</p>}

            <button type="submit" className="comment-submit-button">
              Plaats Reactie
            </button>
          </form>
        ) : (
          <p className="login-reminder">
            <FontAwesomeIcon icon="info-circle" /> Log in om een reactie te
            plaatsen.
          </p>
        )}
      </div>
      {/* ================== EINDE comment-sectie ================== */}

      {/* Bevestigings-modal voor verwijderen van de video */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Bevestig Verwijderen</h2>
            <p>Weet je zeker dat je deze video wilt verwijderen?</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="confirm-delete-button">
                <FontAwesomeIcon icon="trash" /> Verwijderen
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
