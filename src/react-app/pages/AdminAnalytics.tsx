import { ChevronLeft, TrendingUp, TrendingDown, Download, BarChart3, Activity, Star, Target, PieChart, LineChart } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [performancePercentage, setPerformancePercentage] = useState(80);
  
  const [fulfillmentTotal, setFulfillmentTotal] = useState(5506);

  // Analytics overview data
  const analyticsData = {
    overview: {
      totalWasteCollected: 130,
      wasteCollectedChange: '+12.5%',
      averageTaskTime: 18,
      taskTimeChange: '-8.2%',
      staffEfficiency: 94.2,
      efficiencyChange: '+3.1%',
      systemUptime: 99.8,
      uptimeChange: '+0.2%'
    },
    topCategories: [
      { rank: '01', name: 'Sharps (needles, blades)', percentage: 46, volume: '34kg' },
      { rank: '02', name: 'Infectious Waste', percentage: 17, volume: '25kg' },
      { rank: '03', name: 'Hazardous Waste', percentage: 19, volume: '20kg' },
      { rank: '04', name: 'Pharmaceutical Waste', percentage: 23, volume: '09kg' }
    ],
    hospitalEngagement: [120, 150, 100, 280, 250, 480, 430, 400, 410, 350, 320, 280],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fulfillmentData: {
      lastMonth: [31, 40, 28, 51, 42, 109, 100, 110],
      thisMonth: [11, 32, 45, 32, 34, 52, 41, 60]
    },
    lineChartData: [65, 78, 90, 81, 95, 87, 92, 88, 76, 89, 94, 91],
    pieChartData: [
      { name: 'Sharps', value: 40, color: '#50c2c9' },
      { name: 'Infectious', value: 25, color: '#7dd3fc' }
    ]
  };

  const topPerformers = [
    { name: 'Amit Patel', collections: 156, efficiency: 98, rank: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', wasteManaged: 187 },
    { name: 'KM Yogita', collections: 142, efficiency: 96, rank: 2, avatar: 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg', wasteManaged: 145 },
    { name: 'Dr. Rajesh Sharma', collections: 134, efficiency: 92, rank: 3, avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face', wasteManaged: 128 }
  ];

  // Dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformancePercentage(Math.floor(Math.random() * 30) + 60);
      setFulfillmentTotal(Math.floor(Math.random() * 1000) + 5000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-[#50c2c9]' : 'text-red-600';
  };

  const getChangeIcon = (change: string) => {
    return change.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-[#50c2c9] bg-opacity-20 text-[#50c2c9]';
      case 2: return 'bg-gray-100 text-gray-600';
      case 3: return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] to-[#E6F6F7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-[#F0FAFE] px-6 py-4 border-b border-[#50c2c9] border-opacity-20 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Analytics Hub</h1>
              <p className="text-sm text-gray-500">Complete performance insights & trends</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Period Selection */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'year', label: 'This Year' }
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.key
                  ? 'bg-gradient-to-r from-[#50c2c9] to-[#4AB5BC] text-white shadow-lg shadow-[#50c2c9]/25'
                  : 'bg-white text-gray-700 border border-[#50c2c9] border-opacity-20 hover:bg-gradient-to-r hover:from-[#F0FAFE] hover:to-[#E6F6F7] hover:border-[#50c2c9] hover:border-opacity-40'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Performance Summary - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Waste */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalWasteCollected}kg</p>
                <p className="text-sm text-gray-500">Total Waste Managed</p>
                <div className={`flex items-center gap-1 mt-1 ${getChangeColor(analyticsData.overview.wasteCollectedChange)}`}>
                  {getChangeIcon(analyticsData.overview.wasteCollectedChange)}
                  <span className="text-sm font-medium">{analyticsData.overview.wasteCollectedChange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Efficiency */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.staffEfficiency}%</p>
                <p className="text-sm text-gray-500">Staff Efficiency</p>
                <div className={`flex items-center gap-1 mt-1 ${getChangeColor(analyticsData.overview.efficiencyChange)}`}>
                  {getChangeIcon(analyticsData.overview.efficiencyChange)}
                  <span className="text-sm font-medium">{analyticsData.overview.efficiencyChange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Average Task Time */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.averageTaskTime} min</p>
                <p className="text-sm text-gray-500">Avg. Task Time</p>
                <div className={`flex items-center gap-1 mt-1 ${getChangeColor(analyticsData.overview.taskTimeChange)}`}>
                  {getChangeIcon(analyticsData.overview.taskTimeChange)}
                  <span className="text-sm font-medium">{analyticsData.overview.taskTimeChange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Uptime */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.systemUptime}%</p>
                <p className="text-sm text-gray-500">System Uptime</p>
                <div className={`flex items-center gap-1 mt-1 ${getChangeColor(analyticsData.overview.uptimeChange)}`}>
                  {getChangeIcon(analyticsData.overview.uptimeChange)}
                  <span className="text-sm font-medium">{analyticsData.overview.uptimeChange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - Properly sized 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Performance Donut Chart */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 h-80">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#50c2c9]" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            </div>
            
            <div className="flex flex-col items-center justify-center h-56">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#50c2c9"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40 * (performancePercentage / 100)} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-2xl">{performancePercentage}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Overall Performance</p>
                <p className="text-lg font-semibold text-gray-900">{analyticsData.overview.totalWasteCollected}kg</p>
                <p className="text-sm text-gray-500">Total Managed</p>
              </div>
            </div>
          </div>

          {/* Pie Chart for Waste Distribution */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-4 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 h-80">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-[#50c2c9]" />
              <h3 className="text-lg font-semibold text-gray-900">Waste Distribution</h3>
            </div>
            
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40" viewBox="0 0 100 100">
                  {analyticsData.pieChartData.map((item, index) => {
                    const total = analyticsData.pieChartData.reduce((sum, d) => sum + d.value, 0);
                    const percentage = (item.value / total) * 100;
                    const strokeDasharray = `${percentage} ${100 - percentage}`;
                    const strokeDashoffset = -analyticsData.pieChartData.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 100, 0);
                    
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="15.9"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="10"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000"
                        transform="rotate(-90 50 50)"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
            
            <div className="space-y-1.5 px-2">
              {analyticsData.pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart for Monthly Trends */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 h-80">
            <div className="flex items-center gap-2 mb-6">
              <LineChart className="w-5 h-5 text-[#50c2c9]" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            </div>
            
            <div className="h-48 flex items-end justify-between">
              {analyticsData.lineChartData.slice(0, 6).map((value, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div 
                    className="w-1 bg-[#50c2c9] rounded-full mb-2 transition-all duration-1000"
                    style={{ height: `${(value / 100) * 120}px` }}
                  ></div>
                  {index > 0 && (
                    <svg 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ width: '40px', left: '-20px' }}
                    >
                      <line
                        x1="20"
                        y1={`${120 - (analyticsData.lineChartData[index - 1] / 100) * 120 + 20}`}
                        x2="40"
                        y2={`${120 - (value / 100) * 120 + 20}`}
                        stroke="#50c2c9"
                        strokeWidth="2"
                        className="transition-all duration-1000"
                      />
                    </svg>
                  )}
                  <span className="text-xs text-gray-500 font-medium mt-2">{analyticsData.months[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart for Waste Categories */}
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 h-80">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#50c2c9]" />
              <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
            </div>
            
            <div className="space-y-4">
              {analyticsData.topCategories.map((category) => (
                <div key={category.rank} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium text-sm w-6 flex-shrink-0">{category.rank}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium text-sm truncate pr-2">{category.name}</span>
                        <span className="text-gray-900 font-semibold text-sm flex-shrink-0">{category.volume}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-9">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#50c2c9] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pickup Fulfillment Chart - Full width */}
        <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pickup Fulfillment Trends</h3>
            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-gray-500">Last Month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#50c2c9]"></div>
                <span className="text-gray-500">This Month</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-2xl font-bold text-gray-900">₹{fulfillmentTotal}</p>
            <p className="text-sm text-gray-500">Total fulfillment value</p>
          </div>

          <div className="h-40 flex items-end justify-center gap-3">
            {analyticsData.fulfillmentData.lastMonth.map((lastValue, index) => {
              const thisValue = analyticsData.fulfillmentData.thisMonth[index];
              return (
                <div key={index} className="flex flex-col items-center relative">
                  {/* Last month bar (background) */}
                  <div className="w-6 bg-gray-300 rounded relative opacity-50" style={{ height: '120px' }}>
                    <div 
                      className="bg-gray-400 rounded absolute bottom-0 w-full transition-all duration-1000"
                      style={{ height: `${(lastValue / 120) * 100}%` }}
                    ></div>
                  </div>
                  {/* This month bar (foreground) */}
                  <div className="w-6 bg-[#50c2c9] rounded absolute bottom-6" style={{ height: '120px' }}>
                    <div 
                      className="bg-[#50c2c9] rounded absolute bottom-0 w-full transition-all duration-1000"
                      style={{ height: `${(thisValue / 120) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium mt-2">W{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-6 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performers</h3>
          
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F0FAFE] to-[#E6F6F7] rounded-lg border border-[#50c2c9] border-opacity-10 hover:border-opacity-30 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${getRankColor(performer.rank)}`}>
                    {performer.rank}
                  </div>
                  <img 
                    src={performer.avatar} 
                    alt={performer.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-500">{performer.collections} collections | {performer.wasteManaged}kg managed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-gray-900">{performer.efficiency}%</p>
                    <Star className="w-4 h-4 text-[#50c2c9]" />
                  </div>
                  <p className="text-xs text-gray-500">Efficiency Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
