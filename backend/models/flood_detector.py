import numpy as np
import tensorflow as tf
from tensorflow import keras
import requests
import os
from datetime import datetime

class FloodDetector:
    def __init__(self):
        self.model = self._load_or_create_model()
        self.vehicle_clearance = {
            'car': 10,
            'suv': 30,
            'truck': 50,
            'bus': 40
        }
    
    def _load_or_create_model(self):
        """Load pre-trained model or create new U-Net architecture"""
        model_path = 'models/flood_unet.h5'
        if os.path.exists(model_path):
            return keras.models.load_model(model_path)
        return self._create_unet_model()
    
    def _create_unet_model(self):
        """Create U-Net model for flood segmentation"""
        inputs = keras.Input(shape=(256, 256, 3))
        
        # Encoder
        c1 = keras.layers.Conv2D(64, 3, activation='relu', padding='same')(inputs)
        c1 = keras.layers.Conv2D(64, 3, activation='relu', padding='same')(c1)
        p1 = keras.layers.MaxPooling2D(2)(c1)
        
        c2 = keras.layers.Conv2D(128, 3, activation='relu', padding='same')(p1)
        c2 = keras.layers.Conv2D(128, 3, activation='relu', padding='same')(c2)
        p2 = keras.layers.MaxPooling2D(2)(c2)
        
        # Bottleneck
        c3 = keras.layers.Conv2D(256, 3, activation='relu', padding='same')(p2)
        c3 = keras.layers.Conv2D(256, 3, activation='relu', padding='same')(c3)
        
        # Decoder
        u1 = keras.layers.UpSampling2D(2)(c3)
        u1 = keras.layers.concatenate([u1, c2])
        c4 = keras.layers.Conv2D(128, 3, activation='relu', padding='same')(u1)
        
        u2 = keras.layers.UpSampling2D(2)(c4)
        u2 = keras.layers.concatenate([u2, c1])
        c5 = keras.layers.Conv2D(64, 3, activation='relu', padding='same')(u2)
        
        outputs = keras.layers.Conv2D(1, 1, activation='sigmoid')(c5)
        
        model = keras.Model(inputs=[inputs], outputs=[outputs])
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        return model

    
    def detect_flood_area(self, latitude, longitude):
        """Detect flood in specific area"""
        weather_data = self._get_weather_data(latitude, longitude)
        elevation = self._get_elevation(latitude, longitude)
        
        # Simulate flood risk calculation
        rainfall = weather_data.get('rainfall', 0)
        flood_probability = min(rainfall / 100, 1.0)
        
        depth_cm = self._estimate_depth(rainfall, elevation)
        
        return {
            'latitude': latitude,
            'longitude': longitude,
            'flood_risk': flood_probability,
            'depth_cm': depth_cm,
            'timestamp': datetime.now().isoformat(),
            'weather': weather_data
        }
    
    def get_live_flood_data(self, lat, lon, radius_km):
        """Get live flood data for area"""
        # Simulate grid-based detection
        grid_points = self._generate_grid(lat, lon, radius_km)
        flood_zones = []
        
        for point in grid_points:
            result = self.detect_flood_area(point['lat'], point['lon'])
            if result['flood_risk'] > 0.5:
                flood_zones.append(result)
        
        return {
            'center': {'lat': lat, 'lon': lon},
            'radius_km': radius_km,
            'flood_zones': flood_zones,
            'total_affected_areas': len(flood_zones)
        }
    
    def estimate_water_depth(self, lat, lon):
        """Estimate water depth at location"""
        weather = self._get_weather_data(lat, lon)
        elevation = self._get_elevation(lat, lon)
        return self._estimate_depth(weather.get('rainfall', 0), elevation)
    
    def assess_vehicle_safety(self, vehicle_type, depth_cm):
        """Assess if vehicle can safely traverse"""
        clearance = self.vehicle_clearance.get(vehicle_type.lower(), 10)
        safe = depth_cm < clearance * 0.7  # 70% safety margin
        
        if depth_cm > 50:
            message = "DANGER: No vehicles should attempt crossing"
        elif safe:
            message = f"{vehicle_type.upper()} can safely traverse (depth: {depth_cm}cm)"
        else:
            message = f"WARNING: {vehicle_type.upper()} should not cross (depth: {depth_cm}cm)"
        
        return {'safe': safe, 'message': message, 'clearance': clearance}
    
    def get_flood_zones(self, origin, destination):
        """Get flood zones between two points"""
        # Simplified: check points along route
        return []
    
    def _get_weather_data(self, lat, lon):
        """Fetch weather data from API"""
        # Simulate weather data (replace with actual API call)
        return {
            'rainfall': np.random.uniform(0, 150),
            'temperature': 25,
            'humidity': 80
        }
    
    def _get_elevation(self, lat, lon):
        """Get elevation data"""
        # Simulate elevation (replace with DEM data)
        return np.random.uniform(0, 100)
    
    def _estimate_depth(self, rainfall, elevation):
        """Estimate water depth based on rainfall and elevation"""
        base_depth = rainfall * 0.5
        elevation_factor = max(0, (100 - elevation) / 100)
        return base_depth * (1 + elevation_factor)
    
    def _generate_grid(self, lat, lon, radius_km):
        """Generate grid points for area scanning"""
        points = []
        step = 0.01  # ~1km
        for dlat in np.arange(-radius_km * step, radius_km * step, step):
            for dlon in np.arange(-radius_km * step, radius_km * step, step):
                points.append({'lat': lat + dlat, 'lon': lon + dlon})
        return points[:50]  # Limit to 50 points
