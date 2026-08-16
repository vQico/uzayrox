'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const { cmsData } = useCMS();

  const processSteps = lang === 'tr' ? cmsData.processStepsTR : cmsData.processStepsEN;

  const steps = processSteps.map((stepTitle, idx) => ({
    num: String(idx + 1).padStart(2, '0'),
    title: stepTitle
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-transparent overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg -z-10" />
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            {t.process.titleMain} <span className="text-white/30">{t.process.titleSub}</span>
          </h2>
        </div>

        <div className="relative w-full max-w-3xl mx-auto">
          {/* Main Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 transform md:-translate-x-1/2" />
          
          {/* Animated Line Progress */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-600 via-red-500 to-transparent transform md:-translate-x-1/2 origin-top shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col gap-20 relative">
            {steps.map((step, idx) => {
              const stepProgress = (idx + 1) / steps.length;
              
              return (
                <ProcessStep 
                  key={idx} 
                  step={step} 
                  idx={idx} 
                  scrollYProgress={scrollYProgress}
                  activationPoint={stepProgress - 0.1}
                  t={t}
                  lang={lang}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function ProcessStep({ step, idx, scrollYProgress, activationPoint, t, lang }: any) {
  // If scroll progress is past this point, it becomes active
  const opacity = useTransform(scrollYProgress, [activationPoint - 0.1, activationPoint], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [activationPoint - 0.1, activationPoint], [0.8, 1]);

  const isEven = idx % 2 === 0;

  return (
    <motion.div 
      style={{ opacity }}
      className={`flex items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} pl-16 md:pl-0`}
    >
      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
      
      {/* Center Node */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div 
          style={{ scale }}
          className="w-4 h-4 bg-black border-[3px] border-white rounded-full z-10" 
        />
        <motion.div 
          style={{ scale }}
          className="absolute w-10 h-10 border border-red-500/30 rounded-full animate-ping" 
        />
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
        <div className="bg-white/[0.02] backdrop-blur-md p-8 border border-white/5 rounded-2xl inline-block w-full max-w-[320px] hover:bg-white/[0.04] hover:border-white/10 transition-colors">
          <div className="code-font text-[10px] tracking-widest text-red-500/80 mb-2">{t.process.phase} {step.num}</div>
          <h4 className="text-2xl font-black tracking-tighter uppercase">{step.title}</h4>
        </div>
      </div>
    </motion.div>
  );
}
