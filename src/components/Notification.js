// src/components/Notification.js
import React, { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;
