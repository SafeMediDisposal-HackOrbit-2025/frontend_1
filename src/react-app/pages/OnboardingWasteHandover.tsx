import { useNavigate } from 'react-router';

export default function OnboardingWasteHandover() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/onboarding/rewards');
  };

  const handlePrevious = () => {
    navigate('/onboarding/welcome');
  };

  const handleSkip = () => {
    navigate('/auth-selection');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with progress */}
      <div className="pt-12 px-6">
        <div className="flex gap-2">
          <div className="flex-1 h-1 bg-[#50c2c9] rounded-full"></div>
          <div className="flex-1 h-1 bg-[#50c2c9] rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          {/* Logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          
          <button 
            onClick={handleSkip}
            className="bg-[#50c2c9] text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-4">
          {/* First image - Proper waste disposal */}
          <div className="w-full h-48 rounded-2xl overflow-hidden">
            <img
              src="https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/medical-waste-disposal.jpg"
              alt="Proper waste disposal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second image - Collection point */}
          <div className="w-full h-56 rounded-2xl overflow-hidden">
            <img
              src="https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/waste-collection-point.jpg"
              alt="Medical waste collection point"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-4">
            Easy Garbage Handover
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Request a waste pickup from your hospitals or drop off your waste directly at the nearest collection point.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg
                       hover:bg-gray-300 transition-colors duration-200"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                       hover:bg-[#47b1b8] transition-colors duration-200"
          >
            Next
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
