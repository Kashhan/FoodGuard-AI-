import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Upload, Result, About, Contact } from "./pages";
import { Navbar, Footer, Toast } from "./components";
import apiService from "./services/apiService";

function App() {
  const [toast, setToast] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    // Check API health on startup
    const checkApiHealth = async () => {
      const health = await apiService.checkHealth();
      if (health) {
        setApiStatus("connected");
        console.log("✅ Connected to backend:", health);
      } else {
        setApiStatus("disconnected");
        showToast("Cannot connect to AI server. Please check if backend is running.", "error");
      }
    };

    checkApiHealth();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar apiStatus={apiStatus} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload showToast={showToast} />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact showToast={showToast} />} />
          </Routes>
        </main>
        <Footer />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;