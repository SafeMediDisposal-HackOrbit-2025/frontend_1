import { Home, Users, Activity, BarChart3, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router';

export default function AdminBottomNavigation() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Management', path: '/admin/staff-management' },
    { icon: Activity, label: 'Monitor', path: '/admin/monitoring', isCenter: true },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.label}
                to={item.path}
                className="w-14 h-14 bg-[#50c2c9] rounded-2xl flex items-center justify-center shadow-lg hover:bg-[#47b1b8] transition-colors duration-200"
              >
                <Icon className="w-7 h-7 text-white" />
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'text-[#50c2c9]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
