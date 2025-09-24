import { useState } from 'react';
import { Calendar, Clock, Scale } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import CalendarPicker from '@/react-app/components/CalendarPicker';

interface LocationState {
  imageData: string;
}

export default function GarbageForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const imageData = state?.imageData || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center";

  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    // In a real app, this would submit the form data
    console.log('Submitting garbage data:', { weight, date, time, imageData });
    
    // Navigate to success screen
    navigate('/garbage-success', { 
      state: { 
        imageData, 
        weight, 
        date, 
        time 
      } 
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] flex flex-col">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center mb-6">
        <Link to="/garbage-confirmation" state={{ imageData }} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">Garbage Handover</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        {/* Trash Photo Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Trash Photo</h2>
          <div className="w-full">
            <img
              src={imageData}
              alt="Captured trash"
              className="w-full h-48 rounded-2xl object-cover shadow-md border border-gray-200"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Garbage Weight */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-3">
              Garbage Weight
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Scale className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Enter waste weight/gram"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl
                         text-gray-900 placeholder-gray-400 text-base
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent
                         shadow-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-3">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setShowCalendar(true)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl
                         text-gray-900 placeholder-gray-400 text-base text-left
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent
                         shadow-sm transition-all duration-200 hover:border-gray-300"
              >
                {date ? formatDate(date) : 'Select Date'}
              </button>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-3">
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="time"
                placeholder="Enter Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl
                         text-gray-900 placeholder-gray-400 text-base
                         focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent
                         shadow-sm transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 pb-12">
        <button
          onClick={handleSubmit}
          disabled={!weight || !date || !time}
          className="w-full bg-[#50c2c9] text-white py-4 rounded-2xl font-semibold text-lg
                     shadow-lg hover:bg-[#47b1b8] transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#50c2c9]"
        >
          Hand over the trash
        </button>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6">
        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
      </div>

      {/* Calendar Picker */}
      <CalendarPicker
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={setDate}
        selectedDate={date}
      />
    </div>
  );
}
