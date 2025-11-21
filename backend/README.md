# Flood Detection System - Backend

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Run the Flask server:
```bash
python app.py
```

Server runs on http://localhost:5000

## API Endpoints

- POST /api/auth/signup - Create new user
- POST /api/auth/signin - User login
- POST /api/flood/detect - Detect flood at location
- GET /api/flood/live - Get live flood data
- POST /api/route/alternative - Get safe routes
- POST /api/vehicle/safety - Check vehicle safety

## ML Model Training

To train the flood detection model with your own data:

```python
from models.flood_detector import FloodDetector
detector = FloodDetector()
# Add training data and train model
```

## Required API Keys

- Google Maps API (for routing)
- Gmail App Password (for alerts)
- NOAA API (optional, for weather data)
