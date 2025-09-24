import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface LocationState {
  imageData?: string;
  weight?: string;
  date?: string;
  time?: string;
}

export default function GarbageSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [copied, setCopied] = useState(false);

  // Mock data - in real app this would come from submission response
  const successData = {
    points: 150,
    redemptionId: '091230192e***',
    wasteType: 'Non-organic Waste',
    weight: state?.weight || '500',
    date: state?.date || 'Wednesday, July 3, 2025',
    totalPoints: 150
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText('091230192e123456');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy ID:', err);
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleSeePoints = () => {
    navigate('/points');
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] flex flex-col">
      {/* Content */}
      <div className="flex-1 px-6 pt-16 pb-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#50c2c9] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Garbage Handover Successful
          </h1>

          {/* Points */}
          <p className="text-2xl font-bold text-[#50c2c9] mb-8">
            +{successData.points} Points
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Status</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Success
            </span>
          </div>

          {/* Redemption ID */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Redemption ID</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">{successData.redemptionId}</span>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
              {copied && (
                <span className="text-xs text-green-600 ml-1">Copied!</span>
              )}
            </div>
          </div>

          {/* Type of Waste */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Type of Waste</span>
            <span className="text-gray-900 font-medium">{successData.wasteType}</span>
          </div>

          {/* Garbage Weight */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Garbage Weight</span>
            <span className="text-gray-900 font-medium">{successData.weight} gram</span>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Date</span>
            <span className="text-gray-900 font-medium">{successData.date}</span>
          </div>

          {/* Total Points */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-gray-900 font-semibold">Total Points</span>
            <span className="text-gray-900 font-semibold">{successData.totalPoints} Points</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-12">
        <div className="space-y-4">
          <button
            onClick={handleBackToHome}
            className="w-full bg-transparent border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold text-lg
                       hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Back to Home
          </button>
          <button
            onClick={handleSeePoints}
            className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                       shadow-lg hover:bg-[#47b1b8] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
          >
            See Points
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
