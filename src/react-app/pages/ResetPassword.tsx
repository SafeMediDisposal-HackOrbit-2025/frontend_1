import { useState } from 'react';
import { ChevronLeft, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import InputField from '@/react-app/components/InputField';
import PasswordResetIcon from '@/react-app/components/PasswordResetIcon';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (email) {
      navigate('/otp-verification', { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="p-2 -ml-2">
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

        {/* Illustration */}
        <PasswordResetIcon />

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">
            Reset your password
          </h1>
          <p className="text-gray-500">
            Please enter your email to get an OTP code to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="Mobile Number"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={setEmail}
          />

          <button
            onClick={handleNext}
            disabled={!email}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium mt-8
                     hover:bg-[#47b1b8] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
