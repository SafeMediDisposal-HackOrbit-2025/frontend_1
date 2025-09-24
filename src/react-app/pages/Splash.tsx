import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6cf] to-[#7dd3fc] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Main Logo */}
      <div className="relative animate-[float_3s_ease-in-out_infinite]">
        <img
          src="logo.png" // or wherever your logo file is
          alt="App Logo"
          className="w-120 h-120 object-contain" // bigger size
        />
      </div>

      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-8 animate-pulse">
        <div className="w-32 h-1 bg-[#2C3E50] bg-opacity-40 rounded-full overflow-hidden">
          <div className="h-full bg-[#2C3E50] rounded-full w-0 animate-[loadingBar_3s_ease-in-out_forwards]"></div>
        </div>
      </div>

      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-[float_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-16 w-1 h-1 bg-white bg-opacity-40 rounded-full animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-white bg-opacity-20 rounded-full animate-[float_3s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-[float_4s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute bottom-48 right-12 w-2 h-2 bg-white bg-opacity-25 rounded-full animate-[float_5s_ease-in-out_infinite_2s]"></div>
      </div>
    </div>
  );
}
