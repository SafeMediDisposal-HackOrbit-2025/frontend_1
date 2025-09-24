import { useNavigate } from 'react-router';

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/onboarding/waste-handover');
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
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
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
          {/* First image - Biomedical waste */}
          <div className="w-full h-48 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=400&fit=crop&crop=center"
              alt="Biomedical waste"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second image - Sterilization process */}
          <div className="w-full h-56 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=400&fit=crop&crop=center"
              alt="Sterilization process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-4">
            Welcome to SafeMediDisposal
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Together we create a cleaner and greener environment by managing waste efficiently.
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                     hover:bg-[#47b1b8] transition-colors duration-200"
        >
          Next
        </button>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
