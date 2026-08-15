'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingTerminal() {
  const { t } = useLanguage();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const terminalLines = [
    t.terminal.init,
    '',
    t.terminal.core,
    t.terminal.social,
    t.terminal.software,
    t.terminal.design,
    t.terminal.security,
    '',
    t.terminal.statusTitle,
    t.terminal.status,
    '',
    t.terminal.ready,
  ];

  useEffect(() => {
    // Reset when language changes
    setDisplayedLines([]);
    setCurrentIndex(0);
  }, [t]);

  useEffect(() => {
    if (currentIndex < terminalLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, terminalLines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? 1000 : currentIndex > 7 ? 400 : 200);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, terminalLines]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="absolute bottom-12 right-12 glass-panel p-6 rounded-lg border border-white/10 w-80 shadow-2xl z-20 hidden md:block"
      style={{
        backdropFilter: 'blur(16px)',
        background: 'rgba(10, 10, 10, 0.6)'
      }}
    >
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-subtle-gray/40"></div>
        <div className="w-3 h-3 rounded-full bg-subtle-gray/40"></div>
        <div className="w-3 h-3 rounded-full bg-subtle-gray/40"></div>
      </div>
      
      <div className="code-font text-xs text-subtle-gray leading-relaxed h-48 flex flex-col justify-end">
        {displayedLines.map((line, i) => (
          <div 
            key={i}
            className={`${
              line.includes(t.terminal.status) || line.includes(t.terminal.ready) 
                ? 'text-white font-bold' 
                : line.includes('[ OK ]') 
                  ? 'text-white/80' 
                  : 'text-subtle-gray'
            }`}
          >
            {line}
          </div>
        ))}
        {currentIndex < terminalLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-white mt-1"
          />
        )}
      </div>
    </motion.div>
  );
}

