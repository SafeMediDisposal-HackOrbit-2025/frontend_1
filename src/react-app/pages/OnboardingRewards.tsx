import { useNavigate } from 'react-router';

export default function OnboardingRewards() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/role-selection');
  };

  const handlePrevious = () => {
    navigate('/onboarding/waste-handover');
  };

  const handleSkip = () => {
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with progress */}
      <div className="pt-12 px-6">
        <div className="flex gap-2">
          <div className="flex-1 h-1 bg-[#50c2c9] rounded-full"></div>
          <div className="flex-1 h-1 bg-[#50c2c9] rounded-full"></div>
          <div className="flex-1 h-1 bg-[#50c2c9] rounded-full"></div>
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
          {/* First image - Money and coins */}
          <div className="w-full h-48 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center"
              alt="Money and rewards"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second image - Rewards app/phone */}
          <div className="w-full h-56 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center"
              alt="Rewards app"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-4">
            Redeem Points for Rewards
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Collect points from each waste drop-off and redeem them for various attractive prizes.
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
            onClick={handleGetStarted}
            className="flex-1 bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                       hover:bg-[#47b1b8] transition-colors duration-200"
          >
            Get Started
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
