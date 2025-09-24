import { useState } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router';
import BottomNavigation from '@/react-app/components/BottomNavigation';
import { useProfileData } from '@/react-app/hooks/useProfileData';

export default function EditProfile() {
  const { updateProfilePicture } = useProfileData();
  const [formData, setFormData] = useState({
    name: 'KM Yogita',
    phone: '+91 7303914737',
    email: 'kyogita2006@gmail.com',
  });
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureUpdate = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          updateProfilePicture(imageData);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 pt-12 bg-white">
        <Link to="/profile" className="p-2 -ml-2">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-black" />
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-black">Edit Profile</h1>
        <div className="w-8"></div>
      </div>

      {/* Curved Teal Background Container */}
      <div className="bg-[#B8E6E8] rounded-t-[40px] min-h-[calc(100vh-120px)] pt-8">
        {/* Profile Photo Section */}
        <div className="px-6 flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden shadow-lg">
              <img 
                src="https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg"
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleProfilePictureUpdate}
              className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
            >
              <Camera className="w-3 h-3 text-gray-600" />
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-black mt-4 mb-1">KM Yogita</h2>
          <p className="text-gray-700 text-sm">ID: 25030024</p>
        </div>

        {/* Account Settings */}
        <div className="px-6">
          <h3 className="text-lg font-semibold text-black mb-6">Account Settings</h3>
          
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Username</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-[#50c2c9] bg-opacity-80 rounded-lg text-black font-medium
                         placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-[#50c2c9] bg-opacity-80 rounded-lg text-black font-medium
                         placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-[#50c2c9] bg-opacity-80 rounded-lg text-black font-medium
                         placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between py-4">
              <span className="text-black font-medium">Push Notifications</span>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${pushNotifications ? 'bg-[#50c2c9]' : 'bg-gray-400'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${pushNotifications 
                      ? 'translate-x-6' 
                      : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Turn Dark Theme Toggle */}
            <div className="flex items-center justify-between py-4">
              <span className="text-black font-medium">Turn Dark Theme</span>
              <button
                onClick={() => setDarkTheme(!darkTheme)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${darkTheme ? 'bg-[#50c2c9]' : 'bg-gray-400'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${darkTheme 
                      ? 'translate-x-6' 
                      : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
