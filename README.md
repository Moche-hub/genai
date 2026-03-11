# Generative AI Powered BrandCraft Automation System

A stunning, responsive, full-stack web application designed to automatically generate branding content (Brand Name, Tagline, Story, Social Media Bio, Marketing Captions, Logo Concepts, and Color Palettes) using Generative AI (Google Gemini API).

Built with **React (Vite), plain CSS with modern glassmorphism UI, Python FastAPI, and SQLite.**

## Features
- **Modern Dashboard UI**: Rich textures, smooth gradients, and glassmorphism styling.
- **AI Integration**: Structured JSON extraction using Google's `gemini-2.5-flash` model.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Save Functionality**: Save generated branding items to a local SQLite database and view them later.

---

## Project Structure
```text
brandcraft-automation/
├── backend/                  # FastAPI Backend
│   ├── main.py               # API Endpoints
│   ├── database.py           # SQLite Models & Engine
│   ├── ai_service.py         # Google Gemini Integration
│   ├── .env                  # API Keys
│   └── requirements.txt      # Python Dependencies
└── frontend/                 # React Frontend
    ├── src/
    │   ├── App.jsx           # Main Application
    │   ├── index.css         # Global Styles & Theming
    │   ├── api.js            # Axios API Client
    │   └── components/       # UI Components
    ├── package.json          # Node Dependencies
    └── vite.config.js        # Vite Config
```

---

## Installation & Setup Instructions

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd brandcraft-automation/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   py -m venv venv
   .\venv\Scripts\Activate.ps1
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your API key:
   - Ensure you have a `.env` file inside the `backend` folder.
   - Add your Google Gemini API Key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be available at `http://localhost:8000`*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd brandcraft-automation/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at the URL provided in the terminal (usually `http://localhost:5173`)*

---

## Usage Guide
1. Open the frontend URL in your browser.
2. Fill out the brand input form with your product details.
3. Click "Generate Brand Identity" (Ensure your Google Gemini API key is configured).
4. View the results on the dashboard layout.
5. Click "Save Brand Settings" to save to the SQLite database.
