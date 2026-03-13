import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ apiStatus }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/upload", label: "Scan Food" },
    { path: "/result", label: "Results" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const navbarStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: isScrolled ? "rgba(2, 6, 23, 0.95)" : "rgba(2, 6, 23, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: isScrolled ? "1px solid rgba(5, 150, 105, 0.2)" : "none",
    transition: "all 0.3s",
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.5rem", fontWeight: "700", color: "white", textDecoration: "none" }}>
          FoodGuard
          <span style={{ width: "8px", height: "8px", background: "#059669", borderRadius: "50%", marginLeft: "4px" }} />
          <span style={{ fontSize: "0.875rem", color: "#94a3b8", marginLeft: "0.5rem" }}>AI</span>
        </Link>

        {/* API Status Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.1)", padding: "0.25rem 0.75rem", borderRadius: "2rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: apiStatus === "connected" ? "#059669" : apiStatus === "checking" ? "#f59e0b" : "#dc2626" }} />
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              {apiStatus === "connected" ? "AI Online" : apiStatus === "checking" ? "Connecting..." : "AI Offline"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{ display: "flex", gap: "2rem" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? "#059669" : "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{ display: "none", background: "transparent", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer" }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div style={{ display: "flex", flexDirection: "column", padding: "1rem 2rem", background: "#020617", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ padding: "0.75rem 0", color: location.pathname === link.path ? "#059669" : "white", textDecoration: "none" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;