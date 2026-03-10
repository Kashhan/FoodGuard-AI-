from fastapi import APIRouter, File, UploadFile, HTTPException
import random

router = APIRouter()

MOCK_MODE = True  # True = fake response, False = real Gemini

MOCK_RESPONSES = [
    {
        "class": "Fresh",
        "confidence": 95,
        "reason": "The food appears fresh with vibrant color and no visible spoilage.",
        "tips": ["Store in fridge", "Consume within 3 days", "Wash before eating"]
    },
    {
        "class": "Moderate Risk",
        "confidence": 72,
        "reason": "Some early signs of aging detected. Inspect carefully before consuming.",
        "tips": ["Cook thoroughly before eating", "Do not store longer", "Check smell before consuming"]
    },
    {
        "class": "Spoiled",
        "confidence": 88,
        "reason": "Clear signs of spoilage detected. This food is not safe to eat.",
        "tips": ["Discard immediately", "Clean surrounding surfaces", "Do not consume"]
    }
]

STATUS_MAP = {
    "Fresh":         {"status": "✅ Safe to Eat",  "color": "green"},
    "Moderate Risk": {"status": "⚠️ Use Caution",  "color": "orange"},
    "Spoiled":       {"status": "🚫 Do Not Eat",   "color": "red"},
}

@router.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Check 1 - Must be an image file
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400, 
            detail="Only image files are accepted (jpg, png, webp)"
        )

    file_bytes = await file.read()

    # Check 2 - File must not be empty
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=400, 
            detail="Uploaded file is empty"
        )

    # Check 3 - Max size 5MB
    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400, 
            detail="Image too large. Maximum size is 5MB"
        )

    if MOCK_MODE:
        # Returns fake response for testing
        result = random.choice(MOCK_RESPONSES)
    else:
        # Real Gemini — switch when API key is ready
        from services.gemini_service import analyze_food
        result = analyze_food(file_bytes)

    label = result.get("class", "Moderate Risk")
    rec = STATUS_MAP.get(label, STATUS_MAP["Moderate Risk"])

    return {
        "success": True,
        "filename": file.filename,
        "prediction": {
            "class": label,
            "confidence": result.get("confidence", 0),
            "reason": result.get("reason", "")
        },
        "recommendation": {
            "status": rec["status"],
            "color": rec["color"],
            "tips": result.get("tips", [])
        }
    }