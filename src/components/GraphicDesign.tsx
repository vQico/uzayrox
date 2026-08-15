'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function GraphicDesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const { cmsData } = useCMS();
  
  const services = lang === 'tr' ? cmsData.designServicesTR : cmsData.designServicesEN;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section id="design" ref={containerRef} className="relative w-full py-32 bg-black overflow-hidden">
      
      {/* Background Grid Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center min-h-[600px]">
        
        {/* Left Visual: Floating Design Elements */}
        <div className="flex-1 w-full h-[500px] relative hidden lg:block">
          
          <motion.div 
            style={{ y: y1, rotate: rotate1 }}
            className="absolute top-10 left-10 w-64 h-80 glass-panel rounded-2xl border border-white/10 p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="code-font text-[10px] text-white/50">UI/UX</div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-2 bg-white/20 rounded-full" />
              <div className="w-3/4 h-2 bg-white/10 rounded-full" />
              <div className="w-1/2 h-2 bg-white/10 rounded-full" />
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y2, rotate: rotate2 }}
            className="absolute bottom-10 right-10 w-72 h-64 glass-panel rounded-2xl border border-white/10 p-6 shadow-2xl bg-white/[0.02] backdrop-blur-xl"
          >
            <div className="w-full h-32 bg-gradient-to-br from-white/10 to-transparent rounded-lg mb-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white">Brand Identity</span>
              <span className="code-font text-subtle-gray">.VECTOR</span>
            </div>
          </motion.div>

        </div>

        {/* Right Content */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-sm bg-white" />
              <span className="code-font text-xs tracking-widest text-subtle-gray uppercase">
                03 {t.design.core}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
              {t.design.titleMain} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                {t.design.titleSub}
              </span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 border border-white/10 rounded-full text-sm font-medium text-subtle-gray hover:text-black hover:bg-white transition-all duration-300 cursor-default"
                >
                  {service}
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
