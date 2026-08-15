'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-panel p-10 border border-white/10 rounded-xl max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold tracking-widest mb-2">SYSTEM LOGIN</h1>
        <p className="code-font text-xs text-subtle-gray mb-8">AUTHENTICATION REQUIRED</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-white/5 border border-white/10 p-4 rounded text-center focus:outline-none focus:border-red-500 transition-colors"
          />
          {error && <div className="text-red-500 text-xs code-font">ACCESS DENIED</div>}
          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-bold text-sm tracking-widest hover:bg-white/90 transition-colors mt-4"
          >
            AUTHORIZE
          </button>
        </form>
      </div>
    </div>
  );
}
