'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function Contact() {
  const { t, lang } = useLanguage();
  const { cmsData, selectedServiceForContact, setSelectedServiceForContact } = useCMS();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const activeServices = lang === 'tr' 
    ? [...cmsData.softwareServicesTR, ...cmsData.designServicesTR, 'Sosyal Medya', 'Diğer'] 
    : [...cmsData.softwareServicesEN, ...cmsData.designServicesEN, 'Social Media', 'Other'];

  return (
    <section id="contact" className="relative w-full py-32 bg-black overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Text & Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="code-font text-xs text-subtle-gray mb-4 tracking-[0.2em] uppercase">
              {t.contact.init}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-xl leading-tight mb-8">
              {t.contact.titleMain} <br />
              <span className="text-subtle-gray">{t.contact.titleSub}</span>
            </h2>
            <p className="text-subtle-gray max-w-md">
              {lang === 'tr' ? cmsData.contactDescTR : cmsData.contactDescEN}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex gap-8"
          >
            <div>
              <div className="code-font text-[10px] text-white/50 mb-1">SYSTEM_STATUS</div>
              <div className="text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {t.contact.status}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:w-1/2 min-h-[500px]">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 md:p-10 border border-white/10 rounded-xl h-full flex flex-col items-center justify-center text-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-widest mb-2">
                  {lang === 'tr' ? 'MESAJINIZ ALINDI' : 'MESSAGE RECEIVED'}
                </h3>
                <p className="text-subtle-gray">
                  {lang === 'tr' ? 'Sistemimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.' : 'It reached our system. We will contact you as soon as possible.'}
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-4 py-3 px-8 bg-transparent border border-white/20 text-white font-bold text-xs tracking-widest hover:border-white transition-colors"
              >
                {lang === 'tr' ? 'YENİ MESAJ GÖNDER' : 'SEND NEW MESSAGE'}
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-10 border border-white/10 rounded-xl"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="code-font text-xs text-subtle-gray">{t.contact.form.name}</label>
                  <input required type="text" className="bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="code-font text-xs text-subtle-gray">{t.contact.form.email}</label>
                  <input required type="email" className="bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="code-font text-xs text-subtle-gray">{t.contact.form.phone}</label>
                <input type="tel" className="bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors" />
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="code-font text-xs text-subtle-gray">{t.contact.form.service}</label>
                <select 
                  required 
                  value={selectedServiceForContact || ""}
                  onChange={(e) => setSelectedServiceForContact(e.target.value)}
                  className="bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors appearance-none text-white"
                >
                  <option value="" disabled className="text-black">{t.contact.form.servicePlaceholder}</option>
                  {/* Append selected service if it's not in default services array */}
                  {selectedServiceForContact && !activeServices.includes(selectedServiceForContact) && (
                    <option value={selectedServiceForContact} className="text-black">{selectedServiceForContact}</option>
                  )}
                  {activeServices.map(s => <option key={s} value={s} className="text-black">{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="code-font text-xs text-subtle-gray">{t.contact.form.details}</label>
                <textarea required rows={4} className="bg-white/5 border border-white/10 p-3 rounded focus:outline-none focus:border-white/50 text-sm transition-colors resize-none"></textarea>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input required type="checkbox" className="peer appearance-none w-4 h-4 border border-white/30 rounded-sm checked:bg-white checked:border-white transition-colors" />
                    <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-xs text-subtle-gray group-hover:text-white/80 transition-colors leading-relaxed">
                    {t.contact.form.kvkk}
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  type="submit"
                  data-cursor-hover
                  className="flex-1 py-4 bg-white text-black font-bold text-sm tracking-widest hover:bg-white/90 transition-colors"
                >
                  {t.contact.form.btnStart}
                </button>
                <button 
                  type="button"
                  onClick={() => window.open('https://wa.me/905555555555', '_blank')}
                  data-cursor-hover
                  className="flex-1 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest hover:border-white transition-colors"
                >
                  {t.contact.form.btnWhatsapp}
                </button>
              </div>
            </motion.form>
          )}
        </div>

      </div>
    </section>
  );
}
