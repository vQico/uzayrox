'use client';

import { motion } from 'framer-motion';
import { 
  Activity, Users, Server, AlertTriangle, 
  TerminalSquare, Shield, Clock, HardDrive,
  Cpu, Database
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "SİSTEM YÜKÜ", value: "24%", icon: <Cpu />, color: "text-white" },
    { title: "AKTİF KULLANICILAR", value: "1,204", icon: <Users />, color: "text-white" },
    { title: "VERİTABANI", value: "STABİL", icon: <Database />, color: "text-green-500" },
    { title: "GÜVENLİK DURUMU", value: "KORUMALI", icon: <Shield />, color: "text-green-500" },
  ];

  const recentLogs = [
    { time: "10:24:05", type: "INFO", message: "Yeni form talebi alındı: 'E-Ticaret Projesi'" },
    { time: "10:22:11", type: "WARN", message: "Yüksek ağ trafiği tespit edildi (Node_4)" },
    { time: "10:15:00", type: "INFO", message: "Sistem yedeklemesi tamamlandı." },
    { time: "09:45:22", type: "ERROR", message: "API Gateway yanıt vermiyor (Timeout)" },
    { time: "09:44:10", type: "INFO", message: "Yönetici girişi başarılı (admin@uzayrox.com)" },
  ];

  return (
    <div className="p-6 md:p-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-widest">SİSTEM ÖZETİ</h1>
          <p className="code-font text-xs text-subtle-gray tracking-[0.2em] mt-2">DİJİTAL ÇEKİRDEK DURUM RAPORU</p>
        </div>
        
        <div className="code-font text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-subtle-gray" />
          {time}
        </div>
      </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 border border-white/10 rounded-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-16 h-16">{stat.icon}</div>
              </div>
              <p className="code-font text-[10px] text-subtle-gray mb-2">{stat.title}</p>
              <h3 className={`text-3xl font-bold tracking-tighter ${stat.color}`}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* System Terminal Logs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-panel border border-white/10 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="border-b border-white/10 p-4 bg-white/[0.02] flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-subtle-gray" />
              <h4 className="code-font text-xs tracking-widest">SİSTEM LOGLARI</h4>
            </div>
            <div className="p-6 font-mono text-xs space-y-4 flex-1">
              {recentLogs.map((log, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-subtle-gray shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 w-12 ${
                    log.type === 'INFO' ? 'text-blue-400' :
                    log.type === 'WARN' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-white/80">{log.message}</span>
                </div>
              ))}
              <div className="flex gap-4 mt-6 items-center">
                <span className="text-subtle-gray shrink-0">[{time}]</span>
                <span className="w-2 h-4 bg-white animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Server Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel border border-white/10 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="border-b border-white/10 p-4 bg-white/[0.02] flex items-center gap-2">
              <Server className="w-4 h-4 text-subtle-gray" />
              <h4 className="code-font text-xs tracking-widest">SUNUCU DURUMU</h4>
            </div>
            <div className="p-6 flex flex-col gap-6">
              
              <div>
                <div className="flex justify-between text-xs code-font mb-2">
                  <span className="text-subtle-gray">CPU KULLANIMI</span>
                  <span>24%</span>
                </div>
                <div className="h-1 bg-white/10 w-full overflow-hidden">
                  <div className="h-full bg-white w-[24%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs code-font mb-2">
                  <span className="text-subtle-gray">BELLEK (RAM)</span>
                  <span>12GB / 32GB</span>
                </div>
                <div className="h-1 bg-white/10 w-full overflow-hidden">
                  <div className="h-full bg-white w-[37%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs code-font mb-2">
                  <span className="text-subtle-gray">DEPOLAMA</span>
                  <span>450GB / 1TB</span>
                </div>
                <div className="h-1 bg-white/10 w-full overflow-hidden">
                  <div className="h-full bg-white w-[45%]" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>

    </div>
  );
}
