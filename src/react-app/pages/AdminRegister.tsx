import { useState } from 'react';
import { ChevronLeft, User, Lock, Mail, Phone} from 'lucide-react';
import { Link } from 'react-router';
import InputField from '@/react-app/components/InputField';

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRegister = () => {
    // Handle admin registration logic here
    console.log('Admin registration data:', { name, password, email, mobile });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/auth" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black mb-2">
            Request Admin Access
          </h1>
          <p className="text-gray-500">
            Submit your details for admin account approval
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon={<User className="w-5 h-5" />}
            value={name}
            onChange={setName}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Create a secure password"
            icon={<Lock className="w-5 h-5" />}
            value={password}
            onChange={setPassword}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your work email"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={setEmail}
          />

          <InputField
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile number"
            icon={<Phone className="w-5 h-5" />}
            value={mobile}
            onChange={setMobile}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium mt-6
                     hover:bg-[#47b1b8] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
          >
            Submit Request
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <span className="text-gray-600">Already have admin access? </span>
          <Link 
            to="/admin/login" 
            className="text-[#50c2c9] hover:underline font-medium"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
