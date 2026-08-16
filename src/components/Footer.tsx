'use client';

import { FaInstagram, FaWhatsapp, FaTiktok, FaFacebookF, FaYoutube, FaXTwitter, FaLink, FaBitcoin, FaEthereum } from 'react-icons/fa6';
import { BsBank } from 'react-icons/bs';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import Link from 'next/link';

const getIconComponent = (iconName: string) => {
  const icons: any = {
    FaInstagram, FaWhatsapp, FaTiktok, FaFacebookF, FaYoutube, FaXTwitter, FaLink
  };
  return icons[iconName] || FaLink;
};

export default function Footer() {
  const { t, lang } = useLanguage();
  const { cmsData } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-black/50 border-t border-white/10 pt-20 pb-12 overflow-hidden backdrop-blur-md">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Top Section: Links and Call to Action */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand & CTA (4 cols) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-white">UZAYROX</h2>
            <p className="text-subtle-gray leading-relaxed text-sm">
              {t.footer.desc}
            </p>
            <div className="mt-2 flex flex-col gap-8">
              <Link 
                href="#contact" 
                data-cursor-hover
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold text-xs tracking-widest hover:bg-white/90 transition-colors w-max"
              >
                {t.hero.btnStart}
              </Link>

              {/* Payment Methods */}
              <div>
                <h4 className="text-white/40 font-bold tracking-widest mb-3 code-font text-[9px] uppercase">
                  {lang === 'tr' ? 'ÖDEME YÖNTEMLERİ' : 'PAYMENT METHODS'}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded px-2 py-1" title="FAST / Havale / EFT">
                    <BsBank className="text-white/80 w-3 h-3" />
                    <span className="text-[10px] font-bold text-white/80 tracking-widest">FAST</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded px-2 py-1" title="Kripto Para / Crypto">
                    <FaBitcoin className="text-[#f7931a] w-3 h-3" />
                    <FaEthereum className="text-[#627eea] w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: System Links (3 cols) */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold tracking-widest mb-6 code-font text-xs uppercase">{t.footer.systemLinks}</h4>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-subtle-gray hover:text-white transition-colors text-sm font-medium">{t.footer.links.home}</Link>
              <Link href="/#software" className="text-subtle-gray hover:text-white transition-colors text-sm font-medium">{t.footer.links.software}</Link>
              <Link href="/#design" className="text-subtle-gray hover:text-white transition-colors text-sm font-medium">{t.footer.links.design}</Link>
              <Link href="/#contact" className="text-subtle-gray hover:text-white transition-colors text-sm font-medium">{t.footer.links.contact}</Link>
            </div>
          </div>
          
          {/* Column 3: Legal Links (KVKK/Privacy etc) (2 cols) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest mb-6 code-font text-xs uppercase">{lang === 'tr' ? 'YASAL' : 'LEGAL'}</h4>
            <div className="flex flex-col gap-4">
              <Link href="/gizlilik" className="text-subtle-gray hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">
                {t.footer.links.privacy}
              </Link>
              <Link href="/kvkk" className="text-subtle-gray hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">
                {t.footer.links.kvkk}
              </Link>
              <Link href="/sozlesme" className="text-subtle-gray hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">
                {/* @ts-ignore */}
                {t.footer.links.terms || (lang === 'tr' ? 'KULLANICI SÖZLEŞMESİ' : 'USER AGREEMENT')}
              </Link>
              <Link href="/mesafeli-satis" className="text-subtle-gray hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">
                {/* @ts-ignore */}
                {t.footer.links.distance || (lang === 'tr' ? 'MESAFELİ SATIŞ SÖZLEŞMESİ' : 'DISTANCE SELLING CONTRACT')}
              </Link>
              <Link href="/islem-sozlesmesi" className="text-subtle-gray hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">
                {/* @ts-ignore */}
                {t.footer.links.transaction || (lang === 'tr' ? 'İŞLEM SÖZLEŞMESİ' : 'TRANSACTION AGREEMENT')}
              </Link>
            </div>
          </div>

          {/* Column 4: Social (3 cols) */}
          <div className="md:col-span-12 lg:col-span-3">
            <h4 className="text-white font-bold tracking-widest mb-6 code-font text-xs uppercase">{t.footer.networkLinks}</h4>
            <div className="flex flex-wrap gap-3">
              {cmsData.socialLinks.filter(l => l.isActive).map((social) => {
                const IconComponent = getIconComponent(social.iconName);
                if (!IconComponent) return null;
                
                return (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                    data-cursor-hover
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-subtle-gray hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Rights & Back to Top */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="code-font text-xs text-subtle-gray/70 text-center md:text-left">
            {t.footer.rights}
          </div>
          
          <button 
            onClick={scrollToTop}
            data-cursor-hover
            className="group flex items-center gap-3 text-subtle-gray hover:text-white transition-colors code-font text-xs tracking-widest uppercase"
          >
            <span>{lang === 'tr' ? 'YUKARI DÖN' : 'BACK TO TOP'}</span>
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
}
