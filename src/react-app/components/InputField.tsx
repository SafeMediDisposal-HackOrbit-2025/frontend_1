import { ReactNode, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputField({ 
  label, 
  type, 
  placeholder, 
  icon, 
  hasError = false, 
  errorMessage,
  value = '',
  onChange 
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="text-gray-400">
            {icon}
          </div>
        </div>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full pl-10 pr-12 py-3 border rounded-lg bg-white
            placeholder-gray-400 text-gray-900 text-sm
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            transition-all duration-200
            ${hasError ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}
            ${isFocused && !hasError ? 'border-teal-500' : ''}
          `}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {hasError && errorMessage && (
        <div className="flex items-center mt-2">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-red-500">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
