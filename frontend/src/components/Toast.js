import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type === "error" ? "error" : ""}`}>
      <div className="toast-content">
        <span style={{ fontSize: "1.25rem" }}>
          {type === "success" ? "✓" : "✕"}
        </span>
        <span style={{ flex: 1 }}>{message}</span>
        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;