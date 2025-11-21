# Rainwater Accumulation Detection System

AI-powered flood detection and management system with real-time monitoring, depth estimation, and safety alerts.

## Features

- Real-time flood detection using ML models
- Water depth estimation (±5cm accuracy)
- Vehicle safety assessment
- Email alerts for flood risks
- Alternative route generation
- User authentication system

## Quick Start

### Backend Setup (Python)

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
```
Edit `.env` with your API keys:
- GOOGLE_MAPS_API_KEY
- GMAIL_USER and GMAIL_APP_PASSWORD
- JWT_SECRET_KEY

4. Run server:
```bash
python app.py
```

### Frontend Setup (React)

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:5173

## Usage

1. Sign up for an account
2. Sign in to access dashboard
3. Allow location access
4. Click "Detect Flood Risk" to analyze current location
5. Check vehicle safety before traveling
6. Receive email alerts for high-risk areas

## Architecture

- Backend: Flask + TensorFlow (U-Net model)
- Frontend: React + TypeScript + Tailwind
- Database: MongoDB (with in-memory fallback)
- APIs: Google Maps, NOAA Weather

## Model Training

The system uses a U-Net CNN for flood segmentation. To train with custom data:

1. Prepare satellite imagery and flood labels
2. Update training pipeline in `backend/models/flood_detector.py`
3. Run training script

## API Keys Required

- Google Maps API (routing)
- Gmail App Password (alerts)
- MongoDB URI (optional)
