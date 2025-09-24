export default function NewPasswordIcon() {
  return (
    <div className="w-24 h-24 mx-auto mb-6 relative">
      <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center">
        <div className="relative">
          {/* Shield/Security icon */}
          <div className="w-12 h-14 relative">
            <div className="w-12 h-14 bg-teal-600 rounded-lg relative">
              <div className="absolute inset-2 bg-white rounded flex items-center justify-center">
                {/* Lock icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-teal-600">
                  <path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Key icon overlay */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-teal-400 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-teal-600">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
