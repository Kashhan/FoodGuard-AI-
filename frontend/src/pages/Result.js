import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysis, setAnalysis] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnalysis = sessionStorage.getItem("analysisResult");
    const storedImage = sessionStorage.getItem("analysisImage");
    const storedAudio = sessionStorage.getItem("audioUrl");

    if (storedAnalysis) setAnalysis(JSON.parse(storedAnalysis));
    if (storedImage) setImageUrl(storedImage);
    if (storedAudio) {
      setAudioUrl(storedAudio);
      // Auto play after 500ms
      setTimeout(() => playAudio(storedAudio), 500);
    }
  }, []);

  const playAudio = (url) => {
    const audioSource = url || audioUrl;
    if (!audioSource) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(audioSource);
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.log("Autoplay blocked:", e));

    audioRef.current.onended = () => setIsPlaying(false);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!analysis) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>No analysis data found</h2>
        <button className="btn" onClick={() => navigate("/upload")}>
          Upload an Image
        </button>
      </div>
    );
  }

  const { prediction, recommendation } = analysis;

  const containerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "3rem 2rem",
  };

  const statusBadgeStyle = {
    display: "inline-block",
    padding: "0.5rem 1.5rem",
    background: `rgba(${recommendation.color === "green" ? "5, 150, 105" : recommendation.color === "orange" ? "245, 158, 11" : "220, 38, 38"}, 0.1)`,
    color: recommendation.color === "green" ? "#059669" : recommendation.color === "orange" ? "#f59e0b" : "#dc2626",
    borderRadius: "2rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const confidenceCircleStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: `conic-gradient(${recommendation.color === "green" ? "#059669" : recommendation.color === "orange" ? "#f59e0b" : "#dc2626"} 0deg ${(prediction.confidence / 100) * 360}deg, rgba(255,255,255,0.1) ${(prediction.confidence / 100) * 360}deg 360deg)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 2rem",
  };

  const tabStyle = (tab) => ({
    padding: "0.75rem 1.5rem",
    background: "transparent",
    border: "none",
    color: activeTab === tab ? "#059669" : "#94a3b8",
    borderBottom: activeTab === tab ? "2px solid #059669" : "2px solid transparent",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  });

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={statusBadgeStyle}>{recommendation.status}</span>
        <h1>Analysis Complete</h1>
        <p style={{ color: "#94a3b8" }}>File: {analysis.filename}</p>
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src={imageUrl}
            alt="Analyzed food"
            style={{
              maxWidth: "300px",
              maxHeight: "200px",
              borderRadius: "1rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}

      {/* Confidence Score */}
      <div className="card" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div style={confidenceCircleStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: recommendation.color === "green" ? "#059669" : recommendation.color === "orange" ? "#f59e0b" : "#dc2626" }}>
              {prediction.confidence}%
            </div>
            <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Confidence</div>
          </div>
        </div>
        <p style={{ color: "#94a3b8", marginTop: "1rem" }}>{prediction.reason}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button style={tabStyle("overview")} onClick={() => setActiveTab("overview")}>Overview</button>
        <button style={tabStyle("details")} onClick={() => setActiveTab("details")}>Details</button>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === "overview" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Recommendations</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recommendation.tips.map((tip, index) => (
                <li key={index} style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "0.5rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                  <span style={{ color: "#059669", fontSize: "1.25rem" }}>✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "details" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Analysis Details</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem" }}>
                <span>Food Classification:</span>
                <span style={{ color: "#059669", fontWeight: "600" }}>{prediction.class}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem" }}>
                <span>Confidence Score:</span>
                <span style={{ color: "#059669", fontWeight: "600" }}>{prediction.confidence}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem" }}>
                <span>Safety Status:</span>
                <span style={{ color: recommendation.color === "green" ? "#059669" : recommendation.color === "orange" ? "#f59e0b" : "#dc2626", fontWeight: "600" }}>{recommendation.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
        <button className="btn" onClick={() => {
          stopAudio();
          navigate("/upload");
        }}>
          Scan Another Item
        </button>
        <button className="btn btn-outline" onClick={() => {
          stopAudio();
          sessionStorage.removeItem("analysisResult");
          sessionStorage.removeItem("analysisImage");
          sessionStorage.removeItem("audioUrl");
          navigate("/");
        }}>
          Back to Home
        </button>
      </div>

      {/* Voice Widget — Always visible on result page */}
      {audioUrl && (
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
          minWidth: "280px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            
            {/* Play/Stop Button */}
            <div
              onClick={isPlaying ? stopAudio : () => playAudio()}
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
            >
              {isPlaying ? "⏹️" : "🔊"}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <h4 style={{ color: "#059669", margin: "0 0 0.25rem 0", fontSize: "1rem" }}>
                Voice Result
              </h4>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
                {isPlaying ? "Playing... click to stop" : "Click to replay"}
              </p>
            </div>
          </div>

          {/* Playing animation */}
          {isPlaying && (
            <div style={{
              marginTop: "0.75rem",
              display: "flex",
              gap: "4px",
              alignItems: "flex-end",
              justifyContent: "center",
              height: "30px"
            }}>
              {[8, 16, 24, 16, 8, 20, 12].map((h, i) => (
                <div key={i} style={{
                  width: "5px",
                  height: `${h}px`,
                  background: "#059669",
                  borderRadius: "3px",
                }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Result;