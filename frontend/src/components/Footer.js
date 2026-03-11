import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerStyle = {
    background: "rgba(2, 6, 23, 0.9)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "3rem 2rem 1.5rem",
    marginTop: "4rem",
  };

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  };

  const linkStyle = {
    color: "#94a3b8",
    textDecoration: "none",
    transition: "color 0.3s",
    display: "block",
    marginBottom: "0.5rem",
  };

  const copyrightStyle = {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "0.875rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "1.5rem",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div>
            <h3 style={{ color: "white", marginBottom: "1rem" }}>FoodGuard AI</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
              Advanced AI-powered food freshness detection system helping reduce food waste and ensure food safety.
            </p>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>Quick Links</h4>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/upload" style={linkStyle}>Scan Food</Link>
            <Link to="/about" style={linkStyle}>About Us</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>Legal</h4>
            <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
            <Link to="/terms" style={linkStyle}>Terms of Service</Link>
            <Link to="/faq" style={linkStyle}>FAQ</Link>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>Contact</h4>
            <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>support@foodguard.ai</p>
            <p style={{ color: "#94a3b8" }}>+1 (555) 123-4567</p>
          </div>
        </div>

        <div style={copyrightStyle}>
          © 2024 FoodGuard AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;