import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Database, 
  Satellite, 
  Shield,
  Target,
  Users,
  Zap,
  Droplets,
  TrendingUp,
  Globe,
  Award,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 pt-20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">About FloodGuard AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900 dark:text-white">Protecting Lives with</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Intelligent Technology
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            We're revolutionizing flood management with cutting-edge AI technology, real-time data processing, 
            and intelligent safety systems to protect communities worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: Users, value: "50K+", label: "Active Users" },
              { icon: Globe, value: "100+", label: "Cities Covered" },
              { icon: Target, value: "98%", label: "Accuracy Rate" },
              { icon: Zap, value: "<2min", label: "Response Time" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-3 shadow-lg">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                To provide real-time, AI-powered flood detection and management solutions that save lives, 
                protect property, and empower communities with actionable safety information.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By combining satellite imagery, weather data, and machine learning, we create a comprehensive 
                early warning system that predicts, detects, and responds to flood events with unprecedented accuracy.
              </p>
            </Card>

            <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-cyan-200 dark:border-cyan-800 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                A world where no one is caught off-guard by flooding, where communities are prepared, 
                and where technology serves as a guardian for public safety.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We envision a future where AI-driven flood management becomes the standard, protecting millions 
                of lives and billions in property through intelligent, proactive monitoring and response systems.
              </p>
            </Card>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our cutting-edge tech stack ensures accurate, real-time flood detection and prediction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Deep Learning AI",
                description: "CNN-based models trained on millions of satellite images and historical flood data for 98% accurate prediction.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Satellite,
                title: "Satellite Integration",
                description: "Real-time processing of Sentinel-1 SAR imagery and weather satellite data for comprehensive monitoring.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Database,
                title: "Multi-Source Data",
                description: "Integration of weather forecasts, topography data, IoT sensors, and historical records for precise analysis.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((tech, idx) => (
              <Card key={idx} className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{tech.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{tech.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works - Timeline */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              How FloodGuard AI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Six intelligent steps to keep you safe from flooding
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Data Collection & Processing",
                description: "Continuously ingests data from NOAA weather stations, Copernicus satellites, USGS flood sensors, and local IoT devices. All data processed in real-time using cloud infrastructure.",
                icon: Database
              },
              {
                step: "02",
                title: "AI Analysis & Prediction",
                description: "Deep learning models analyze rainfall patterns, topography, and historical events. U-Net segmentation identifies flood-prone areas with 98% accuracy.",
                icon: Brain
              },
              {
                step: "03",
                title: "Depth Estimation",
                description: "Hydrodynamic models calculate precise water depth (±5cm accuracy) by analyzing terrain elevation, rainfall volume, and drainage capacity.",
                icon: TrendingUp
              },
              {
                step: "04",
                title: "Safety Assessment",
                description: "Generates vehicle safety recommendations based on water depth and flood velocity. Classifies safe vehicle types and flags unsafe conditions.",
                icon: Shield
              },
              {
                step: "05",
                title: "Alert System",
                description: "Automated notifications via email, push, and SMS when approaching flood zones. Includes risk level, depth, and evacuation recommendations.",
                icon: Zap
              },
              {
                step: "06",
                title: "Route Planning",
                description: "Google Maps integration generates alternative routes avoiding flooded areas. Updates in real-time as conditions change.",
                icon: Globe
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Choose FloodGuard AI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Industry-leading features that set us apart
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle2, text: "98% Prediction Accuracy" },
                { icon: CheckCircle2, text: "Real-time Monitoring 24/7" },
                { icon: CheckCircle2, text: "Multi-source Data Integration" },
                { icon: CheckCircle2, text: "Instant Alert Notifications" },
                { icon: CheckCircle2, text: "AI-Powered Predictions" },
                { icon: CheckCircle2, text: "Safe Route Recommendations" },
                { icon: CheckCircle2, text: "Vehicle Safety Assessment" },
                { icon: CheckCircle2, text: "Historical Data Analysis" },
                { icon: CheckCircle2, text: "Community Protection Focus" }
              ].map((feature, idx) => (
                <Card key={idx} className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white font-medium">{feature.text}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="container mx-auto px-4 py-20">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Award-Winning Technology</h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Recognized globally for innovation in disaster management and AI-powered safety solutions
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                "Best AI Innovation 2024",
                "Smart City Award",
                "Public Safety Excellence"
              ].map((award, idx) => (
                <div key={idx} className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-semibold">{award}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white text-center shadow-2xl">
            <Droplets className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Experience FloodGuard AI?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who rely on our AI-powered system for real-time flood protection and safety guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/flood-dashboard">
                <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-lg group">
                  View Live Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
