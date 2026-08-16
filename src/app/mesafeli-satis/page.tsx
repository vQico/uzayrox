'use client';

import React from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';

export default function MesafeliSatisPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <Header />
      <main className="flex-grow pt-40 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold tracking-widest text-white mb-10 border-b border-white/20 pb-4 uppercase">
          {lang === 'tr' ? 'MESAFELİ SATIŞ SÖZLEŞMESİ' : 'DISTANCE SELLING CONTRACT'}
        </h1>
        
        {lang === 'tr' ? (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. Sözleşmenin Konusu</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"), Alıcı'nın Satıcı'ya ait www.uzayrox.com internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen dijital ürün veya hizmetin satışı ve teslimi ile ilgili yasal hak ve yükümlülükleri saptar.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Ürün ve Teslimat Bilgileri</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Satın alınan ürünler dijital yazılım, kod, tasarım veya sosyal medya yönetim hizmeti mahiyetindedir. Fiziki bir kargo gönderimi yapılmayacak olup, teslimat dijital yollarla (e-posta, özel panel veya dosya transferi) anında veya kararlaştırılan süre zarfında gerçekleştirilir.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Cayma Hakkı ve İadeler</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Alıcı'nın talebi ve kişisel ihtiyaçları doğrultusunda özel olarak üretilen (yazılım, grafik tasarım, özel projeler) ürün ve hizmetler ile anında ifa edilen dijital hizmetlerde elektronik ortamda anında teslim edildiğinden dolayı cayma hakkı bulunmamaktadır. Sipariş aşamasına geçildikten sonra iade talepleri kabul edilmez.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">4. Ödeme ve Fiyatlandırma</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Ödemeler, site üzerinde sunulan Kripto Para (Crypto), Havale, EFT veya FAST yöntemleriyle peşin olarak tahsil edilir. Hizmet ifası, ödemenin Satıcı'nın hesabına geçmesi ile birlikte başlar.
            </p>
          </div>
        ) : (
          <div className="prose prose-invert prose-red max-w-none">
            <h2 className="text-xl font-bold text-white mb-4 mt-8">1. Subject of the Contract</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              This Distance Selling Contract ("Contract") determines the legal rights and obligations regarding the sale and delivery of the digital product or service ordered electronically by the Buyer from the Seller's www.uzayrox.com website.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Product and Delivery Information</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              The products purchased are digital software, code, design, or social media management services. No physical cargo delivery will be made, and delivery is carried out instantly or within the agreed period via digital means (e-mail, private panel, or file transfer).
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">3. Right of Withdrawal and Returns</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              There is no right of withdrawal for products and services specially produced in line with the Buyer's demands and personal needs (software, graphic design, special projects) and for digital services instantly performed in electronic environment. Return requests are not accepted after the order stage begins.
            </p>

            <h2 className="text-xl font-bold text-white mb-4 mt-8">4. Payment and Pricing</h2>
            <p className="text-subtle-gray leading-relaxed mb-6">
              Payments are collected in advance via Cryptocurrency (Crypto), Wire Transfer, EFT, or FAST methods offered on the site. Service execution begins when the payment is transferred to the Seller's account.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
