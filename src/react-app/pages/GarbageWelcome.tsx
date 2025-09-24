import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function GarbageWelcome() {
  const navigate = useNavigate();

  const handleOpenCamera = () => {
    navigate('/garbage-camera');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F8F8] to-[#F5F9F9] flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center">
        <Link to="/home" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">Garbage Handover</h1>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="text-center">
          {/* People collecting trash illustration */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop&crop=center"
              alt="People collecting trash"
              className="w-64 h-64 mx-auto rounded-3xl object-cover shadow-lg"
            />
            {/* Recycle symbol overlay */}
            <div className="relative -mt-16 flex justify-center">
              <div className="w-16 h-16 bg-[#50c2c9] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Garbage Handover
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xs mx-auto">
            Deposit your trash and collect points easily! Every time you drop off your trash
          </p>
        </div>
      </div>

      {/* Open Camera Button */}
      <div className="px-6 pb-12">
        <button
          onClick={handleOpenCamera}
          className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                     flex items-center justify-center gap-3 shadow-lg
                     hover:bg-[#47b1b8] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
        >
          <Camera className="w-6 h-6" />
          Open Camera
        </button>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
