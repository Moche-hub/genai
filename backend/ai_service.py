import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Clear potential proxy settings that can cause [Errno 22] on Windows
os.environ.pop('HTTP_PROXY', None)
os.environ.pop('HTTPS_PROXY', None)
os.environ.pop('http_proxy', None)
os.environ.pop('https_proxy', None)

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None

async def generate_branding_content(brand_data: dict) -> dict:
    if not client:
        raise ValueError("Gemini API key not configured")

    prompt = f"""
    You are an expert branding agency. Create a unique and comprehensive brand identity for the following product. 
    It is CRITICAL that you provide creative, non-cliché, and diverse ideas. Avoid generic marketing speak.

    Brand/Product Name (if given): {brand_data.get('brand_name', 'Not specified')}
    Industry: {brand_data.get('industry', 'Not specified')}
    Target Audience: {brand_data.get('target_audience', 'Not specified')}
    Brand Personality: {brand_data.get('brand_personality', 'Not specified')}
    Color Preference: {brand_data.get('color_preference', 'Not specified')}
    Product Description: {brand_data.get('product_description', 'Not specified')}
    """

    # We need to define the schema we want returned
    response_schema = {
        "type": "OBJECT",
        "properties": {
            "brand_name_ideas": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            },
            "tagline": {"type": "STRING"},
            "brand_story": {"type": "STRING"},
            "social_media_bio": {"type": "STRING"},
            "marketing_captions": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            },
            "logo_concept": {"type": "STRING"},
            "color_palette": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            }
        },
        "required": ["brand_name_ideas", "tagline", "brand_story", "social_media_bio", "marketing_captions", "logo_concept", "color_palette"]
    }

    try:
        import asyncio
        # The genai SDK Client is synchronous, so we run it in a thread to avoid blocking the event loop
        def call_gemini():
            return client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt,
                config={
                    'system_instruction': (
                        "You are a professional brand strategist and creative copywriter. "
                        "Your goal is to provide highly creative, unique, and memorable branding content. "
                        "Avoid repetitive patterns or generic suggestions. Each brand should have a distinct voice "
                        "and a compelling story that stands out in its industry."
                    ),
                    'response_mime_type': "application/json",
                    'response_schema': response_schema,
                    'temperature': 1.0,
                },
            )
        
        response = await asyncio.to_thread(call_gemini)
        
        if not response or not response.text:
             print("Empty response from Gemini")
             raise ValueError("Empty response from Gemini")

        print("Gemini response received successfully.")
        return json.loads(response.text)
        
    except Exception as e:
         print(f"ERROR in generate_branding_content: {str(e)}")
         import traceback
         traceback.print_exc()
         # fallback dummy data for robust handling
         return {
            "brand_name_ideas": ["Fallback Brand Idea"],
            "tagline": "Crafting Excellence",
            "brand_story": "We provide the best services for our clients based on their unique needs.",
            "social_media_bio": "Connecting you with the future of your industry.",
            "marketing_captions": ["Quality matters", "The best choice", "Innovation first"],
            "logo_concept": "A sleek, minimalist design that represents the core values of the company.",
            "color_palette": ["#2563eb", "#1e40af", "#60a5fa", "#dbeafe"]
         }
