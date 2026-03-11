import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Upload({ showToast }) {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetImage(files[0]);
    }
  };

  const validateAndSetImage = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      showToast("Please upload a valid image (JPEG, PNG, WEBP)", "error");
      return;
    }

    if (file.size > maxSize) {
      showToast("File size should be less than 10MB", "error");
      return;
    }

    setImage(file);
    showToast("Image uploaded successfully", "success");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      showToast("Please upload an image first", "error");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/result");
      }, 500);
    }, 2000);
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "3rem 2rem",
  };

  const uploadZoneStyle = {
    border: `2px dashed ${isDragging ? "#059669" : "rgba(255,255,255,0.2)"}`,
    borderRadius: "2rem",
    padding: "3rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    background: isDragging ? "rgba(5, 150, 105, 0.1)" : "rgba(30, 41, 59, 0.5)",
    marginBottom: "2rem",
  };

  const previewStyle = {
    position: "relative",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "1rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  };

  const removeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(220, 38, 38, 0.9)",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.3s",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Upload Food Image</h1>
        <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
          Drag & drop or click to select an image for analysis
        </p>
      </div>

      {/* Upload Zone */}
      <div
        style={uploadZoneStyle}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        {!image ? (
          <div>
            <div className="upload-icon">📤</div>
            <h3 style={{ marginBottom: "0.5rem" }}>
              {isDragging ? "Drop your image here" : "Click or drag to upload"}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
              Supports: JPEG, PNG, WEBP (Max 10MB)
            </p>
          </div>
        ) : (
          <div style={previewStyle}>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={imageStyle}
            />
            <button
              style={removeButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Analysis Progress */}
      {image && !isLoading && (
        <div style={{ textAlign: "center" }}>
          <button className="btn" onClick={handleAnalyze} style={{ padding: "1rem 3rem" }}>
            Analyze Freshness
          </button>
        </div>
      )}

      {isLoading && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>Analyzing image...</span>
            <span style={{ color: "#059669", fontWeight: "600" }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;