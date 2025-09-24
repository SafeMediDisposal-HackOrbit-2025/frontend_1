import { ChevronLeft, Check, Copy } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

interface TransactionDetailData {
  id: number;
  type: 'garbage_handover' | 'points_redemption';
  title: string;
  points: number;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  redemptionId: string;
  // Points redemption specific
  pointsRedeemed?: number;
  totalAmount?: string | number;
  // Garbage handover specific
  wasteType?: string;
  garbageWeight?: string;
  location?: string;
}

export default function TransactionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const transaction = location.state?.transaction as TransactionDetailData;

  if (!transaction) {
    navigate('/history');
    return null;
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(transaction.redemptionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatPoints = (points: number) => {
    if (transaction.type === 'points_redemption') {
      return `₹${Math.abs(points).toFixed(2)}`;
    }
    return `+${points} Points`;
  };

  const getPointsColor = () => {
    return transaction.type === 'points_redemption' ? 'text-[#50c2c9]' : 'text-[#50c2c9]';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10">
        <Link to="/history" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#50c2c9]" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 ml-4">Transaction Details</h1>
      </div>

      <div className="px-6 py-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#50c2c9] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          {/* Title and Amount */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {transaction.type === 'points_redemption' 
                ? 'Points Redemption Successful'
                : 'Garbage Handover Successful'
              }
            </h2>
            <div className={`text-3xl font-bold ${getPointsColor()} mb-4`}>
              {formatPoints(transaction.points)}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">Success</span>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                  Success
                </div>
              </div>
            </div>

            {/* Redemption/Transaction ID */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {transaction.type === 'points_redemption' ? 'Redemption ID' : 'Transaction ID'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">{transaction.redemptionId}</span>
                <button
                  onClick={handleCopyId}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            {transaction.type === 'points_redemption' ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Points redeemed</span>
                <span className="text-gray-900 font-medium">{transaction.pointsRedeemed?.toLocaleString()}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type of Waste</span>
                  <span className="text-gray-900 font-medium">{transaction.wasteType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Garbage Weight</span>
                  <span className="text-gray-900 font-medium">{transaction.garbageWeight}</span>
                </div>
              </>
            )}

            {/* Date */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-900 font-medium">{transaction.date}</span>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-bold">Total Points</span>
              <span className="text-gray-900 font-bold">
                {transaction.type === 'points_redemption' 
                  ? `₹${typeof transaction.totalAmount === 'number' ? transaction.totalAmount.toFixed(2) : transaction.totalAmount}`
                  : `${Math.abs(transaction.points)} Points`
                }
              </span>
            </div>
          </div>
        </div>

        {/* History Details Button */}
        <Link to="/history">
          <button className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-medium text-lg
                           hover:bg-[#47b1b8] transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2">
            History Details
          </button>
        </Link>
      </div>

      {/* Copy Feedback */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg">
          ID copied to clipboard
        </div>
      )}
    </div>
  );
}
