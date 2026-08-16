'use client';

import React from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';

export default function SozlesmePage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <Header />
      <main className="flex-grow pt-40 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold tracking-widest text-white mb-10 border-b border-white/20 pb-4 uppercase">
          {lang === 'tr' ? 'KULLANICI SÖZLEŞMESİ' : 'USER AGREEMENT'}
        </h1>
        
        {lang === 'tr' ? (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. Taraflar ve Kapsam</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Bu Kullanıcı Sözleşmesi ("Sözleşme"), UZAYROX ("Şirket") ile www.uzayrox.com web sitesine ("Site") giriş yapan ve/ye üye olan kullanıcı ("Kullanıcı") arasında elektronik ortamda akdedilmiştir. Kullanıcı, Site'ye erişim sağlayarak veya hizmetleri kullanarak bu Sözleşme'nin tüm şartlarını kabul etmiş sayılır.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Hizmetlerin Kullanımı</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Kullanıcı, Site'yi yalnızca hukuka uygun amaçlarla kullanmayı, Şirket'in veya üçüncü kişilerin haklarına tecavüz teşkil edecek nitelikte herhangi bir eylemde bulunmamayı kabul ve taahhüt eder. Site üzerinden sunulan yazılım, tasarım ve içerik hizmetleri aksi belirtilmedikçe UZAYROX'un mülkiyetindedir.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Sorumlulukların Sınırlandırılması</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              UZAYROX, sistem güncellemeleri, bakım çalışmaları veya mücbir sebepler dolayısıyla Site'ye erişimin kesintiye uğramasından sorumlu tutulamaz. Kullanıcı'nın Site'yi kullanımı sırasında uğrayabileceği doğrudan veya dolaylı hiçbir zarardan Şirket sorumlu değildir.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">4. Fikri Mülkiyet Hakları</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Site'de yer alan unvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi tescilli veya tescilsiz tüm fikri mülkiyet hakları UZAYROX'a aittir. İzinsiz kopyalanamaz, çoğaltılamaz ve dağıtılamaz.
            </p>
          </div>
        ) : (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. Parties and Scope</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              This User Agreement ("Agreement") is concluded electronically between UZAYROX ("Company") and the user ("User") who logs into and/or registers on the www.uzayrox.com website ("Site"). By accessing the Site or using the services, the User is deemed to have accepted all terms of this Agreement.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Use of Services</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              The User agrees and undertakes to use the Site only for lawful purposes and not to engage in any action that would constitute an infringement on the rights of the Company or third parties. Unless otherwise stated, the software, design, and content services offered through the Site are the property of UZAYROX.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Limitation of Liability</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              UZAYROX cannot be held responsible for the interruption of access to the Site due to system updates, maintenance work, or force majeure. The Company is not responsible for any direct or indirect damages that the User may suffer during the use of the Site.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">4. Intellectual Property Rights</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              All registered or unregistered intellectual property rights such as title, business name, brand, patent, logo, design, information, and method on the Site belong to UZAYROX. They cannot be copied, reproduced, or distributed without permission.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
