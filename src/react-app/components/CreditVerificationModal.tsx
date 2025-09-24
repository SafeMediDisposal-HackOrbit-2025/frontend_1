import { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import IndianFlag from './IndianFlag';

interface CreditVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (phoneNumber: string) => void;
}

export default function CreditVerificationModal({ 
  isOpen, 
  onClose, 
  onVerify 
}: CreditVerificationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('+91 73039 *****');

  if (!isOpen) return null;

  const handleVerify = () => {
    onVerify(phoneNumber);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Credit Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#50c2c9] rounded-2xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black">Credit</h2>
        </div>

        {/* Mobile Number Input */}
        <div className="mb-8">
          <label className="block text-black font-medium mb-3">
            Mobile Number
          </label>
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl bg-white">
            <div className="flex items-center gap-2">
              <IndianFlag className="w-6 h-4" />
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 text-black font-medium text-lg focus:outline-none bg-transparent"
              placeholder="+91 73039 *****"
            />
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                     shadow-lg hover:bg-[#47b1b8] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
        >
          Check Mobile Number
        </button>
      </div>
    </div>
  );
}
