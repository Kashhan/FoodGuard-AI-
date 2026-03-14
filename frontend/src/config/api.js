// API Configuration - Yeh file exist karni chahiye
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://foodguard-ai-backend.onrender.com";
const API_VERSION = "api/v1";

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/${API_VERSION}/predict`,
  PREDICT_WITH_VOICE: `${API_BASE_URL}/${API_VERSION}/predict-with-voice`,
  HEALTH: `${API_BASE_URL}/`,
};

export default API_BASE_URL;
