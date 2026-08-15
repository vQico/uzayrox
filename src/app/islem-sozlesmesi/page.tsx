'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function IslemSozlesmesiPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <Header />
      <main className="flex-grow pt-40 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold tracking-widest text-white mb-10 border-b border-white/20 pb-4 uppercase">
          {lang === 'tr' ? 'İŞLEM SÖZLEŞMESİ' : 'TRANSACTION AGREEMENT'}
        </h1>
        
        {lang === 'tr' ? (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. İşlem Güvenliği</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Bu İşlem Sözleşmesi ("Sözleşme"), UZAYROX dijital platformunda gerçekleştirilen her türlü yazılım, tasarım ve sosyal medya işlemlerinin operasyonel koşullarını belirler. Tüm işlemler uçtan uca şifreleme ve gelişmiş güvenlik protokolleri ile korunmaktadır.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Kripto Para ve Havale İşlemleri</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Kripto para cüzdan adreslerine yapılan transferlerde, ağ (network) kaynaklı gecikmelerden UZAYROX sorumlu değildir. İşlemin onaylanması için Blockchain ağından gerekli onay sayısının alınması esastır. FAST ve Havale işlemlerinde açıklama kısmının doğru doldurulması göndericinin sorumluluğundadır.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Dijital Varlıkların Teslimi</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Kullanıcıya özel geliştirilen sistemler (web, yazılım projeleri vs.) veya yönetilen hesaplar için gerekli tüm erişim bilgileri yalnızca yetkilendirilmiş e-posta adreslerine şifreli olarak iletilir. İletim sonrasında varlıkların güvenliği Kullanıcı'nın sorumluluğundadır.
            </p>
          </div>
        ) : (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. Transaction Security</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              This Transaction Agreement ("Agreement") determines the operational conditions of all software, design, and social media transactions carried out on the UZAYROX digital platform. All transactions are protected by end-to-end encryption and advanced security protocols.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Cryptocurrency and Wire Transfer Transactions</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              UZAYROX is not responsible for network-related delays in transfers made to cryptocurrency wallet addresses. Obtaining the required number of confirmations from the Blockchain network is essential for the transaction to be approved. In FAST and Wire Transfer transactions, it is the sender's responsibility to fill in the description section correctly.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Delivery of Digital Assets</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              All access information required for custom-developed systems (web, software projects, etc.) or managed accounts is transmitted encrypted only to authorized e-mail addresses. The security of the assets after transmission is the User's responsibility.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
