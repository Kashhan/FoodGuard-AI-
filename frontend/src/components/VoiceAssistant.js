import React, { useState, useRef, useEffect } from "react";

function VoiceAssistant({ audioBlob, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayed, setAutoPlayed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioBlob && !autoPlayed) {
      setAutoPlayed(true);
      setTimeout(() => {
        playAudio();
      }, 500);
    }
  }, [audioBlob]);

  const playAudio = () => {
    if (audioBlob) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Autoplay blocked:", error);
        setIsPlaying(false);
      });

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
    <div style={{
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      background: "#1e293b",
      borderRadius: "1rem",
      padding: "1.5rem",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      border: "2px solid #059669",
      zIndex: 9999,
      minWidth: "320px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        
        {/* Play/Stop Button — always visible */}
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: isPlaying ? "#dc2626" : "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
            flexShrink: 0
          }}
          onClick={isPlaying ? stopAudio : playAudio}
        >
          {isPlaying ? "⏹️" : "🔊"}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <h4 style={{ color: "#059669", margin: "0 0 0.25rem 0", fontSize: "1rem" }}>
            Voice Assistant
          </h4>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
            {isPlaying ? "🔊 Playing... click ⏹️ to stop" : "Click 🔊 to replay"}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => { stopAudio(); onClose(); }}
          style={{
            background: "rgba(220,38,38,0.2)",
            border: "1px solid #dc2626",
            color: "#dc2626",
            fontSize: "1rem",
            cursor: "pointer",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.5rem"
          }}
        >
          ✕
        </button>
      </div>

      {/* Playing animation */}
      {isPlaying && (
        <div style={{ 
          marginTop: "0.75rem",
          display: "flex",
          gap: "4px",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: "4px",
              height: `${10 + (i * 5)}px`,
              background: "#059669",
              borderRadius: "2px",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;