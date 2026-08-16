'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KVKKPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 pt-40 pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-sm bg-white animate-pulse" />
            <span className="code-font text-xs tracking-[0.3em] text-subtle-gray">
              LEGAL // DOC_01
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            {t.legal.kvkk.title}
          </h1>
          <p className="text-subtle-gray text-lg">
            {t.legal.kvkk.subtitle}
          </p>
          <div className="mt-8 code-font text-xs text-subtle-gray border-b border-white/10 pb-8">
            {t.legal.kvkk.lastUpdated}
          </div>
        </motion.div>

        <div className="space-y-12">
          {t.legal.kvkk.content.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-xl border border-white/5"
            >
              <h3 className="text-xl font-bold mb-4 tracking-widest">{section.heading}</h3>
              <p className="text-subtle-gray leading-relaxed">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
