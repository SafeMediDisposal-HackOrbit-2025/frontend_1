import { useState, useEffect } from 'react';
import { ChevronLeft, QrCode, Loader, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useQRScanner } from '@/react-app/hooks/useQRScanner';

export default function QRScanner() {
  const navigate = useNavigate();
  const { videoRef, state, startScanning, stopScanning, resetResult } = useQRScanner();
  const [showResult, setShowResult] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    console.log('QRScanner component mounted, starting scanner...');
    startScanning();

    return () => {
      console.log('QRScanner component unmounting, stopping scanner...');
      stopScanning();
    };
  }, [startScanning, stopScanning]);

  useEffect(() => {
    if (state.result) {
      setShowResult(true);
      stopScanning();
    }
  }, [state.result, stopScanning]);

  const handleCopyResult = async () => {
    if (state.result) {
      try {
        await navigator.clipboard.writeText(state.result);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  const handleScanAgain = () => {
    setShowResult(false);
    resetResult();
    startScanning();
  };

  const isURL = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleOpenURL = () => {
    if (state.result && isURL(state.result)) {
      window.open(state.result, '_blank');
    }
  };

  if (showResult && state.result) {
    return (
      <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/home" className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-lg font-bold text-black">QR Code Result</h1>
            <div className="w-6 h-6"></div>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Result Content */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-black mb-4">Scanned Content</h3>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800 text-sm break-all leading-relaxed">
                {state.result}
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyResult}
              className="w-full bg-[#50c2c9] bg-opacity-10 text-[#50c2c9] py-3 rounded-xl font-medium text-sm
                         hover:bg-[#50c2c9] hover:bg-opacity-20 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                         flex items-center justify-center gap-2 mb-3"
            >
              <Copy className="w-4 h-4" />
              {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
            </button>

            {/* Open URL Button */}
            {isURL(state.result) && (
              <button
                onClick={handleOpenURL}
                className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-medium text-sm
                           hover:bg-blue-100 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Open Link
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleScanAgain}
              className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-medium text-lg
                         hover:bg-[#47b1b8] transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
            >
              Scan Another QR Code
            </button>
            
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-medium text-lg
                         hover:bg-gray-200 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-[#50c2c9] to-[#47b1b8]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col h-screen">
          {/* Header */}
          <div className="pt-16 px-6 flex items-center justify-between">
            <Link to="/home" className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-lg font-bold text-white">QR Scanner</h1>
            <div className="w-6 h-6"></div>
          </div>

          {/* Error Content */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="w-80 h-96 border-4 border-white border-opacity-30 rounded-3xl bg-white bg-opacity-10 backdrop-blur-sm overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                  <p className="text-white text-sm mb-4 px-4">{state.error}</p>
                  <button
                    onClick={startScanning}
                    className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom indicator */}
          <div className="pb-16 px-6">
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#50c2c9] to-[#47b1b8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="pt-16 px-6 flex items-center justify-between">
          <Link to="/home" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">QR Scanner</h1>
          <div className="w-6 h-6"></div>
        </div>

        {/* Instructions */}
        <div className="pt-8 px-6 text-center">
          <p className="text-white text-lg opacity-90 mb-2">
            Point your camera at a QR code
          </p>
          <p className="text-white text-sm opacity-75">
            Position the QR code within the frame to scan
          </p>
        </div>

        {/* Camera Preview Area */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-80 h-80 border-4 border-white border-opacity-50 rounded-3xl bg-white bg-opacity-10 backdrop-blur-sm overflow-hidden relative">
            {/* QR Code targeting overlay */}
            <div className="absolute inset-4 border-2 border-white border-opacity-60 rounded-2xl">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-white"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-white"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-white"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-white"></div>
            </div>

            {state.isActive ? (
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
                  {state.isLoading ? (
                    <>
                      <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
                      <p className="text-white text-sm opacity-75">Starting camera...</p>
                    </>
                  ) : (
                    <>
                      <QrCode className="w-12 h-12 text-white opacity-50 mx-auto mb-3" />
                      <p className="text-white text-sm opacity-75">Camera starting...</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Instructions */}
        <div className="pb-16 px-6 text-center">
          <p className="text-white text-sm opacity-75 mb-6">
            Align the QR code within the frame for automatic detection
          </p>
          
          {/* Bottom indicator line */}
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-white bg-opacity-50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
