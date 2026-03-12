from google import genai
from PIL import Image
import io, os, json, re
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
print(f"API Key loaded: {API_KEY[:10]}...")

client = genai.Client(api_key=API_KEY)

PROMPT = """
You are a food safety expert. Analyze this food image carefully.
Respond ONLY in this exact JSON format with no extra text or markdown:
{
  "class": "Fresh" or "Moderate Risk" or "Spoiled",
  "confidence": number between 0 and 100,
  "reason": "one clear sentence explaining your assessment",
  "tips": ["tip1", "tip2", "tip3"]
}
"""

def analyze_food(file_bytes: bytes) -> dict:
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    
    response = client.models.generate_content(
          model="gemini-2.5-flash",
        contents=[PROMPT, image]
    )
    
    text = re.sub(r'```json|```', '', response.text).strip()
    return json.loads(text)