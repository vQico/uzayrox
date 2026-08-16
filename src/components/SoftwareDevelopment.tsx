'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function SoftwareDevelopment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const { cmsData } = useCMS();
  
  const services = lang === 'tr' ? cmsData.softwareServicesTR : cmsData.softwareServicesEN;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scanlineY = useTransform(springProgress, [0, 1], ["0%", "100%"]);
  
  const [codeLines, setCodeLines] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulated code lines for the visual editor
    setCodeLines([
      "import { CoreSystem } from '@uzayrox/core';",
      "import { Engine } from '@uzayrox/engine';",
      "",
      "export class DigitalExperience {",
      "  private system: CoreSystem;",
      "  private engine: Engine;",
      "",
      "  constructor() {",
      "    this.system = new CoreSystem();",
      "    this.engine = new Engine();",
      "  }",
      "",
      "  public async initialize() {",
      "    await this.system.boot();",
      "    this.engine.setRenderMode('60fps');",
      "    return this.engine.start();",
      "  }",
      "}"
    ]);
  }, []);

  return (
    <section id="software" ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-sm bg-white" />
                <span className="code-font text-xs tracking-widest text-subtle-gray">
                  02 {t.software.engine}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                {t.software.titleMain} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                  {t.software.titleSub}
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="w-4 h-[1px] bg-white/20" />
                    <span className="text-sm font-medium text-subtle-gray hover:text-white transition-colors cursor-default">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual: Code Editor */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.95) 100%)'
              }}
            >
              {/* Editor Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="code-font text-xs text-subtle-gray ml-4">
                  uzayrox_core.tsx
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-6 overflow-x-auto code-font text-sm leading-loose">
                <pre>
                  <code>
                    <span className="text-[#c678dd]">export default</span> <span className="text-[#c678dd]">function</span> <span className="text-[#61afef]">UZAYROX</span>() {'{'}
                    <br />
                    {'  '} <span className="text-[#c678dd]">return</span> (
                    <br />
                    {'    '}&lt;<span className="text-[#e06c75]">DigitalExperience</span>&gt;
                    <br />
                    {'      '}&lt;<span className="text-[#e06c75]">Software</span> /&gt;
                    <br />
                    {'      '}&lt;<span className="text-[#e06c75]">SocialOperations</span> /&gt;
                    <br />
                    {'      '}&lt;<span className="text-[#e06c75]">CreativeDesign</span> /&gt;
                    <br />
                    {'    '}&lt;/<span className="text-[#e06c75]">DigitalExperience</span>&gt;
                    <br />
                    {'  '});
                    <br />
                    {'}'}
                  </code>
                </pre>
              </div>

              {/* Decorative Scanline */}
              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
