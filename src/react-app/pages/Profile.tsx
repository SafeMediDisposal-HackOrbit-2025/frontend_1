import { useState } from 'react';
import { User, Bell, LogOut, ChevronRight, Settings, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import BottomNavigation from '@/react-app/components/BottomNavigation';
import ExitModal from '@/react-app/components/ExitModal';
import { useProfileData } from '@/react-app/hooks/useProfileData';

export default function Profile() {
  const { profileData } = useProfileData();
  const [showExitModal, setShowExitModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    // Handle actual logout logic here
    console.log('User logged out');
    setShowExitModal(false);
    navigate('/login');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Edit Profile',
      path: '/edit-profile',
      color: '#6B7280',
      description: 'Manage your personal information'
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/notifications',
      color: '#6B7280',
      description: 'Control your notification preferences'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      color: '#6B7280',
      description: 'App settings and preferences'
    },
    {
      icon: Shield,
      label: 'Privacy',
      path: '/privacy',
      color: '#6B7280',
      description: 'Manage your privacy settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="relative pt-12 pb-8 bg-gradient-to-br from-[#50c2c9] to-[#47b1b8] text-white">
        <div className="relative z-10 text-center">
          <h1 className="text-lg font-bold tracking-wide">Profile</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-4 mx-4 animate-slideInUp">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-white p-1 overflow-hidden shadow-lg">
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback to default image if profile picture fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg';
                  }}
                />
              </div>
            </div>
            
            {/* User Info */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm font-medium">ID: {profileData.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="px-4 mt-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="block hover:scale-[1.01] transition-all duration-200"
            >
              <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-200 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 bg-[#50c2c9]"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-base transition-colors duration-200">
                        {item.label}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 hover:scale-[1.01] transition-all duration-200"
        >
          <div className="bg-[#50c2c9] bg-opacity-10 rounded-2xl p-5 shadow-sm hover:shadow-md border border-[#50c2c9] border-opacity-20 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#50c2c9] rounded-xl flex items-center justify-center transition-transform duration-200">
                  <LogOut className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#50c2c9] font-semibold text-base transition-colors duration-200">
                    Logout
                  </h3>
                  <p className="text-[#47b1b8] text-sm mt-0.5">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#50c2c9] group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Exit Modal */}
      <ExitModal 
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
      />
    </div>
  );
}
