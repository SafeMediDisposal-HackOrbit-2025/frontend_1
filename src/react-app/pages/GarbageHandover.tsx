import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import WasteBinIcon from '@/react-app/components/WasteBinIcon';

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

export default function GarbageHandover() {
  const location = useLocation();
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

  const trashDetails = [
    { item: analysisResult.type, price: `₹${analysisResult.price.toFixed(4)}` }
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/scan" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-black">
            Garbage Handover
          </h1>
          <WasteBinIcon />
        </div>

        {/* Trash Photo */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-black mb-3">Trash Photo</h2>
          <img
            src={imageData}
            alt="Uploaded waste"
            className="w-full h-44 rounded-2xl object-cover border border-gray-200"
          />
        </div>

        {/* Trash Detected Section */}
        <div className="bg-[#50c2c9] bg-opacity-10 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-black mb-2">
            Trash Detected
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            The price listed is the price in gram unit
          </p>

          {/* Analysis Confidence */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Confidence</span>
              <span className="text-sm font-medium text-black">
                {(analysisResult.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#50c2c9] h-2 rounded-full transition-all duration-300"
                style={{ width: `${analysisResult.confidence * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
              ${analysisResult.category === 'medical' ? 'bg-red-100 text-red-800' :
                analysisResult.category === 'plastic' ? 'bg-blue-100 text-blue-800' :
                analysisResult.category === 'glass' ? 'bg-green-100 text-green-800' :
                analysisResult.category === 'metal' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'}`}>
              {analysisResult.category.toUpperCase()}
            </span>
          </div>

          {/* Details Table */}
          <div className="space-y-3">
            <h4 className="font-semibold text-black">Details</h4>
            {trashDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-gray-700">{detail.item}</span>
                <span className="text-black font-medium">{detail.price}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">{analysisResult.description}</p>
            </div>
          </div>
        </div>

        {/* Hand Over Button */}
        <button className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-medium text-lg
                         hover:bg-[#47b1b8] transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2">
          Hand over the trash
        </button>
      </div>
    </div>
  );
}
