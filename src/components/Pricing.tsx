import React from "react";
import { Check, Info, HelpCircle, GraduationCap, Sparkles } from "lucide-react";

interface PricingProps {
  onOpenConsultation: (service: string) => void;
  onViewSegmentDetail?: (segment: "personal" | "umkm" | "enterprise") => void;
}

export default function Pricing({ onOpenConsultation, onViewSegmentDetail }: PricingProps) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors" id="harga">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title block */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-[#004ac6] dark:text-blue-400 font-sans font-bold text-xs uppercase tracking-widest block">
            Pricing Plans
          </span>
          <h2 className="font-sans font-bold text-3xl text-slate-900 dark:text-white">
            Daftar Layanan &amp; Harga
          </h2>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2" id="pricing-tiers-wrapper">
          {/* Segmen Personal */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-[#004ac6] dark:hover:border-blue-400 transition-all group" id="tier-personal">
            <div className="mb-8">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white mb-1">
                Segmen Personal
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                Solusi tepat untuk kebutuhan harian Anda.
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1" id="personal-tier-list">
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Cleaning Hardware</span>
                <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">150rb</span>
              </li>
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Install Ulang OS</span>
                <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">100rb</span>
              </li>
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Paket Bundling</span>
                <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">200rb</span>
              </li>
            </ul>

            <button
              onClick={() => onViewSegmentDetail?.("personal")}
              className="w-full py-3 rounded-lg border border-[#004ac6] dark:border-blue-400 text-[#004ac6] dark:text-blue-400 font-sans font-bold text-sm hover:bg-[#004ac6]/5 dark:hover:bg-blue-450/10 active:scale-98 transition-all cursor-pointer"
              id="personal-cta"
            >
              Pilih Layanan
            </button>
          </div>

          {/* Segmen UMKM (Terpopuler Featured Card) */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border-2 border-[#004ac6] dark:border-blue-500 p-8 rounded-xl flex flex-col justify-between relative shadow-xl transform md:scale-103 z-10" id="tier-umkm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#004ac6] dark:bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
              Terpopuler
            </div>

            <div className="mb-8">
              <h3 className="font-sans font-bold text-xl text-[#004ac6] dark:text-blue-400 mb-1">
                Segmen UMKM
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                Mendukung pertumbuhan bisnis lokal.
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1" id="umkm-tier-list">
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Audit &amp; Rekomendasi</span>
                <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">500rb</span>
              </li>
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Pengadaan Perangkat</span>
                <span className="font-sans font-semibold text-sm text-[#004ac6] dark:text-blue-400 italic">Nego</span>
              </li>
              <li className="flex justify-between items-center py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Maintenance Rutin</span>
                <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">75rb/PC</span>
              </li>
            </ul>

            {onViewSegmentDetail && (
              <button 
                onClick={() => onViewSegmentDetail("umkm")}
                className="mb-3 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-[#004ac6] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900/50 py-2 px-3 rounded-lg cursor-pointer transition shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#004ac6] dark:text-blue-400" />
                Lihat Live Preview &amp; Detail Layanan Segmen UMKM &rarr;
              </button>
            )}

            <button
              onClick={() => onViewSegmentDetail?.("umkm")}
              className="w-full py-3 rounded-lg bg-[#004ac6] hover:bg-blue-700 text-white font-sans font-bold text-sm shadow-md active:scale-98 transition-all cursor-pointer"
              id="umkm-cta"
            >
              Pilih Layanan
            </button>
          </div>

          {/* Segmen Enterprise */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-[#004ac6] dark:hover:border-blue-400 transition-all group" id="tier-enterprise">
            <div className="mb-8">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white mb-1">
                Segmen Enterprise
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                Infrastruktur IT skala besar &amp; kompleks.
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1" id="enterprise-tier-list">
              <li className="flex flex-col py-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Full IT Corporate Audit</span>
                  <span className="font-sans font-bold text-sm text-[#004ac6] dark:text-blue-400">Mulai 2.5jt</span>
                </div>
              </li>
              <li className="flex flex-col py-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">Pengadaan Massal</span>
                  <span className="font-sans font-semibold text-xs text-[#004ac6] dark:text-blue-400 italic">Custom Quote</span>
                </div>
              </li>
              <li className="flex items-center gap-2 py-2.5 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3px]" />
                Dedicated Account Manager
              </li>
            </ul>

            <button
              onClick={() => onViewSegmentDetail?.("enterprise")}
              className="w-full py-3 rounded-lg border border-[#004ac6] dark:border-blue-400 text-[#004ac6] dark:text-blue-400 font-sans font-bold text-sm hover:bg-[#004ac6]/5 dark:hover:bg-blue-450/10 active:scale-98 transition-all cursor-pointer"
              id="enterprise-cta"
            >
              Pilih Layanan
            </button>
          </div>
        </div>

        {/* Student and College Student Special Discount Card */}
        <div className="mt-12 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-2xl border border-blue-150 dark:border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6" id="student-promo-card">
          <div className="flex items-center gap-4 sm:gap-5 flex-col sm:flex-row text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-[#004ac6]/10 dark:bg-blue-400/10 text-[#004ac6] dark:text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#004ac6] dark:text-blue-350 text-xs sm:text-sm font-sans font-extrabold uppercase tracking-widest mb-2.5 shadow-xs">
                PROMO KHUSUS PELAJAR &amp; MAHASISWA
              </span>
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
                Diskon 10% Untuk Semua Layanan Personal!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
                Tunjukkan kartu pelajar maupun kartu mahasiswa (KTM) yang aktif saat konsultasi atau melakukan perbaikan perangkat untuk mendapatkan potongan harga langsung sebesar 10%.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-center md:text-right w-full md:w-auto">
            <div className="inline-flex items-baseline gap-1 font-sans font-extrabold text-[#004ac6] dark:text-blue-400 text-4xl mb-2">
              10% <span className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">OFF</span>
            </div>
            <button
              onClick={() => onOpenConsultation("Promo Pelajar & Mahasiswa (Diskon 10%)")}
              className="block w-full md:w-auto bg-[#004ac6] hover:bg-blue-700 text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition active:scale-95 shadow-xs cursor-pointer text-center"
            >
              Klaim Diskon Pelajar
            </button>
          </div>
        </div>

        {/* Big CTA Pill below */}
        <div className="mt-16 text-center" id="pricing-consult-cta">
          <button
            onClick={() => onOpenConsultation("Konsultasi Umum")}
            className="inline-flex items-center gap-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-[#004ac6] dark:text-blue-400 px-10 py-4.5 rounded-full font-sans font-bold text-md transition-all active:scale-95 border border-blue-200 dark:border-blue-900/50 hover:border-[#004ac6] dark:hover:border-blue-400 shadow-sm cursor-pointer"
            id="pricing-pill-cta-button"
          >
            <HelpCircle className="w-5 h-5 animate-pulse text-[#004ac6] dark:text-blue-400" />
            Konsultasi Gratis Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
