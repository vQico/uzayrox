'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
  isActive: boolean;
}

export interface SocialPlatform {
  id: string;
  name: string;
  iconName: string;
  servicesTR: string[];
  servicesEN: string[];
}

export interface CMSData {
  heroTitleMainTR: string;
  heroTitleSubTR: string;
  heroDescTR: string;
  heroTitleMainEN: string;
  heroTitleSubEN: string;
  heroDescEN: string;
  softwareServicesTR: string[];
  softwareServicesEN: string[];
  designServicesTR: string[];
  designServicesEN: string[];
  processStepsTR: string[];
  processStepsEN: string[];
  contactDescTR: string;
  contactDescEN: string;
  socialLinks: SocialLink[];
  socialPlatforms: SocialPlatform[];
}

const defaultCMSData: CMSData = {
  heroTitleMainTR: "DİJİTAL DÜNYANIN",
  heroTitleSubTR: "ARKASINDAKİ SİSTEM.",
  heroDescTR: "Sosyal medya operasyonlarından yazılım geliştirmeye, grafik tasarımdan dijital çözümlere kadar ihtiyaç duyduğun her şeyi tek bir merkezde buluşturuyoruz.",
  heroTitleMainEN: "THE SYSTEM BEHIND",
  heroTitleSubEN: "THE DIGITAL WORLD.",
  heroDescEN: "From social media operations to software development, graphic design to digital solutions, we bring everything you need together in a single core.",
  softwareServicesTR: [
    "Web Geliştirme", "Özel Yazılım", "E-Ticaret", "SaaS",
    "Yönetim Panelleri", "Dashboardlar", "API Entegrasyonları", "Otomasyon",
    "Veritabanları", "Güvenlik Mimarisi", "Performans Optimizasyonu", "Duyarlı Uygulamalar"
  ],
  softwareServicesEN: [
    "Web Development", "Custom Software", "E-Commerce", "SaaS",
    "Admin Panels", "Dashboards", "API Integrations", "Automation",
    "Databases", "Security Architecture", "Performance Optimization", "Responsive Applications"
  ],
  designServicesTR: [
    "Logo", "Marka Kimliği", "Instagram Post", "Instagram Hikaye",
    "Reklam Tasarımı", "Afiş", "Esports Tasarımı", "Kurumsal Kimlik",
    "UI/UX", "Motion Graphics", "3D Grafikler", "Ürün Grafikleri"
  ],
  designServicesEN: [
    "Logo", "Brand Identity", "Instagram Post", "Instagram Story",
    "Ad Design", "Poster", "Esports Design", "Corporate Identity",
    "UI/UX", "Motion Graphics", "3D Graphics", "Product Graphics"
  ],
  processStepsTR: [
    "ANALİZ", "PLANLAMA", "TASARIM", "GELİŞTİRME", "TEST", "YAYIN", "DESTEK"
  ],
  processStepsEN: [
    "ANALYSIS", "PLANNING", "DESIGN", "DEVELOPMENT", "TESTING", "DEPLOYMENT", "SUPPORT"
  ],
  contactDescTR: "Aşağıdaki formu doldurarak projeniz hakkında bize detaylı bilgi verebilir veya doğrudan WhatsApp üzerinden hızlıca iletişime geçebilirsiniz.",
  contactDescEN: "By filling out the form below, you can give us detailed information about your project or contact us directly via WhatsApp.",
  socialLinks: [
    { id: '1', platform: 'Instagram', url: '#', iconName: 'FaInstagram', isActive: true },
    { id: '2', platform: 'WhatsApp', url: '#', iconName: 'FaWhatsapp', isActive: true },
    { id: '3', platform: 'TikTok', url: '#', iconName: 'FaTiktok', isActive: true },
    { id: '4', platform: 'Facebook', url: '#', iconName: 'FaFacebookF', isActive: true },
    { id: '5', platform: 'YouTube', url: '#', iconName: 'FaYoutube', isActive: true },
    { id: '6', platform: 'X', url: '#', iconName: 'FaXTwitter', isActive: true },
  ],
  socialPlatforms: [
    {
      id: "instagram",
      name: "INSTAGRAM",
      iconName: "FaInstagram",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Hesap Açma", "Hesap Düzenleme", "Kullanıcı Adı İşlemleri", "Hesap Destek Süreçleri", "Güvenlik / Erişim Desteği", "Telif Süreçleri"],
      servicesEN: ["Recover Disabled Account", "Account Creation", "Account Management", "Username Operations", "Account Support Processes", "Security / Access Support", "Copyright Processes"]
    },
    {
      id: "whatsapp",
      name: "WHATSAPP",
      iconName: "FaWhatsapp",
      servicesTR: ["Kapatılan/Askıya Alınan Numaraları Aktif Etme", "İşletme Hesabı", "Hesap İşlemleri", "Destek Süreçleri", "Profil Düzenleme", "WhatsApp Business Çözümleri"],
      servicesEN: ["Recover Banned/Suspended Numbers", "Business Account", "Account Operations", "Support Processes", "Profile Editing", "WhatsApp Business Solutions"]
    },
    {
      id: "tiktok",
      name: "TIKTOK",
      iconName: "FaTiktok",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Hesap İşlemleri", "İçerik Süreçleri", "Telif Süreçleri", "Destek İşlemleri"],
      servicesEN: ["Recover Disabled Account", "Account Operations", "Content Processes", "Copyright Processes", "Support Operations"]
    },
    {
      id: "google",
      name: "GOOGLE",
      iconName: "FaGoogle",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Google Business", "Profil İşlemleri", "Hesap Destek Süreçleri", "Dijital Görünürlük Çözümleri"],
      servicesEN: ["Recover Disabled Account", "Google Business", "Profile Operations", "Account Support Processes", "Digital Visibility Solutions"]
    },
    {
      id: "facebook",
      name: "FACEBOOK",
      iconName: "FaFacebookF",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Hesap İşlemleri", "Sayfa İşlemleri", "Destek Süreçleri"],
      servicesEN: ["Recover Disabled Account", "Account Operations", "Page Operations", "Support Processes"]
    },
    {
      id: "youtube",
      name: "YOUTUBE",
      iconName: "FaYoutube",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Kanal İşlemleri", "Telif Süreçleri", "Kanal Düzenleme", "Destek"],
      servicesEN: ["Recover Disabled Account", "Channel Operations", "Copyright Processes", "Channel Editing", "Support"]
    },
    {
      id: "x",
      name: "X",
      iconName: "FaXTwitter",
      servicesTR: ["Kapatılan Hesabı Açma İşlemleri", "Hesap Düzenleme", "Profil İşlemleri", "Destek Süreçleri"],
      servicesEN: ["Recover Disabled Account", "Account Editing", "Profile Operations", "Support Processes"]
    }
  ]
};

interface CMSContextType {
  cmsData: CMSData;
  updateCMSData: (newData: Partial<CMSData>) => void;
  selectedServiceForContact: string | null;
  setSelectedServiceForContact: (service: string | null) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/cms')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setCmsData({ ...defaultCMSData, ...data });
        }
      })
      .catch(err => console.error("CMS Fetch error", err))
      .finally(() => setIsLoaded(true));
  }, []);

  const updateCMSData = async (newData: Partial<CMSData>) => {
    const updated = { ...cmsData, ...newData };
    setCmsData(updated);
    
    try {
      await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    } catch (e) {
      console.error("CMS Update error", e);
    }
  };

  if (!isLoaded) return null;

  return (
    <CMSContext.Provider value={{ cmsData, updateCMSData, selectedServiceForContact, setSelectedServiceForContact }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
