'use client';

import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminContentPage() {
  const { cmsData, updateCMSData } = useCMS();
  
  // Local state for edits
  const [data, setData] = useState(cmsData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updateCMSData(data);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="p-6 md:p-10">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-widest">İÇERİK YÖNETİMİ</h1>
          <p className="code-font text-xs text-subtle-gray tracking-[0.2em] mt-2">METİN VE BİLGİ GÜNCELLEMELERİ</p>
        </div>
        
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold tracking-widest hover:bg-white/90 transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
        </button>
      </header>

      <div className="max-w-4xl space-y-12">
        
        {/* HERO SECTION TR */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 border border-white/10 rounded-xl"
        >
          <h2 className="text-xl font-bold tracking-widest mb-6 code-font border-b border-white/10 pb-4">
            HERO BÖLÜMÜ (TÜRKÇE)
          </h2>
          <div className="space-y-6">
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">ANA BAŞLIK (ÜST SATIR)</label>
              <input 
                type="text" 
                value={data.heroTitleMainTR}
                onChange={(e) => setData({...data, heroTitleMainTR: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors font-bold text-xl"
              />
            </div>
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">ANA BAŞLIK (ALT SATIR)</label>
              <input 
                type="text" 
                value={data.heroTitleSubTR}
                onChange={(e) => setData({...data, heroTitleSubTR: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors font-bold text-xl text-subtle-gray"
              />
            </div>
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">AÇIKLAMA METNİ</label>
              <textarea 
                rows={4}
                value={data.heroDescTR}
                onChange={(e) => setData({...data, heroDescTR: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors text-subtle-gray resize-none"
              />
            </div>
          </div>
        </motion.section>

        {/* HERO SECTION EN */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 border border-white/10 rounded-xl"
        >
          <h2 className="text-xl font-bold tracking-widest mb-6 code-font border-b border-white/10 pb-4">
            HERO BÖLÜMÜ (İNGİLİZCE)
          </h2>
          <div className="space-y-6">
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">MAIN TITLE (TOP LINE)</label>
              <input 
                type="text" 
                value={data.heroTitleMainEN}
                onChange={(e) => setData({...data, heroTitleMainEN: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors font-bold text-xl"
              />
            </div>
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">MAIN TITLE (BOTTOM LINE)</label>
              <input 
                type="text" 
                value={data.heroTitleSubEN}
                onChange={(e) => setData({...data, heroTitleSubEN: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors font-bold text-xl text-subtle-gray"
              />
            </div>
            <div>
              <label className="code-font text-[10px] text-subtle-gray mb-2 block">DESCRIPTION TEXT</label>
              <textarea 
                rows={4}
                value={data.heroDescEN}
                onChange={(e) => setData({...data, heroDescEN: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded focus:outline-none focus:border-white/50 transition-colors text-subtle-gray resize-none"
              />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
