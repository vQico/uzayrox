'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyUzayrox() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-32 bg-transparent overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl -z-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{t.why.title}</h2>
          </div>
          <div className="code-font text-xs text-white/50 border border-white/10 px-4 py-2 rounded-full">
            {t.why.modules}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.why.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden min-h-[180px] flex flex-col justify-between backdrop-blur-md"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/0 group-hover:from-red-900/10 group-hover:to-transparent transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="code-font text-[10px] text-white/30 tracking-widest group-hover:text-white/60 transition-colors">[{feature.id}]</div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-500 group-hover:shadow-[0_0_10px_rgba(239,68,68,1)]" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-black tracking-widest mb-3 text-white/80 group-hover:text-white transition-colors uppercase">{feature.title}</h3>
                <p className="text-xs text-subtle-gray leading-relaxed group-hover:text-white/70 transition-colors">{feature.desc}</p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
