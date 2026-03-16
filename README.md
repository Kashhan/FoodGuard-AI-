# FoodGuard-AI
## AI Food Freshness and Safety Detection System
# 1. PROJECT OVERVIEW

FoodGuard-AI is an AI-powered food freshness and safety detection system that analyzes food images using computer vision and machine learning to identify indicators of spoilage such as color degradation, mold formation, and texture deterioration. The system classifies food into freshness categories (fresh, moderately risky, or spoiled) and provides instant, data-driven insights to help users make safer consumption decisions while minimizing unnecessary food waste. Developed for the international Google Gemini Live Agent Challenge, the project demonstrates the practical application of AI and cloud technologies in solving real-world problems by enabling users to perform quick food safety assessments through simple image analysis. Detailed project documentation and system architecture can be accessed here:





## System Workflow

1. **Image Input**
   - User uploads or captures an image of food.

2. **Image Processing**
   - The image is preprocessed using computer vision techniques.

3. **AI Model Analysis**
   - The machine learning model analyzes the image for spoilage indicators.

4. **Freshness Classification**
   - The food is categorized as:
     - Fresh
     - Moderate Risk
     - Spoiled

5. **Safety Recommendation**
   - The system advises whether the food should be consumed or discarded.

---

# 2. KEY FEATURES

| Feature | Description |
|-------|-------------|
| **Image-Based Detection** | Upload or capture food images and AI analyzes visual spoilage indicators instantly |
| **Multi-Level Classification** | Categorizes food into three freshness levels with confidence scores |
| **Visual Spoilage Analysis** | Detects mold, discoloration, and texture deterioration |
| **Actionable Recommendations** | Clear guidance whether food is safe to eat or should be discarded |
| **Fast Processing** | Optimized image pipeline delivers quick results |
| **AI Integration** | Uses Google Gemini AI for enhanced analysis |
| **Modular Design** | Clean architecture separating frontend, backend, and AI logic |

---

# 3. SYSTEM ARCHITECTURE



