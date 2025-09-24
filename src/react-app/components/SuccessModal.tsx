import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

export default function SuccessModal({ isOpen, onContinue }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#50c2c9] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-3">
          Successful update
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your password has been successfully changed
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium
                   hover:bg-[#47b1b8] transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
        >
          Continue to home
        </button>
      </div>
    </div>
  );
}
