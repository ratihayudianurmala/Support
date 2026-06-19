import React from "react";
import { MapPin, Phone, Clock, Mail, ExternalLink } from "lucide-react";

export default function CompanyMap() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors" id="lokasi">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#004ac6] dark:text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
            LOKASI KANTOR
          </span>
          <h2 className="font-sans font-bold text-2.5xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Hubungi &amp; Kunjungi Kami
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-sans text-sm">
            Temukan lokasi kantor operasional kami. Kami siap menyambut Anda untuk konsultasi langsung terkait infrastruktur IT Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="lokasi-grid">
          {/* Kelompok Informasi Alamat */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xs" id="contact-info-card">
            <div className="space-y-6">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
                Informasi Kontak &amp; Operasional
              </h3>
              
              <div className="flex items-start gap-4" id="address-block">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-[#004ac6] dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-1">Alamat Utama</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
                    Jl. Keramat I, Jajar Tunggal, Kecamatan Wiyung, Surabaya, Jawa Timur 60229
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" id="phone-block">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-[#004ac6] dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-1">Telepon / WhatsApp</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-sans font-medium">
                    +62 812-3456-7890
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" id="email-block">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-[#004ac6] dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-1">Email Resmi</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-sans font-medium">
                    support@itsupporthub.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" id="hours-block">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-[#004ac6] dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-1">Jam Operasional</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-sans mb-0.5">
                    Senin - Sabtu: 08.00 - 17.00 WIB
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    *Tersedia Dukungan Darurat 24/7 untuk Mitra Kontrak
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <a 
                href="https://maps.google.com/?q=Jl.+Keramat+I,+Jajar+Tunggal,+Kecamatan+Wiyung,+Surabaya,+Jawa+Timur+60229"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#004ac6] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline cursor-pointer"
                id="maps-external-link"
              >
                Buka di Google Maps Langsung <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Kolom Frame / Iframe Peta */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg w-full h-[280px] sm:h-[350px] lg:h-full min-h-[250px]" id="iframe-map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Jl.%20Keramat%20I%2C%20Jajar%20Tunggal%2C%20Kecamatan%20Wiyung%2C%20Surabaya%2C%20Jawa%20Timur%2060229&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Lokasi SobatSupport"
              id="office-google-maps-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
