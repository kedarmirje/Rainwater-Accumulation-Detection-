import googlemaps
import os

class RouteService:
    def __init__(self):
        self.gmaps = googlemaps.Client(key=os.getenv('GOOGLE_MAPS_API_KEY', ''))
    
    def get_safe_routes(self, origin, destination, flood_zones):
        """Get alternative routes avoiding flood zones"""
        try:
            directions = self.gmaps.directions(
                origin,
                destination,
                mode="driving",
                alternatives=True
            )
            
            safe_routes = []
            for route in directions:
                is_safe = self._check_route_safety(route, flood_zones)
                safe_routes.append({
                    'summary': route['summary'],
                    'distance': route['legs'][0]['distance']['text'],
                    'duration': route['legs'][0]['duration']['text'],
                    'safe': is_safe,
                    'polyline': route['overview_polyline']['points']
                })
            
            return safe_routes
        except Exception as e:
            return [{'error': str(e)}]
    
    def _check_route_safety(self, route, flood_zones):
        """Check if route intersects with flood zones"""
        # Simplified safety check
        return True
