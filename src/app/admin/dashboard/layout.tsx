'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Settings, 
  Share2, 
  LogOut 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'İçerik Yönetimi', href: '/admin/dashboard/content', icon: <Settings className="w-5 h-5" /> },
    { name: 'Sosyal Ağlar', href: '/admin/dashboard/social', icon: <Share2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5 flex flex-col items-start gap-4">
          <Link href="/admin/dashboard" className="text-xl font-bold tracking-widest text-white">
            UZAYROX<span className="text-green-500">_CMS</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="code-font text-[10px] text-subtle-gray tracking-widest">SİSTEM ÇEVRİMİÇİ</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-subtle-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="text-sm tracking-wide font-medium">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link 
            href="/admin"
            className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm tracking-wide font-medium">Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 relative h-screen overflow-y-auto">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
