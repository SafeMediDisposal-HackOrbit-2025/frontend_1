export default function PasswordResetIcon() {
  return (
    <div className="w-24 h-24 mx-auto mb-6 relative">
      <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center">
        <div className="relative">
          {/* Email icon background */}
          <div className="w-12 h-8 bg-teal-100 rounded border-2 border-teal-300 relative">
            <div className="absolute inset-x-1 top-1">
              <div className="w-full h-0.5 bg-teal-400"></div>
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-teal-400 mx-auto mt-0.5"></div>
            </div>
          </div>
          {/* Lock icon overlay */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-teal-400 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-teal-600">
              <path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
