import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Lock, Mail, Phone } from 'lucide-react';
import InputField from '../components/InputField';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string, type: string }>({ text: '', type: '' });

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };
  
  const handleRegister = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, mobile }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to register');
        }

        showMessage(data.message, 'success');
        navigate('/login');
    } catch (error: any) {
        console.error('Registration failed:', error);
        showMessage(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9F9] px-6 py-8">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/auth-selection')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="https://placehold.co/48x48/A2E9E9/1E293B?text=Logo"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black mb-2">
            Join with SafeMediDisposal
          </h1>
          <p className="text-gray-500">
            Sign up now and start your journey to make the world greener
          </p>
        </div>
        <div className="space-y-4">
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your full name"
            icon={<User className="w-5 h-5" />}
            value={name}
            onChange={setName}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5" />}
            value={password}
            onChange={setPassword}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
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
            disabled={isLoading}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium mt-6
                hover:bg-[#47b1b8] transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2 disabled:bg-gray-400"
          >
            {isLoading ? 'Registering...' : 'Registration'}
          </button>
        </div>
        <div className="text-center mt-8">
          <span className="text-gray-600">Already have an account? </span>
          <button onClick={() => navigate('/login')} className="text-[#50c2c9] hover:underline font-medium">
            Login here
          </button>
        </div>
        {message.text && (
          <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg font-medium text-white
            ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};