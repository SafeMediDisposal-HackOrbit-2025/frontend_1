import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

interface WasteAnalysisResult {
  type: string;
  confidence: number;
  price: number;
  description: string;
  category: 'medical' | 'plastic' | 'glass' | 'metal' | 'organic' | 'hazardous';
}

interface LocationState {
  imageData: string;
  analysisResult: WasteAnalysisResult;
}

export default function ScanResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Default data if no state is passed
  const imageData = state?.imageData || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center";
  const analysisResult = state?.analysisResult || {
    type: 'Plastic syringes',
    confidence: 0.92,
    price: 0.5395,
    description: 'Medical plastic syringes detected',
    category: 'medical' as const
  };

  const handleScanAnother = () => {
    navigate('/scan');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'plastic':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'glass':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'metal':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'organic':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hazardous':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center mb-6">
        <Link to="/scan" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">Scan Results</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        {/* Scanned Image */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Scanned Image</h2>
          <div className="w-full">
            <img
              src={imageData}
              alt="Scanned waste"
              className="w-full h-64 rounded-2xl object-cover shadow-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">AI Analysis Results</h3>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(analysisResult.category)}`}>
              {analysisResult.category.toUpperCase()}
            </div>
          </div>

          {/* Waste Type */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Waste Type Detected</p>
            <p className="text-lg font-semibold text-gray-900">{analysisResult.type}</p>
          </div>

          {/* Confidence Level */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Confidence Level</span>
              <span className="text-sm font-semibold text-gray-900">
                {(analysisResult.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] h-3 rounded-full transition-all duration-500"
                style={{ width: `${analysisResult.confidence * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Estimated Value */}
          <div className="mb-4 p-4 bg-[#50c2c9] bg-opacity-10 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Estimated Value (per gram)</p>
            <p className="text-2xl font-bold text-[#50c2c9]">₹{analysisResult.price.toFixed(4)}</p>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-1">Description</p>
            <p className="text-gray-800 text-sm leading-relaxed">{analysisResult.description}</p>
          </div>
        </div>

        {/* Information Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 text-sm leading-relaxed">
            <strong>Note:</strong> This analysis is provided for informational purposes only. 
            For actual waste disposal and earning points, please use the Waste Deposit feature 
            from the main menu.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-12">
        <div className="space-y-4">
          <button
            onClick={handleScanAnother}
            className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                       shadow-lg hover:bg-[#47b1b8] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                       flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Scan Another Item
          </button>
          
          <Link
            to="/home"
            className="w-full bg-transparent border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold text-lg
                       hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                       flex items-center justify-center gap-2"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
