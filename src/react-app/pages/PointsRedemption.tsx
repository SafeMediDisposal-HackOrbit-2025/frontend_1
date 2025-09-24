import { useState } from 'react';
import { ChevronLeft, Wallet, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import CreditVerificationModal from '@/react-app/components/CreditVerificationModal';

export default function PointsRedemption() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const navigate = useNavigate();

  const handleCreditClick = () => {
    setShowCreditModal(true);
  };

  const handlePhoneVerification = (phoneNumber: string) => {
    setShowCreditModal(false);
    navigate('/points-redemption/credit', { state: { phoneNumber } });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/points" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-black ml-4">
            Points Redemption
          </h1>
        </div>

        {/* Selection Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-6 text-center">
            Select for redeemed points
          </h2>

          {/* Redemption Options */}
          <div className="flex gap-4">
            {/* E-Wallet Button */}
            <Link 
              to="/points-redemption/e-wallet"
              className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 
                         hover:border-[#5CC9E0] hover:bg-[#5CC9E0] hover:bg-opacity-5 
                         transition-all duration-200 group block"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5CC9E0] bg-opacity-10 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4
                              group-hover:bg-[#5CC9E0] group-hover:bg-opacity-20">
                  <Wallet className="w-8 h-8 text-[#5CC9E0]" />
                </div>
                <p className="text-black font-semibold">E-Wallet</p>
              </div>
            </Link>

            {/* Credit Button */}
            <button 
              onClick={handleCreditClick}
              className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 
                         hover:border-[#5CC9E0] hover:bg-[#5CC9E0] hover:bg-opacity-5 
                         transition-all duration-200 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5CC9E0] bg-opacity-10 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4
                              group-hover:bg-[#5CC9E0] group-hover:bg-opacity-20">
                  <CreditCard className="w-8 h-8 text-[#5CC9E0]" />
                </div>
                <p className="text-black font-semibold">Credit</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Credit Verification Modal */}
      <CreditVerificationModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        onVerify={handlePhoneVerification}
      />
    </div>
  );
}
