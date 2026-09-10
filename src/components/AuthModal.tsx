import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const userObj = {
        name: email.split('@')[0] || 'Bharath Kumar',
        email,
        phone: '+91 98765 43210',
        role: 'user',
      };
      onLoginSuccess(userObj);
      onClose();
    } else if (mode === 'register') {
      setMode('otp');
      setOtpSent(true);
    } else if (mode === 'otp') {
      const userObj = {
        name: name || 'Bharath Kumar',
        email,
        phone,
        role: 'user',
      };
      onLoginSuccess(userObj);
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    const userObj = {
      name: 'Bharath Kumar (Google Verified)',
      email: 'bharathilv33@gmail.com',
      phone: '+91 98401 99887',
      role: 'user',
    };
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md p-4 flex justify-center items-center">
      <div className="frosted-modal rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {mode === 'login' ? 'Sign In to PropBot AI' : mode === 'register' ? 'Create Account' : 'Verify Phone OTP'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Bharath Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium"
              />
            </div>
          )}

          {mode !== 'otp' && (
            <div>
              <label className="font-bold block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="bharath@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium"
              />
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="font-bold block mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium"
              />
            </div>
          )}

          {mode !== 'otp' && (
            <div>
              <label className="font-bold block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium"
              />
            </div>
          )}

          {mode === 'otp' && (
            <div className="space-y-2">
              <p className="text-slate-500">OTP code sent to {phone}. Enter 6-digit verification code:</p>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center text-lg font-black tracking-widest"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Send OTP' : 'Verify & Continue'}
          </button>
        </form>

        {/* Third-Party Google Auth */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-2"
          >
            <span className="text-base font-black">G</span>
            <span>Continue with Google</span>
          </button>

          <div className="text-center text-xs">
            {mode === 'login' ? (
              <p className="text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => setMode('register')} className="text-blue-600 font-bold underline">
                  Register
                </button>
              </p>
            ) : (
              <p className="text-slate-500">
                Already registered?{' '}
                <button onClick={() => setMode('login')} className="text-blue-600 font-bold underline">
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
