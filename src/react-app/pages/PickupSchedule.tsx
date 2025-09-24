import { useState } from 'react';
import { Calendar, Plus, Filter, Truck, CheckCircle, ChevronLeft, Eye, Activity } from 'lucide-react';
import { Link } from 'react-router';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';
import CalendarPicker from '@/react-app/components/CalendarPicker';

interface PickupSchedule {
  id: string;
  hospital: string;
  address: string;
  date: string;
  time: string;
  wasteType: string;
  weight: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

interface PickupStats {
  scheduledToday: number;
  inTransit: number;
  completedThisWeek: number;
  totalThisMonth: number;
}

export default function PickupSchedule() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const stats: PickupStats = {
    scheduledToday: 25,
    inTransit: 12,
    completedThisWeek: 156,
    totalThisMonth: 127
  };

  const pickupSchedules: PickupSchedule[] = [
    {
      id: '#PKP-2024-001',
      hospital: 'City General Hospital',
      address: 'Sharps Waste • 15kg',
      date: '2025-09-24',
      time: '09:00 AM',
      wasteType: 'Infectious Waste',
      weight: '25kg',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '#PKP-2024-002',
      hospital: 'Metro Medical Center',
      address: 'Pharmaceutical • 8kg',
      date: '2025-09-24',
      time: '11:30 AM',
      wasteType: 'Sharps & Needles',
      weight: '8kg',
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: '#PKP-2024-003',
      hospital: 'Regional Health Center',
      address: 'Infectious • 22kg',
      date: '2025-09-24',
      time: '02:00 PM',
      wasteType: 'Pharmaceutical Waste',
      weight: '15kg',
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: '#PKP-2024-004',
      hospital: 'Emergency Care Unit',
      address: 'Hazardous • 12kg',
      date: '2025-09-23',
      time: '03:30 PM',
      wasteType: 'Pathological Waste',
      weight: '32kg',
      status: 'completed',
      priority: 'low'
    }
  ];

  const historyPickups: PickupSchedule[] = [
    {
      id: '#PKP-2024-000',
      hospital: 'Emergency Care Unit',
      address: 'Hazardous • 12kg',
      date: '2025-08-01',
      time: '09:15 AM',
      wasteType: 'Hazardous',
      weight: '12kg',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: '#PKP-2024-005',
      hospital: 'City General Hospital',
      address: 'Sharps • 18kg',
      date: '2025-07-31',
      time: '11:30 AM',
      wasteType: 'Sharps',
      weight: '18kg',
      status: 'completed',
      priority: 'high'
    },
    {
      id: '#PKP-2024-004',
      hospital: 'Metro Medical Center',
      address: 'Infectious • 25kg',
      date: '2025-07-30',
      time: '02:45 PM',
      wasteType: 'Infectious',
      weight: '25kg',
      status: 'completed',
      priority: 'medium'
    }
  ];

  

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500 text-white';
      case 'in-progress':
        return 'bg-orange-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Transit';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const displayPickups = activeTab === 'active' ? pickupSchedules : historyPickups;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] via-[#F0F8F8] to-[#F5F9F9] pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#50c2c9] via-[#47b1b8] to-[#50c2c9] px-6 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-5"></div>
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="p-2 -ml-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-white text-xl font-medium">Pickup Schedule</h1>
              <p className="text-white text-opacity-90 text-sm mt-1">
                Manage medical waste collection schedules
              </p>
            </div>
          </div>
          <Link 
            to="/pickup-schedule/new"
            className="p-2 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-white" />
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="relative grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{stats.scheduledToday}</h3>
                <p className="text-gray-500 text-sm">Scheduled Today</p>
                <p className="text-[#50c2c9] text-sm font-medium">+12% from yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{stats.inTransit}</h3>
                <p className="text-gray-500 text-sm">In Transit</p>
                <p className="text-[#50c2c9] text-sm font-medium">Active now</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{stats.completedThisWeek}</h3>
                <p className="text-gray-500 text-sm">Completed This Week</p>
                <p className="text-[#50c2c9] text-sm font-medium">+8% from last week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-10 hover:border-opacity-20 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#50c2c9]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black">{stats.totalThisMonth}</h3>
                <p className="text-gray-500 text-sm">Total This Month</p>
                <p className="text-[#50c2c9] text-sm font-medium">98.2% success rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Tab Navigation */}
        <div className="bg-gradient-to-r from-white to-[#50c2c9]/5 rounded-2xl shadow-sm border border-[#50c2c9] border-opacity-15 mb-6 p-1">
          <div className="flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] text-white shadow-lg shadow-[#50c2c9]/25'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:bg-opacity-50'
              }`}
            >
              Active Pickups
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] text-white shadow-lg shadow-[#50c2c9]/25'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:bg-opacity-50'
              }`}
            >
              Recent History
            </button>
          </div>
        </div>

        {/* Active Pickups Section */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-[#50c2c9] to-[#47b1b8] rounded-full"></div>
              <h2 className="text-xl font-bold text-black">Active Pickups</h2>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white px-4 py-2 rounded-xl border border-[#50c2c9] border-opacity-20 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent shadow-sm"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Transit</option>
                </select>
              </div>
            </div>

            {displayPickups.map((pickup) => (
              <div key={pickup.id} className={`bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 border-l-4 ${getPriorityColor(pickup.priority)} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#50c2c9] font-semibold text-sm">{pickup.id}</span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(pickup.status)}`}>
                        {getStatusText(pickup.status)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{pickup.hospital}</h3>
                    <p className="text-gray-600 text-sm">{pickup.address}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 font-medium">
                    Scheduled: Today {pickup.time}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-[#50c2c9] hover:bg-[#50c2c9] hover:bg-opacity-10 rounded-lg transition-all duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] text-white text-sm font-medium rounded-xl hover:from-[#47b1b8] hover:to-[#50c2c9] transition-all duration-200 shadow-lg shadow-[#50c2c9]/25">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent History Section */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-[#50c2c9] to-[#47b1b8] rounded-full"></div>
              <h2 className="text-xl font-bold text-black">Recent Pickup History</h2>
            </div>
            
            <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl shadow-sm border border-[#50c2c9] border-opacity-15 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#F0FAFE] to-[#E6F6F7] border-b border-[#50c2c9] border-opacity-20">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Pickup ID</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Location</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Waste Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {historyPickups.map((pickup) => (
                      <tr key={pickup.id} className="hover:bg-gradient-to-r hover:from-[#F0FAFE] hover:to-[#E6F6F7] transition-all duration-200">
                        <td className="py-4 px-6 text-sm text-[#50c2c9] font-semibold">{pickup.id}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">{pickup.hospital}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{pickup.wasteType}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{formatDate(pickup.date)}</td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-800 rounded-xl text-xs font-medium border border-green-200">
                            {getStatusText(pickup.status)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-[#50c2c9] hover:text-[#47b1b8] text-sm font-semibold hover:bg-[#50c2c9] hover:bg-opacity-10 px-3 py-1 rounded-lg transition-all duration-200">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/pickup-schedule/new"
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] rounded-2xl flex items-center justify-center shadow-lg shadow-[#50c2c9]/30 hover:shadow-xl hover:shadow-[#50c2c9]/40 hover:scale-105 transition-all duration-200 z-10 animate-pulseGlow"
      >
        <Plus className="w-6 h-6 text-white" />
      </Link>

      {/* Calendar Picker */}
      <CalendarPicker
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={(date) => {
          setSelectedDate(date);
          setSelectedFilter('all');
        }}
        selectedDate={selectedDate}
      />

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
