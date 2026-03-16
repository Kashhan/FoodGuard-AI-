import React from "react";

function About() {
  const team = [
    {
      name: "Maryam Fatima",
      role: "Project Lead, Backend Integration & Documentation",
    },
    {
      name: "Shahan Waheed",

      role: "Model Development, AI Integration & Backend",

      role: "Model Development, Backend, audio facility",
      // feedc34 (Add architecture diagrams)
    },
    {
      name: "Kashan Saqib",
      role: "Frontend Development",
    },
    {
      name: "Mahad Nazir",
      role: "System Architecture & Research",
    },
    {
      name: "Ruhmma Chaudhary",
      role: "Documentation & Video Production",
    },
  ];

  const containerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "3rem 2rem",
  };

  const sectionStyle = {
    marginBottom: "4rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1>About FoodGuard AI</h1>
        <p style={{ color: "#94a3b8", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
          Revolutionizing food safety through artificial intelligence
        </p>
      </div>

      {/* Mission */}
      <div style={sectionStyle} className="card">
        <h2 style={{ color: "#059669", marginBottom: "1rem" }}>Our Mission</h2>
        <p style={{ lineHeight: "1.8", color: "#94a3b8" }}>
          FoodGuard AI is dedicated to reducing global food waste and ensuring food safety 
          through cutting-edge artificial intelligence. Our platform helps consumers and 
          businesses make informed decisions about food freshness, ultimately contributing 
          to a more sustainable future.
        </p>
      </div>

      {/* Technology */}
      <div style={sectionStyle} className="card">
        <h2 style={{ color: "#059669", marginBottom: "1rem" }}>Our Technology</h2>
        <p style={{ lineHeight: "1.8", color: "#94a3b8", marginBottom: "1.5rem" }}>
          We utilize state-of-the-art deep learning models trained on millions of food images 
          to accurately assess freshness indicators including color, texture, and visual defects.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {[
            "Computer Vision",
            "Deep Learning",
            "Real-time Analysis",
            "95% Accuracy",
            "Multi-food Support",
            "Cloud-based",
          ].map((tech, index) => (
            <div
              key={index}
              style={{
                padding: "0.75rem",
                background: "rgba(5, 150, 105, 0.1)",
                borderRadius: "0.5rem",
                textAlign: "center",
                color: "#059669",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={sectionStyle}>
        <h2 style={{ color: "#059669", marginBottom: "2rem", textAlign: "center" }}>Our Team</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {team.map((member, index) => (
            <div key={index} className="card">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  margin: "0 auto 1rem",
                }}
              />
              <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{member.name}</h3>
              <p style={{ textAlign: "center", color: "#059669", marginBottom: "1rem" }}>{member.role}</p>
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
