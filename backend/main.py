from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json
import os

# Create FastAPI app
app = FastAPI(
    title="Hello World API",
    description="A simple FastAPI backend for the Hello World React app",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",  # React dev server
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://frontend:80",     # Docker container
        "http://localhost:80"     # Docker mapped port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Feature Flag System
class FeatureFlag(BaseModel):
    name: str
    enabled: bool
    description: str = ""

class WelcomeRequest(BaseModel):
    name: str


# load feature flags from a file
FEATURE_FLAGS_FILE = os.path.join(os.path.dirname(__file__), 'feature_flags.json')

def load_feature_flags():
    with open(FEATURE_FLAGS_FILE, 'r') as f:
        return json.load(f)

FEATURE_FLAGS = load_feature_flags()

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Hello from FastAPI!"}

@app.get("/hello")
async def hello():
    """Hello World endpoint"""
    return {"message": "Hello World from FastAPI backend!"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "FastAPI Backend"}

# Feature Flag Endpoints
@app.get("/feature-flags")
async def get_all_feature_flags():
    """List all feature flags and their status"""
    return {"feature_flags": FEATURE_FLAGS}

@app.get("/feature-flags/{flag_name}")
async def get_feature_flag(flag_name: str):
    """Get a specific feature flag by name"""
    if flag_name not in FEATURE_FLAGS:
        raise HTTPException(status_code=404, detail=f"Feature flag '{flag_name}' not found")
    
    return {f"{flag_name}": FEATURE_FLAGS[flag_name]}

@app.get("/feature-flags/{flag_name}/enabled")
async def is_feature_enabled(flag_name: str):
    """Check if a specific feature flag is enabled"""
    if flag_name not in FEATURE_FLAGS:
        raise HTTPException(status_code=404, detail=f"Feature flag '{flag_name}' not found")
    
    return {"enabled": FEATURE_FLAGS[flag_name]['enabled']}

@app.post("/welcome")
async def welcome_user(request: WelcomeRequest):
    """Welcome endpoint that returns a personalized welcome message"""

    if not FEATURE_FLAGS.get("welcome_message", {}).get("enabled", False):
        raise HTTPException(status_code=404, detail="Feature flag 'welcome_message' is not enabled")

    if not request.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    
    return {"message": f"Welcome {request.name}!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

