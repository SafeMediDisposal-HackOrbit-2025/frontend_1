import { useState, useEffect, useRef } from 'react';
import { X, Zap, Settings, RotateCcw, Loader, AlertCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCamera } from '@/react-app/hooks/useCamera';

export default function GarbageCamera() {
  const navigate = useNavigate();
  const { videoRef, state: cameraState, startCamera, stopCamera, capturePhoto } = useCamera();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [rawEnabled, setRawEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    const imageData = capturePhoto();
    if (imageData) {
      stopCamera();
      navigate('/garbage-confirmation', { state: { imageData } });
    }
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        navigate('/garbage-confirmation', { state: { imageData } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    stopCamera();
    navigate('/garbage-welcome');
  };

  if (cameraState.error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Camera Not Available</h2>
          <p className="text-gray-300 mb-6 max-w-md">{cameraState.error}</p>
          <div className="space-y-4">
            <button
              onClick={handleGallerySelect}
              className="bg-[#50c2c9] text-white px-6 py-3 rounded-lg font-semibold block mx-auto min-w-[200px]"
            >
              Upload from Gallery
            </button>
            <button
              onClick={startCamera}
              className="bg-transparent border border-[#50c2c9] text-[#50c2c9] px-6 py-3 rounded-lg font-semibold block mx-auto min-w-[200px]"
            >
              Try Camera Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Camera View */}
      <div className="absolute inset-0">
        {cameraState.isActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center">
              {cameraState.isLoading ? (
                <>
                  <Loader className="w-8 h-8 text-[#50c2c9] animate-spin mx-auto mb-3" />
                  <p className="text-white text-sm opacity-75">Starting camera...</p>
                </>
              ) : (
                <>
                  <Camera className="w-12 h-12 text-white opacity-50 mx-auto mb-3" />
                  <p className="text-white text-sm opacity-75">Camera not available</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-6 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${flashEnabled ? 'bg-yellow-500' : 'bg-black bg-opacity-50'}`}
            >
              <Zap className="w-5 h-5 text-white" />
            </button>

            <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => setRawEnabled(!rawEnabled)}
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${rawEnabled ? 'bg-white text-black' : 'bg-black bg-opacity-50 text-white border border-white'}`}
            >
              RAW
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-12 px-6 z-10">
        {/* Camera Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black bg-opacity-50 rounded-full p-1">
            {['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT', 'PANO'].map((mode, index) => (
              <button
                key={mode}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors
                  ${index === 2 ? 'text-yellow-400' : 'text-white'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-12">
          <button
            onClick={handleGallerySelect}
            className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-white rounded-sm"></div>
          </button>

          <button
            onClick={handleCapture}
            disabled={!cameraState.isActive}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:scale-105 transition-transform duration-150"
          >
            <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"></div>
          </button>

          <button className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
