from gtts import gTTS
import io

# Supported languages
LANGUAGES = {
    "english": "en",
    "urdu": "ur"
}

# Speech text templates
SPEECH_TEMPLATES = {
    "english": {
        "fresh": "Food analysis complete. Result: Fresh. Confidence: {confidence} percent. {reason}. This food is safe to eat. Recommendation: {tip}.",
        "moderate": "Food analysis complete. Result: Moderate Risk. Confidence: {confidence} percent. {reason}. Use caution before eating. Recommendation: {tip}.",
        "spoiled": "Food analysis complete. Result: Spoiled. Confidence: {confidence} percent. {reason}. Do not eat this food. Recommendation: {tip}."
    },
    "urdu": {
        "fresh": "کھانے کا تجزیہ مکمل ہوا۔ نتیجہ: تازہ۔ اعتماد: {confidence} فیصد۔ یہ کھانا کھانے کے لیے محفوظ ہے۔ سفارش: {tip}.",
        "moderate": "کھانے کا تجزیہ مکمل ہوا۔ نتیجہ: درمیانہ خطرہ۔ اعتماد: {confidence} فیصد۔ کھانے سے پہلے احتیاط کریں۔ سفارش: {tip}.",
        "spoiled": "کھانے کا تجزیہ مکمل ہوا۔ نتیجہ: خراب۔ اعتماد: {confidence} فیصد۔ یہ کھانا مت کھائیں۔ سفارش: {tip}."
    }
}

def create_speech_text(prediction: dict, recommendation: dict, language: str = "english") -> tuple:
    label = prediction.get("class", "Moderate Risk")
    confidence = prediction.get("confidence", 0)
    reason = prediction.get("reason", "")
    tips = recommendation.get("tips", [])
    tip = tips[0] if tips else ""

    # Select template based on class
    if label == "Fresh":
        key = "fresh"
    elif label == "Moderate Risk":
        key = "moderate"
    else:
        key = "spoiled"

    lang = language.lower()
    if lang not in SPEECH_TEMPLATES:
        lang = "english"

    text = SPEECH_TEMPLATES[lang][key].format(
        confidence=confidence,
        reason=reason,
        tip=tip
    )

    lang_code = LANGUAGES.get(lang, "en")
    return text, lang_code


def text_to_speech(text: str, lang_code: str = "en") -> bytes:
    tts = gTTS(text=text, lang=lang_code, slow=False)
    audio_buffer = io.BytesIO()
    tts.write_to_fp(audio_buffer)
    audio_buffer.seek(0)
    return audio_buffer.read()