![image alt](https://github.com/maryam-ca/FoodGuard-AI-/blob/3a33844904c3cd11184b8d0333f252a4aa430471/Readme%20IMG.png)


---

# 4. TECHNOLOGY STACK

| Layer | Technology |
|------|-----------|
| **Frontend** | React.js, HTML5, CSS3, JavaScript |
| **Backend** | Python, FastAPI, Uvicorn |
| **AI Integration** | Google Gemini APIs |
| **Image Processing** | Pillow (Image Processing), NumPy |
| **Cloud Deployment** | Docker, Google Cloud Build, Artifact Registry, Google Cloud Run |
| **Development Tools** | Git, GitHub, VS Code |


---

# 5. PROJECT STRUCTURE

```
FoodGuard-AI/
│
├── backend/
│   ├── routes/
│   │   └── predict.py
│   ├── services/
│   │   ├── gemini_service.py
│   │   ├── image_processor.py
│   │   └── tts_service.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── config/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── models/
│   └── food_freshness_model.h5
│
├── notebooks/
│   ├── data_exploration.ipynb
│   └── model_training.ipynb
│
├── README.md
└── .gitignore
```

---

# 6. LOCAL SETUP INSTRUCTIONS

## Clone Repository

```bash
git clone https://github.com/your-username/FoodGuard-AI.git
cd FoodGuard-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### Set Google Gemini API Key

Windows:

```bash
set GEMINI_API_KEY=your_api_key_here
```

Mac/Linux:

```bash
export GEMINI_API_KEY=your_api_key_here
```

Start Backend Server:

```bash
uvicorn main:app --reload --port 8000
```

Backend will run on:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 7. USAGE GUIDE

1. Launch both **backend** and **frontend servers**
2. Open the application in your browser
3. Upload or capture a food image
4. Click **Analyze**
5. View AI-generated freshness analysis

### Example Output

```
Detection Result
----------------
Food Item: Apple
Status: FRESH
Confidence: 94.3%
Recommendation: Safe to consume

Visual Indicators:
- No mold detected
- Natural color preserved
- Firm texture expected
```

---

## Classification Categories

| Category | Status | Action |
|--------|--------|-------|
| 🟢 Fresh | Optimal condition | Safe to eat |
| 🟡 Moderate Risk | Early spoilage signs | Consume soon |
| 🔴 Spoiled | Unsafe condition | Discard immediately |

---



# 8. API REFERENCE

## POST /predict


Request:

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Image file

Example Response:

```json
{
  "status": "success",
  "prediction": {
    "class": "fresh",
    "confidence": 0.94,
    "recommendation": "Safe to consume",
    "indicators": ["No mold detected", "Natural color preserved"]
  }
}
```

---

## GET /health

Health check endpoint.

```json
{
  "status": "healthy",
  "model_loaded": true
}
```

---

# 9. GOOGLE CLOUD DEPLOYMENT

Deploy backend using Google Cloud Run:

```bash
cd backend

docker build -t foodguard-backend .

gcloud run deploy foodguard-backend \
  --image foodguard-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

# 10. TESTING

Backend Tests:

```bash
pytest tests/
```

Frontend Tests:

```bash
npm test
```

---

# 11. TROUBLESHOOTING

| Issue | Solution |
|------|---------|
| Model not loading | Verify model file exists in `/models` directory |
| Image upload error | Check image format and size |
| Backend connection error | Verify API URL configuration |
| Slow predictions | Ensure sufficient backend resources |
| Gemini API errors | Verify API key environment variable |

---

# 12. CONTRIBUTORS — TEAM ANOMOLIES


| Name | GitHub | Role | Contribution |
|------|--------|------|--------------|
| **Maryam Fatima ⭐ (Team Lead)** | https://github.com/maryam-ca | Backend Developer | Backend Integration, Documentation |
| Shahan Waheed | https://github.com/Shahan-Waheed728 | AI Engineer | Model Development, AI Integration, Backend |
| Kashan Saqib | https://github.com/Kashan | Frontend Developer | Frontend Development, App Deployment |
| Mahad Nazir | https://github.com/MahadNazir | System Architect | Architecture Design, Research |
| Ruhmma Chaudhary | https://github.com/ruhmmachaudhary-rgb | Documentation & Media | Documentation, Video Editing |
---

# 13. FUTURE ENHANCEMENTS

| Enhancement | Description |
|-----------|-------------|
| Mobile Application | iOS & Android support |
| Real-Time Video Detection | Continuous camera monitoring |
| Larger Dataset | Improve model accuracy |
| Smart Kitchen Integration | IoT appliance integration |
| Multi-Language Support | Global accessibility |

---

# 14.  PROJECT RESOURCES

### 🎥 Demo Video

Watch the full working demonstration of **FoodGuard-AI**:

[![FoodGuard-AI Demo](https://img.youtube.com/vi/2Opr_q1ve28/maxresdefault.jpg)](https://www.youtube.com/watch?v=2Opr_q1ve28)

---

###  Project Blog (Medium)

Read the detailed article explaining the development process, architecture, and insights behind the project:

🔗 https://medium.com/@ruhmmachaudhary/foodguard-ai-ca44d9c0712f

---

###  Project Documentation

Complete project documentation and system architecture:

🔗 https://food-guard-doc.vercel.app/

# 15. DISCLAIMER

FoodGuard-AI is designed for **demonstration and informational purposes only**.

The system provides AI-generated analysis based on visual indicators and should **not replace professional judgment or food safety guidelines**.

If there is any doubt about food safety, always **discard the food**.

---

# 16. ACKNOWLEDGMENT

We thank the **Google Gemini Live Agent Challenge** for providing a platform to build meaningful AI solutions.

FoodGuard-AI demonstrates how **AI + Gemini APIS + Cloud technologies** can be used to solve real-world problems such as food safety and waste reduction.

---

**Made with ❤️ for safer food and a healthier planet by Team Anomalies**
