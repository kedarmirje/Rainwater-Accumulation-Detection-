from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
from datetime import timedelta

from models.flood_detector import FloodDetector
from services.alert_service import AlertService
from services.route_service import RouteService
from database.db import Database

load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db = Database()
flood_detector = FloodDetector()
alert_service = AlertService()
route_service = RouteService()

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if db.get_user(email):
        return jsonify({'error': 'User already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = db.create_user(email, hashed_password, name)
    
    return jsonify({'message': 'User created successfully', 'user_id': user_id}), 201

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = db.get_user(email)
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({'token': access_token, 'user': {'email': email, 'name': user['name']}}), 200

@app.route('/api/flood/detect', methods=['POST'])
@jwt_required()
def detect_flood():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    result = flood_detector.detect_flood_area(latitude, longitude)
    
    if result['flood_risk'] > 0.7:
        user_email = get_jwt_identity()
        alert_service.send_alert(user_email, result)
    
    return jsonify(result), 200

@app.route('/api/flood/live', methods=['GET'])
@jwt_required()
def live_detection():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    radius = request.args.get('radius', default=5, type=float)
    
    flood_data = flood_detector.get_live_flood_data(lat, lon, radius)
    return jsonify(flood_data), 200

@app.route('/api/route/alternative', methods=['POST'])
@jwt_required()
def get_alternative_route():
    data = request.json
    origin = data.get('origin')
    destination = data.get('destination')
    
    flood_zones = flood_detector.get_flood_zones(origin, destination)
    routes = route_service.get_safe_routes(origin, destination, flood_zones)
    
    return jsonify(routes), 200

@app.route('/api/vehicle/safety', methods=['POST'])
@jwt_required()
def check_vehicle_safety():
    data = request.json
    vehicle_type = data.get('vehicle_type')
    location = data.get('location')
    
    depth = flood_detector.estimate_water_depth(location['lat'], location['lon'])
    safety = flood_detector.assess_vehicle_safety(vehicle_type, depth)
    
    return jsonify({'depth_cm': depth, 'safe': safety['safe'], 'recommendation': safety['message']}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
