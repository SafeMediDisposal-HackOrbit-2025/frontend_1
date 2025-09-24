import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { Mail, Lock, ChevronLeft } from 'lucide-react';
import InputField from '../components/InputField';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string, type: string }>({ text: '', type: '' });

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setHasEmailError(false);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const auth = getAuth();
      await signInWithCustomToken(auth, data.customToken);

      showMessage('Login successful!', 'success');
      navigate('/home');
    } catch (error: any) {
      console.error('Login failed:', error);
      setHasEmailError(true);
      showMessage(error.message || 'Login failed. Please try again.', 'error');
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
            Explore SafeMediDisposal
          </h1>
          <p className="text-gray-500">
            Enter your email and password
          </p>
        </div>
        <div className="space-y-4">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={setEmail}
            hasError={hasEmailError}
            errorMessage="Invalid email or password"
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
            <span className="text-sm text-[#50c2c9] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#50c2c9] text-white py-3 rounded-lg font-medium
              hover:bg-[#47b1b8] transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:ring-offset-2 disabled:bg-gray-400"
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </div>
        <div className="text-center mt-8">
          <span className="text-gray-600">Don't have an account? </span>
          <button onClick={() => navigate('/register')} className="text-[#50c2c9] hover:underline font-medium">
            Register here
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