import { useNavigate } from 'react-router';
import { Users, Shield } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleStaffSelection = () => {
    navigate('/auth-selection?role=staff');
  };

  const handleAdminSelection = () => {
    // Navigate to admin authentication page first
    navigate('/admin/auth');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 pb-8">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        <div className="text-center animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Select Your Role
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Choose your access level to continue with SafeMediDisposal
          </p>
        </div>
      </div>

      {/* Role Selection Options */}
      <div className="flex-1 px-6 py-4">
        <div className="max-w-sm mx-auto space-y-4">
          
          {/* Staff Member Option */}
          <div className="animate-[slideInUp_0.6s_ease-out_0.4s_both]">
            <button
              onClick={handleStaffSelection}
              className="w-full bg-white border-2 border-[#50c2c9] rounded-xl p-6 
                         hover:bg-[#50c2c9] hover:text-white active:scale-[0.98]
                         transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-[#50c2c9] rounded-2xl flex items-center justify-center
                               group-hover:bg-white transition-colors duration-200">
                  <Users className="w-8 h-8 text-white group-hover:text-[#50c2c9] transition-colors duration-200" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 group-hover:text-white mb-2">
                    Staff Member
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-200">
                    Access waste collection, scanning, and disposal features
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Admin Option */}
          <div className="animate-[slideInUp_0.6s_ease-out_0.6s_both]">
            <button
              onClick={handleAdminSelection}
              className="w-full bg-white border border-gray-300 rounded-xl p-6 
                         hover:border-gray-400 hover:shadow-md active:scale-[0.98]
                         transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center
                               group-hover:bg-gray-200 transition-colors duration-200">
                  <Shield className="w-8 h-8 text-gray-700" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">
                    Administrator
                  </div>
                  <div className="text-sm text-gray-500">
                    Full system access, user management, and reporting
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="text-center text-gray-500 text-sm animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <p className="mb-4">
              Select the role that matches your access level to the system
            </p>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6 animate-[fadeInUp_0.8s_ease-out_1s_both]">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
