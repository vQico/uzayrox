'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaTiktok, FaGoogle, FaFacebookF, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

const platforms = [
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    icon: FaInstagram,
    servicesTR: [
      'Hesap Açma',
      'Hesap Kapatma',
      'Hesap Düzenleme',
      'Kullanıcı Adı İşlemleri',
      'Hesap Destek Süreçleri',
      'Güvenlik / Erişim Desteği',
      'Telif Süreçleri'
    ],
    servicesEN: [
      'Account Creation',
      'Account Closure',
      'Account Management',
      'Username Operations',
      'Account Support Processes',
      'Security / Access Support',
      'Copyright Processes'
    ]
  },
  {
    id: 'whatsapp',
    name: 'WHATSAPP',
    icon: FaWhatsapp,
    servicesTR: [
      'İşletme Hesabı',
      'Hesap İşlemleri',
      'Destek Süreçleri',
      'Profil Düzenleme',
      'WhatsApp Business Çözümleri'
    ],
    servicesEN: [
      'Business Account',
      'Account Operations',
      'Support Processes',
      'Profile Editing',
      'WhatsApp Business Solutions'
    ]
  },
  {
    id: 'tiktok',
    name: 'TIKTOK',
    icon: FaTiktok,
    servicesTR: [
      'Hesap İşlemleri',
      'İçerik Süreçleri',
      'Telif Süreçleri',
      'Destek İşlemleri'
    ],
    servicesEN: [
      'Account Operations',
      'Content Processes',
      'Copyright Processes',
      'Support Operations'
    ]
  },
  {
    id: 'google',
    name: 'GOOGLE',
    icon: FaGoogle,
    servicesTR: [
      'Google Business',
      'Profil İşlemleri',
      'Hesap Destek Süreçleri',
      'Dijital Görünürlük Çözümleri'
    ],
    servicesEN: [
      'Google Business',
      'Profile Operations',
      'Account Support Processes',
      'Digital Visibility Solutions'
    ]
  },
  {
    id: 'facebook',
    name: 'FACEBOOK',
    icon: FaFacebookF,
    servicesTR: [
      'Hesap İşlemleri',
      'Sayfa İşlemleri',
      'Destek Süreçleri'
    ],
    servicesEN: [
      'Account Operations',
      'Page Operations',
      'Support Processes'
    ]
  },
  {
    id: 'youtube',
    name: 'YOUTUBE',
    icon: FaYoutube,
    servicesTR: [
      'Kanal İşlemleri',
      'Telif Süreçleri',
      'Kanal Düzenleme',
      'Destek'
    ],
    servicesEN: [
      'Channel Operations',
      'Copyright Processes',
      'Channel Editing',
      'Support'
    ]
  },
  {
    id: 'x',
    name: 'X',
    icon: FaXTwitter,
    servicesTR: [
      'Hesap Düzenleme',
      'Profil İşlemleri',
      'Destek Süreçleri'
    ],
    servicesEN: [
      'Account Editing',
      'Profile Operations',
      'Support Processes'
    ]
  }
];

export default function SocialOperations() {
  const [activePlatform, setActivePlatform] = useState(platforms[0]);
  const { t, lang } = useLanguage();
  const { setSelectedServiceForContact } = useCMS();

  const handleSelectService = () => {
    setSelectedServiceForContact(activePlatform.name);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="social" className="relative w-full min-h-screen py-32 bg-black overflow-hidden flex flex-col justify-center">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column: Menu */}
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.social.titleMain}<br/><span className="text-subtle-gray">{t.social.titleSub}</span></h2>
            <div className="w-12 h-1 bg-white mb-6"></div>
          </motion.div>

          <div className="flex flex-col gap-2">
            {platforms.map((platform) => {
              const isActive = activePlatform.id === platform.id;
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onMouseEnter={() => setActivePlatform(platform)}
                  onClick={() => setActivePlatform(platform)}
                  data-cursor-hover
                  className={`group flex items-center justify-between p-4 border-b transition-colors duration-300 ${
                    isActive 
                      ? 'border-white text-white' 
                      : 'border-white/10 text-subtle-gray hover:text-white/80 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
                    <span className="font-semibold tracking-wider text-sm">{platform.name}</span>
                  </div>
                  <div className={`text-xs code-font opacity-0 transform translate-x-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'group-hover:opacity-50 group-hover:translate-x-2'}`}>
                    {t.social.opsActive}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Display Details */}
        <div className="w-full md:w-2/3 flex items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg glass-panel p-10 relative overflow-hidden"
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white"></div>

              <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                  <activePlatform.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="code-font text-xs text-subtle-gray mb-1">{t.social.opsActive}</div>
                  <h3 className="text-2xl font-bold tracking-widest">{activePlatform.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-10">
                {(lang === 'tr' ? activePlatform.servicesTR : activePlatform.servicesEN).map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 bg-subtle-gray group-hover:bg-white transition-colors" />
                    <span className="text-sm md:text-base text-subtle-gray group-hover:text-white transition-colors">
                      {service.toUpperCase()}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleSelectService}
                data-cursor-hover
                className="w-full py-4 border border-white/20 text-white font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                {lang === 'tr' ? `${activePlatform.name} İÇİN TALEP OLUŞTUR` : `REQUEST FOR ${activePlatform.name}`}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
