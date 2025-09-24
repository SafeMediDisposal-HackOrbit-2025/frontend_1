import { ChevronLeft, MapPin, Clock, Activity, CheckCircle, BarChart3, Eye, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

export default function AdminMonitoring() {
  const [selectedView, setSelectedView] = useState('live');
  const [wasteDistribution, setWasteDistribution] = useState([34, 25, 20, 9]);

  const liveActivities = [
    {
      id: 1,
      staffName: 'KM Yogita',
      activity: 'Collecting waste from Block A',
      location: 'Block A - Medical Wing, Room 205',
      startTime: '14:32',
      status: 'in-progress',
      avatar: 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg',
      progress: 65,
      wasteType: 'Infectious',
      weight: '12kg',
      estimatedCompletion: '15:15'
    },
    {
      id: 2,
      staffName: 'Dr. Rajesh Sharma',
      activity: 'Disposing hazardous materials',
      location: 'Waste Processing Center',
      startTime: '14:15',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      progress: 100,
      wasteType: 'Hazardous',
      weight: '8kg',
      estimatedCompletion: '14:45'
    },
    {
      id: 3,
      staffName: 'Amit Patel',
      activity: 'Scanning waste containers',
      location: 'Block C - Surgery Wing',
      startTime: '14:28',
      status: 'in-progress',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      progress: 45,
      wasteType: 'Sharps',
      weight: '5kg',
      estimatedCompletion: '15:00'
    },
    {
      id: 4,
      staffName: 'Nurse Priya Kumar',
      activity: 'On break',
      location: 'Staff Lounge',
      startTime: '14:30',
      status: 'break',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      progress: 75,
      wasteType: 'N/A',
      weight: 'N/A',
      estimatedCompletion: '14:45'
    }
  ];

  const systemMetrics = {
    totalWasteToday: 88,
    totalActiveTasks: 8,
    activeStaff: 12,
    systemUptime: '99.8%'
  };

  // Update waste distribution data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWasteDistribution([
        Math.floor(Math.random() * 20) + 25,
        Math.floor(Math.random() * 15) + 15,
        Math.floor(Math.random() * 10) + 10,
        Math.floor(Math.random() * 8) + 5
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'completed': return 'text-[#50c2c9] bg-[#50c2c9] bg-opacity-10 border-[#50c2c9] border-opacity-30';
      case 'break': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Zap className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'break': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-[#50c2c9]';
      case 'break': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const wasteTypes = ['Sharps', 'Infectious', 'Hazardous', 'Pharma'];

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
              <h1 className="text-xl font-semibold text-gray-900">Live Operations Monitor</h1>
              <p className="text-sm text-gray-500">Real-time waste management oversight</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 text-sm font-medium">LIVE</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* System Status Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl p-4 border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalWasteToday}kg</p>
              <p className="text-sm text-gray-500">Waste Today</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeStaff}</p>
              <p className="text-sm text-gray-500">Active Staff</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'live', label: 'Live Feed' },
            { key: 'charts', label: 'Analytics' }
          ].map((view) => (
            <button
              key={view.key}
              onClick={() => setSelectedView(view.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedView === view.key
                  ? 'bg-gradient-to-r from-[#50c2c9] to-[#4AB5BC] text-white shadow-lg shadow-[#50c2c9]/25'
                  : 'bg-white text-gray-700 border border-[#50c2c9] border-opacity-20 hover:bg-gradient-to-r hover:from-[#F0FAFE] hover:to-[#E6F6F7] hover:border-[#50c2c9] hover:border-opacity-40'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Content based on selected view */}
        {selectedView === 'live' && (
          <>
            {/* Live Activities Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Current Activities</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                <Eye className="w-4 h-4" />
                <span>Monitoring {liveActivities.length} activities</span>
              </div>
            </div>

            {/* Modern Live Activities List */}
            <div className="space-y-4">
              {liveActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={activity.avatar}
                            alt={activity.staffName}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-gray-100"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusDot(activity.status)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{activity.staffName}</h3>
                          <p className="text-gray-600 text-sm">{activity.activity}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                        {activity.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-gradient-to-r from-[#F0FAFE] to-[#E6F6F7] rounded-xl p-4 mb-4 border border-[#50c2c9] border-opacity-10">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">Started {activity.startTime}</span>
                        </div>
                        {activity.wasteType !== 'N/A' && (
                          <>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{activity.wasteType}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 text-center">⚖️</span>
                              <span className="text-gray-700">{activity.weight}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progress Section */}
                    {activity.status === 'in-progress' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">Task Progress</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-bold">{activity.progress}%</span>
                            <span className="text-gray-500">Est. {activity.estimatedCompletion}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-[#50c2c9] h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${activity.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activity.status === 'completed' && (
                      <div className="flex items-center justify-center py-2 bg-[#50c2c9] bg-opacity-10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-[#50c2c9] mr-2" />
                        <span className="text-[#50c2c9] font-medium">Task Completed Successfully</span>
                      </div>
                    )}

                    {activity.status === 'break' && (
                      <div className="flex items-center justify-center py-2 bg-orange-50 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="text-orange-700 font-medium">Return Expected at {activity.estimatedCompletion}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedView === 'charts' && (
          <>
            {/* Waste Distribution Chart */}
            <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Distribution by Type</h3>
              
              <div className="h-48 flex items-end justify-center gap-8">
                {wasteDistribution.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 bg-gray-200 rounded-t-lg mb-2 relative" style={{ height: '120px' }}>
                      <div 
                        className="bg-[#50c2c9] rounded-t-lg absolute bottom-0 w-full transition-all duration-1000"
                        style={{ height: `${(value / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium mb-1">{wasteTypes[index]}</span>
                    <span className="text-sm text-gray-900 font-semibold">{value}kg</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Performance Summary</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#50c2c9]" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                  <p className="text-sm text-gray-500">Tasks Completed</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#50c2c9] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-[#50c2c9]" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">18 min</p>
                  <p className="text-sm text-gray-500">Avg. Task Time</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
