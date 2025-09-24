import { Bell, Users, BarChart3, FileText, Briefcase, UserPlus, Calendar, CheckCircle, Radio, Activity, Settings, Scan, MapPin, Truck, ClipboardList } from 'lucide-react';
import { Link } from 'react-router';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Waste summary data
  const wasteStats = {
    wasteDeposit: 88,
    wasteDepositChange: '+10%',
    pickupRequests: 25,
    pickupRequestsChange: '+8%',
    binsCleared: 4,
    binsClearedChange: '+2%',
    hospitalRegister: 3,
    hospitalRegisterChange: '+3%'
  };

  // Pickup steps with times
  const pickupSteps = [
    { title: 'Pickup Scheduled', time: '09:30 AM', description: 'Collection request received' },
    { title: 'In Transit', time: '10:45 AM', description: 'Team en route to location' },
    { title: 'Waste Disposal', time: '12:15 PM', description: 'Safe disposal completed' }
  ];

  // Top waste categories
  const wasteCategories = [
    { rank: '01', name: 'Sharps (needles, blades)', percentage: 46, volume: '34kg' },
    { rank: '02', name: 'Infectious Waste', percentage: 17, volume: '25kg' },
    { rank: '03', name: 'Hazardous Waste', percentage: 19, volume: '20kg' },
    { rank: '04', name: 'Pharmaceutical Waste', percentage: 23, volume: '09kg' }
  ];

  // Performance data
  const performanceData = {
    totalWasteManaged: 130,
    rewardGrowth: '+48%',
    performancePercentage: 80,
    fulfillmentTotal: 5506
  };

  // Hospital engagement data (simplified for display)
  const engagementData = [120, 150, 100, 280, 250, 480, 430, 400, 410, 350, 320, 280];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Animate pickup steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % pickupSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] via-[#F0F8F8] to-[#F5F9F9] pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#50c2c9] via-[#47b1b8] to-[#50c2c9] px-6 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-5"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-medium">
              Waste Management Hub
            </h1>
            <p className="text-white text-opacity-90 text-sm mt-1">
              Complete control center for medical waste operations
            </p>
          </div>
          <Link to="/admin/notifications" className="p-2 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all duration-200">
            <Bell className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>

      {/* Today's Waste Summary */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-[#50c2c9] to-[#47b1b8] rounded-full"></div>
          <h2 className="text-xl font-bold text-black">Today's Waste Summary</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Waste Deposit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{wasteStats.wasteDeposit}kg</h3>
                <p className="text-gray-500 text-sm">Waste Deposit</p>
                <p className="text-[#50c2c9] text-sm font-medium">{wasteStats.wasteDepositChange} from yesterday</p>
              </div>
            </div>
          </div>

          {/* Pickup Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{wasteStats.pickupRequests}</h3>
                <p className="text-gray-500 text-sm">Pickup Request</p>
                <p className="text-[#50c2c9] text-sm font-medium">{wasteStats.pickupRequestsChange} from yesterday</p>
              </div>
            </div>
          </div>

          {/* Bins Cleared */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{wasteStats.binsCleared}</h3>
                <p className="text-gray-500 text-sm">Bins Cleared</p>
                <p className="text-[#50c2c9] text-sm font-medium">{wasteStats.binsClearedChange} from yesterday</p>
              </div>
            </div>
          </div>

          {/* Hospital Register */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{wasteStats.hospitalRegister}</h3>
                <p className="text-gray-500 text-sm">Hospital Register</p>
                <p className="text-[#50c2c9] text-sm font-medium">{wasteStats.hospitalRegisterChange} from yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Updates - Modern Timeline */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 mb-6">
          <h3 className="text-lg font-bold text-black mb-6">Live Pickup Updates</h3>
          
          <div className="space-y-6">
            {pickupSteps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                {/* Step indicator */}
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    index <= currentStepIndex 
                      ? 'bg-[#50c2c9] text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index < currentStepIndex ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === currentStepIndex ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  {index < pickupSteps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-2 transition-all duration-500 ${
                      index < currentStepIndex 
                        ? 'bg-[#50c2c9]' 
                        : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold transition-colors ${
                      index === currentStepIndex 
                        ? 'text-[#50c2c9]' 
                        : index < currentStepIndex 
                          ? 'text-gray-900' 
                          : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    <span className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.time}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                  {index === currentStepIndex && (
                    <div className="mt-2 px-3 py-1 bg-[#50c2c9] bg-opacity-10 rounded-lg inline-block">
                      <span className="text-[#50c2c9] text-xs font-medium">In Progress</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Waste Categories */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 mb-6">
          <h3 className="text-lg font-bold text-black mb-6">Top Waste Categories</h3>
          
          <div className="space-y-4">
            {wasteCategories.map((category) => (
              <div key={category.rank} className="flex items-center gap-4">
                <span className="text-gray-500 font-medium text-sm w-6 flex-shrink-0">{category.rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black font-medium text-sm truncate">{category.name}</span>
                    <span className="text-black font-semibold text-sm ml-3 flex-shrink-0">{category.volume}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-[#50c2c9] bg-opacity-10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] h-2 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${category.percentage}%` }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance and Hospital Chart - Matching sizes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Performance */}
          <div className="bg-gradient-to-br from-white to-[#50c2c9]/8 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-20 h-48">
            <h3 className="text-lg font-bold text-black mb-4">Performance</h3>
            
            <div className="flex flex-col items-center justify-center h-full -mt-4">
              <div className="relative w-20 h-20 mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#50c2c9"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40 * (performanceData.performancePercentage / 100)} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-black font-bold text-lg">{performanceData.performancePercentage}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Total Waste Managed</p>
                <h4 className="text-lg font-bold text-black">{performanceData.totalWasteManaged}kg</h4>
              </div>
            </div>
          </div>

          {/* Hospital Engagement */}
          <div className="bg-gradient-to-br from-white to-[#50c2c9]/8 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-20 h-48">
            <h3 className="text-lg font-bold text-black mb-4">Hospital Engagement</h3>
            
            <div className="h-28 flex items-end justify-between gap-1">
              {engagementData.slice(0, 6).map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-[#50c2c9] bg-opacity-10 rounded-t-lg mb-2 relative" style={{ height: '70px' }}>
                    <div 
                      className="bg-gradient-to-t from-[#50c2c9] to-[#47b1b8] rounded-t-lg absolute bottom-0 w-full transition-all duration-1000 shadow-sm"
                      style={{ height: `${(value / 500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{months[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/admin/staff-management" className="block">
            <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 h-48 group">
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 group-hover:scale-105 transition-all duration-200">
                  <Users className="w-8 h-8 text-[#50c2c9]" />
                </div>
                <h3 className="font-bold text-black text-lg mb-2">Management</h3>
                <p className="text-gray-500 text-sm">Manage team members and track performance</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/analytics" className="block">
            <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 h-48 group">
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 group-hover:scale-105 transition-all duration-200">
                  <BarChart3 className="w-8 h-8 text-[#50c2c9]" />
                </div>
                <h3 className="font-bold text-black text-lg mb-2">Analytics Hub</h3>
                <p className="text-gray-500 text-sm">Detailed reports and insights</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/monitoring" className="block">
            <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 h-48 group">
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 group-hover:scale-105 transition-all duration-200">
                  <Activity className="w-8 h-8 text-[#50c2c9]" />
                </div>
                <h3 className="font-bold text-black text-lg mb-2">Live Monitor</h3>
                <p className="text-gray-500 text-sm">Real-time operations monitoring</p>
              </div>
            </div>
          </Link>

          <Link to="/settings" className="block">
            <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 h-48 group">
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 group-hover:scale-105 transition-all duration-200">
                  <Settings className="w-8 h-8 text-[#50c2c9]" />
                </div>
                <h3 className="font-bold text-black text-lg mb-2">Settings</h3>
                <p className="text-gray-500 text-sm">System configuration and preferences</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Tools Section */}
        <div className="bg-gradient-to-r from-white to-[#50c2c9]/3 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 mb-6">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Tools</h3>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/admin/rfid-scanner" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#50c2c9] bg-opacity-5 to-[#50c2c9] bg-opacity-8 rounded-xl hover:from-[#50c2c9] hover:bg-opacity-10 hover:to-[#50c2c9] hover:bg-opacity-15 transition-all duration-200 group border border-[#50c2c9] border-opacity-15">
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#70d0d6] to-[#67c1c8] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg">
                <Radio className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-black font-semibold text-base">RFID Scanner</p>
                <p className="text-gray-600 text-sm">Scan waste containers, equipment & staff tags</p>
              </div>
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-[#50c2c9]" />
                <div className="w-2 h-2 bg-[#50c2c9] rounded-full animate-pulse"></div>
              </div>
            </Link>
            
            <Link to="/pickup-schedule" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#50c2c9] bg-opacity-5 to-[#50c2c9] bg-opacity-8 rounded-xl hover:from-[#50c2c9] hover:bg-opacity-10 hover:to-[#50c2c9] hover:bg-opacity-15 transition-all duration-200 group border border-[#50c2c9] border-opacity-15">
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#70d0d6] to-[#67c1c8] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-black font-semibold text-base">Pickup Schedule</p>
                <p className="text-gray-600 text-sm">Manage waste collection appointments</p>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#50c2c9]" />
                <div className="px-3 py-1 bg-[#50c2c9] bg-opacity-15 rounded-lg">
                  <span className="text-[#50c2c9] text-sm font-medium">12 today</span>
                </div>
              </div>
            </Link>

            

            <Link to="/route-tracker" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#50c2c9] bg-opacity-5 to-[#50c2c9] bg-opacity-8 rounded-xl hover:from-[#50c2c9] hover:bg-opacity-10 hover:to-[#50c2c9] hover:bg-opacity-15 transition-all duration-200 group border border-[#50c2c9] border-opacity-15">
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#70d0d6] to-[#67c1c8] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-black font-semibold text-base">Route Tracker</p>
                <p className="text-gray-600 text-sm">Track collection routes & vehicle locations</p>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#50c2c9]" />
              </div>
            </Link>

            <Link to="/inventory-check" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#50c2c9] bg-opacity-5 to-[#50c2c9] bg-opacity-8 rounded-xl hover:from-[#50c2c9] hover:bg-opacity-10 hover:to-[#50c2c9] hover:bg-opacity-15 transition-all duration-200 group border border-[#50c2c9] border-opacity-15">
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#70d0d6] to-[#67c1c8] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg">
                <ClipboardList className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-black font-semibold text-base">Inventory Check</p>
                <p className="text-gray-600 text-sm">Monitor container levels & supply status</p>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#50c2c9]" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
