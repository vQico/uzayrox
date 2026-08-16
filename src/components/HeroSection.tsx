'use client';

import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const { cmsData } = useCMS();

  const titleMain = lang === 'tr' ? cmsData.heroTitleMainTR : cmsData.heroTitleMainEN;
  const titleSub = lang === 'tr' ? cmsData.heroTitleSubTR : cmsData.heroTitleSubEN;
  const desc = lang === 'tr' ? cmsData.heroDescTR : cmsData.heroDescEN;

  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden">
      {/* Video Background Layer */}
      <VideoBackground />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-end h-full pb-32">
        
        {/* Technical Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="code-font text-xs tracking-[0.2em] text-white">
            {t.hero.coreStatus}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-8"
        >
          {titleMain} <br />
          <span className="text-subtle-gray">{titleSub}</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.9 }}
          className="text-lg md:text-xl text-subtle-gray max-w-2xl mb-12 leading-relaxed"
        >
          {desc}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.1 }}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
            className="group relative px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              {t.hero.btnStart}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-subtle-gray transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </button>
          
          <button 
            onClick={() => document.getElementById('software')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
            className="group px-8 py-4 bg-transparent text-white font-semibold text-sm tracking-widest border border-white/20 hover:border-white transition-colors flex items-center gap-3"
          >
            {t.hero.btnExplore}
          </button>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-subtle-gray"
      >
        <span className="code-font text-[10px] tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 opacity-50" />
        </motion.div>
      </motion.div>

    </section>
  );
}
