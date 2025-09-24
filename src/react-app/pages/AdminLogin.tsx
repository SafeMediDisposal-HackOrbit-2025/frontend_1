import { useState } from 'react';
import { ChevronLeft, Mail, Lock} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import InputField from '@/react-app/components/InputField';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate required fields
    if (!email || !password) {
      return;
    }

    // Simulate email validation error
    if (!email.includes('@')) {
      setHasEmailError(true);
      return;
    }

    // If validation passes, navigate to admin dashboard
    setHasEmailError(false);
    navigate('/admin/dashboard');
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
            Admin Access
          </h1>
          <p className="text-gray-500">
            Enter your admin credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={setEmail}
            hasError={hasEmailError}
            errorMessage="Your email is not registered as admin"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5" />}
            value={password}
            onChange={setPassword}
          />

          <div className="flex justify-end mb-6">
            <Link 
              to="/admin/reset-password" 
              className="text-sm text-[#50c2c9] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium
                     hover:bg-[#47b1b8] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2"
          >
            Login to Admin Panel
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <span className="text-gray-600">Don't have admin access? </span>
          <Link 
            to="/admin/register" 
            className="text-[#50c2c9] hover:underline font-medium"
          >
            Request access
          </Link>
        </div>
      </div>
    </div>
  );
}
