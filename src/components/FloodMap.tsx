import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "./ui/badge";

// Fix for default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const FloodMap = () => {
  // Mock flood zones data
  const floodZones = [
    { 
      id: 1, 
      position: [37.7749, -122.4194] as [number, number], 
      depth: 45, 
      name: "Downtown Area",
      status: "critical"
    },
    { 
      id: 2, 
      position: [37.7849, -122.4094] as [number, number], 
      depth: 28, 
      name: "Riverside District",
      status: "warning"
    },
    { 
      id: 3, 
      position: [37.7649, -122.4294] as [number, number], 
      depth: 15, 
      name: "North Highway",
      status: "caution"
    },
    { 
      id: 4, 
      position: [37.7949, -122.4394] as [number, number], 
      depth: 8, 
      name: "East Park",
      status: "safe"
    },
  ];

  const getColor = (depth: number) => {
    if (depth >= 40) return "#dc2626"; // danger
    if (depth >= 25) return "#f59e0b"; // warning
    if (depth >= 10) return "#0891b2"; // secondary
    return "#16a34a"; // success
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "warning";
      case "caution": return "secondary";
      case "safe": return "success";
      default: return "default";
    }
  };

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {floodZones.map((zone) => (
          <div key={zone.id}>
            {/* Circle representing flood zone */}
            <Circle
              center={zone.position}
              radius={200 + zone.depth * 5}
              pathOptions={{
                fillColor: getColor(zone.depth),
                fillOpacity: 0.4,
                color: getColor(zone.depth),
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{zone.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Water Depth:</span>
                      <span className="font-semibold">{zone.depth}cm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={getStatusColor(zone.status) as any}>
                        {zone.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Popup>
            </Circle>
            
            {/* Marker for zone center */}
            <Marker position={zone.position}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{zone.name}</h3>
                  <p className="text-sm text-muted-foreground">{zone.depth}cm depth</p>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default FloodMap;
