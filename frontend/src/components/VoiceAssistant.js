import React, { useState, useRef } from "react";

function VoiceAssistant({ audioBlob, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        background: "#1e293b",
        borderRadius: "1rem",
        padding: "1rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        border: "1px solid rgba(5,150,105,0.3)",
        zIndex: 1000,
        minWidth: "300px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: isPlaying ? "#059669" : "#4b5563",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onClick={isPlaying ? stopAudio : playAudio}
        >
          {isPlaying ? "⏸️" : "🔊"}
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ color: "#059669", marginBottom: "0.25rem", fontSize: "1rem" }}>
            Voice Assistant
          </h4>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
            {isPlaying ? "Playing..." : "Click to hear analysis"}
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            fontSize: "1.25rem",
            cursor: "pointer",
            padding: "0.25rem",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default VoiceAssistant;