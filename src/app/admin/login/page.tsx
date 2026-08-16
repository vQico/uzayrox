'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'uzayrox2026') {
      localStorage.setItem('admin_token', 'true');
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 glass-panel p-12 border border-white/10 rounded-2xl max-w-md w-full text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold tracking-[0.2em] mb-2 text-white drop-shadow-md">UZAYROX</h1>
        <p className="code-font text-xs text-green-400 mb-10 tracking-[0.3em]">SECURE SYSTEM LOGIN</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Code"
              className="w-full bg-black/40 border border-white/20 p-4 rounded-xl text-center focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all text-white tracking-widest"
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] code-font tracking-widest uppercase text-center"
              >
                ACCESS DENIED. INVALID CREDENTIALS.
              </motion.div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-4 bg-white hover:bg-green-400 text-black font-black text-sm tracking-[0.2em] rounded-xl transition-all duration-300 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]"
          >
            AUTHORIZE
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/10 flex justify-center items-center gap-2 text-[10px] code-font text-white/30">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          SYSTEM ENCRYPTED & SECURED
        </div>
      </motion.div>
    </div>
  );
}
