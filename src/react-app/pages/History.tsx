import { ChevronLeft, Award, RotateCcw, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import BottomNavigation from '@/react-app/components/BottomNavigation';

type TabType = 'all' | 'garbage' | 'points';

type TransactionType = 'garbage_handover' | 'points_redemption';

type TransactionStatus = 'completed' | 'processing' | 'failed';

interface Transaction {
  id: number;
  type: TransactionType;
  title: string;
  description: string;
  date: string;
  time: string;
  points: number;
  dateGroup: string;
  status: TransactionStatus;
  location?: string;
}

export default function History() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'points_redemption',
      title: 'Points Redemption',
      description: 'Mobile Credit Top-up',
      date: 'Today',
      time: '2:30 PM',
      points: -500,
      dateGroup: 'Today',
      status: 'completed'
    },
    {
      id: 2,
      type: 'garbage_handover',
      title: 'Waste Collection',
      description: 'Organic & Plastic Waste',
      date: 'Today',
      time: '11:45 AM',
      points: 2000,
      dateGroup: 'Today',
      status: 'completed',
      location: 'Central Jakarta'
    },
    {
      id: 3,
      type: 'points_redemption',
      title: 'Points Redemption',
      description: 'E-Wallet Transfer',
      date: 'Yesterday',
      time: '4:15 PM',
      points: -1000,
      dateGroup: 'Yesterday',
      status: 'processing'
    },
    {
      id: 4,
      type: 'garbage_handover',
      title: 'Waste Collection',
      description: 'Electronic Waste',
      date: 'Yesterday',
      time: '10:30 AM',
      points: 3500,
      dateGroup: 'Yesterday',
      status: 'completed',
      location: 'South Jakarta'
    },
    {
      id: 5,
      type: 'garbage_handover',
      title: 'Waste Collection',
      description: 'Mixed Recyclables',
      date: 'Monday, Jan 20',
      time: '3:20 PM',
      points: 1500,
      dateGroup: 'Monday, Jan 20',
      status: 'completed',
      location: 'West Jakarta'
    },
    {
      id: 6,
      type: 'points_redemption',
      title: 'Points Redemption',
      description: 'Bank Transfer',
      date: 'Monday, Jan 20',
      time: '1:45 PM',
      points: -2000,
      dateGroup: 'Monday, Jan 20',
      status: 'failed'
    },
    {
      id: 7,
      type: 'garbage_handover',
      title: 'Waste Collection',
      description: 'Paper & Cardboard',
      date: 'Sunday, Jan 19',
      time: '9:15 AM',
      points: 800,
      dateGroup: 'Sunday, Jan 19',
      status: 'completed',
      location: 'North Jakarta'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'garbage') return transaction.type === 'garbage_handover';
    if (activeTab === 'points') return transaction.type === 'points_redemption';
    return true;
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const group = groups[transaction.dateGroup] || [];
    group.push(transaction);
    groups[transaction.dateGroup] = group;
    return groups;
  }, {} as Record<string, Transaction[]>);

  const getIcon = (type: TransactionType) => {
    if (type === 'garbage_handover') {
      return <RotateCcw className="w-5 h-5 text-white" />;
    } else {
      return <Award className="w-5 h-5 text-white" />;
    }
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getPointsColor = (points: number, status: TransactionStatus) => {
    if (status === 'failed') return 'text-gray-400';
    return points > 0 ? 'text-gray-700' : 'text-gray-600';
  };

  

  const getTabStats = () => {
    const stats = {
      all: transactions.length,
      garbage: transactions.filter(t => t.type === 'garbage_handover').length,
      points: transactions.filter(t => t.type === 'points_redemption').length
    };
    return stats;
  };

  const stats = getTabStats();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10">
        <Link to="/home" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#50c2c9]" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 ml-4">Transaction History</h1>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 relative
              ${activeTab === 'all'
                ? 'bg-[#50c2c9] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
          >
            All
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-[#50c2c9] bg-opacity-20 text-[#50c2c9]'
            }`}>
              {stats.all}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('garbage')}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 relative
              ${activeTab === 'garbage'
                ? 'bg-[#50c2c9] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
          >
            Garbage
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === 'garbage' ? 'bg-white/20 text-white' : 'bg-[#50c2c9] bg-opacity-20 text-[#50c2c9]'
            }`}>
              {stats.garbage}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 relative
              ${activeTab === 'points'
                ? 'bg-[#50c2c9] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
          >
            Points
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === 'points' ? 'bg-white/20 text-white' : 'bg-[#50c2c9] bg-opacity-20 text-[#50c2c9]'
            }`}>
              {stats.points}
            </span>
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="px-4 py-2 space-y-6">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-[#50c2c9] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#50c2c9]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No transactions yet</h3>
            <p className="text-gray-500 max-w-sm">
              {activeTab === 'all' && "Your transaction history will appear here"}
              {activeTab === 'garbage' && "No waste collection transactions yet"}
              {activeTab === 'points' && "No points redemption transactions yet"}
            </p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([dateGroup, transactions]) => (
            <div key={dateGroup} className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-bold text-gray-900">{dateGroup}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                <span className="text-sm text-gray-500 bg-[#50c2c9] bg-opacity-10 px-3 py-1 rounded-full border border-[#50c2c9] border-opacity-20">
                  {transactions.length} transaction{transactions.length > 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <Link
                    key={transaction.id}
                    to={`/transaction/${transaction.id}`}
                    state={{
                      transaction: {
                        ...transaction,
                        redemptionId: '0912301928***',
                        pointsRedeemed: transaction.type === 'points_redemption' ? Math.abs(transaction.points) : undefined,
                        totalAmount: transaction.type === 'points_redemption' ? (Math.abs(transaction.points) / 100) : undefined,
                        wasteType: transaction.type === 'garbage_handover' ? 'Non-organic Waste' : undefined,
                        garbageWeight: transaction.type === 'garbage_handover' ? '500 gram' : undefined,
                        date: 'Wednesday, July 3, 2025'
                      }
                    }}
                    className="block"
                  >
                    <div 
                      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md 
                               transition-all duration-200 relative overflow-hidden cursor-pointer"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.5s ease-out forwards'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-[#50c2c9]">
                          {getIcon(transaction.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-gray-900 font-semibold text-base leading-tight">
                                {transaction.title}
                              </h4>
                              <p className="text-gray-600 text-sm mt-0.5">
                                {transaction.description}
                              </p>
                            </div>
                            
                            <div className="text-right flex-shrink-0 ml-4">
                              <div className={`text-lg font-bold ${getPointsColor(transaction.points, transaction.status)}`}>
                                {transaction.points > 0 ? '+' : ''}{transaction.points.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                                {getStatusIcon(transaction.status)}
                                {transaction.status === 'completed' && 'Completed'}
                                {transaction.status === 'processing' && 'Processing'}
                                {transaction.status === 'failed' && 'Failed'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {transaction.time}
                              </span>
                              {transaction.location && (
                                <span className="px-2 py-1 bg-white/60 rounded-lg text-xs">
                                  📍 {transaction.location}
                                </span>
                              )}
                            </div>
                            
                            {transaction.points > 0 && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Earned</span>
                              </div>
                            )}
                            {transaction.points < 0 && transaction.status !== 'failed' && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <TrendingDown className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Redeemed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
