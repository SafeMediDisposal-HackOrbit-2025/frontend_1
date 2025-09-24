import { useState } from 'react';
import { ChevronLeft, Calendar, MapPin, Building2, Phone, Mail, Package, AlertTriangle, Save, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';
import CalendarPicker from '@/react-app/components/CalendarPicker';
import InputField from '@/react-app/components/InputField';

interface ScheduleFormData {
  hospitalName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  address: string;
  wasteType: string;
  estimatedWeight: string;
  priority: 'low' | 'medium' | 'high';
  pickupDate: string;
  pickupTime: string;
  specialInstructions: string;
}

export default function PickupScheduleNew() {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<ScheduleFormData>({
    hospitalName: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    address: '',
    wasteType: '',
    estimatedWeight: '',
    priority: 'medium',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });

  const wasteTypes = [
    { value: 'infectious', label: 'Infectious Waste' },
    { value: 'sharps', label: 'Sharps & Needles' },
    { value: 'pharmaceutical', label: 'Pharmaceutical Waste' },
    { value: 'pathological', label: 'Pathological Waste' },
    { value: 'hazardous', label: 'Hazardous Waste' },
    { value: 'mixed', label: 'Mixed Medical Waste' }
  ];

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleInputChange = <K extends keyof ScheduleFormData>(field: K, value: ScheduleFormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (date: string) => {
    handleInputChange('pickupDate', date);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'Select pickup date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields: (keyof ScheduleFormData)[] = ['hospitalName', 'contactPerson', 'phoneNumber', 'address', 'wasteType', 'pickupDate', 'pickupTime'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically submit to your API
    console.log('Scheduling pickup:', formData);
    
    // Navigate back to pickup schedule with success message
    navigate('/pickup-schedule', { 
      state: { 
        success: true, 
        message: 'Pickup scheduled successfully!' 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] via-[#F0F8F8] to-[#F5F9F9] pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#50c2c9] via-[#47b1b8] to-[#50c2c9] px-6 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-5"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/pickup-schedule" className="p-2 -ml-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-white text-xl font-medium">Schedule New Pickup</h1>
              <p className="text-white text-opacity-90 text-sm mt-1">
                Create a new medical waste collection request
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Hospital Information */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#50c2c9] bg-opacity-15 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#50c2c9]" />
            </div>
            <h2 className="text-lg font-bold text-black">Hospital Information</h2>
          </div>
          
          <div className="space-y-4">
            <InputField
              label="Hospital Name *"
              type="text"
              placeholder="Enter hospital or clinic name"
              icon={<Building2 className="w-5 h-5" />}
              value={formData.hospitalName}
              onChange={(value) => handleInputChange('hospitalName', value)}
            />

            <InputField
              label="Contact Person *"
              type="text"
              placeholder="Enter contact person name"
              icon={<Users className="w-5 h-5" />}
              value={formData.contactPerson}
              onChange={(value) => handleInputChange('contactPerson', value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Phone Number *"
                type="tel"
                placeholder="Contact number"
                icon={<Phone className="w-5 h-5" />}
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange('phoneNumber', value)}
              />

              <InputField
                label="Email"
                type="email"
                placeholder="Email address"
                icon={<Mail className="w-5 h-5" />}
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Enter complete pickup address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Waste Details */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#50c2c9] bg-opacity-15 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-[#50c2c9]" />
            </div>
            <h2 className="text-lg font-bold text-black">Waste Details</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Waste Type *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {wasteTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('wasteType', type.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      formData.wasteType === type.value
                        ? 'border-[#50c2c9] bg-[#50c2c9] bg-opacity-10'
                        : 'border-gray-200 hover:border-[#50c2c9] hover:border-opacity-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <InputField
              label="Estimated Weight (kg)"
              type="number"
              placeholder="Enter estimated weight"
              icon={<Package className="w-5 h-5" />}
              value={formData.estimatedWeight}
              onChange={(value) => handleInputChange('estimatedWeight', value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => handleInputChange('priority', priority as any)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      formData.priority === priority
                        ? 'border-[#50c2c9] bg-[#50c2c9] bg-opacity-10'
                        : 'border-gray-200 hover:border-[#50c2c9] hover:border-opacity-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        priority === 'high' ? 'text-red-500' :
                        priority === 'medium' ? 'text-orange-500' :
                        'text-green-500'
                      }`} />
                      <span className="font-medium text-gray-900 capitalize">{priority}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 shadow-sm border border-[#50c2c9] border-opacity-15 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#50c2c9] bg-opacity-15 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#50c2c9]" />
            </div>
            <h2 className="text-lg font-bold text-black">Schedule Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date *
              </label>
              <button
                onClick={() => setShowCalendar(true)}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-white hover:border-[#50c2c9] transition-all duration-200"
              >
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className={formData.pickupDate ? 'text-gray-900' : 'text-gray-400'}>
                  {formatDisplayDate(formData.pickupDate)}
                </span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleInputChange('pickupTime', time)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      formData.pickupTime === time
                        ? 'border-[#50c2c9] bg-[#50c2c9] bg-opacity-10 text-[#50c2c9]'
                        : 'border-gray-200 text-gray-700 hover:border-[#50c2c9] hover:border-opacity-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                placeholder="Any special handling instructions or notes"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl bg-white placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent transition-all duration-200 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#50c2c9] to-[#47b1b8] text-white py-4 rounded-xl font-semibold hover:from-[#47b1b8] hover:to-[#50c2c9] transition-all duration-200 shadow-lg shadow-[#50c2c9]/25 flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            Schedule Pickup
          </button>
          
          <Link
            to="/pickup-schedule"
            className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* Calendar Picker */}
      <CalendarPicker
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
        selectedDate={formData.pickupDate}
      />

      {/* Bottom Navigation */}
      <AdminBottomNavigation />
    </div>
  );
}
