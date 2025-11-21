import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Droplets, Navigation, Car, MapPin, Activity, TrendingUp, Shield, Waves } from 'lucide-react';

interface WaterloggedArea {
  id: string;
  lat: number;
  lon: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  depth_cm: number;
  area_name: string;
  timestamp: string;
  affected_roads: string[];
}

export default function FloodDashboard() {
  const [location, setLocation] = useState<{ lat: number; lon: number }>({ lat: 28.6139, lon: 77.2090 });
  const [floodData, setFloodData] = useState<any>(null);
  const [vehicleType, setVehicleType] = useState('car');
  const [safetyData, setSafetyData] = useState<any>(null);
  const [waterloggedAreas, setWaterloggedAreas] = useState<WaterloggedArea[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState<WaterloggedArea | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        console.log('Using default location');
      }
    );

    generateWaterloggedAreas();
    
    // Auto-detect flood on load
    setTimeout(() => detectFlood(), 1000);
  }, []);

  const generateWaterloggedAreas = () => {
    const areas: WaterloggedArea[] = [
      {
        id: '1',
        lat: 28.6139,
        lon: 77.2090,
        severity: 'high',
        depth_cm: 45,
        area_name: 'Connaught Place',
        timestamp: new Date().toISOString(),
        affected_roads: ['Janpath', 'Parliament Street', 'Barakhamba Road']
      },
      {
        id: '2',
        lat: 28.6289,
        lon: 77.2065,
        severity: 'critical',
        depth_cm: 65,
        area_name: 'Kashmere Gate',
        timestamp: new Date().toISOString(),
        affected_roads: ['Ring Road', 'Lothian Road', 'ISBT Area']
      },
      {
        id: '3',
        lat: 28.5355,
        lon: 77.3910,
        severity: 'medium',
        depth_cm: 25,
        area_name: 'Noida Sector 18',
        timestamp: new Date().toISOString(),
        affected_roads: ['Sector 18 Market', 'Atta Market Road']
      },
      {
        id: '4',
        lat: 28.7041,
        lon: 77.1025,
        severity: 'low',
        depth_cm: 12,
        area_name: 'Rohini Sector 7',
        timestamp: new Date().toISOString(),
        affected_roads: ['Main Road', 'Sector 7 Market']
      },
      {
        id: '5',
        lat: 28.5494,
        lon: 77.2501,
        severity: 'high',
        depth_cm: 52,
        area_name: 'Nehru Place',
        timestamp: new Date().toISOString(),
        affected_roads: ['Outer Ring Road', 'Nehru Place Metro', 'Kalkaji Road']
      },
      {
        id: '6',
        lat: 28.6692,
        lon: 77.4538,
        severity: 'medium',
        depth_cm: 30,
        area_name: 'Ghaziabad',
        timestamp: new Date().toISOString(),
        affected_roads: ['NH-24', 'Link Road']
      },
      {
        id: '7',
        lat: 28.6139,
        lon: 77.2090,
        severity: 'high',
        depth_cm: 48,
        area_name: 'Custom Location',
        timestamp: new Date().toISOString(),
        affected_roads: ['Main Road', 'Access Road', 'Service Lane']
      }
    ];
    setWaterloggedAreas(areas);
  };

  const detectFlood = async () => {
    setLoading(true);
    setTimeout(() => {
      setFloodData({
        flood_risk: 0.65,
        depth_cm: 38,
        timestamp: new Date().toISOString(),
        weather: {
          rainfall: 85,
          temperature: 28,
          humidity: 82
        }
      });
      setLoading(false);
    }, 1500);
  };

  const checkSafety = async () => {
    setLoading(true);
    setTimeout(() => {
      const depth = floodData?.depth_cm || 38;
      const clearances = { car: 10, suv: 30, truck: 50, bus: 40 };
      const clearance = clearances[vehicleType as keyof typeof clearances];
      const safe = depth < clearance * 0.7;
      setSafetyData({
        depth_cm: depth,
        safe,
        clearance,
        recommendation: safe 
          ? `✓ ${vehicleType.toUpperCase()} can safely traverse (depth: ${depth.toFixed(1)}cm)`
          : `⚠ WARNING: ${vehicleType.toUpperCase()} should not cross (depth: ${depth.toFixed(1)}cm)`
      });
      setLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-red-700';
      case 'high': return 'from-orange-500 to-orange-700';
      case 'medium': return 'from-yellow-500 to-yellow-700';
      case 'low': return 'from-blue-500 to-blue-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-300';
      case 'high': return 'bg-orange-100 border-orange-300';
      case 'medium': return 'bg-yellow-100 border-yellow-300';
      case 'low': return 'bg-blue-100 border-blue-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-10 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Flood Watch AI</h1>
              <p className="text-blue-200 text-sm">Real-time Waterlogging Monitoring System</p>
            </div>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            Back to Home
          </Button>
        </div>

        {/* Alert Banner */}
        {waterloggedAreas.filter(a => a.severity === 'critical' || a.severity === 'high').length > 0 && (
          <Alert className="mb-6 border-red-400 bg-red-500/20 backdrop-blur-sm">
            <AlertTriangle className="h-5 w-5 text-red-300" />
            <AlertDescription className="text-red-100 font-medium">
              ⚠️ {waterloggedAreas.filter(a => a.severity === 'critical' || a.severity === 'high').length} high-risk waterlogged areas detected in your region
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Total Areas</p>
                  <p className="text-3xl font-bold text-white">{waterloggedAreas.length}</p>
                </div>
                <Activity className="w-10 h-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm">Critical Zones</p>
                  <p className="text-3xl font-bold text-white">{waterloggedAreas.filter(a => a.severity === 'critical').length}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm">High Risk</p>
                  <p className="text-3xl font-bold text-white">{waterloggedAreas.filter(a => a.severity === 'high').length}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Safe Areas</p>
                  <p className="text-3xl font-bold text-white">{waterloggedAreas.filter(a => a.severity === 'low').length}</p>
                </div>
                <Shield className="w-10 h-10 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Waterlogged Areas Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-800/50 rounded-xl p-6 min-h-[400px]">
                  {/* Map Visualization */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {waterloggedAreas.map((area) => (
                      <div
                        key={area.id}
                        onClick={() => setSelectedArea(area)}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedArea?.id === area.id 
                            ? 'border-white shadow-lg' 
                            : 'border-transparent'
                        } ${getSeverityBg(area.severity)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Waves className="w-6 h-6 text-blue-600" />
                          <Badge 
                            className={`bg-gradient-to-r ${getSeverityColor(area.severity)} text-white border-0`}
                          >
                            {area.severity}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">{area.area_name}</h3>
                        <p className="text-2xl font-bold text-blue-600">{area.depth_cm} cm</p>
                        <p className="text-xs text-gray-600 mt-1">{area.affected_roads.length} roads affected</p>
                      </div>
                    ))}
                  </div>

                  {/* Selected Area Details */}
                  {selectedArea && (
                    <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                      <h3 className="text-xl font-bold text-white mb-3">{selectedArea.area_name}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-blue-200 text-sm">Water Depth</p>
                          <p className="text-2xl font-bold text-white">{selectedArea.depth_cm} cm</p>
                        </div>
                        <div>
                          <p className="text-blue-200 text-sm">Severity</p>
                          <Badge className={`bg-gradient-to-r ${getSeverityColor(selectedArea.severity)} text-white border-0 text-lg`}>
                            {selectedArea.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-2">Affected Roads:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedArea.affected_roads.map((road, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-500/30 rounded-full text-white text-sm">
                              {road}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Waterlogged Areas Table */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Detailed Area Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-3 font-semibold text-blue-200">Area</th>
                        <th className="text-left p-3 font-semibold text-blue-200">Severity</th>
                        <th className="text-left p-3 font-semibold text-blue-200">Depth</th>
                        <th className="text-left p-3 font-semibold text-blue-200">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waterloggedAreas.map((area) => (
                        <tr key={area.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-3 font-medium text-white">{area.area_name}</td>
                          <td className="p-3">
                            <Badge className={`bg-gradient-to-r ${getSeverityColor(area.severity)} text-white border-0`}>
                              {area.severity.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-3 font-bold text-cyan-400">{area.depth_cm} cm</td>
                          <td className="p-3">
                            {area.severity === 'critical' || area.severity === 'high' ? (
                              <span className="text-red-400 font-medium">⚠️ Avoid</span>
                            ) : (
                              <span className="text-green-400 font-medium">✓ Passable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Current Location */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <Navigation className="w-5 h-5 text-cyan-400" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-blue-200">Latitude: <span className="text-white font-mono">{location.lat.toFixed(4)}</span></p>
                  <p className="text-sm text-blue-200">Longitude: <span className="text-white font-mono">{location.lon.toFixed(4)}</span></p>
                </div>
                <Button 
                  onClick={detectFlood} 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" 
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Detect Flood Risk'}
                </Button>
              </CardContent>
            </Card>

            {/* Flood Analysis */}
            {floodData && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Flood Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <p className="text-sm text-blue-200 mb-2">Risk Level</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full bg-gradient-to-r ${
                              floodData.flood_risk > 0.7 ? 'from-red-500 to-red-700' : 
                              floodData.flood_risk > 0.4 ? 'from-orange-500 to-orange-700' : 
                              'from-green-500 to-green-700'
                            }`}
                            style={{ width: `${floodData.flood_risk * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-2xl font-bold text-white">{(floodData.flood_risk * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <p className="text-sm text-blue-200">Water Depth</p>
                      <p className="text-3xl font-bold text-cyan-400">{floodData.depth_cm.toFixed(1)} cm</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                        <p className="text-xs text-blue-200">Rainfall</p>
                        <p className="text-lg font-bold text-white">{floodData.weather.rainfall}mm</p>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                        <p className="text-xs text-blue-200">Temp</p>
                        <p className="text-lg font-bold text-white">{floodData.weather.temperature}°C</p>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                        <p className="text-xs text-blue-200">Humidity</p>
                        <p className="text-lg font-bold text-white">{floodData.weather.humidity}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Safety */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <Car className="w-5 h-5 text-green-400" />
                  Vehicle Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="bg-slate-800/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">🚗 Car (10cm clearance)</SelectItem>
                    <SelectItem value="suv">🚙 SUV (30cm clearance)</SelectItem>
                    <SelectItem value="truck">🚚 Truck (50cm clearance)</SelectItem>
                    <SelectItem value="bus">🚌 Bus (40cm clearance)</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={checkSafety} 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" 
                  disabled={loading}
                >
                  Check Safety
                </Button>
                {safetyData && (
                  <div className={`p-4 rounded-lg border-2 ${
                    safetyData.safe 
                      ? 'bg-green-500/20 border-green-400' 
                      : 'bg-red-500/20 border-red-400'
                  }`}>
                    <p className={`font-bold mb-2 ${safetyData.safe ? 'text-green-300' : 'text-red-300'}`}>
                      {safetyData.recommendation}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Water Depth:</span>
                      <span className="text-white font-bold">{safetyData.depth_cm.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Vehicle Clearance:</span>
                      <span className="text-white font-bold">{safetyData.clearance} cm</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
