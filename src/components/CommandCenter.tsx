'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Network, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CommandCenter() {
  const [activeTasks, setActiveTasks] = useState(42);
  const [systemLoad, setSystemLoad] = useState(12);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTasks(Math.floor(Math.random() * 20) + 30);
      setSystemLoad(Math.floor(Math.random() * 15) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: t.commandCenter.social, value: t.commandCenter.socialActive, icon: Activity, color: 'text-[#ff5f56]' },
    { label: t.commandCenter.software, value: t.commandCenter.softwareActive, icon: Cpu, color: 'text-[#ffbd2e]' },
    { label: t.commandCenter.design, value: t.commandCenter.designActive, icon: Zap, color: 'text-[#27c93f]' },
    { label: t.commandCenter.security, value: t.commandCenter.securityProtected, icon: ShieldCheck, color: 'text-white' },
  ];

  return (
    <section id="system" className="relative w-full py-32 bg-black border-y border-white/5 overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="code-font text-xs tracking-[0.3em] text-red-500">{t.commandCenter.live}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              {t.commandCenter.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[400px]">
          
          {/* Main Status Display */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 glass-panel rounded-2xl border border-white/10 p-8 flex flex-col justify-between"
          >
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="code-font text-xs text-subtle-gray mb-2 relative z-10">{t.commandCenter.activeTasks}</span>
                <span className="text-5xl font-bold font-mono tracking-tighter relative z-10">
                  {activeTasks.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-lg relative overflow-hidden group">
                <div className="flex justify-between items-end mb-4">
                  <span className="code-font text-xs text-subtle-gray">{t.commandCenter.systemLoad}</span>
                  <span className="text-3xl font-bold font-mono tracking-tighter">{systemLoad}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white"
                    animate={{ width: `${systemLoad}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 1 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center">
                 <span className="code-font text-xs text-subtle-gray">{t.commandCenter.network}</span>
                 <span className="code-font text-xs font-bold text-white tracking-widest border border-white/20 px-3 py-1 rounded">{t.commandCenter.networkSecure}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="code-font text-xs text-subtle-gray">{t.commandCenter.coreStatus}</span>
                 <span className="code-font text-xs font-bold text-white tracking-widest border border-white/20 px-3 py-1 rounded">{t.commandCenter.coreReady}</span>
              </div>
            </div>
          </motion.div>

          {/* Detailed Logs & Modules */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-[400px] flex flex-col gap-4"
          >
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <span className="font-bold tracking-widest text-sm">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="code-font text-[10px] text-subtle-gray tracking-widest">{metric.value}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
