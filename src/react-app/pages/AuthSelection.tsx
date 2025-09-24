import { useNavigate } from 'react-router';
import { Mail, Phone } from 'lucide-react';

export default function AuthSelection() {
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    navigate('/login');
  };

  const handleGoogleLogin = () => {
    // Navigate to a Google-specific auth flow
    navigate('/login?method=google');
  };

  const handlePhoneLogin = () => {
    // Navigate to phone authentication page
    navigate('/phone-auth');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 pb-8">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        <div className="text-center animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Choose how you'd like to continue with SafeMediDisposal
          </p>
        </div>
      </div>

      {/* Authentication Options */}
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto space-y-4">
          
          {/* Continue with Google */}
          <div className="animate-[slideInUp_0.6s_ease-out_0.4s_both]">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 rounded-xl p-5 
                         hover:border-gray-400 hover:shadow-md active:scale-[0.98]
                         transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center
                               group-hover:bg-gray-200 transition-colors duration-200">
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base font-medium text-gray-900">
                    Continue with Google
                  </div>
                  <div className="text-sm text-gray-500">
                    Quick and secure authentication
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Continue with Email */}
          <div className="animate-[slideInUp_0.6s_ease-out_0.6s_both]">
            <button
              onClick={handleEmailLogin}
              className="w-full bg-white border-2 border-[#50c2c9] rounded-xl p-5 
                         hover:bg-[#50c2c9] hover:text-white active:scale-[0.98]
                         transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#50c2c9] rounded-lg flex items-center justify-center
                               group-hover:bg-white transition-colors duration-200">
                  <Mail className="w-5 h-5 text-white group-hover:text-[#50c2c9] transition-colors duration-200" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base font-medium text-gray-900 group-hover:text-white">
                    Continue with Email
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-200">
                    Use your email address to sign in
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Continue with Phone */}
          <div className="animate-[slideInUp_0.6s_ease-out_0.8s_both]">
            <button
              onClick={handlePhoneLogin}
              className="w-full bg-white border border-gray-300 rounded-xl p-5 
                         hover:border-gray-400 hover:shadow-md active:scale-[0.98]
                         transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center
                               group-hover:bg-gray-200 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base font-medium text-gray-900">
                    Continue with Phone
                  </div>
                  <div className="text-sm text-gray-500">
                    Verify using your mobile number
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="text-center text-gray-500 text-sm animate-[fadeInUp_0.8s_ease-out_1s_both]">
            <p className="mb-4">
              By continuing, you agree to our{' '}
              <span className="text-gray-900 font-medium">Terms of Service</span>
              {' '}and{' '}
              <span className="text-gray-900 font-medium">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6 animate-[fadeInUp_0.8s_ease-out_1.2s_both]">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
