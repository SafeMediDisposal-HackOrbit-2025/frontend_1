import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface LocationState {
  selectedWallet?: {
    id: string;
    name: string;
    logo: string;
    bgColor: string;
  };
  userInfo?: {
    id: string;
    phoneNumber: string;
  };
}

const predefinedAmounts = [
  { points: 10000, currency: 215.47 },
  { points: 20000, currency: 301.61 },
  { points: 40000, currency: 323.19 },
  { points: 50000, currency: 387.79 },
  { points: 60000, currency: 409.36 },
  { points: 75000, currency: 430.88 }
];

export default function WalletRedemption() {
  const location = useLocation();
  const state = location.state as LocationState;
  const [manualAmount, setManualAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const selectedWallet = state?.selectedWallet || {
    id: 'googlepay',
    name: 'Google Pay',
    logo: '🔵',
    bgColor: 'bg-blue-500'
  };

  const userInfo = state?.userInfo || {
    id: 'KM Yogita-0730394737',
    phoneNumber: '+91 73039 *****'
  };

  const maxRedeemable = 431.54;

  const handleAmountSelect = (points: number) => {
    setSelectedAmount(points);
    setManualAmount('');
  };

  const handleManualAmountChange = (value: string) => {
    setManualAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    if (selectedAmount) return selectedAmount;
    return manualAmount ? parseInt(manualAmount) : 0;
  };

  const handleExchangePoints = () => {
    const amount = getCurrentAmount();
    console.log('Exchanging points:', amount);
    // Handle points exchange logic
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9]">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-gray-100">
        <Link to="/points-redemption/e-wallet/confirmation" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-black ml-4">Points Redemption</h1>
      </div>

      <div className="px-6 py-6">
        {/* Wallet Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 ${selectedWallet.bgColor} rounded-2xl flex items-center justify-center`}>
              <span className="text-white text-xl">{selectedWallet.logo}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">{selectedWallet.name}</h2>
              <p className="text-gray-500 text-sm">{userInfo.id}</p>
            </div>
          </div>

          {/* Points Info */}
          <div className="bg-[#5CC9E0] bg-opacity-10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#5CC9E0] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">₹</span>
            </div>
            <p className="text-[#5CC9E0] font-semibold">
              Points that can be redeemed ₹{maxRedeemable}
            </p>
          </div>
        </div>

        {/* Manual Input */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <label className="block text-black font-semibold mb-3">
            Enter Nominal
          </label>
          <input
            type="number"
            value={manualAmount}
            onChange={(e) => handleManualAmountChange(e.target.value)}
            placeholder="3"
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-white
                       focus:outline-none focus:ring-2 focus:ring-[#5CC9E0] focus:border-transparent
                       text-black font-medium text-lg"
          />
        </div>

        {/* Or Select */}
        <div className="text-center mb-4">
          <p className="text-gray-500 font-medium">Or Select</p>
        </div>

        {/* Predefined Amount Cards */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount.points}
                onClick={() => handleAmountSelect(amount.points)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAmount === amount.points
                    ? 'border-[#5CC9E0] bg-[#5CC9E0] bg-opacity-10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className={`font-bold text-lg mb-1 ${
                    selectedAmount === amount.points ? 'text-[#5CC9E0]' : 'text-gray-400'
                  }`}>
                    {amount.points.toLocaleString()} Points
                  </p>
                  <p className="text-black font-semibold text-sm">
                    ₹{amount.currency}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Points Redeemed Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-black font-medium">Points redeemed</span>
              <span className="text-black font-bold text-xl">
                {getCurrentAmount().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Points Button */}
        <button
          onClick={handleExchangePoints}
          disabled={getCurrentAmount() === 0}
          className="w-full bg-[#5CC9E0] text-white py-4 rounded-2xl font-bold text-lg
                     shadow-lg hover:bg-[#52b8cf] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#5CC9E0] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Exchange Points
        </button>
      </div>
    </div>
  );
}
