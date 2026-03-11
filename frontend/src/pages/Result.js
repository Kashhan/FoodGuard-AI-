import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Mock analysis data
  const analysis = {
    status: "Fresh",
    confidence: 94.5,
    timestamp: new Date().toLocaleString(),
    foodType: "Apple",
    recommendations: [
      "Store in refrigerator at 4°C for optimal freshness",
      "Consume within 3-5 days",
      "Keep away from direct sunlight",
    ],
    indicators: [
      { name: "Color", score: 96, description: "Optimal color saturation" },
      { name: "Texture", score: 92, description: "Firm and consistent" },
      { name: "Surface", score: 95, description: "No visible defects" },
      { name: "Freshness", score: 94, description: "Peak freshness" },
    ],
    nutritionalInfo: {
      calories: "95 kcal",
      sugar: "19g",
      fiber: "4g",
      vitaminC: "14%",
    },
  };

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
    background: "rgba(5, 150, 105, 0.1)",
    color: "#059669",
    borderRadius: "2rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const confidenceCircleStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: `conic-gradient(#059669 0deg ${(analysis.confidence / 100) * 360}deg, rgba(255,255,255,0.1) ${(analysis.confidence / 100) * 360}deg 360deg)`,
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
    transition: "all 0.3s",
  });

  const indicatorBarStyle = (score) => ({
    height: "8px",
    width: `${score}%`,
    background: "linear-gradient(90deg, #059669, #10b981)",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={statusBadgeStyle}>
          {analysis.status} • {analysis.foodType}
        </span>
        <h1>Analysis Complete</h1>
        <p style={{ color: "#94a3b8" }}>{analysis.timestamp}</p>
      </div>

      {/* Confidence Score */}
      <div className="card" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div style={confidenceCircleStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#059669" }}>
              {analysis.confidence}%
            </div>
            <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Confidence</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button style={tabStyle("overview")} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button style={tabStyle("indicators")} onClick={() => setActiveTab("indicators")}>
          Quality Indicators
        </button>
        <button style={tabStyle("nutrition")} onClick={() => setActiveTab("nutrition")}>
          Nutritional Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === "overview" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Recommendations</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {analysis.recommendations.map((rec, index) => (
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
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "indicators" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Quality Indicators</h3>
            {analysis.indicators.map((indicator, index) => (
              <div key={index} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>{indicator.name}</span>
                  <span style={{ color: "#059669", fontWeight: "600" }}>{indicator.score}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "8px", marginBottom: "0.5rem" }}>
                  <div style={indicatorBarStyle(indicator.score)} />
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{indicator.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "nutrition" && (
          <div>
            <h3 style={{ color: "#059669", marginBottom: "1.5rem" }}>Nutritional Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {Object.entries(analysis.nutritionalInfo).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.875rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#059669" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
        <button className="btn" onClick={() => navigate("/upload")}>
          Scan Another Item
        </button>
        <button className="btn btn-outline" onClick={() => window.print()}>
          Download Report
        </button>
      </div>
    </div>
  );
}

export default Result;