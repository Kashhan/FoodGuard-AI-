# FoodGuard-AI
## AI Food Freshness and Safety Detection System

A working demonstration of an **AI-powered food freshness detection system** that analyzes food images using computer vision and machine learning techniques. The system evaluates visual indicators such as **color changes, mold growth, and texture deterioration** to determine whether food is fresh, moderately risky, or spoiled.

FoodGuard-AI helps users make safer food consumption decisions while also reducing unnecessary **food waste** by providing quick AI-based freshness detection.

🌐 **Live Project Documentation:**  
https://food-guard-doc.vercel.app/

Developed for the **Google Gemini Live Agent Challenge** using Google Gemini AI and Google Cloud technologies.

---

# 1. PROJECT
## INTELLIGENT VISION AI

FoodGuard-AI is a specialized AI system that analyzes food images to detect freshness and spoilage indicators. Using advanced computer vision and machine learning, the system evaluates visual cues like color degradation, mold formation, and textural changes to provide real-time food safety assessments.

Developed as a practical AI solution to reduce food waste and prevent foodborne illnesses by empowering users with instant, data-driven insights about their food.

Built for the **GeminiAgentChallenge** — a platform that gives developers the opportunity to build impactful AI systems that solve real-world problems.

---

# 2. PROJECT OVERVIEW

FoodGuard-AI transforms how people assess food safety. Instead of relying only on expiration dates or subjective judgment, users can simply take a photo and receive an instant AI-powered analysis.

The system classifies food into freshness categories and provides clear, actionable recommendations.

This project demonstrates the practical application of **computer vision in everyday life**, helping households and individuals make safer and more informed decisions while contributing to global efforts to reduce food waste.

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

# 3. KEY FEATURES

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

# 4. SYSTEM ARCHITECTURE

## User Interface Layer
**Frontend (Web / Mobile Interface)**

Responsibilities:

- Image Upload or Camera Capture
- User Interface Interaction
- Display Detection Results
- Send Image Request to Backend API

![FoodGuard-AI System Architecture](diagram1.png)

![FoodGuard-AI System Architecture1](diagram2.png)

---

## Backend Layer

Handles application logic and communication with AI services.

Components:

- API Endpoints
- Image Handler
- Preprocessing Logic
- Request Processing
- AI Model Invocation

---

## AI Processing Layer

Core intelligence of the system.

Responsibilities:

- Computer Vision Analysis
- Pattern Recognition
- Freshness Classification
- Spoilage Detection

---

## Response Layer

Generates the final output returned to the user.

Output includes:

- Freshness Category
- Confidence Score
- Safety Recommendation
- Visual Indicators

---

# 5. TECHNOLOGY STACK

| Layer | Technology |
|------|-----------|
| **Frontend** | React.js, HTML5, CSS3, JavaScript |
| **Backend** | Python, FastAPI, Uvicorn |
| **AI Integration** | Google Gemini APIs |
| **Image Processing** | Pillow (Image Processing), NumPy |
| **Cloud Deployment** | Docker, Google Cloud Build, Artifact Registry, Google Cloud Run |
| **Development Tools** | Git, GitHub, VS Code |


---

# 6. PROJECT STRUCTURE

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

# 7. LOCAL SETUP INSTRUCTIONS

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

# 8. USAGE GUIDE

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

# 9. AI MODEL DETAILS

## Training Data

The model was trained on diverse datasets including:

- Fruits
- Vegetables
- Dairy products
- Cooked foods

Each dataset contains multiple freshness stages.


---

# 10. API REFERENCE

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

# 11. GOOGLE CLOUD DEPLOYMENT

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

# 12. TESTING

Backend Tests:

```bash
pytest tests/
```

Frontend Tests:

```bash
npm test
```

---

# 13. TROUBLESHOOTING

| Issue | Solution |
|------|---------|
| Model not loading | Verify model file exists in `/models` directory |
| Image upload error | Check image format and size |
| Backend connection error | Verify API URL configuration |
| Slow predictions | Ensure sufficient backend resources |
| Gemini API errors | Verify API key environment variable |

---

# 14. CONTRIBUTORS — TEAM ANOMOLIES

| Name | GitHub | Role |
|----|----|----|
| **Maryam Fatima** | https://github.com/maryam-ca | Backend Integration, Documentation |
| **Shahan Waheed** | https://github.com/Shahan-Waheed728 |Model Development, AI Integration,Backend |
| **Kashan Saqib** | https://github.com/Kashan | Frontend Development |
| **Mahad Nazir** | https://github.com/MahadNazir | Architecture Design, Research |
| **Ruhmma Chaudhary** | [https://github.com/ruhmmachaudhary-rgb](https://github.com/ruhmmachaudhary-rgb) | Documentation, video editing |

---

# 15. FUTURE ENHANCEMENTS

| Enhancement | Description |
|-----------|-------------|
| Mobile Application | iOS & Android support |
| Real-Time Video Detection | Continuous camera monitoring |
| Larger Dataset | Improve model accuracy |
| Smart Kitchen Integration | IoT appliance integration |
| Multi-Language Support | Global accessibility |

---

# 16. DISCLAIMER

FoodGuard-AI is designed for **demonstration and informational purposes only**.

The system provides AI-generated analysis based on visual indicators and should **not replace professional judgment or food safety guidelines**.

If there is any doubt about food safety, always **discard the food**.

---

# 17. ACKNOWLEDGMENT

We thank the **Google Gemini Live Agent Challenge** for providing a platform to build meaningful AI solutions.

FoodGuard-AI demonstrates how **AI + Computer Vision + Cloud technologies** can be used to solve real-world problems such as food safety and waste reduction.

---

**Made with ❤️ for safer food and a healthier planet by Team Anomalies**
