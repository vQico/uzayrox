import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30 selection:text-red-500">
      {/* Small top bar for admin */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center px-6">
        <div className="flex-1">
          <span className="font-black tracking-widest text-xl">UZAYROX</span>
          <span className="code-font text-xs text-red-500 ml-4 tracking-widest">ADMIN PORTAL</span>
        </div>
      </header>
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
