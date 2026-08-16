'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCMS } from '@/context/CMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa6';

function ArrayEditor({ items, onChange, label, placeholder }: any) {
  const handleAdd = () => onChange([...items, ""]);
  const handleRemove = (idx: number) => onChange(items.filter((_: any, i: number) => i !== idx));
  const handleChange = (idx: number, val: string) => {
    const newItems = [...items];
    newItems[idx] = val;
    onChange(newItems);
  };
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-3 uppercase">{label}</label>
      <div className="space-y-2">
        {items.map((item: string, idx: number) => (
          <div key={idx} className="flex gap-2">
            <input 
              value={item}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-green-500 transition-colors text-white"
            />
            <button onClick={() => handleRemove(idx)} className="bg-red-500/10 text-red-500 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
              <FaIcons.FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={handleAdd} className="w-full py-3 border border-dashed border-white/20 text-white/50 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors flex items-center justify-center gap-2 text-sm">
          <FaIcons.FaPlus /> YENİ ÖĞE EKLE
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboardPremium() {
  const router = useRouter();
  const { cmsData, updateCMSData } = useCMS();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [localData, setLocalData] = useState(cmsData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
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
      setSaveMessage('GÜNCELLEME BAŞARILI!');
    } catch (error) {
      setSaveMessage('KAYIT HATASI!');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: FaIcons.FaChartPie },
    { id: 'hero', label: 'HERO BÖLÜMÜ', icon: FaIcons.FaRegWindowMaximize },
    { id: 'software', label: 'YAZILIM HİZMETLERİ', icon: FaIcons.FaCode },
    { id: 'design', label: 'TASARIM HİZMETLERİ', icon: FaIcons.FaPenNib },
    { id: 'process', label: 'SÜREÇLER', icon: FaIcons.FaListOl },
    { id: 'contact', label: 'İLETİŞİM', icon: FaIcons.FaEnvelope },
    { id: 'social', label: 'SOSYAL PLATFORMLAR', icon: FaIcons.FaShareNodes },
  ];

  if (!localData) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-black border-r border-white/5 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">UZAYROX</h1>
          <FaIcons.FaShieldHalved className="text-green-500" />
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold tracking-wider ${
                activeTab === item.id 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'text-subtle-gray hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-green-400' : 'opacity-50'}`} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors text-xs font-bold tracking-widest"
          >
            <FaIcons.FaPowerOff /> SİSTEMDEN ÇIKIŞ YAP
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/10 via-[#050505] to-black">
        
        {/* Topbar */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold tracking-widest">{menuItems.find(m => m.id === activeTab)?.label}</h2>
            <p className="text-xs text-subtle-gray code-font">SİSTEM YÖNETİM MERKEZİ</p>
          </div>
          
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className={`text-xs font-bold tracking-widest px-4 py-2 rounded-lg ${saveMessage.includes('HATA') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {saveMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-black text-sm tracking-widest rounded-xl transition-colors disabled:opacity-50"
            >
              <FaIcons.FaFloppyDisk />
              {isSaving ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 border border-white/10 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                        <FaIcons.FaGlobe className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-subtle-gray tracking-widest mb-1">SİSTEM DURUMU</div>
                        <div className="text-2xl font-bold text-white">AKTİF</div>
                      </div>
                    </div>
                    <div className="glass-panel p-6 border border-white/10 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                        <FaIcons.FaUsers className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-subtle-gray tracking-widest mb-1">GÜNLÜK ZİYARETÇİ</div>
                        <div className="text-2xl font-bold text-white">~1.240</div>
                      </div>
                    </div>
                    <div className="glass-panel p-6 border border-white/10 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                        <FaIcons.FaServer className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-subtle-gray tracking-widest mb-1">SUNUCU YÜKÜ</div>
                        <div className="text-2xl font-bold text-white">4%</div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 glass-panel p-8 border border-white/10 rounded-2xl mt-4 text-center">
                      <h3 className="text-xl font-bold mb-2">SİSTEM YÖNETİMİNE HOŞ GELDİNİZ</h3>
                      <p className="text-subtle-gray text-sm">Sol menüden istediğiniz modülü seçerek sitenizdeki içerikleri canlı olarak silebilir, değiştirebilir ve anında kaydedebilirsiniz.</p>
                    </div>
                  </div>
                )}

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">ANA BAŞLIK (TR)</label>
                        <input value={localData.heroTitleMainTR} onChange={e => setLocalData({...localData, heroTitleMainTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">ANA BAŞLIK (EN)</label>
                        <input value={localData.heroTitleMainEN} onChange={e => setLocalData({...localData, heroTitleMainEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">ALT BAŞLIK (TR)</label>
                        <input value={localData.heroTitleSubTR} onChange={e => setLocalData({...localData, heroTitleSubTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">ALT BAŞLIK (EN)</label>
                        <input value={localData.heroTitleSubEN} onChange={e => setLocalData({...localData, heroTitleSubEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">AÇIKLAMA (TR)</label>
                        <textarea rows={3} value={localData.heroDescTR} onChange={e => setLocalData({...localData, heroDescTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">AÇIKLAMA (EN)</label>
                        <textarea rows={3} value={localData.heroDescEN} onChange={e => setLocalData({...localData, heroDescEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* SOFTWARE TAB */}
                {activeTab === 'software' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <ArrayEditor 
                        label="YAZILIM HİZMETLERİ (TR)" 
                        items={localData.softwareServicesTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, softwareServicesTR: arr})} 
                      />
                      <ArrayEditor 
                        label="YAZILIM HİZMETLERİ (EN)" 
                        items={localData.softwareServicesEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, softwareServicesEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* DESIGN TAB */}
                {activeTab === 'design' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <ArrayEditor 
                        label="TASARIM HİZMETLERİ (TR)" 
                        items={localData.designServicesTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, designServicesTR: arr})} 
                      />
                      <ArrayEditor 
                        label="TASARIM HİZMETLERİ (EN)" 
                        items={localData.designServicesEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, designServicesEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* PROCESS TAB */}
                {activeTab === 'process' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <ArrayEditor 
                        label="SÜREÇ ADIMLARI (TR)" 
                        items={localData.processStepsTR} 
                        onChange={(arr: string[]) => setLocalData({...localData, processStepsTR: arr})} 
                      />
                      <ArrayEditor 
                        label="SÜREÇ ADIMLARI (EN)" 
                        items={localData.processStepsEN} 
                        onChange={(arr: string[]) => setLocalData({...localData, processStepsEN: arr})} 
                      />
                    </div>
                  </div>
                )}

                {/* CONTACT TAB */}
                {activeTab === 'contact' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">İLETİŞİM METNİ (TR)</label>
                        <textarea rows={5} value={localData.contactDescTR} onChange={e => setLocalData({...localData, contactDescTR: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">İLETİŞİM METNİ (EN)</label>
                        <textarea rows={5} value={localData.contactDescEN} onChange={e => setLocalData({...localData, contactDescEN: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* SOCIAL PLATFORMS TAB */}
                {activeTab === 'social' && (
                  <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    {/* Platform Selector */}
                    <div className="flex gap-4 overflow-x-auto pb-4 mb-8 border-b border-white/10">
                      {localData.socialPlatforms.map((platform, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePlatformIndex(idx)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm tracking-widest transition-all ${
                            activePlatformIndex === idx 
                              ? 'bg-green-500 text-black' 
                              : 'bg-white/5 hover:bg-white/10 text-white'
                          }`}
                        >
                          {platform.name}
                        </button>
                      ))}
                    </div>

                    {/* Platform Editor */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">PLATFORM ADI</label>
                          <input 
                            value={localData.socialPlatforms[activePlatformIndex].name} 
                            onChange={e => {
                              const newPlat = [...localData.socialPlatforms];
                              newPlat[activePlatformIndex].name = e.target.value;
                              setLocalData({...localData, socialPlatforms: newPlat});
                            }} 
                            className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-subtle-gray tracking-widest mb-2">İKON ADI (Örn: FaInstagram)</label>
                          <input 
                            value={localData.socialPlatforms[activePlatformIndex].iconName} 
                            onChange={e => {
                              const newPlat = [...localData.socialPlatforms];
                              newPlat[activePlatformIndex].iconName = e.target.value;
                              setLocalData({...localData, socialPlatforms: newPlat});
                            }} 
                            className="w-full bg-white/5 border border-white/10 rounded p-4 focus:border-green-500 outline-none" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
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
