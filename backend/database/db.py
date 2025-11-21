from pymongo import MongoClient
import os
from datetime import datetime

class Database:
    def __init__(self):
        try:
            self.client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
            self.db = self.client['flood_detection']
            self.users = self.db['users']
            self.alerts = self.db['alerts']
        except:
            # Fallback to in-memory storage
            self.users_mem = {}
            self.alerts_mem = []
    
    def create_user(self, email, password, name):
        try:
            user = {
                'email': email,
                'password': password,
                'name': name,
                'created_at': datetime.now()
            }
            result = self.users.insert_one(user)
            return str(result.inserted_id)
        except:
            self.users_mem[email] = {'email': email, 'password': password, 'name': name}
            return email
    
    def get_user(self, email):
        try:
            return self.users.find_one({'email': email})
        except:
            return self.users_mem.get(email)
    
    def save_alert(self, user_email, alert_data):
        try:
            alert = {
                'user_email': user_email,
                'data': alert_data,
                'timestamp': datetime.now()
            }
            self.alerts.insert_one(alert)
        except:
            self.alerts_mem.append({'user_email': user_email, 'data': alert_data})
