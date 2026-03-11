import React from "react";

function Loader({ size = "md", text = "" }) {
  const sizes = {
    sm: "loader-sm",
    md: "loader",
    lg: "loader",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div className={`${sizes[size]} ${size === "lg" ? "loader" : ""}`} />
      {text && <p style={{ color: "#94a3b8" }}>{text}</p>}
    </div>
  );
}

export default Loader;