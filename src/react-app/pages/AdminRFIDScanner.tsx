import { useState, useEffect } from 'react';
import { ChevronLeft, Radio, Loader, AlertCircle, CheckCircle, Copy, Wifi, WifiOff, Upload, Camera, QrCode } from 'lucide-react';
import { Link } from 'react-router';
import { useRFIDScanner } from '@/react-app/hooks/useRFIDScanner';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

export default function AdminRFIDScanner() {
  const { state, startScanning, stopScanning, resetResult, simulateRFIDScan } = useRFIDScanner();
  const [showResult, setShowResult] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [scanMode] = useState<'container' | 'staff' | 'equipment'>('container');
  const [scannedItems, setScannedItems] = useState<Array<{
    id: string;
    data: string;
    timestamp: string;
    type: string;
    mode: string;
  }>>([]);

  useEffect(() => {
    if (state.result) {
      setShowResult(true);
      
      // Add to scanned items history
      const newItem = {
        id: Date.now().toString(),
        data: state.result,
        timestamp: new Date().toLocaleTimeString(),
        type: getTagType(state.result),
        mode: scanMode
      };
      
      setScannedItems(prev => [newItem, ...prev.slice(0, 4)]);
    }
  }, [state.result]);

  const getTagType = (data: string) => {
    if (data.includes('Staff ID') || data.includes('EMP')) return 'Staff';
    if (data.includes('Container') || data.includes('Waste')) return 'Container';
    if (data.includes('Equipment') || data.includes('Medical')) return 'Equipment';
    if (data.includes('URL') || data.includes('http')) return 'URL';
    return 'Unknown';
  };

  const getTagIcon = (type: string) => {
    switch (type) {
      case 'Staff': return '👤';
      case 'Container': return '🗂️';
      case 'Equipment': return '⚕️';
      case 'URL': return '🔗';
      default: return '🏷️';
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case 'Staff': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Container': return 'bg-[#50c2c9] bg-opacity-10 border-[#50c2c9] border-opacity-30 text-[#50c2c9]';
      case 'Equipment': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'URL': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

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
  };

  const isURL = (text: string) => {
    try {
      new URL(text.split('URL: ')[1] || text);
      return true;
    } catch {
      return false;
    }
  };

  const handleOpenURL = () => {
    if (state.result && isURL(state.result)) {
      const url = state.result.includes('URL: ') ? state.result.split('URL: ')[1] : state.result;
      window.open(url, '_blank');
    }
  };

  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] via-[#F0F8F8] to-[#F5F9F9] pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <QrCode className="w-6 h-6 text-[#50c2c9]" />
              <h1 className="text-xl font-semibold text-gray-900">Smart RFID Scanner</h1>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Scanner Error</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{state.error}</p>
            <div className="space-y-3 max-w-xs mx-auto">
              <button
                onClick={startScanning}
                className="w-full bg-[#50c2c9] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#47b1b8] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={simulateRFIDScan}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Demo Mode
              </button>
            </div>
          </div>
        </div>

        <AdminBottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <QrCode className="w-6 h-6 text-[#50c2c9]" />
              <h1 className="text-xl font-semibold text-gray-900">Smart RFID Scanner</h1>
            </div>
          </div>
          
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Main Scanner Section */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Scan Medical Waste RFID Tags</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quickly identify and track your medical waste items by scanning their RFID tags. 
              Choose to use live scanning or simulate demo data for testing purposes.
            </p>
          </div>

          

          {/* Scanning Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Live Scanner */}
            <div className="border-2 border-dashed border-[#50c2c9] rounded-xl p-8 text-center hover:border-[#47b1b8] transition-colors cursor-pointer"
                 onClick={state.isActive ? () => {} : startScanning}>
              <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
                {state.isActive ? (
                  <Radio className="w-8 h-8 text-[#50c2c9] animate-pulse" />
                ) : state.isLoading ? (
                  <Loader className="w-8 h-8 text-[#50c2c9] animate-spin" />
                ) : (
                  <Radio className="w-8 h-8 text-[#50c2c9]" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Scanner</h3>
              <p className="text-gray-600 text-sm mb-4">
                {state.isActive ? 'Scanner is active and ready' : 'Use your device RFID reader for real-time scanning'}
              </p>
              {!state.isActive && !state.isLoading && (
                <button 
                  onClick={startScanning}
                  className="bg-[#50c2c9] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#47b1b8] transition-colors"
                >
                  Start Scanning
                </button>
              )}
              {state.isActive && (
                <div className="flex items-center justify-center gap-2 text-[#50c2c9] font-medium">
                  <div className="w-2 h-2 bg-[#50c2c9] rounded-full animate-pulse"></div>
                  Ready to scan
                </div>
              )}
            </div>

            {/* Demo Scanner */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                 onClick={state.isActive ? simulateRFIDScan : () => {}}>
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Mode</h3>
              <p className="text-gray-600 text-sm mb-4">
                Simulate RFID tag scanning for testing and demonstration purposes
              </p>
              <button 
                onClick={simulateRFIDScan}
                disabled={!state.isActive}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simulate Scan
              </button>
            </div>
          </div>

          {/* Current Scan Result */}
          {showResult && state.result && (
            <div className="border-2 border-green-200 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-[#50c2c9]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Tag Successfully Detected</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-gray-800 font-mono text-sm break-all">{state.result}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyResult}
                      className="bg-[#50c2c9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#47b1b8] transition-colors flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleScanAgain}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Clear
                    </button>
                    {isURL(state.result) && (
                      <button
                        onClick={handleOpenURL}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Open Link
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scan Results Section */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#50c2c9] bg-opacity-10 rounded-lg flex items-center justify-center">
              <Radio className="w-4 h-4 text-[#50c2c9]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Scan Results</h3>
          </div>
          
          {scannedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Ready to scan RFID tags. Start scanning to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scannedItems.map((item, index) => (
                <div key={item.id} className={`border rounded-xl p-4 hover:border-[#50c2c9] transition-all duration-200 ${
                  index === 0 ? 'border-[#50c2c9] bg-gradient-to-br from-[#50c2c9]/10 to-[#50c2c9]/5' : 'border-gray-200 hover:bg-gradient-to-br hover:from-[#50c2c9]/5 hover:to-[#50c2c9]/2'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <Radio className="w-5 h-5 text-[#50c2c9]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium text-gray-900 truncate">{item.data}</p>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-[#50c2c9] text-white text-xs font-medium rounded">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{item.timestamp}</span>
                        <span>{item.mode} mode</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTagColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AdminBottomNavigation />
    </div>
  );
}
