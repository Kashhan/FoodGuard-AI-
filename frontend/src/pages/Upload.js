import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import VoiceAssistant from "../components/VoiceAssistant";

function Upload({ showToast }) {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("english");
  const [voiceResponse, setVoiceResponse] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    setIsCheckingConnection(true);
    const result = await apiService.testConnection();
    setIsBackendConnected(result.success);
    setIsCheckingConnection(false);
    
    if (!result.success) {
      showToast("⚠️ Cannot connect to AI server. Make sure backend is running on port 8080", "error");
    } else {
      console.log("✅ Backend connected successfully");
    }
  };

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
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const validation = apiService.validateImage(file);
    
    if (!validation.valid) {
      showToast(validation.error, "error");
      return;
    }

    setImage(file);
    showToast("Image uploaded successfully", "success");
  };

  const handleAnalyze = async () => {
    if (!image) {
      showToast("Please upload an image first", "error");
      return;
    }

    if (!isBackendConnected) {
      showToast("Cannot connect to AI server. Please check if backend is running.", "error");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const result = await apiService.analyzeFood(image);
      
      clearInterval(interval);
      setProgress(100);

      if (result.success) {
        // Store in session for result page
        sessionStorage.setItem("analysisResult", JSON.stringify(result.data));
        sessionStorage.setItem("analysisImage", URL.createObjectURL(image));
        
        showToast("Analysis complete!", "success");
        
        // If voice is enabled, get voice response
        if (language !== "none") {
          const voiceResult = await apiService.analyzeFoodWithVoice(image, language);
          if (voiceResult.success) {
            setVoiceResponse(voiceResult.audioBlob);
          }
        }
        
        // Navigate to result after short delay
        setTimeout(() => {
          navigate("/result");
        }, 1500);
      } else {
        showToast(result.error, "error");
        setProgress(0);
      }
    } catch (error) {
      clearInterval(interval);
      showToast("Failed to analyze image: " + error.message, "error");
      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
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
    opacity: isBackendConnected ? 1 : 0.7,
  };

  const languageSelectorStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  const languageButtonStyle = (lang) => ({
    padding: "0.75rem 1.5rem",
    background: language === lang ? "#059669" : "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: "2rem",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s",
  });

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Upload Food Image</h1>
        
        {/* Backend Status Indicator */}
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          background: isCheckingConnection ? "rgba(255,255,255,0.1)" : (isBackendConnected ? "rgba(5,150,105,0.1)" : "rgba(220,38,38,0.1)"),
          borderRadius: "2rem",
          marginBottom: "1rem"
        }}>
          <span style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: isCheckingConnection ? "#f59e0b" : (isBackendConnected ? "#059669" : "#dc2626"),
            animation: isCheckingConnection ? "pulse 1s infinite" : "none"
          }} />
          <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
            {isCheckingConnection ? "Connecting to AI server..." : 
             (isBackendConnected ? "AI Server Connected" : "AI Server Disconnected")}
          </span>
          {!isBackendConnected && !isCheckingConnection && (
            <button 
              onClick={checkBackendConnection}
              style={{
                background: "transparent",
                border: "none",
                color: "#059669",
                fontSize: "0.875rem",
                cursor: "pointer",
                marginLeft: "0.5rem"
              }}
            >
              Retry
            </button>
          )}
        </div>

        <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
          Drag & drop or click to select an image for AI analysis
        </p>
      </div>

      {/* Language Selection */}
      <div style={languageSelectorStyle}>
        <button
          style={languageButtonStyle("english")}
          onClick={() => setLanguage("english")}
        >
          🇬🇧 English
        </button>
        <button
          style={languageButtonStyle("urdu")}
          onClick={() => setLanguage("urdu")}
        >
          🇵🇰 Urdu
        </button>
        <button
          style={languageButtonStyle("none")}
          onClick={() => setLanguage("none")}
        >
          🔇 No Voice
        </button>
      </div>

      {/* Upload Zone */}
      <div
        style={uploadZoneStyle}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => isBackendConnected && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          disabled={!isBackendConnected}
        />

        {!image ? (
          <div>
            <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.8 }}>📤</div>
            <h3 style={{ marginBottom: "0.5rem" }}>
              {!isBackendConnected ? "Waiting for AI Server..." : 
               (isDragging ? "Drop your image here" : "Click or drag to upload")}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
              Supports: JPEG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        ) : (
          <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "1rem",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "#dc2626",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "2rem",
                cursor: "pointer",
              }}
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

      {/* Analysis Button */}
      {image && !isLoading && (
        <div style={{ textAlign: "center" }}>
          <button
            className="btn"
            onClick={handleAnalyze}
            disabled={!isBackendConnected}
            style={{ 
              padding: "1rem 3rem",
              opacity: !isBackendConnected ? 0.5 : 1,
              cursor: !isBackendConnected ? "not-allowed" : "pointer"
            }}
          >
            {!isBackendConnected ? "Server Not Connected" : "Analyze with AI"}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {isLoading && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>Analyzing with AI...</span>
            <span style={{ color: "#059669", fontWeight: "600" }}>{progress}%</span>
          </div>
          <div style={{ width: "100%", height: "0.5rem", background: "rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #059669, #10b981)", borderRadius: "1rem", transition: "width 0.3s ease", width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Voice Assistant */}
      {voiceResponse && (
        <VoiceAssistant
          audioBlob={voiceResponse}
          onClose={() => setVoiceResponse(null)}
        />
      )}
    </div>
  );
}

export default Upload;