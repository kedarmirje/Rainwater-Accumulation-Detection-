const API_BASE = 'http://localhost:5000/api';

export const api = {
  async signup(email: string, password: string, name: string) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    return res.json();
  },

  async signin(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async detectFlood(lat: number, lon: number, token: string) {
    const res = await fetch(`${API_BASE}/flood/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ latitude: lat, longitude: lon })
    });
    return res.json();
  },

  async getLiveFloodData(lat: number, lon: number, radius: number, token: string) {
    const res = await fetch(`${API_BASE}/flood/live?lat=${lat}&lon=${lon}&radius=${radius}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async getAlternativeRoutes(origin: string, destination: string, token: string) {
    const res = await fetch(`${API_BASE}/route/alternative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ origin, destination })
    });
    return res.json();
  },

  async checkVehicleSafety(vehicleType: string, location: {lat: number, lon: number}, token: string) {
    const res = await fetch(`${API_BASE}/vehicle/safety`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ vehicle_type: vehicleType, location })
    });
    return res.json();
  }
};
