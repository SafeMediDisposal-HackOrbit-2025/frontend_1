export default function OTPVerificationIcon() {
  return (
    <div className="w-24 h-24 mx-auto mb-6 relative">
      <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center">
        <div className="relative">
          {/* Phone icon */}
          <div className="w-10 h-14 bg-teal-600 rounded-lg relative">
            <div className="w-8 h-10 bg-white rounded m-1 relative overflow-hidden">
              {/* Message bubbles */}
              <div className="absolute top-1 left-1 w-4 h-1.5 bg-teal-300 rounded-full"></div>
              <div className="absolute top-3 right-1 w-3 h-1.5 bg-teal-500 rounded-full"></div>
              <div className="absolute top-5 left-1 w-5 h-1.5 bg-teal-300 rounded-full"></div>
              <div className="absolute bottom-1 left-1 right-1 h-1 bg-teal-200 rounded"></div>
            </div>
          </div>
          {/* Code verification badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-teal-400 flex items-center justify-center">
            <span className="text-xs font-bold text-teal-600">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
