import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloodMap from "@/components/FloodMap";
import { 
  Droplets, 
  AlertTriangle, 
  Car,
  Truck,
  Navigation as NavIcon,
  Activity
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const floodZones = [
    { id: 1, name: "Downtown Area", depth: 45, risk: "high", status: "critical" },
    { id: 2, name: "Riverside District", depth: 28, risk: "medium", status: "warning" },
    { id: 3, name: "North Highway", depth: 15, risk: "low", status: "caution" },
    { id: 4, name: "East Park", depth: 8, risk: "minimal", status: "safe" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-danger text-danger-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "caution": return "bg-secondary text-secondary-foreground";
      case "safe": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getVehicleRecommendation = (depth: number) => {
    if (depth >= 40) return { icon: AlertTriangle, text: "No vehicles recommended", color: "text-danger" };
    if (depth >= 25) return { icon: Truck, text: "Heavy vehicles only", color: "text-warning" };
    if (depth >= 10) return { icon: Car, text: "SUVs and trucks safe", color: "text-secondary" };
    return { icon: Car, text: "All vehicles safe", color: "text-success" };
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live Flood Monitor</h1>
            <p className="text-muted-foreground">Real-time flood depth analysis and safety recommendations</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Live monitoring active</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Alerts</p>
                <p className="text-3xl font-bold text-danger">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-danger" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monitored Zones</p>
                <p className="text-3xl font-bold text-primary">48</p>
              </div>
              <Droplets className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Max Depth</p>
                <p className="text-3xl font-bold text-warning">45cm</p>
              </div>
              <Activity className="h-8 w-8 text-warning" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Safe Routes</p>
                <p className="text-3xl font-bold text-success">36</p>
              </div>
              <NavIcon className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Flood Map</h2>
              <p className="text-sm text-muted-foreground">
                Interactive map showing real-time flood zones and water depth levels
              </p>
            </div>
            <FloodMap />
          </Card>

          {/* Flood Zones List */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Flood Zones</h2>
            <div className="space-y-4">
              {floodZones.map((zone) => {
                const VehicleIcon = getVehicleRecommendation(zone.depth).icon;
                return (
                  <div key={zone.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{zone.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Water depth: {zone.depth}cm
                        </p>
                      </div>
                      <Badge className={getStatusColor(zone.status)}>
                        {zone.status}
                      </Badge>
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-2 ${getVehicleRecommendation(zone.depth).color}`}>
                      <VehicleIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {getVehicleRecommendation(zone.depth).text}
                      </span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 gap-2"
                    >
                      <NavIcon className="h-4 w-4" />
                      View Alternative Routes
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Vehicle Safety Guide */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Vehicle Safety Guidelines</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { depth: "0-10cm", vehicle: "All vehicles", color: "success", icon: Car },
              { depth: "10-25cm", vehicle: "SUVs & Trucks", color: "secondary", icon: Car },
              { depth: "25-40cm", vehicle: "Heavy vehicles", color: "warning", icon: Truck },
              { depth: "40cm+", vehicle: "No vehicles", color: "danger", icon: AlertTriangle },
            ].map((guide) => (
              <div key={guide.depth} className={`p-4 rounded-lg border-2 border-${guide.color}`}>
                <guide.icon className={`h-8 w-8 text-${guide.color} mb-2`} />
                <h3 className="font-semibold mb-1">{guide.depth}</h3>
                <p className="text-sm text-muted-foreground">{guide.vehicle}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
