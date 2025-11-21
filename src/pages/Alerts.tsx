import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  MapPin,
  Waves,
  Shield,
  Clock
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const Alerts = () => {
  const [email, setEmail] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [frequency, setFrequency] = useState<"realtime" | "hourly" | "daily">("realtime");
  const [quietHours, setQuietHours] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Alert preferences saved successfully!");
  };

  const recentAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Severe Flooding Detected",
      location: "Downtown Area",
      time: "5 minutes ago",
      depth: "45cm",
    },
    {
      id: 2,
      type: "warning",
      title: "Rising Water Levels",
      location: "Riverside District",
      time: "15 minutes ago",
      depth: "28cm",
    },
    {
      id: 3,
      type: "info",
      title: "Flood Watch Active",
      location: "North Highway",
      time: "1 hour ago",
      depth: "15cm",
    },
  ];

  const activeChannels = [emailAlerts, pushAlerts, smsAlerts].filter(Boolean).length;
  const criticalCount = recentAlerts.filter((a) => a.type === "critical").length;
  const warningCount = recentAlerts.filter((a) => a.type === "warning").length;

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-amber-400";
      case "info":
        return "bg-sky-400";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 pt-24 pb-12 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl space-y-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/40">
              <Bell className="h-4 w-4 text-sky-300" />
              <span className="text-xs font-medium text-sky-100">
                Proactive flood notifications
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Alert Management
            </h1>
            <p className="text-sky-100/80 max-w-xl text-sm md:text-base">
              Design exactly how FloodGuard AI should warn you when water levels
              rise near your home, routes, and saved locations.
            </p>
          </div>

          <Card className="w-full lg:max-w-sm bg-white/5 backdrop-blur-md border-white/10 px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/40">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-sky-200/80">
                  Today's snapshot
                </p>
                <p className="text-2xl font-semibold text-white leading-tight">
                  {criticalCount} critical, {warningCount} warning
                </p>
                <p className="text-xs text-sky-100/70 mt-1">
                  Based on recent detections around your region
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border-white/10 p-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">
                  Alert Preferences
                </h2>
                <p className="text-xs md:text-sm text-sky-100/80">
                  Choose how, how often, and through which channels you want to
                  be notified.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/40 px-3 py-1">
                <Waves className="h-4 w-4 text-sky-300" />
                <span className="text-xs text-sky-100/80">
                  {activeChannels} of 3 channels active
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sky-50 text-sm">
                    Primary alert email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-950/40 border-white/15 text-sky-50 placeholder:text-slate-400"
                  />
                  <p className="text-xs text-sky-100/70">
                    Critical alerts and weekly flood risk summaries will be sent
                    to this address.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sky-50 text-sm">Alert frequency</Label>
                  <Select
                    value={frequency}
                    onValueChange={(value) =>
                      setFrequency(value as "realtime" | "hourly" | "daily")
                    }
                  >
                    <SelectTrigger className="bg-slate-950/40 border-white/15 text-sky-50">
                      <SelectValue placeholder="Choose frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">
                        Real-time — Get notified as soon as we detect risk
                      </SelectItem>
                      <SelectItem value="hourly">
                        Hourly digest — Group alerts into hourly summaries
                      </SelectItem>
                      <SelectItem value="daily">
                        Daily overview — One concise report per day
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 text-xs text-sky-100/80">
                    <Clock className="h-3.5 w-3.5 text-sky-300" />
                    <span>
                      Current mode: {frequency === "realtime" ? "Real-time" : frequency === "hourly" ? "Hourly" : "Daily"}
                      
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-sky-50">
                    Notification channels
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-slate-950/40 p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-sky-300" />
                      <div>
                        <p className="font-medium text-sky-50 text-sm">
                          Email notifications
                        </p>
                        <p className="text-xs text-sky-100/70">
                          Detailed alerts, reports, and route suggestions.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-slate-950/40 p-4">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-sky-300" />
                      <div>
                        <p className="font-medium text-sky-50 text-sm">
                          Push notifications
                        </p>
                        <p className="text-xs text-sky-100/70">
                          Subtle browser alerts while you're online.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={pushAlerts}
                      onCheckedChange={setPushAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-slate-950/40 p-4 opacity-70">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-sky-300" />
                      <div>
                        <p className="font-medium text-sky-50 text-sm">
                          SMS alerts
                        </p>
                        <p className="text-xs text-sky-100/70">
                          Text message alerts (coming soon).
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={smsAlerts}
                      onCheckedChange={setSmsAlerts}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-sky-50">
                    Alert thresholds & quiet mode
                  </h3>

                  <div className="space-y-3">
                    {[
                      { level: "Critical", depth: "40cm+", color: "danger" },
                      { level: "Warning", depth: "25-40cm", color: "warning" },
                      { level: "Caution", depth: "10-25cm", color: "secondary" },
                    ].map((threshold) => (
                      <div
                        key={threshold.level}
                        className="flex items-center justify-between rounded-lg bg-slate-950/40 p-3 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${threshold.color}`}></div>
                          <div>
                            <p className="font-medium text-sky-50 text-sm">
                              {threshold.level}
                            </p>
                            <p className="text-xs text-sky-100/70">
                              Trigger alerts when water depth reaches {threshold.depth}
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-slate-950/40 p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-sky-50 text-sm">
                          Night-time quiet hours
                        </p>
                        <p className="text-xs text-sky-100/70">
                          Only critical alerts between 11 PM and 6 AM.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={quietHours}
                      onCheckedChange={setQuietHours}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
                <div className="text-xs text-sky-100/70 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Changes take effect immediately for upcoming detections.
                  </span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-8 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white border-0"
                >
                  Save preferences
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-5">
              <p className="text-xs uppercase tracking-wide text-sky-200/80 mb-3">
                Alert health
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-sky-300" />
                    <span className="text-sky-50">Channels active</span>
                  </div>
                  <span className="text-sky-100 font-semibold">
                    {activeChannels} / 3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sky-50">Critical alerts tracked</span>
                  </div>
                  <span className="text-sky-100 font-semibold">
                    {criticalCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-300" />
                    <span className="text-sky-50">Current mode</span>
                  </div>
                  <span className="text-sky-100 font-semibold capitalize">
                    {frequency}
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400"
                    style={{ width: `${(activeChannels / 3) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-950/60 backdrop-blur-md border-white/10 p-5">
              <h2 className="text-lg font-semibold text-white mb-2">
                Recent alerts near you
              </h2>
              <p className="text-xs text-sky-100/70 mb-4">
                A condensed stream of the latest detections from your monitored
                areas.
              </p>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className="relative pl-8 pb-6 last:pb-0"
                  >
                    {index !== recentAlerts.length - 1 && (
                      <div className="absolute left-3.5 top-4 bottom-0 w-px bg-slate-700" />
                    )}
                    <div
                      className={`absolute left-2.5 top-3 w-3 h-3 rounded-full border border-slate-950 shadow-sm ${getAlertColor(
                        alert.type,
                      )}`}
                    />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-xl bg-slate-900/70 border border-white/10">
                        <AlertTriangle
                          className={`h-4 w-4 ${getAlertColor(alert.type).replace(
                            "bg-",
                            "text-",
                          )}`}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-sm text-sky-50">
                            {alert.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase tracking-wide bg-white/5 border-white/20 text-sky-100"
                          >
                            {alert.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-sky-100/70">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                          <span className="mx-1">&middot;</span>
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] text-sky-100/70">
                            Estimated depth: <span className="font-semibold">{alert.depth}</span>
                          </span>
                          <span className="text-[11px] text-emerald-300">
                            Path analysis available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 bg-gradient-hero text-white border-0 shadow-xl shadow-sky-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Bell className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Stay informed, not overwhelmed
              </h3>
              <p className="text-white/90 mb-4 text-sm md:text-base">
                Enable location services so we can prioritize alerts for the
                streets and neighborhoods you actually travel through.
              </p>
              <Button
                variant="secondary"
                className="gap-2 bg-white text-sky-900 hover:bg-slate-100"
              >
                <MapPin className="h-4 w-4" />
                Enable location-based alerts
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;