'use client';

import { useState } from 'react';
import { useCMS, SocialLink } from '@/context/CMSContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSocialPage() {
  const { cmsData, updateCMSData } = useCMS();
  const [links, setLinks] = useState<SocialLink[]>(cmsData.socialLinks);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updateCMSData({ socialLinks: links });
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleUpdate = (id: string, field: keyof SocialLink, value: any) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    setLinks([...links, { id: newId, platform: 'Yeni Platform', url: '#', iconName: 'FaLink', isActive: true }]);
  };

  return (
    <div className="p-6 md:p-10">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-widest">SOSYAL AĞ YÖNETİMİ</h1>
          <p className="code-font text-xs text-subtle-gray tracking-[0.2em] mt-2">PLATFORM BAĞLANTILARI VE GÖRÜNÜRLÜK</p>
        </div>
        
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold tracking-widest hover:bg-white/90 transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
        </button>
      </header>

      <div className="max-w-4xl space-y-6">
        {links.map((link, idx) => (
          <motion.div 
            key={link.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-6 border border-white/10 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="code-font text-[10px] text-subtle-gray mb-1 block">PLATFORM ADI</label>
                <input 
                  type="text" 
                  value={link.platform}
                  onChange={(e) => handleUpdate(link.id, 'platform', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors"
                />
              </div>
              <div>
                <label className="code-font text-[10px] text-subtle-gray mb-1 block">URL (BAĞLANTI)</label>
                <input 
                  type="text" 
                  value={link.url}
                  onChange={(e) => handleUpdate(link.id, 'url', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="code-font text-[10px] text-subtle-gray mb-1 block">İKON KODU (React Icons fa6)</label>
                <input 
                  type="text" 
                  value={link.iconName}
                  onChange={(e) => handleUpdate(link.id, 'iconName', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors font-mono"
                  placeholder="Örn: FaInstagram, FaWhatsapp"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={link.isActive}
                  onChange={(e) => handleUpdate(link.id, 'isActive', e.target.checked)}
                  className="w-4 h-4 bg-black border border-white/30 rounded checked:bg-green-500"
                />
                <span className="code-font text-xs">AKTİF</span>
              </label>

              <button 
                onClick={() => handleDelete(link.id)}
                className="p-3 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                title="Kaldır"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 border border-dashed border-white/20 text-subtle-gray hover:text-white hover:border-white/50 transition-colors rounded-xl flex items-center justify-center gap-2 code-font text-xs tracking-widest"
        >
          <Plus className="w-4 h-4" />
          YENİ BAĞLANTI EKLE
        </button>
      </div>

    </div>
  );
}
