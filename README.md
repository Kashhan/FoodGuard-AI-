# FoodGuard-AI
## AI Food Freshness and Safety Detection System

A working demonstration of an **AI-powered food freshness detection system** that analyzes food images using computer vision and machine learning techniques. The system evaluates visual indicators such as **color changes, mold growth, and texture deterioration** to determine whether food is fresh, moderately risky, or spoiled.

FoodGuard-AI helps users make safer food consumption decisions while also reducing unnecessary **food waste** by providing quick AI-based freshness detection.

---

# Overview

FoodGuard-AI is designed to provide an intelligent solution for **food freshness detection using artificial intelligence and computer vision**.

The system analyzes food images captured by users and detects visual patterns related to spoilage and freshness. Based on this analysis, the AI model classifies food into different freshness categories and provides safety recommendations.

The system performs the following main operations:

1. **Image Input**  
   The user captures or uploads an image of food.

2. **Image Processing**  
   The system preprocesses the image using computer vision techniques.

3. **AI Model Analysis**  
   The machine learning model analyzes the image to identify spoilage indicators.

4. **Freshness Classification**  
   Food is categorized into one of the following classes:
   - Fresh
   - Moderate Risk
   - Spoiled

5. **Safety Recommendation**  
   The system provides guidance on whether the food is safe to consume.

---

# Features

## Image-Based Food Freshness Detection
The system uses image analysis to determine food freshness levels using machine learning algorithms.

## Spoilage Detection using AI
The AI model detects visual indicators of spoilage such as:

- Mold growth
- Color discoloration
- Surface texture changes

## Food Safety Classification
FoodGuard-AI classifies food into three categories:

- **Fresh** – Safe to consume  
- **Moderate Risk** – Consume with caution  
- **Spoiled** – Unsafe to eat  

## Fast Image Analysis
Users can quickly upload or capture images and receive AI-based freshness results.

## AI-Based Recommendations
The system provides safety guidance to help users decide whether food should be consumed or discarded.

---

# Architecture

The FoodGuard-AI system follows a **computer vision and machine learning pipeline architecture**.


User Image → Image Processing → AI Model → Freshness Classification → Safety Recommendation


### Image Processing
Food images are preprocessed using computer vision techniques such as resizing, normalization, and noise reduction.

### Machine Learning Analysis
A trained machine learning model analyzes the processed image to detect patterns related to spoilage and freshness.

### Classification Output
Based on the analysis, the system predicts the freshness level and provides recommendations to

# Prerequisites

Before running FoodGuard-AI, make sure the following requirements are installed on your system:

- Python 3.8 or higher
- pip (Python package manager)
- OpenCV
- TensorFlow or PyTorch
- NumPy
- Matplotlib (optional for visualization)

You can install Python from:  
https://www.python.org/downloads/

---

# Installation

Follow these steps to install and set up the project.

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/FoodGuard-AI.git
cd FoodGuard-AI
2. Create Virtual Environment (Recommended)
python -m venv venv

Activate the virtual environment:

Windows

venv\Scripts\activate

Mac / Linux

source venv/bin/activate
3. Install Dependencies

Install all required Python packages:

pip install -r requirements.txt

If a requirements file is not available, install the main libraries manually:

pip install opencv-python tensorflow numpy matplotlib
Running the Application

After installing all dependencies, you can run the application.

python main.py

If the project uses a notebook:

jupyter notebook

Open the notebook and run all cells to start the food freshness detection system.

Usage

FoodGuard-AI is designed to be simple and easy to use.

Image Upload Mode

Run the application.

Upload or capture an image of the food item.

The system will process the image using computer vision techniques.

The AI model will analyze the image.

The system will display the freshness classification.

Example Output:


Food Status: Fresh  
Confidence Score: 92%  
Recommendation: Safe to consume


Possible classifications:

Fresh – Food is safe to consume.

Moderate Risk – Food should be consumed with caution.

Spoiled – Food is not safe to eat.

The result helps users quickly determine whether the food should be consumed or discarded.

# Project Structure

The project follows a clean and modular structure to keep the code organized and easy to maintain.


FoodGuard-AI/
│
├── dataset/ # Food image dataset
├── model/ # Trained AI model files
│
├── src/ # Source code
│ ├── image_processing.py # Image preprocessing and feature extraction
│ ├── model_predict.py # Model loading and prediction logic
│ └── main.py # Main application file
│
├── requirements.txt # Project dependencies
├── README.md # Project documentation
└── LICENSE # License information


---

# Code Overview

This section explains the main components of the **FoodGuard-AI system**.

---

## Image Processing Module

The `image_processing.py` module handles preprocessing of food images before they are passed to the machine learning model.

### Main Responsibilities

- Image resizing  
- Image normalization  
- Noise reduction  
- Feature extraction  

### Example Code

```python
import cv2

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, (224, 224))
    image = image / 255.0
    return image
Model Prediction Module

The model_predict.py module loads the trained machine learning model and predicts the freshness category.

Example Code
from tensorflow.keras.models import load_model

model = load_model("model/food_freshness_model.h5")

def predict_food(image):
    prediction = model.predict(image)
    return prediction
Main Application

The main.py file connects all modules and runs the system.

Workflow

Load food image

Preprocess image

Send image to AI model

Display freshness classification

Example Code
from image_processing import preprocess_image
from model_predict import predict_food

image = preprocess_image("sample_food.jpg")
result = predict_food(image)

print("Food Freshness Prediction:", result)
AI Model Explanation

FoodGuard-AI uses machine learning and computer vision techniques to detect food freshness.

Model Input

Food images captured by the user.

Feature Extraction

The AI model analyzes visual features such as:

Color distribution

Surface texture

Visible mold patterns

Surface irregularities

Classification

The system predicts one of the following classes:

Fresh

Moderate Risk

Spoiled

The classification result helps users determine whether food is safe to consume.

Troubleshooting
Model Not Loading

Problem

The model file cannot be loaded.

Solution

Ensure the model file exists in the model/ directory.

Verify that the model path is correct.

Image Not Detected

Problem

The system cannot read the input image.

Solution

Verify the image path.

Ensure the image format is supported (JPG, PNG).

Dependency Errors

Problem

Missing Python libraries.

Solution

Install dependencies again:

pip install -r requirements.txt
Future Improvements

The following improvements can enhance the system in future versions:

Mobile application integration

Real-time camera-based freshness detection

Larger training dataset

Smart kitchen device integration

Cloud-based AI model deployment

License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software for educational and research purposes.
