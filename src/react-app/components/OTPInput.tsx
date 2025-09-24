import { useState, useRef, useEffect } from 'react';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  value?: string;
}

export default function OTPInput({ length, onComplete, value = '' }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      while (otpArray.length < length) {
        otpArray.push('');
      }
      setOtp(otpArray);
    }
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input if digit is entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every(d => d) && newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    if (newOtp.every(d => d) && newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className="flex justify-center gap-3 my-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`
            w-12 h-12 text-center text-lg font-semibold rounded-lg border-2
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            transition-all duration-200
            ${digit ? 'border-teal-500 bg-white text-gray-900' : 'border-gray-200 bg-white text-gray-900'}
            ${index === otp.findIndex(d => !d) ? 'border-teal-500' : ''}
          `}
        />
      ))}
    </div>
  );
}
