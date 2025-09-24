import { ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';

interface LocationState {
  imageData: string;
}

export default function GarbageConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const imageData = state?.imageData || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center";

  const handleRetake = () => {
    navigate('/garbage-camera');
  };

  const handleNext = () => {
    navigate('/garbage-form', { state: { imageData } });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center mb-8">
        <Link to="/garbage-camera" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">Garbage Handover</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        {/* Captured Image */}
        <div className="mb-8">
          <div className="w-full max-w-sm mx-auto">
            <img
              src={imageData}
              alt="Captured trash"
              className="w-full h-80 rounded-2xl object-cover shadow-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Image Confirmation
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            Nice picture! Continue to enter the waste drop-off data
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-12">
        <div className="flex gap-4 max-w-sm mx-auto">
          <button
            onClick={handleRetake}
            className="flex-1 bg-transparent border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold text-lg
                       flex items-center justify-center gap-2
                       hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                       flex items-center justify-center gap-2 shadow-lg
                       hover:bg-[#47b1b8] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
          >
            Next
            <ArrowRight className="w-5 h-5" />
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
