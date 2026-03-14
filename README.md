# FoodGuard-AI
## AI Food Freshness and Safety Detection System

A working demonstration of an **AI-powered food freshness detection system** that analyzes food images using computer vision and machine learning techniques. The system evaluates visual indicators such as **color changes, mold growth, and texture deterioration** to determine whether food is fresh, moderately risky, or spoiled.

FoodGuard-AI helps users make safer food consumption decisions while also reducing unnecessary **food waste** by providing quick AI-based freshness detection.

---

# Overview

FoodGuard-AI provides an intelligent solution for **food freshness detection using artificial intelligence and computer vision**.

The system analyzes food images captured by users and detects visual patterns related to spoilage and freshness. Based on this analysis, the AI model classifies food into different freshness categories and provides safety recommendations.

### System Workflow

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

# Features

## Image-Based Food Freshness Detection
The system uses image analysis to determine food freshness using machine learning.

## Spoilage Detection
The AI model detects visual indicators such as:

- Mold growth
- Color discoloration
- Surface texture changes

## Food Safety Classification

FoodGuard-AI classifies food into three categories:

- **Fresh** – Safe to consume
- **Moderate Risk** – Consume with caution
- **Spoiled** – Unsafe to eat

## Fast Image Analysis
Users can upload images and quickly receive AI-based freshness predictions.

## AI Recommendations
The system provides suggestions about whether the food should be eaten or discarded.

---

# Architecture

The system follows a **computer vision + machine learning pipeline**:

User Image → Image Processing → AI Model → Freshness Classification → Safety Recommendation

### Image Processing
Food images are preprocessed using:

- Image resizing
- Normalization
- Noise reduction

### Machine Learning Analysis
The trained model analyzes patterns related to spoilage and freshness.

### Classification Output
The model predicts the freshness category and provides a recommendation.

---

# Project Structure

```
FoodGuard-AI/
│
├── Backend/                    # Python backend
│   ├── routes/
│   │   └── predict.py          # Image prediction API
│   ├── services/
│   │   ├── gemini_service.py   # AI analysis
│   │   └── tts_service.py      # Text-to-speech
│   ├── main.py                 # Backend entry point
│   └── requirements.txt        # Python dependencies
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Home, Upload, Result pages
│   │   ├── services/           # API calls
│   │   ├── config/             # API configuration
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

---

# Prerequisites

Before running FoodGuard-AI install:

- Python 3.8+
- pip
- OpenCV
- TensorFlow or PyTorch
- NumPy
- Matplotlib (optional)

Download Python:

https://www.python.org/downloads/

---

# Installation

## 1 Clone Repository

```bash
git clone https://github.com/your-username/FoodGuard-AI.git
cd FoodGuard-AI
```

## 2 Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Mac / Linux

```bash
source venv/bin/activate
```

## 3 Install Dependencies

```bash
pip install -r requirements.txt
```

If requirements file is missing:

```bash
pip install opencv-python tensorflow numpy matplotlib
```

---

# Running the Application

Run the program using:

```bash
python src/main.py
```

If using Jupyter Notebook:

```bash
jupyter notebook
```

---

# Usage

1. Run the application.
2. Upload or capture a food image.
3. The system processes the image.
4. The AI model analyzes the image.
5. Freshness classification is displayed.

### Example Output

```
Food Status: Fresh
Confidence Score: 92%
Recommendation: Safe to consume
```

### Possible Results

- **Fresh** → Safe to eat
- **Moderate Risk** → Eat with caution
- **Spoiled** → Do not eat

---

# Code Overview

## Image Processing Module

`image_processing.py`

Responsible for:

- Image resizing
- Normalization
- Noise reduction

### Example Code

```python
import cv2

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, (224,224))
    image = image / 255.0
    return image
```

---

## Model Prediction Module

`model_predict.py`

Loads the trained AI model and predicts food freshness.

### Example Code

```python
from tensorflow.keras.models import load_model

model = load_model("model/food_freshness_model.h5")

def predict_food(image):
    prediction = model.predict(image)
    return prediction
```

---

## Main Application

`main.py`

Workflow:

1 Load image  
2 Preprocess image  
3 Run model prediction  
4 Display result

### Example Code

```python
from image_processing import preprocess_image
from model_predict import predict_food

image = preprocess_image("sample_food.jpg")
result = predict_food(image)

print("Food Freshness Prediction:", result)
```

---

# AI Model Explanation

The AI model analyzes visual food features including:

- Color distribution
- Surface texture
- Mold patterns
- Structural irregularities

The model then predicts one of the following categories:

- Fresh
- Moderate Risk
- Spoiled

---

# Troubleshooting

## Model Not Loading

Ensure:

- Model exists in `model/` directory
- Correct model path is used

## Image Not Detected

Check:

- Image path
- Image format (JPG, PNG)

## Missing Dependencies

Install dependencies again:

```bash
pip install -r requirements.txt
```

---

# Future Improvements

Possible enhancements:

- Mobile application support
- Real-time camera freshness detection
- Larger training dataset
- Smart kitchen integration
- Cloud AI deployment

---

# License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute it for educational and research purposes.
