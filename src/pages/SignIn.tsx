import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Droplets, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Waves, 
  MapPin, 
  Shield, 
  Zap, 
  CheckCircle 
} from 'lucide-react';
import { api } from '@/services/api';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.signin(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/flood-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Shield, label: "Secure Access", color: "from-green-500 to-emerald-500" },
    { icon: Zap, label: "Instant Alerts", color: "from-yellow-500 to-orange-500" },
    { icon: MapPin, label: "Live Tracking", color: "from-blue-500 to-cyan-500" },
    { icon: Waves, label: "AI Powered", color: "from-purple-500 to-pink-500" }
  ];

  const trustItems = [
    { icon: CheckCircle, text: "50K+ Active Users" },
    { icon: CheckCircle, text: "98% Accuracy Rate" },
    { icon: CheckCircle, text: "24/7 Monitoring" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side */}
            <div className="space-y-8 text-center lg:text-left">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-75"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl">
                    <Droplets className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">FloodGuard AI</h1>
                  <p className="text-blue-200 text-sm">Intelligent Flood Protection</p>
                </div>
              </Link>

              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Welcome
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Back
                  </span>
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Sign in to access your personalized flood monitoring dashboard with real-time alerts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {features.map((feature, idx) => (
                  <Card key={idx} className="bg-white/10 backdrop-blur-md border-white/20 p-4 hover:bg-white/15 transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-medium text-sm">{feature.label}</p>
                  </Card>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {trustItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-green-400" />
                    <span className="text-blue-100 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full max-w-md mx-auto">
              <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                
                <div className="relative p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg shadow-blue-500/50">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Sign In</h3>
                    <p className="text-blue-200">Enter your credentials to continue</p>
                  </div>

                  {error && (
                    <Alert className="bg-red-500/20 border-red-400/50 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200 font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-white font-semibold flex items-center gap-2">
                          <Lock className="w-4 h-4 text-blue-400" />
                          Password
                        </Label>
                        <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/5 border-white/20 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="text-sm text-blue-200 cursor-pointer">
                        Keep me signed in
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold text-lg shadow-2xl shadow-blue-500/50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Sign In
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-blue-200 font-medium">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12">
                        Google
                      </Button>
                      <Button type="button" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12">
                        GitHub
                      </Button>
                    </div>
                  </form>

                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-blue-200">
                      New to FloodGuard AI?{' '}
                      <Link to="/signup" className="text-white font-bold hover:text-blue-300 transition-colors">
                        Create an account
                      </Link>
                    </p>
                  </div>
                </div>
              </Card>

              <div className="text-center mt-6">
                <Link to="/" className="text-blue-300 hover:text-white transition-colors inline-flex items-center gap-2 font-medium">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
