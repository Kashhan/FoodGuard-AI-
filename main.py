from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.predict import router

app = FastAPI(title="FoodGuard-AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten this before final deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")

@app.get("/")
def health():
    return {"status": "FoodGuard-AI running ✅", "version": "1.0.0"}