import { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import InputField from '@/react-app/components/InputField';
import NewPasswordIcon from '@/react-app/components/NewPasswordIcon';
import SuccessModal from '@/react-app/components/SuccessModal';

export default function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setHasError(false);
        setShowSuccessModal(true);
      } else {
        setHasError(true);
      }
    }
  };

  const handleContinueToHome = () => {
    setShowSuccessModal(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/otp-verification" className="p-2 -ml-2">
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
        <NewPasswordIcon />

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">
            Create a New Password
          </h1>
          <p className="text-gray-500">
            Create your new password
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="New Password"
            type="password"
            placeholder="Enter Password"
            icon={<Lock className="w-5 h-5" />}
            value={newPassword}
            onChange={setNewPassword}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            placeholder="Enter New Password"
            icon={<Lock className="w-5 h-5" />}
            value={confirmPassword}
            onChange={setConfirmPassword}
            hasError={hasError}
            errorMessage="Passwords do not match"
          />

          <button
            onClick={handleConfirm}
            disabled={!newPassword || !confirmPassword}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium mt-8
                     hover:bg-[#47b1b8] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onContinue={handleContinueToHome}
      />
    </div>
  );
}
