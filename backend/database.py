from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime
import os

DATABASE_URL = "sqlite:///./brandcraft.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class SaveBrandModel(Base):
    __tablename__ = "saved_brands"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Input data
    brand_name = Column(String, index=True)
    industry = Column(String)
    target_audience = Column(String)
    brand_personality = Column(String)
    color_preference = Column(String)
    product_description = Column(Text)
    
    # Generated data
    brand_name_ideas = Column(Text) # JSON string
    tagline = Column(String)
    brand_story = Column(Text)
    social_media_bio = Column(Text)
    marketing_captions = Column(Text) # JSON string
    logo_concept = Column(Text)
    color_palette = Column(Text) # JSON string

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
Base.metadata.create_all(bind=engine)
