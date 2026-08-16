'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCMS } from '@/context/CMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa6';

// ----------------------------------------------------------------------
// 1. Array Editor (CRUD) - REDESIGNED PREMIUM VERSION
// ----------------------------------------------------------------------
function ArrayEditor({ items, onChange, label, placeholder }: any) {
  const handleAdd = () => onChange([...items, ""]);
  const handleRemove = (idx: number) => onChange(items.filter((_: any, i: number) => i !== idx));
  const handleChange = (idx: number, val: string) => {
    const newItems = [...items];
    newItems[idx] = val;
    onChange(newItems);
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        <label className="block text-xs font-black text-emerald-400 tracking-[0.2em] uppercase">{label}</label>
      </div>
      
      <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner">
        <AnimatePresence>
          {items.map((item: string, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 group"
            >
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500/30 group-focus-within:text-emerald-400 transition-colors">
                  <FaIcons.FaAngleRight className="w-3 h-3" />
                </div>
                <input 
                  value={item}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-8 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-white/90 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                />
              </div>
              <button 
                onClick={() => handleRemove(idx)} 
                className="w-12 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
              >
                <FaIcons.FaTrash className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd} 
          className="w-full py-3 border border-dashed border-emerald-500/30 text-emerald-500/70 rounded-lg hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 text-xs font-bold tracking-widest mt-2"
        >
          <FaIcons.FaPlus /> YENİ ÖĞE EKLE
        </motion.button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Live Stats Simulation Component
// ----------------------------------------------------------------------
function LiveStats() {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);
  const [net, setNet] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 20) + 5);
      setRam(Math.floor(Math.random() * 10) + 40);
      setNet(Math.floor(Math.random() * 50) + 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* CPU */}
      <div className="glass-panel p-6 border border-emerald-500/20 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-black border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <FaIcons.FaMicrochip className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-emerald-500/70 font-black tracking-[0.2em] mb-1">CPU LOAD</div>
            <div className="text-3xl font-mono text-white flex items-baseline gap-1">
              {cpu}<span className="text-sm text-emerald-500">%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* RAM */}
      <div className="glass-panel p-6 border border-blue-500/20 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-black border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <FaIcons.FaMemory className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-blue-500/70 font-black tracking-[0.2em] mb-1">MEMORY USAGE</div>
            <div className="text-3xl font-mono text-white flex items-baseline gap-1">
              {ram}<span className="text-sm text-blue-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* NETWORK */}
      <div className="glass-panel p-6 border border-purple-500/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-black border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <FaIcons.FaNetworkWired className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-purple-500/70 font-black tracking-[0.2em] mb-1">NETWORK TRFC</div>
            <div className="text-3xl font-mono text-white flex items-baseline gap-1">
              {net}<span className="text-sm text-purple-500">MB/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Secure Logout Modal
// ----------------------------------------------------------------------
function LogoutModal({ isOpen, onCancel, onConfirm }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#0a0a0a] border border-red-500/30 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center relative overflow-hidden"
          >
            {/* Warning Stripes */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ef4444_10px,#ef4444_20px)] opacity-50" />
            
            <div className="w-20 h-20 mx-auto bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <FaIcons.FaPowerOff className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-xl font-black tracking-widest text-white mb-2">SİSTEMDEN ÇIKIŞ</h2>
            <p className="text-xs text-subtle-gray mb-8">Oturumu kapatmak üzeresiniz. Güvenli çıkış işlemini onaylıyor musunuz?</p>
            
            <div className="flex gap-4">
              <button onClick={onCancel} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold tracking-widest transition-colors">
                İPTAL
              </button>
              <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 hover:bg-red-400 text-black rounded-xl text-xs font-black tracking-widest transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                ÇIKIŞ YAP
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// ----------------------------------------------------------------------
// MAIN ADMIN COMPONENT
// ----------------------------------------------------------------------
export default function AdminDashboardPremium() {
  const router = useRouter();
  const { cmsData, updateCMSData } = useCMS();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [localData, setLocalData] = useState(cmsData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Social Platform selection state
  const [activePlatformIndex, setActivePlatformIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    setLocalData(cmsData);
  }, [cmsData]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await updateCMSData(localData);
      setSaveMessage('SİSTEM GÜNCELLENDİ');
    } catch (error) {
      setSaveMessage('HATA: BAĞLANTI KOPTU');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const executeLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    }, 1500); // 1.5s fake secure disconnection animation
  };

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: FaIcons.FaChartPie },
    { id: 'hero', label: 'HERO EKRANI', icon: FaIcons.FaRegWindowMaximize },
    { id: 'software', label: 'YAZILIM BİRİMİ', icon: FaIcons.FaCode },
    { id: 'design', label: 'TASARIM BİRİMİ', icon: FaIcons.FaPenNib },
    { id: 'process', label: 'SÜREÇ YÖNETİMİ', icon: FaIcons.FaListOl },
    { id: 'contact', label: 'İLETİŞİM MODÜLÜ', icon: FaIcons.FaEnvelope },
    { id: 'social', label: 'SOSYAL AĞLAR', icon: FaIcons.FaShareNodes },
  ];

  if (!localData) return null;

  // Disconnecting Screen Overlap
  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mb-6" />
        <div className="text-red-500 font-mono text-sm tracking-[0.3em] animate-pulse">DISCONNECTING SECURE SYSTEM...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex overflow-hidden selection:bg-emerald-500/30">
      
      <LogoutModal 
        isOpen={showLogout} 
        onCancel={() => setShowLogout(false)} 
        onConfirm={executeLogout} 
      />

      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* SIDEBAR */}
      <div className="w-72 bg-[#050505]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col fixed h-full z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        {/* Profile Header */}
        <div className="p-8 border-b border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <FaIcons.FaUserShield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white">ADMINISTRATOR</h1>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-500 code-font tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SİSTEM AKTİF
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-xs font-bold tracking-widest relative group overflow-hidden ${
                activeTab === item.id 
                  ? 'text-emerald-400 bg-emerald-500/10' 
                  : 'text-subtle-gray hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              )}
              <item.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-white/5 bg-gradient-to-t from-black to-transparent">
          <button 
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-black transition-all duration-300 text-xs font-black tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
          >
            <FaIcons.FaPowerOff className="w-4 h-4" /> SİSTEMDEN ÇIK
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="ml-72 flex-1 flex flex-col h-screen relative z-10">
        
        {/* Topbar */}
        <div className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <FaIcons.FaTerminal className="w-3 h-3 text-emerald-500 opacity-70" />
              <p className="text-[10px] text-emerald-500/70 code-font tracking-[0.3em]">C:\UZAYROX\ADMIN\{activeTab.toUpperCase()}</p>
            </div>
            <h2 className="text-2xl font-black tracking-widest text-white drop-shadow-md">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <AnimatePresence mode="wait">
              {saveMessage && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-widest border ${
                    saveMessage.includes('HATA') 
                      ? 'bg-red-500/10 text-red-400 border-red-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  {saveMessage.includes('HATA') ? <FaIcons.FaTriangleExclamation /> : <FaIcons.FaCheck />}
                  {saveMessage}
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-emerald-400 font-black text-xs tracking-[0.2em] rounded-xl transition-all duration-300 disabled:opacity-50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {isSaving ? <FaIcons.FaSpinner className="animate-spin w-4 h-4" /> : <FaIcons.FaFloppyDisk className="w-4 h-4" />}
              {isSaving ? 'YAZILIYOR...' : 'SİSTEMİ GÜNCELLE'}
            </button>
          </div>
        </div>

        {/* Dynamic Panels */}
        <div className="flex-1 overflow-y-auto p-10 pb-32">
          <div className="max-w-5xl mx-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                transition={{ duration: 0.3 }}
              >
                
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                  <div>
                    <LiveStats />
                    <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500 shadow-[0_0_20px_#10b981]" />
                      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <FaIcons.FaCube className="w-8 h-8 text-white/50" />
                      </div>
                      <h3 className="text-2xl font-black tracking-[0.2em] mb-4">UZAYROX YÖNETİM ÇEKİRDEĞİ</h3>
                      <p className="text-subtle-gray text-sm max-w-xl mx-auto leading-relaxed">
                        Sol taraftaki modülleri kullanarak sitenizin tüm içeriğini veritabanı bağlantısı olmadan dinamik olarak değiştirebilirsiniz. Yaptığınız tüm değişiklikler anında yayına yansıyacaktır.
                      </p>
                    </div>
                  </div>
                )}

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                  <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40 space-y-8 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500/50" />
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">ANA BAŞLIK (TÜRKÇE)</label>
                        <input value={localData.heroTitleMainTR} onChange={e => setLocalData({...localData, heroTitleMainTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white font-bold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">ANA BAŞLIK (İNGİLİZCE)</label>
                        <input value={localData.heroTitleMainEN} onChange={e => setLocalData({...localData, heroTitleMainEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">ALT BAŞLIK (TÜRKÇE)</label>
                        <input value={localData.heroTitleSubTR} onChange={e => setLocalData({...localData, heroTitleSubTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white font-bold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">ALT BAŞLIK (İNGİLİZCE)</label>
                        <input value={localData.heroTitleSubEN} onChange={e => setLocalData({...localData, heroTitleSubEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">AÇIKLAMA METNİ (TÜRKÇE)</label>
                        <textarea rows={4} value={localData.heroDescTR} onChange={e => setLocalData({...localData, heroDescTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white text-sm resize-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">AÇIKLAMA METNİ (İNGİLİZCE)</label>
                        <textarea rows={4} value={localData.heroDescEN} onChange={e => setLocalData({...localData, heroDescEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white text-sm resize-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* SOFTWARE TAB */}
                {activeTab === 'software' && (
                  <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <ArrayEditor 
                        label="YAZILIM HİZMETLERİ (TÜRKÇE)" 
                        items={localData.softwareServicesTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, softwareServicesTR: arr})} 
                      />
                      <ArrayEditor 
                        label="YAZILIM HİZMETLERİ (İNGİLİZCE)" 
                        items={localData.softwareServicesEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, softwareServicesEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* DESIGN TAB */}
                {activeTab === 'design' && (
                  <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <ArrayEditor 
                        label="TASARIM HİZMETLERİ (TÜRKÇE)" 
                        items={localData.designServicesTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, designServicesTR: arr})} 
                      />
                      <ArrayEditor 
                        label="TASARIM HİZMETLERİ (İNGİLİZCE)" 
                        items={localData.designServicesEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, designServicesEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* PROCESS TAB */}
                {activeTab === 'process' && (
                  <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <ArrayEditor 
                        label="SÜREÇ ADIMLARI (TÜRKÇE)" 
                        items={localData.processStepsTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, processStepsTR: arr})} 
                      />
                      <ArrayEditor 
                        label="SÜREÇ ADIMLARI (İNGİLİZCE)" 
                        items={localData.processStepsEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, processStepsEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* CONTACT TAB */}
                {activeTab === 'contact' && (
                  <div className="glass-panel p-10 border border-white/5 rounded-2xl bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                          <label className="block text-xs font-black text-emerald-400 tracking-[0.2em] uppercase">İLETİŞİM METNİ (TÜRKÇE)</label>
                        </div>
                        <textarea rows={6} value={localData.contactDescTR} onChange={e => setLocalData({...localData, contactDescTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white text-sm resize-none" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                          <label className="block text-xs font-black text-emerald-400 tracking-[0.2em] uppercase">İLETİŞİM METNİ (İNGİLİZCE)</label>
                        </div>
                        <textarea rows={6} value={localData.contactDescEN} onChange={e => setLocalData({...localData, contactDescEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white text-sm resize-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* SOCIAL PLATFORMS TAB */}
                {activeTab === 'social' && (
                  <div className="glass-panel border border-white/5 rounded-2xl bg-black/40 overflow-hidden">
                    {/* Platform Selector */}
                    <div className="flex gap-2 overflow-x-auto p-4 border-b border-white/5 bg-white/[0.02]">
                      {localData.socialPlatforms.map((platform, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePlatformIndex(idx)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap font-bold text-[10px] tracking-widest transition-all ${
                            activePlatformIndex === idx 
                              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                              : 'bg-black/50 border border-white/5 hover:border-emerald-500/30 text-subtle-gray hover:text-white'
                          }`}
                        >
                          {platform.name}
                        </button>
                      ))}
                    </div>

                    {/* Platform Editor */}
                    <div className="p-10">
                      <div className="grid grid-cols-2 gap-8 mb-10 pb-10 border-b border-white/5">
                        <div>
                          <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">PLATFORM İSMİ</label>
                          <input 
                            value={localData.socialPlatforms[activePlatformIndex].name} 
                            onChange={e => {
                              const newPlat = [...localData.socialPlatforms];
                              newPlat[activePlatformIndex].name = e.target.value;
                              setLocalData({...localData, socialPlatforms: newPlat});
                            }} 
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all font-bold text-white tracking-widest" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-emerald-500 tracking-[0.2em] mb-3">İKON DEĞERİ (Örn: FaInstagram)</label>
                          <input 
                            value={localData.socialPlatforms[activePlatformIndex].iconName} 
                            onChange={e => {
                              const newPlat = [...localData.socialPlatforms];
                              newPlat[activePlatformIndex].iconName = e.target.value;
                              setLocalData({...localData, socialPlatforms: newPlat});
                            }} 
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all text-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ArrayEditor 
                          label={`${localData.socialPlatforms[activePlatformIndex].name} İŞLEMLERİ (TR)`} 
                          items={localData.socialPlatforms[activePlatformIndex].servicesTR} 
                          onChange={(arr: string[]) => {
                            const newPlat = [...localData.socialPlatforms];
                            newPlat[activePlatformIndex].servicesTR = arr;
                            setLocalData({...localData, socialPlatforms: newPlat});
                          }} 
                        />
                        <ArrayEditor 
                          label={`${localData.socialPlatforms[activePlatformIndex].name} İŞLEMLERİ (EN)`} 
                          items={localData.socialPlatforms[activePlatformIndex].servicesEN} 
                          onChange={(arr: string[]) => {
                            const newPlat = [...localData.socialPlatforms];
                            newPlat[activePlatformIndex].servicesEN = arr;
                            setLocalData({...localData, socialPlatforms: newPlat});
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </div>
  );
}
