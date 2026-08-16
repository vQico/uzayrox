'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();

  const menuLinks = [
    { name: t.header.menu.home, href: '/' },
    { name: t.header.menu.social, href: '/#social' },
    { name: t.header.menu.software, href: '/#software' },
    { name: t.header.menu.design, href: '/#design' },
    { name: t.header.menu.system, href: '/#system' },
    { name: t.header.menu.contact, href: '/#contact' }
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-black/40 backdrop-blur-md border-b border-white/5"
      >
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" data-cursor-hover className="text-xl font-bold tracking-[0.2em] text-white">
            UZAYROX
          </a>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                data-cursor-hover
                className="text-xs font-bold tracking-widest text-subtle-gray hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLang}
              data-cursor-hover
              className="text-white hover:text-white/70 transition-colors font-bold code-font tracking-widest text-xs"
            >
              {lang === 'tr' ? 'TR / EN' : 'EN / TR'}
            </button>
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-cursor-hover 
              className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-white/70 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
            
            <nav className="flex flex-col gap-6 items-center text-center">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <a 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    data-cursor-hover
                    className="text-4xl md:text-6xl font-bold text-white hover:text-subtle-gray transition-colors tracking-tighter"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

