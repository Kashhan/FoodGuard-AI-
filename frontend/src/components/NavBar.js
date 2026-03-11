import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
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

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "white",
    textDecoration: "none",
  };

  const logoDotStyle = {
    width: "8px",
    height: "8px",
    background: "#059669",
    borderRadius: "50%",
    marginLeft: "4px",
  };

  const navStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  };

  const linkStyle = (isActive) => ({
    color: isActive ? "#059669" : "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s",
    position: "relative",
  });

  const mobileMenuStyle = {
    display: "none",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const mobileNavStyle = {
    display: isMobileMenuOpen ? "flex" : "none",
    flexDirection: "column",
    padding: "1rem 2rem",
    background: "#020617",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          FoodGuard
          <span style={logoDotStyle} />
          <span style={{ fontSize: "0.875rem", color: "#94a3b8", marginLeft: "0.5rem" }}>
            AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ ...navStyle, display: "flex" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={linkStyle(location.pathname === link.path)}
              onMouseEnter={(e) => {
                if (location.pathname !== link.path) {
                  e.target.style.color = "#059669";
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.path) {
                  e.target.style.color = "white";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          style={mobileMenuStyle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      <div style={mobileNavStyle} className="mobile-nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...linkStyle(location.pathname === link.path),
              padding: "0.75rem 0",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;