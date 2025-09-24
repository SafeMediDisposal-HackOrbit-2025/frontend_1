import { useState, useEffect, useRef } from 'react';
import { Triangle, Camera, X, Loader, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import BottomNavigation from '@/react-app/components/BottomNavigation';
import { useCamera } from '@/react-app/hooks/useCamera';
import { useImageAnalysis } from '@/react-app/hooks/useImageAnalysis';

export default function WasteScan() {
  const navigate = useNavigate();
  const { videoRef, state: cameraState, startCamera, stopCamera, capturePhoto } = useCamera();
  const { state: analysisState, analyzeImage, resetAnalysis } = useImageAnalysis();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('WasteScan component mounted, starting camera...');
    // Start camera when component mounts
    startCamera();

    // Cleanup when component unmounts
    return () => {
      console.log('WasteScan component unmounting, stopping camera...');
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleCapture = async () => {
    const imageData = capturePhoto();
    if (imageData) {
      setCapturedImage(imageData);
      stopCamera();
      
      // Analyze the captured image
      const result = await analyzeImage(imageData);
      if (result) {
        // Navigate to scan results with the analysis result
        navigate('/scan-results', { 
          state: { 
            imageData, 
            analysisResult: result 
          } 
        });
      }
    }
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        stopCamera();
        
        // Analyze the selected image
        const result = await analyzeImage(imageData);
        if (result) {
          navigate('/scan-results', { 
            state: { 
              imageData, 
              analysisResult: result 
            } 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    resetAnalysis();
    startCamera();
  };

  const handleDemoScan = async () => {
    // Demo image for testing - medical waste
    const demoImageUrl = "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&crop=center";
    
    try {
      // Convert URL to base64 for demo
      const response = await fetch(demoImageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onload = async () => {
        const imageData = reader.result as string;
        setCapturedImage(imageData);
        
        // Analyze the demo image
        const result = await analyzeImage(imageData);
        if (result) {
          navigate('/scan-results', { 
            state: { 
              imageData, 
              analysisResult: result 
            } 
          });
        }
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Demo scan failed:', error);
    }
  };

  if (cameraState.error) {
    return (
      <div className="min-h-screen relative" 
           style={{
             backgroundImage: 'url(https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&crop=center)',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        {/* Blurred background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
        
        <div className="relative z-10 flex flex-col h-screen">
          {/* Header */}
          <div className="pt-16 px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">
              Waste Scan
            </h1>
            <p className="text-white text-lg opacity-90">
              To get information on the type of waste
            </p>
          </div>

          {/* Camera Preview Area */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="w-80 h-96 border-4 border-[#50c2c9] rounded-3xl bg-white bg-opacity-10 backdrop-blur-sm overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-white text-sm mb-4">Camera not available</p>
                  <div className="space-y-3">
                    <button
                      onClick={handleGallerySelect}
                      className="bg-[#50c2c9] text-white px-6 py-3 rounded-lg font-semibold block mx-auto"
                    >
                      Upload from Gallery
                    </button>
                    <button
                      onClick={handleDemoScan}
                      className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold block mx-auto"
                    >
                      Try Demo Scan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pb-32 px-6">
            <div className="flex justify-center items-center gap-16">
              <button 
                onClick={handleGallerySelect}
                className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Triangle className="w-6 h-6 text-white" />
              </button>
              
              <button 
                onClick={handleDemoScan}
                className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
              </button>
              
              <button 
                onClick={handleGallerySelect}
                className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Bottom indicator line */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" 
         style={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&crop=center)',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="pt-16 px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Waste Scan
          </h1>
          <p className="text-white text-lg opacity-90">
            To get information on the type of waste
          </p>
        </div>

        {/* Camera Preview Area */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-80 h-96 border-4 border-[#50c2c9] rounded-3xl bg-white bg-opacity-10 backdrop-blur-sm overflow-hidden relative">
            {capturedImage ? (
              <>
                <img 
                  src={capturedImage} 
                  alt="Captured waste" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRetake}
                  className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                {analysisState.isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="text-center">
                      <Loader className="w-8 h-8 text-[#50c2c9] animate-spin mx-auto mb-2" />
                      <p className="text-white text-sm">Analyzing waste...</p>
                    </div>
                  </div>
                )}
              </>
            ) : cameraState.isActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  {cameraState.isLoading ? (
                    <>
                      <Loader className="w-8 h-8 text-[#50c2c9] animate-spin mx-auto mb-3" />
                      <p className="text-white text-sm opacity-75">Starting camera...</p>
                    </>
                  ) : (
                    <>
                      <Camera className="w-12 h-12 text-white opacity-50 mx-auto mb-3" />
                      <p className="text-white text-sm opacity-75">Camera starting...</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="pb-32 px-6">
          <div className="flex justify-center items-center gap-16">
            <button 
              onClick={handleGallerySelect}
              className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center"
              disabled={analysisState.isAnalyzing}
            >
              <Triangle className="w-6 h-6 text-white" />
            </button>
            
            <button 
              onClick={handleCapture}
              className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!cameraState.isActive || analysisState.isAnalyzing}
            >
              <div className="w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
            </button>
            
            <button 
              onClick={handleGallerySelect}
              className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center"
              disabled={analysisState.isAnalyzing}
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {/* Bottom indicator line */}
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hidden file input for gallery selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
