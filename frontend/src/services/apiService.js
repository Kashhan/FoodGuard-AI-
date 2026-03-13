// Direct API URLs - Config ki zaroorat nahi
const API_BASE_URL = "http://localhost:8000";  // Hardcoded for testing
const API_VERSION = "api/v1";

const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/${API_VERSION}/predict`,
  PREDICT_WITH_VOICE: `${API_BASE_URL}/${API_VERSION}/predict-with-voice`,
  HEALTH: `${API_BASE_URL}/`,
  TEST: `${API_BASE_URL}/test`
};

class ApiService {
  // Test connection
  async testConnection() {
    try {
      const response = await fetch(API_ENDPOINTS.TEST, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Backend connected:", data);
      return { success: true, data };
    } catch (error) {
      console.error("❌ Connection failed:", error);
      return { 
        success: false, 
        error: "Cannot connect to backend. Make sure backend is running on port 8080" 
      };
    }
  }

  // Check API health
  async checkHealth() {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Health check failed:", error);
      return { success: false, error: error.message };
    }
  }

  // Analyze food image
  async analyzeFood(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      console.log("📤 Sending image to backend...");
      
      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: "POST",
        mode: 'cors',
        body: formData,
        // Important: Don't set Content-Type header, browser will set it with boundary
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Analysis successful:", data);
      return { success: true, data };
    } catch (error) {
      console.error("❌ Analysis failed:", error);
      return {
        success: false,
        error: error.message || "Failed to connect to server. Make sure backend is running.",
      };
    }
  }

 // Analyze food with voice response
async analyzeFoodWithVoice(imageFile, language = "english") {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      console.log("📤 Sending image for voice analysis...", language);
      
      const response = await fetch(
        `${API_ENDPOINTS.PREDICT_WITH_VOICE}?language=${language}`,
        {
          method: "POST",
          mode: 'cors',
          body: formData,
        }
      );

      console.log("📥 Voice response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      // Get audio blob
      const audioBlob = await response.blob();
      
      // Get headers
      const predictionClass = response.headers.get("X-Prediction-Class");
      const confidence = response.headers.get("X-Confidence");
      const status = response.headers.get("X-Status");

      return {
        success: true,
        audioBlob,
        prediction: {
          class: predictionClass,
          confidence: parseFloat(confidence),
          status: status,
        },
      };
    } catch (error) {
      console.error("❌ Voice analysis failed:", error);
      return {
        success: false,
        error: error.message || "Failed to connect to server",
      };
    }
  }

  // Validate image before upload
  validateImage(file) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Please upload a valid image (JPEG, PNG, WEBP)",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File size should be less than 5MB",
      };
    }

    return { valid: true };
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;