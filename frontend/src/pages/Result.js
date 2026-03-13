import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysis, setAnalysis] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get data from session storage
    const storedAnalysis = sessionStorage.getItem("analysisResult");
    const storedImage = sessionStorage.getItem("analysisImage");

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
    }
    
    if (storedImage) {
      setImageUrl(storedImage);
    }
  }, []);

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

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem",
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
      <div style={headerStyle}>
        <span style={statusBadgeStyle}>
          {recommendation.status}
        </span>
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
        <button style={tabStyle("overview")} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button style={tabStyle("details")} onClick={() => setActiveTab("details")}>
          Details
        </button>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === "overview" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Recommendations</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recommendation.tips.map((tip, index) => (
                <li
                  key={index}
                  style={{
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "0.5rem",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
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
                <span style={{ color: "#059669", fontWeight: "600" }}>{recommendation.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
        <button className="btn" onClick={() => navigate("/upload")}>
          Scan Another Item
        </button>
        <button className="btn btn-outline" onClick={() => {
          // Clear session data
          sessionStorage.removeItem("analysisResult");
          sessionStorage.removeItem("analysisImage");
          navigate("/");
        }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Result;