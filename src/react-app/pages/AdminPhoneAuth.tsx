import { useState } from 'react';
import { ChevronLeft, Phone} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import IndianFlag from '@/react-app/components/IndianFlag';

export default function AdminPhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      // Navigate to admin OTP verification with phone number
      navigate('/admin/otp-verification', { 
        state: { 
          phone: phoneNumber,
          method: 'phone'
        } 
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    
    // Format as needed (e.g., add spacing)
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/auth" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black mb-2">
            Admin Phone Verification
          </h1>
          <p className="text-gray-500">
            Enter your registered admin phone number for verification
          </p>
        </div>

        {/* Phone Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              {/* Country Code Section */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <div className="flex items-center px-3 py-2 border-r border-gray-300">
                  <IndianFlag />
                  <span className="ml-2 text-gray-700 font-medium">+91</span>
                </div>
              </div>
              
              {/* Phone Number Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter your phone number"
                className="w-full pl-20 pr-12 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-[#50c2c9] focus:border-[#50c2c9] 
                           outline-none transition-colors duration-200"
              />
              
              {/* Phone Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            {/* Helper Text */}
            <p className="text-xs text-gray-500 mt-2">
              We'll send a 6-digit verification code to this number
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={phoneNumber.replace(/\s/g, '').length < 10}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium
                     hover:bg-[#47b1b8] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Admin Verification Code
          </button>
        </div>

        {/* Alternative Options */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Or continue with</p>
          <div className="space-y-3">
            <Link 
              to="/admin/login" 
              className="block w-full text-[#50c2c9] py-3 border border-[#50c2c9] 
                         rounded-lg font-medium hover:bg-[#50c2c9] hover:text-white 
                         transition-colors duration-200"
            >
              Continue with Email
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <span className="text-gray-600">Don't have admin access? </span>
          <Link 
            to="/admin/register" 
            className="text-[#50c2c9] hover:underline font-medium"
          >
            Request access
          </Link>
        </div>
      </div>
    </div>
  );
}
