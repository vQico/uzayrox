'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCMS } from '@/context/CMSContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { cmsData, updateCMSData } = useCMS();
  const [localData, setLocalData] = useState(cmsData);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

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
    await updateCMSData(localData);
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'services', label: 'Services (Software & Design)' },
    { id: 'process', label: 'Development Process' },
    { id: 'contact', label: 'Contact Section' },
    { id: 'social', label: 'Social Media' }
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-widest uppercase">Dashboard</h1>
          <p className="code-font text-xs text-subtle-gray mt-2">MANAGE SYSTEM CONTENT</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleLogout} className="px-4 py-2 border border-white/20 text-xs code-font hover:bg-white/10 transition">
            LOGOUT
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-red-600 text-white font-bold text-xs tracking-widest hover:bg-red-500 transition">
            {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Menu */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2 bg-white/[0.02] p-4 border border-white/5 rounded-xl">
          <h3 className="code-font text-[10px] text-white/50 tracking-[0.2em] mb-2 px-2">SECTIONS</h3>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded text-sm transition-all ${
                activeTab === tab.id ? 'bg-white text-black font-bold' : 'text-subtle-gray hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full flex-1">
          
          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div className="glass-panel p-8 border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                HERO SECTION
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">TURKISH (TR)</h3>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Title Main</label>
                    <input type="text" value={localData.heroTitleMainTR} onChange={e => setLocalData({...localData, heroTitleMainTR: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Title Sub</label>
                    <input type="text" value={localData.heroTitleSubTR} onChange={e => setLocalData({...localData, heroTitleSubTR: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Description</label>
                    <textarea rows={3} value={localData.heroDescTR} onChange={e => setLocalData({...localData, heroDescTR: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full resize-none"></textarea>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">ENGLISH (EN)</h3>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Title Main</label>
                    <input type="text" value={localData.heroTitleMainEN} onChange={e => setLocalData({...localData, heroTitleMainEN: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Title Sub</label>
                    <input type="text" value={localData.heroTitleSubEN} onChange={e => setLocalData({...localData, heroTitleSubEN: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Description</label>
                    <textarea rows={3} value={localData.heroDescEN} onChange={e => setLocalData({...localData, heroDescEN: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="flex flex-col gap-8">
              <div className="glass-panel p-8 border border-white/10 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  SOFTWARE DEVELOPMENT SERVICES
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">TURKISH (TR)</h3>
                    <textarea rows={8} value={localData.softwareServicesTR.join('\n')} onChange={e => setLocalData({...localData, softwareServicesTR: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                    <p className="text-[10px] text-white/30">Bir hizmeti silmek için satırı silin, eklemek için yeni satıra yazın.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">ENGLISH (EN)</h3>
                    <textarea rows={8} value={localData.softwareServicesEN.join('\n')} onChange={e => setLocalData({...localData, softwareServicesEN: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 border border-white/10 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  GRAPHIC DESIGN SERVICES
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">TURKISH (TR)</h3>
                    <textarea rows={8} value={localData.designServicesTR.join('\n')} onChange={e => setLocalData({...localData, designServicesTR: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">ENGLISH (EN)</h3>
                    <textarea rows={8} value={localData.designServicesEN.join('\n')} onChange={e => setLocalData({...localData, designServicesEN: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROCESS TAB */}
          {activeTab === 'process' && (
            <div className="glass-panel p-8 border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                DEVELOPMENT PROCESS STEPS
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">TURKISH (TR)</h3>
                  <textarea rows={8} value={localData.processStepsTR.join('\n')} onChange={e => setLocalData({...localData, processStepsTR: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                  <p className="text-[10px] text-white/30">Bir süreci silmek için satırı silin, eklemek için yeni satıra yazın.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">ENGLISH (EN)</h3>
                  <textarea rows={8} value={localData.processStepsEN.join('\n')} onChange={e => setLocalData({...localData, processStepsEN: e.target.value.split('\n')})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full font-mono text-xs leading-relaxed"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="glass-panel p-8 border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                CONTACT SECTION
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">TURKISH (TR)</h3>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Description</label>
                    <textarea rows={4} value={localData.contactDescTR} onChange={e => setLocalData({...localData, contactDescTR: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full resize-none"></textarea>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="code-font text-xs text-subtle-gray border-b border-white/10 pb-2">ENGLISH (EN)</h3>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-white/50">Description</label>
                    <textarea rows={4} value={localData.contactDescEN} onChange={e => setLocalData({...localData, contactDescEN: e.target.value})} className="bg-white/5 border border-white/10 p-3 text-sm focus:border-red-500 outline-none w-full resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === 'social' && (
            <div className="glass-panel p-8 border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                SOCIAL MEDIA LINKS
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {localData.socialLinks.map((link, idx) => (
                  <div key={link.id} className="flex flex-col xl:flex-row gap-4 items-center bg-white/[0.02] p-4 border border-white/5">
                    <div className="flex-1 w-full">
                      <label className="text-xs font-bold text-white/50 block mb-1">Platform Name</label>
                      <input type="text" value={link.platform} onChange={e => {
                        const newLinks = [...localData.socialLinks];
                        newLinks[idx].platform = e.target.value;
                        setLocalData({...localData, socialLinks: newLinks});
                      }} className="bg-black/50 border border-white/10 p-2 text-sm outline-none w-full" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="text-xs font-bold text-white/50 block mb-1">URL</label>
                      <input type="text" value={link.url} onChange={e => {
                        const newLinks = [...localData.socialLinks];
                        newLinks[idx].url = e.target.value;
                        setLocalData({...localData, socialLinks: newLinks});
                      }} className="bg-black/50 border border-white/10 p-2 text-sm outline-none w-full" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="text-xs font-bold text-white/50 block mb-1">Icon (react-icons)</label>
                      <input type="text" value={link.iconName} onChange={e => {
                        const newLinks = [...localData.socialLinks];
                        newLinks[idx].iconName = e.target.value;
                        setLocalData({...localData, socialLinks: newLinks});
                      }} className="bg-black/50 border border-white/10 p-2 text-sm outline-none w-full" />
                    </div>
                    <div className="flex items-center gap-2 mt-4 xl:mt-0 pt-4 xl:pt-0">
                      <input type="checkbox" checked={link.isActive} onChange={e => {
                        const newLinks = [...localData.socialLinks];
                        newLinks[idx].isActive = e.target.checked;
                        setLocalData({...localData, socialLinks: newLinks});
                      }} className="w-4 h-4 cursor-pointer" />
                      <span className="text-xs uppercase code-font">Active</span>
                    </div>
                    <div className="flex items-center mt-4 xl:mt-0 pt-4 xl:pt-0">
                      <button onClick={() => {
                        const newLinks = localData.socialLinks.filter((_, i) => i !== idx);
                        setLocalData({...localData, socialLinks: newLinks});
                      }} className="text-red-500 hover:text-red-400 text-xs font-bold p-2 border border-red-500/30">DELETE</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => {
                  const newLink = { id: Date.now().toString(), platform: 'New Platform', url: '#', iconName: 'FaLink', isActive: true };
                  setLocalData({...localData, socialLinks: [...localData.socialLinks, newLink]});
                }} className="w-full py-4 border border-white/20 border-dashed text-white/50 hover:text-white hover:border-white/50 transition-colors code-font text-xs mt-4">
                  + ADD NEW SOCIAL LINK
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
