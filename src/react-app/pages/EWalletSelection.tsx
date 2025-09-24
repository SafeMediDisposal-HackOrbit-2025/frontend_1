import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { getPaymentIcon } from '@/react-app/components/PaymentIcons';

interface EWalletOption {
  id: string;
  name: string;
  bgColor: string;
}

const eWalletOptions: EWalletOption[] = [
  {
    id: 'googlepay',
    name: 'Google Pay',
    bgColor: 'bg-blue-500'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    bgColor: 'bg-purple-600'
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    bgColor: 'bg-black'
  },
  {
    id: 'paytm',
    name: 'Paytm',
    bgColor: 'bg-blue-600'
  }
];

export default function EWalletSelection() {
  const [selectedWallet, setSelectedWallet] = useState<string>('googlepay');
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/points-redemption/e-wallet/confirmation', {
      state: { selectedWallet: eWalletOptions.find(w => w.id === selectedWallet) }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9]">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-gray-100">
        <Link to="/points-redemption" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-black ml-4">Points Redemption</h1>
      </div>

      <div className="px-6 py-6">
        {/* Selection Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-6 text-center">
            Choose E-Wallet
          </h2>

          <div className="space-y-4 mb-8">
            {eWalletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedWallet === wallet.id
                    ? 'border-[#5CC9E0] bg-[#5CC9E0] bg-opacity-5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${wallet.bgColor} rounded-2xl flex items-center justify-center`}>
                    <div className="text-white">
                      {getPaymentIcon(wallet.id, "w-6 h-6")}
                    </div>
                  </div>
                  <span className="text-black font-semibold text-lg">{wallet.name}</span>
                </div>
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedWallet === wallet.id
                    ? 'border-[#5CC9E0] bg-[#5CC9E0]'
                    : 'border-gray-300'
                }`}>
                  {selectedWallet === wallet.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[#5CC9E0] text-white py-4 rounded-2xl font-semibold text-lg
                       shadow-lg hover:bg-[#52b8cf] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#5CC9E0] focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
