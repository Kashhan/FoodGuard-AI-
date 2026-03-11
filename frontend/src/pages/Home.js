import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      title: "Real-time Analysis",
      description: "Get instant freshness assessment with our advanced AI algorithms",
      icon: "⚡",
    },
    {
      title: "95% Accuracy",
      description: "Highly accurate detection powered by deep learning models",
      icon: "🎯",
    },
    {
      title: "Multi-food Support",
      description: "Analyze various food items from fruits to packaged goods",
      icon: "🍎",
    },
    {
      title: "Smart Recommendations",
      description: "Receive storage tips and consumption guidelines",
      icon: "💡",
    },
  ];

  const stats = [
    { value: "10K+", label: "Food Items Analyzed" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "24/7", label: "Availability" },
    { value: "5min", label: "Average Response" },
  ];

  const containerStyle = {
    padding: "4rem 2rem",
  };

  const heroStyle = {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 4rem",
  };

  const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "4rem",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginBottom: "4rem",
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle} className="fade-in-up">
        <h1>Food Freshness Detection Powered by AI</h1>
        <p style={{ fontSize: "1.25rem", color: "#94a3b8", marginBottom: "2rem" }}>
          Reduce food waste and ensure safety with our advanced computer vision technology
        </p>
        <Link to="/upload">
          <button className="btn" style={{ padding: "1rem 3rem", fontSize: "1.125rem" }}>
            Start Scanning Now
          </button>
        </Link>
      </div>

      {/* Features Grid */}
      <div style={featuresGridStyle}>
        {features.map((feature, index) => (
          <div key={index} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
            <h3 style={{ color: "#059669", marginBottom: "0.75rem" }}>{feature.title}</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div style={statsGridStyle}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2 className="text-gradient">How It Works</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "2rem",
          marginTop: "3rem"
        }}>
          {[
            { step: "01", title: "Upload Image", desc: "Take a photo of your food item" },
            { step: "02", title: "AI Analysis", desc: "Our model analyzes freshness indicators" },
            { step: "03", title: "Get Results", desc: "Receive detailed freshness report" },
            { step: "04", title: "Take Action", desc: "Follow smart recommendations" },
          ].map((item, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: "3rem", 
                fontWeight: "800", 
                color: "#059669",
                opacity: 0.3,
                marginBottom: "1rem"
              }}>
                {item.step}
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ color: "#94a3b8" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;