from fastapi import FastAPI, Depends, HTTPException, Body, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

from database import engine, Base, get_db, SaveBrandModel
from ai_service import generate_branding_content

from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="BrandCraft Automation API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all
    allow_credentials=True,
    allow_methods=["*", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class BrandRequest(BaseModel):
    brand_name: Optional[str] = None
    industry: str
    target_audience: str
    brand_personality: str
    color_preference: Optional[str] = None
    product_description: str

class SaveBrandRequest(BaseModel):
    # original inputs
    brand_name: Optional[str] = None
    industry: str
    target_audience: str
    brand_personality: str
    color_preference: Optional[str] = None
    product_description: str
    # generated outputs
    brand_name_ideas: List[str]
    tagline: str
    brand_story: str
    social_media_bio: str
    marketing_captions: List[str]
    logo_concept: str
    color_palette: List[str]


@app.get("/")
def read_root():
    return {"message": "Welcome to the BrandCraft API"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

@app.post("/generate-brand")
async def generate_brand(request: BrandRequest):
    try:
        brand_data = request.model_dump()
        generated_content = await generate_branding_content(brand_data)
        return generated_content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/save-brand")
def save_brand(request: SaveBrandRequest, db: Session = Depends(get_db)):
    try:
        new_brand = SaveBrandModel(
            brand_name=request.brand_name,
            industry=request.industry,
            target_audience=request.target_audience,
            brand_personality=request.brand_personality,
            color_preference=request.color_preference,
            product_description=request.product_description,
            brand_name_ideas=json.dumps(request.brand_name_ideas),
            tagline=request.tagline,
            brand_story=request.brand_story,
            social_media_bio=request.social_media_bio,
            marketing_captions=json.dumps(request.marketing_captions),
            logo_concept=request.logo_concept,
            color_palette=json.dumps(request.color_palette)
        )
        db.add(new_brand)
        db.commit()
        db.refresh(new_brand)
        return {"message": "Brand saved successfully", "id": new_brand.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save brand: {str(e)}")

@app.get("/brands")
def get_brands(db: Session = Depends(get_db)):
    brands = db.query(SaveBrandModel).order_by(SaveBrandModel.created_at.desc()).all()
    
    result = []
    for brand in brands:
        result.append({
            "id": brand.id,
            # ensure full timestamp serialization
            "created_at": brand.created_at.isoformat() if brand.created_at else None,
            "brand_name": brand.brand_name,
            "industry": brand.industry,
            "brand_name_ideas": json.loads(brand.brand_name_ideas) if brand.brand_name_ideas else [],
            "tagline": brand.tagline,
            "color_palette": json.loads(brand.color_palette) if brand.color_palette else []
        })
        
    return result

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    # In production (like Render), we don't want reload=True
    is_dev = os.getenv("ENVIRONMENT") == "development"
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=is_dev)
