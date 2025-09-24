import { ChevronLeft, Wallet, CreditCard, Gift, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router';
import WasteBinIcon from '@/react-app/components/WasteBinIcon';

export default function Points() {
  const redemptionHistory = [
    { date: 'Monday, January 1, 2025', description: 'Waste Deposit Reward', points: '+500', type: 'earn' },
    { date: 'Wednesday, January 3, 2025', description: 'E-wallet Redemption', points: '-2000', type: 'redeem' },
    { date: 'Thursday, January 4, 2025', description: 'Bonus Points', points: '+7000', type: 'bonus' }
  ];

  const getHistoryIcon = (type: string) => {
    const iconClasses = "w-4 h-4 text-[#50c2c9]";
    switch (type) {
      case 'earn':
        return <TrendingUp className={iconClasses} />;
      case 'redeem':
        return <Gift className={iconClasses} />;
      case 'bonus':
        return <Star className={iconClasses} />;
      default:
        return <TrendingUp className={iconClasses} />;
    }
  };

  const getHistoryColor = (type: string) => {
    switch (type) {
      case 'earn':
        return 'text-gray-900';
      case 'redeem':
        return 'text-gray-900';
      case 'bonus':
        return 'text-gray-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 pt-12 bg-white border-b border-gray-200">
        <Link to="/home" className="p-2 -ml-2">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                         hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Points</h1>
        <WasteBinIcon />
      </div>

      <div className="px-6 py-8">
        {/* Points Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-2">Your Points Balance</p>
              <p className="text-gray-900 text-4xl font-bold mb-2">75,000</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">Equivalent to</span>
                <span className="text-gray-900 font-semibold text-lg">₹431.54</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Gift className="w-8 h-8 text-[#50c2c9]" />
            </div>
          </div>
          
          <Link 
            to="/points-redemption"
            className="inline-flex items-center gap-3 bg-[#50c2c9] text-white
                     px-8 py-4 rounded-2xl hover:bg-[#47b1b8] 
                     transition-all duration-200"
          >
            <Gift className="w-5 h-5" />
            <span className="font-semibold text-lg">Redeem Points</span>
          </Link>
        </div>

        {/* Points History */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Link to="#" className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors
                                 flex items-center gap-1">
              View All
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-4">
              {redemptionHistory.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-20 rounded-xl flex items-center justify-center">
                    {getHistoryIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-base mb-1">{item.description}</p>
                    <p className="text-gray-500 text-sm">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-lg ${getHistoryColor(item.type)}`}>
                      {item.points}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">How Points Work</h2>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#50c2c9] font-bold text-lg">₹</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2">Point Value</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1 Point equals ₹1 INR which can be used for various redemptions and purchases.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-[#50c2c9]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2">E-wallet Redemption</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Redeem points directly to popular e-wallet platforms like PhonePe, Paytm, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-[#50c2c9]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2">Mobile Recharge</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Use points for mobile recharge and data plans from all major network providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
