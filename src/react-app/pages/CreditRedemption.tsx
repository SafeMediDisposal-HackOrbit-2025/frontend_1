import { useState } from 'react';
import { ChevronLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router';

const predefinedAmounts = [
  { points: 10000, currency: 215.47 },
  { points: 20000, currency: 301.61 },
  { points: 40000, currency: 323.19 },
  { points: 50000, currency: 387.79 },
  { points: 60000, currency: 409.36 },
  { points: 75000, currency: 430.88 }
];

export default function CreditRedemption() {
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);

  const maxRedeemable = 431.54;
  const userInfo = 'KM Yogita-0730394737';

  const handleAmountSelect = (points: number) => {
    setSelectedAmount(points);
  };

  const handleExchangePoints = () => {
    console.log('Exchanging points:', selectedAmount);
    // Handle points exchange logic
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
        {/* Credit Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#50c2c9] rounded-2xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Credit</h2>
              <p className="text-gray-500 text-sm">{userInfo}</p>
            </div>
          </div>

          {/* Points Info */}
          <div className="bg-[#50c2c9] bg-opacity-10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#50c2c9] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">₹</span>
            </div>
            <p className="text-[#50c2c9] font-semibold">
              Points that can be redeemed ₹{maxRedeemable}
            </p>
          </div>
        </div>

        {/* Select Point Amount */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-6">Select Point Amount</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount.points}
                onClick={() => handleAmountSelect(amount.points)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAmount === amount.points
                    ? 'border-[#50c2c9] bg-[#50c2c9] bg-opacity-10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className={`font-bold text-lg mb-1 ${
                    selectedAmount === amount.points ? 'text-[#50c2c9]' : 'text-gray-400'
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
                {selectedAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Points Button */}
        <button
          onClick={handleExchangePoints}
          className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-bold text-lg
                     shadow-lg hover:bg-[#47b1b8] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
        >
          Exchange Points
        </button>
      </div>
    </div>
  );
}
