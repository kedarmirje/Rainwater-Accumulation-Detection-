import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import FloodDetection from "@/components/FloodDetection";
import { 
  Droplets, 
  AlertTriangle, 
  MapPin, 
  Shield,
  Zap,
  Brain,
  Waves,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Smartphone
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-200 text-sm font-medium">AI-Powered Flood Detection</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">Stay Safe</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    During Floods
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed">
                  Real-time waterlogging detection powered by AI. Get instant alerts, 
                  depth estimation, and safe route recommendations to protect you and your community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/flood-dashboard">
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/50 group">
                      <MapPin className="h-5 w-5" />
                      View Live Dashboard
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="gap-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 hover:text-white backdrop-blur-sm">
                      Get Started Free
                      <Waves className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-blue-200 text-sm">98% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-blue-200 text-sm">24/7 Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-blue-200 text-sm">Real-time Alerts</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard Preview */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-30"></div>
                <Card className="relative bg-white/10 backdrop-blur-md border-white/20 p-6 rounded-3xl shadow-2xl">
                  <div className="space-y-4">
                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm p-4 rounded-xl border border-red-400/30">
                        <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
                        <p className="text-2xl font-bold text-white">3</p>
                        <p className="text-red-200 text-sm">Critical Zones</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30">
                        <MapPin className="h-8 w-8 text-blue-400 mb-2" />
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-blue-200 text-sm">Areas Monitored</p>
                      </div>
                    </div>
                    
                    {/* Live Activity */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Live Updates</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { area: "Connaught Place", depth: "45cm", status: "high" },
                          { area: "Kashmere Gate", depth: "65cm", status: "critical" },
                          { area: "Noida Sector 18", depth: "25cm", status: "medium" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">{item.area}</span>
                            <span className={`font-bold ${
                              item.status === 'critical' ? 'text-red-400' : 
                              item.status === 'high' ? 'text-orange-400' : 'text-yellow-400'
                            }`}>{item.depth}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, value: "50K+", label: "Active Users" },
              { icon: MapPin, value: "100+", label: "Cities Covered" },
              { icon: Clock, value: "<2min", label: "Response Time" },
              { icon: TrendingUp, value: "98%", label: "Accuracy Rate" },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:scale-105 transition-transform">
                <stat.icon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Detection Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Try Our AI Detection
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Upload images or videos, or use your webcam to detect water accumulation in real-time
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FloodDetection />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Your Safety
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Advanced AI technology combined with real-time data to keep you informed and protected
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI-Powered Detection",
                description: "Deep learning models analyze satellite imagery and weather patterns for accurate flood prediction",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Droplets,
                title: "Real-Time Depth Monitoring",
                description: "Precise water depth measurement with ±5cm accuracy using advanced sensors and topography data",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Vehicle Safety Analysis",
                description: "Smart recommendations on safe vehicle types based on current flood conditions and clearance",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: AlertTriangle,
                title: "Instant Alerts",
                description: "Automated notifications via email and push when flood risks are detected in your area",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: MapPin,
                title: "Safe Route Planning",
                description: "Alternative route suggestions avoiding flooded areas with real-time traffic integration",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Live Updates",
                description: "Continuous monitoring with data streams from weather stations and IoT sensors network",
                gradient: "from-yellow-500 to-orange-500"
              },
            ].map((feature, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur-md border-white/20 p-6 hover:bg-white/15 transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Four simple steps to comprehensive flood protection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                step: "01", 
                title: "Data Collection", 
                desc: "Gather real-time data from satellites, weather stations, and IoT sensors across the region",
                icon: Smartphone
              },
              { 
                step: "02", 
                title: "AI Analysis", 
                desc: "Process data using trained ML models to identify flood-prone areas and predict water levels",
                icon: Brain
              },
              { 
                step: "03", 
                title: "Risk Assessment", 
                desc: "Calculate flood depth, assess vehicle safety, and determine severity for affected areas",
                icon: AlertTriangle
              },
              { 
                step: "04", 
                title: "Alert & Guide", 
                desc: "Send instant alerts and provide alternative safe routes to keep you protected",
                icon: Shield
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30"></div>
                )}
                
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-2xl mb-4 relative z-10 shadow-lg shadow-blue-500/50">
                    {item.step}
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                    <item.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 border-0 p-12 text-center shadow-2xl shadow-blue-500/50">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Stay Safe?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join thousands of users who rely on FloodGuard AI for real-time flood protection and safety guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-lg group">
                  <MapPin className="h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/flood-dashboard">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                  <AlertTriangle className="h-5 w-5" />
                  View Live Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-400" />
              <span className="text-white font-bold text-xl">FloodGuard AI</span>
            </div>
            <div className="flex gap-6 text-blue-200 text-sm">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/flood-dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link to="/signin" className="hover:text-white transition-colors">Sign In</Link>
            </div>
            <p className="text-blue-300 text-sm">
              © 2024 FloodGuard AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
