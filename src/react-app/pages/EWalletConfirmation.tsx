import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { getPaymentIcon } from '@/react-app/components/PaymentIcons';
import IndianFlag from '@/react-app/components/IndianFlag';

interface LocationState {
  selectedWallet?: {
    id: string;
    name: string;
    bgColor: string;
  };
}

export default function EWalletConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [mobileNumber, setMobileNumber] = useState('+91 73039 *****');
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  // All wallet backgrounds set to white
  const walletBackgrounds: Record<string, string> = {
    googlepay: "bg-white",
    applepay: "bg-white",
    paytm: "bg-white",
    phonepe: "bg-white",
  };

  const selectedWallet = state?.selectedWallet || {
    id: 'googlepay',
    name: 'Google Pay',
    bgColor: walletBackgrounds['googlepay'],
  };

  const appliedBg = walletBackgrounds[selectedWallet.id] || selectedWallet.bgColor;

  const handleCheckEWallet = () => {
    navigate('/points-redemption/wallet-details', {
      state: { 
        selectedWallet,
        userInfo: {
          id: 'KM Yogita-0730394737',
          phoneNumber: mobileNumber
        }
      }
    });
  };

  const handleClose = () => {
    setShowBottomSheet(false);
    setTimeout(() => navigate('/points-redemption/e-wallet'), 300);
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] relative">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-gray-100">
        <Link to="/points-redemption/e-wallet" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-black ml-4">Points Redemption</h1>
      </div>

      {/* Background content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm opacity-50">
          <h2 className="text-lg font-bold text-black mb-6 text-center">
            Choose E-Wallet
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#5CC9E0] bg-[#5CC9E0] bg-opacity-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${appliedBg} rounded-2xl flex items-center justify-center`}>
                  <div className="rounded p-1">
                    {getPaymentIcon(selectedWallet.id, "w-6 h-6")}
                  </div>
                </div>
                <span className="text-black font-semibold text-lg">{selectedWallet.name}</span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-[#5CC9E0] bg-[#5CC9E0] flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Overlay */}
      {showBottomSheet && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          />
          
          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300">
            <div className="px-6 py-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${appliedBg} rounded-2xl flex items-center justify-center`}>
                    <div className="rounded p-1">
                      {getPaymentIcon(selectedWallet.id, "w-6 h-6")}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-black">{selectedWallet.name}</h2>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Mobile Number Input */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-black mb-3">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-4 rounded-l-2xl border border-r-0 border-gray-200">
                      <IndianFlag className="w-6 h-4" />
                    </div>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-1 px-4 py-4 border border-gray-200 rounded-r-2xl bg-white
                                 focus:outline-none focus:ring-2 focus:ring-[#5CC9E0] focus:border-transparent
                                 text-black font-medium"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Cell phone number linked to {selectedWallet.name}
                </p>
              </div>

              {/* Check E-Wallet Button */}
              <button
                onClick={handleCheckEWallet}
                className="w-full bg-[#5CC9E0] text-white py-4 rounded-2xl font-semibold text-lg
                           shadow-lg hover:bg-[#52b8cf] transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#5CC9E0] focus:ring-offset-2"
              >
                Check E-Wallet
              </button>

              {/* Bottom indicator */}
              <div className="flex justify-center mt-6">
                <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
