import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import OTPInput from '@/react-app/components/OTPInput';
import OTPVerificationIcon from '@/react-app/components/OTPVerificationIcon';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(48);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'fajar*@gmail.com';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleConfirm = () => {
    if (otp.length === 6) {
      navigate('/create-new-password');
    }
  };

  const handleResend = () => {
    setTimer(48);
    setCanResend(false);
    setOtp('');
  };

  const maskedEmail = email.replace(/(.{1})(.*)(@.*)/, '$1***$3');

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/reset-password" className="p-2 -ml-2">
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
        <OTPVerificationIcon />

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">
            OTP code verification
          </h1>
          <p className="text-gray-500">
            We have sent the OTP code to your email {maskedEmail}
          </p>
        </div>

        {/* OTP Input */}
        <OTPInput 
          length={6} 
          onComplete={handleOTPComplete}
          value={otp}
        />

        {/* Resend Section */}
        <div className="text-center mb-8">
          <p className="text-gray-500 mb-1">Not receiving emails?</p>
          {canResend ? (
            <button 
              onClick={handleResend}
              className="text-[#50c2c9] hover:underline font-medium"
            >
              Resend code
            </button>
          ) : (
            <p className="text-gray-500">
              You can resend the code in{' '}
              <span className="text-[#50c2c9] font-medium">{timer} seconds</span>
            </p>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={otp.length !== 6}
          className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium
                   hover:bg-[#47b1b8] transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
