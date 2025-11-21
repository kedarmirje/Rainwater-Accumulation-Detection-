import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Video, Camera, X, Loader2, CheckCircle, AlertTriangle, Brain } from 'lucide-react';

export default function FloodDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !isWebcamActive) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        waterDetected: Math.random() > 0.3,
        depth: Math.floor(Math.random() * 60) + 10,
        riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        confidence: (Math.random() * 20 + 80).toFixed(1),
        recommendations: [
          'Avoid crossing this area',
          'Water depth exceeds safe vehicle clearance',
          'Consider alternative routes'
        ]
      };
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsWebcamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setSelectedFile(null);
      setPreview(null);
      setResult(null);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access webcam. Please check permissions.');
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsWebcamActive(false);
    setResult(null);
  };

  const captureFromWebcam = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setPreview(imageData);
        stopWebcam();
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-300';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 border-green-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-cyan-400" />
          AI Flood Detection
        </CardTitle>
        <p className="text-blue-200 text-sm">Upload images/videos or use live webcam to detect water accumulation</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Options */}
        {!preview && !isWebcamActive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="h-32 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-400/50 flex flex-col gap-2"
              variant="outline"
            >
              <Upload className="w-8 h-8 text-blue-400" />
              <span className="text-white font-medium">Upload Image</span>
              <span className="text-xs text-blue-300">JPG, PNG</span>
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="h-32 bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-400/50 flex flex-col gap-2"
              variant="outline"
            >
              <Video className="w-8 h-8 text-purple-400" />
              <span className="text-white font-medium">Upload Video</span>
              <span className="text-xs text-purple-300">MP4, MOV</span>
            </Button>

            <Button
              onClick={startWebcam}
              className="h-32 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400/50 flex flex-col gap-2"
              variant="outline"
            >
              <Camera className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-medium">Live Webcam</span>
              <span className="text-xs text-cyan-300">Real-time</span>
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Webcam View */}
        {isWebcamActive && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  onClick={captureFromWebcam}
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture
                </Button>
                <Button
                  onClick={stopWebcam}
                  size="sm"
                  variant="destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
              <Button
                onClick={clearSelection}
                size="sm"
                variant="destructive"
                className="absolute top-4 right-4"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Analyze Water Accumulation
                </>
              )}
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-in slide-in-from-bottom">
            <Alert className={`border-2 ${getRiskColor(result.riskLevel)}`}>
              <div className="flex items-start gap-3">
                {result.waterDetected ? (
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription>
                    <div className="font-bold text-lg mb-2">
                      {result.waterDetected ? 'Water Detected!' : 'No Significant Water Detected'}
                    </div>
                    {result.waterDetected && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm opacity-80">Estimated Depth:</span>
                            <div className="text-2xl font-bold">{result.depth} cm</div>
                          </div>
                          <div>
                            <span className="text-sm opacity-80">Risk Level:</span>
                            <div className="text-2xl font-bold capitalize">{result.riskLevel}</div>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm opacity-80">AI Confidence:</span>
                          <div className="text-xl font-bold">{result.confidence}%</div>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {result.waterDetected && (
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Safety Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-100">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
