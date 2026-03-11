import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def test_gemini():
    print(f"Testing Gemini with key: {GEMINI_API_KEY[:10]}...")
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    try:
        print("Available models:")
        for model in client.models.list():
            print(f"- {model.name}")
        
        # Try the model we found in the list
        model_name = 'gemini-2.5-flash'
        print(f"\nTrying generation with {model_name}...")
        response = client.models.generate_content(
            model=model_name,
            contents="Say hello in one word",
        )
        print("Response received!")
        print(f"Text: {response.text}")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    test_gemini()
