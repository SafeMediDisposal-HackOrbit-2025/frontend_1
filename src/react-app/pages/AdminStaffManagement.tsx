import { ChevronLeft, Search, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

export default function AdminStaffManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const staffMembers = [
    {
      id: 1,
      name: 'KM Yogita',
      initials: 'KY',
      department: 'Pediatric Medicine',
      status: 'active',
      currentLocation: 'Block A - Level 2',
      lastActive: '2 minutes ago',
      todayActivity: '12 patients today',
      profilePicture: 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg',
      
      totalWasteCollected: 145
    },
    {
      id: 2,
      name: 'Dr. Rajesh Sharma',
      initials: 'RS',
      department: 'Emergency Medicine',
      status: 'active',
      currentLocation: 'Emergency Wing',
      lastActive: '15 minutes ago',
      todayActivity: '8 patients today',
      profilePicture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      
      totalWasteCollected: 128
    },
    {
      id: 3,
      name: 'Amit Patel',
      initials: 'AP',
      department: 'Orthopedic Surgery',
      status: 'active',
      currentLocation: 'Block C - OR',
      lastActive: '1 hour ago',
      todayActivity: '15 operations today',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      
      totalWasteCollected: 187
    },
    {
      id: 4,
      name: 'Nurse Priya Kumar',
      initials: 'PK',
      department: 'Intensive Care Unit',
      status: 'active',
      currentLocation: 'ICU Block B',
      lastActive: '5 minutes ago',
      todayActivity: '6 patients today',
      profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      
      totalWasteCollected: 98
    }
  ];

  const staffUpdates = [
    { label: 'Staff Scheduled', progress: 85, color: 'bg-[#50c2c9]' },
    { label: 'On Duty', progress: 92, color: 'bg-[#50c2c9]' },
    { label: 'Patient Care', progress: 78, color: 'bg-[#50c2c9]' }
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || staff.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#50c2c9] bg-[#50c2c9] bg-opacity-10';
      case 'off-duty': return 'text-gray-600 bg-gray-100';
      case 'break': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
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
              <h1 className="text-xl font-semibold text-gray-900">Management</h1>
              <p className="text-sm text-gray-500">Managing {filteredStaff.length} team members</p>
            </div>
          </div>
          <Link to="/admin/add-staff" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Team' },
              { key: 'active', label: 'Active' },
              { key: 'off-duty', label: 'Off Duty' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-gradient-to-r from-[#50c2c9] to-[#4AB5BC] text-white shadow-lg shadow-[#50c2c9]/25'
                    : 'bg-white text-gray-700 border border-[#50c2c9] border-opacity-20 hover:bg-gradient-to-r hover:from-[#F0FAFE] hover:to-[#E6F6F7] hover:border-[#50c2c9] hover:border-opacity-40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Medical Staff Section */}
        <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Active Medical Staff</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time staff status</p>
          </div>

          {/* Table Header */}
          <div className="px-6 py-3 bg-gradient-to-r from-[#F0FAFE] to-[#E6F6F7] grid grid-cols-10 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider border-t border-[#50c2c9] border-opacity-10">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Staff Member</div>
            <div className="col-span-2">Medical Domain</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Location</div>
          </div>

          {/* Staff List */}
          <div className="divide-y divide-gray-100">
            {filteredStaff.map((staff, index) => (
              <div key={staff.id} className="px-6 py-4 grid grid-cols-10 gap-4 items-center hover:bg-gradient-to-r hover:from-[#F0FAFE] hover:to-[#E6F6F7] hover:border-l-4 hover:border-l-[#50c2c9] transition-all duration-200">
                {/* Number */}
                <div className="col-span-1">
                  <span className="text-sm font-medium text-gray-900">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Staff Member */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="relative">
                    {staff.profilePicture ? (
                      <img
                        src={staff.profilePicture}
                        alt={staff.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#50c2c9] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{staff.initials}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500">{staff.todayActivity}</p>
                  </div>
                </div>

                {/* Department */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-900">{staff.department}</span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(staff.status)}`}>
                    {staff.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-700">{staff.currentLocation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Updates Section */}
        <div className="bg-gradient-to-br from-white to-[#F0FAFE] rounded-2xl border border-[#50c2c9] border-opacity-20 shadow-lg shadow-[#50c2c9]/10 hover:shadow-xl hover:shadow-[#50c2c9]/15 transition-all duration-300 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Staff Updates</h3>
          </div>
          <div className="p-6 space-y-4">
            {staffUpdates.map((update, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#50c2c9] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{update.label}</span>
                </div>
                <div className="ml-6">
                  <div className="w-full bg-gradient-to-r from-gray-200 to-[#E6F6F7] rounded-full h-3 border border-[#50c2c9] border-opacity-10">
                    <div 
                      className="bg-gradient-to-r from-[#50c2c9] to-[#4AB5BC] h-3 rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${update.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
