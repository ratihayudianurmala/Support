import React, { useState } from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Coins, 
  Check, 
  Send, 
  Network, 
  HelpCircle,
  ArrowLeft,
  User,
  Building,
  Server,
  Sparkles,
  Wrench,
  RotateCcw
} from "lucide-react";

interface SmeDetailProps {
  onBackToHome: () => void;
  onOpenConsultation: (service?: string) => void;
  initialSegment?: "personal" | "umkm" | "enterprise";
}

export default function SmeDetail({ onBackToHome, onOpenConsultation, initialSegment = "umkm" }: SmeDetailProps) {
  const [activeSegment, setActiveSegment] = useState<"personal" | "umkm" | "enterprise">(initialSegment);

  React.useEffect(() => {
    setActiveSegment(initialSegment);
  }, [initialSegment]);
  
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const segmentTitle = 
      activeSegment === "personal" ? "Segmen Personal" : 
      activeSegment === "enterprise" ? "Segmen Enterprise" : "Segmen UMKM";

    const payload = {
      client_name: formData.name,
      email: `${formData.businessName.toLowerCase().replace(/\s+/g, "") || "client"}@it-support.com`,
      phone: formData.phone,
      service_type: `Konsultasi ${segmentTitle}`,
      message: `Tipe Layanan: ${segmentTitle}. Nama Bisnis/Kelompok: ${formData.businessName}. Pesan: ${formData.message}`
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await response.json();
      
      setLoading(false);
      setSuccessMsg(`Selamat! Permintaan konsultasi ${segmentTitle} Anda berhasil diproses. Membuka WhatsApp untuk terhubung...`);

      // Direct to WhatsApp
      const whatsappNumber = "6281234567890"; // Ganti nomor di sini
      const text = `Halo SobatSupport,\n\nSaya ingin konsultasi Gratis terkait ${segmentTitle}.\n\n*Nama:* ${formData.name}\n*Bisnis/Instansi/Pribadi:* ${formData.businessName}\n*No. HP/WA:* ${formData.phone}\n*Pesan:* ${formData.message}\n\nTerima kasih.`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");

      // Reset form
      setFormData({ name: "", businessName: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setSuccessMsg("Terjadi kendala jaringan tapi data dicoba dialihkan ke WhatsApp.");
      
      const whatsappNumber = "6281234567890";
      const text = `Halo SobatSupport,\n\nSaya ingin konsultasi Gratis terkait ${segmentTitle}.\n\n*Nama:* ${formData.name}\n*Bisnis/Instansi/Pribadi:* ${formData.businessName}\n*No. HP/WA:* ${formData.phone}\n*Pesan:* ${formData.message}\n\nTerima kasih.`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
    }
  };

  // Quick WhatsApp trigger for a specific plan
  const selectPlan = (planName: string, price: string) => {
    const whatsappNumber = "6281234567890";
    const segmentTitle = 
      activeSegment === "personal" ? "Personal" : 
      activeSegment === "enterprise" ? "Enterprise" : "UMKM";
    
    const text = `Halo SobatSupport,\n\nSaya tertarik dengan paket Detail ${segmentTitle}:\n*Paket:* ${planName}\n*Biaya:* ${price}\n\nMohon informasi selanjutnya. Terima kasih!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  const scrollToBooking = () => {
    const element = document.getElementById("booking-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans transition-colors w-full max-w-full overflow-x-hidden" id="sme-detail-panel">
      {/* Banner / Navigation Breadcrumb & Dynamic Segment Toggles */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-6 shadow-xs sticky top-18 z-20 transition-colors">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-1 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-blue-400 px-3 py-2 rounded-lg border border-slate-700 transition cursor-pointer active:scale-95 shrink-0"
              id="back-to-home-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </button>
            <span className="text-slate-500 hidden sm:inline">/</span>
            <span className="text-xs font-bold text-blue-400 bg-blue-950/40 px-2 py-0.5 border border-blue-900/40 rounded-md hidden sm:inline">
              Eksplorasi Detail Paket Layanan IT
            </span>
          </div>

          {/* New Segment Selector Segmented Tutors */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center justify-center gap-1 border border-slate-700 self-center md:self-auto w-full md:w-auto transition-colors">
            <button
              onClick={() => {
                setActiveSegment("personal");
                setSuccessMsg("");
              }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSegment === "personal"
                  ? "bg-slate-700 text-blue-400 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Personal
            </button>
            <button
              onClick={() => {
                setActiveSegment("umkm");
                setSuccessMsg("");
              }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSegment === "umkm"
                  ? "bg-slate-700 text-blue-400 shadow-xs"
                  : "text-slate-400 hover:text-blue-400"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              UMKM (Terpopuler)
            </button>
            <button
              onClick={() => {
                setActiveSegment("enterprise");
                setSuccessMsg("");
              }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSegment === "enterprise"
                  ? "bg-slate-700 text-blue-400 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              Enterprise
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - Dynamic depending on selected activeSegment */}
      <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-900 transition-colors" id="sme-detail-hero">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* Left Column information */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-950/40 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-900/40">
              <span className="w-2 h-2 bg-blue-450 rounded-full animate-ping"></span>
              {activeSegment === "personal" && "Layanan Personal & Perangkat Individu"}
              {activeSegment === "umkm" && "Khusus Segmen UMKM & Kantor Cabang"}
              {activeSegment === "enterprise" && "Layanan Skala Korporasi, Server & Data Center"}
            </div>

            {activeSegment === "personal" && (
              <>
                <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-4.5xl text-white tracking-tight leading-tight">
                  Servis, Perbaikan &amp; <br />
                  <span className="text-blue-400">Instalasi Perangkat Mandiri</span>
                </h1>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  Kembalikan performa laptop dan PC personal Anda ke level optimal. Ditangani langsung oleh teknisi profesional kami dengan standar pengerjaan cepat, aman dari virus, dan bergaransi resmi.
                </p>
              </>
            )}

            {activeSegment === "umkm" && (
              <>
                <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-4.5xl text-white tracking-tight leading-tight">
                  Audit &amp; Rekomendasi <br />
                  <span className="text-blue-400">Infrastruktur IT</span>
                </h1>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  Optimalkan efisiensi operasional bisnis lokal Anda dengan evaluasi mendalam terhadap manajemen jaringan dan sistem komputer saat ini. Langkah taktis untuk mempercepat koordinasi tim.
                </p>
              </>
            )}

            {activeSegment === "enterprise" && (
              <>
                <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-4.5xl text-white tracking-tight leading-tight">
                  Kepatuhan Keamanan, <br />
                  <span className="text-blue-400">Integrasi Server &amp; SLA Korporat</span>
                </h1>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  Solusi komprehensif untuk korporasi besar dengan standar keamanan siber ISO 27001, implementasi Server &amp; Network Attached Storage (NAS), backup redundan lokal-cloud otomatis, dan dukungan teknis 24/7.
                </p>
              </>
            )}

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={scrollToBooking}
                className="bg-[#004ac6] hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-sans font-bold text-sm shadow-md transition-all cursor-pointer"
                id="hero-sme-consultation"
              >
                Pertanyaan / Jadwalkan Konsultasi
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById("benefits-section");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-lg font-sans font-bold text-sm transition-all cursor-pointer"
                id="hero-sme-more"
              >
                Keuntungan &amp; Rincian Paket
              </button>
            </div>
          </div>

          {/* Right Column illustration */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-900">
              {activeSegment === "personal" && (
                <img 
                  src="https://images.unsplash.com/photo-1597872200919-261dfb046044?auto=format&fit=crop&w=800&q=80" 
                  alt="Personal IT Hardware Maintenance"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              {activeSegment === "umkm" && (
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL269MlAfk-e-9WmnXFtnDGY5AESsOHbuo9CuMnPXIR95cIcpbq2PGO_sezMe4iK4U-WRZw3p1SX1JxpmRkf2fBaJfaibzjefNCUl8oA-Yx4CGY29iLNO84wLTd9X8ONeUjSJcShjLyrdhYo87aa8p3w6e8z2PkAP7tO4mUIo0OK9hK8MBCm3zJxhkXZeEq1illEcJNnwuQweCIkWUIB1v9N2oZv--uzGCWbL-XLP7ybzWh2pk1rm__BwzgKTGtzFjrQEgnj0gj8A" 
                  alt="SME IT Audit Network"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              {activeSegment === "enterprise" && (
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNXK-ovL49w3-y1N0SyRmasiEBVbogYo8l6A9649RHFV5djh3vOcwxCc-79w-_OGfiL93mTBvoN4POqEUJLSPqumzBavP9aHO9mDUYpsBzdNicKKDdzN6clC5oCCcN-o7yVnwqaqF92EKmNq3RXfZv5oQcd960NcPCs4z3QHFUruZv07ew4mwZGhtYW3VxRAq1C5AajXVKtExcdmWIvDhuBKedwRiMYau4wJFJhU6rPR3fvNTCefw3J-Ha-d_sw42cFlnU55Oze6Y" 
                  alt="Enterprise Data Center Solutions"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Benefits Grid Section */}
      <section className="py-20 bg-slate-900 border-b border-slate-800" id="benefits-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-sans font-bold text-2.5xl sm:text-3xl text-white tracking-tight">
              {activeSegment === "personal" && "Kenapa Mempercayakan Gadget Anda Kepada Kami?"}
              {activeSegment === "umkm" && "Mengapa UMKM Membutuhkan Audit Infrastruktur IT?"}
              {activeSegment === "enterprise" && "Keunggulan Standarisasi Server Korporat Kami"}
            </h2>
            <p className="text-slate-400 font-sans text-sm">
              {activeSegment === "personal" && "Kami memahami pentingnya laptop / PC lancar bebas hambatan dalam produktivitas belajar maupun remote working."}
              {activeSegment === "umkm" && "Masalah IT yang tidak terdeteksi sejak dini dapat menyebabkan melambatnya kerja koordinasi dan pemborosan modal hardware."}
              {activeSegment === "enterprise" && "Stabilitas, redundansi tinggi, dan keamanan siber merupakan tumpuan utama operasional bisnis berskala besar Anda."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="benefits-grid">
            {activeSegment === "personal" && (
              <>
                {/* Personal Benefit 1 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Suku Cadang &amp; Pasta Premium
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Penggantian thermal pasta menggunakan merk teratas (seperti Noctua / Arctic MX-4) untuk pembuangan panas chip processor termaksimal.
                  </p>
                </div>
                {/* Personal Benefit 2 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Instalasi Bersih Tanpa Bloatware
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Setiap proses install sistem operasi Windows/Linux sudah dibersihkan dari aplikasi bawaan mengganggu sehingga berjalan jauh lebih enteng.
                  </p>
                </div>
                {/* Personal Benefit 3 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Garansi Servis 30 Hari
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Ada kendala pasca perbaikan? Kami selesaikan secara gratis tanpa biaya tambahan dalam waktu penjaminan garansi 30 hari penuh.
                  </p>
                </div>
              </>
            )}

            {activeSegment === "umkm" && (
              <>
                {/* UMKM Benefit 1 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Keamanan Data Berlapis
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Kami mengaudit celah keamanan pada jaringan dan perangkat kerja karyawan Anda untuk mencegah serangan siber yang mengincar bisnis lokal.
                  </p>
                </div>
                {/* UMKM Benefit 2 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Kecepatan Sistem
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Identifikasi bottleneck pada hardware dan software yang lambat yang menghambat produktivitas harian tim inti Anda.
                  </p>
                </div>
                {/* UMKM Benefit 3 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Efisiensi Anggaran
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Rekomendasi spec perangkat yang paling tepat guna. Jangan beli hardware berbiaya tinggi yang sebenarnya belum Anda butuhkan.
                  </p>
                </div>
              </>
            )}

            {activeSegment === "enterprise" && (
              <>
                {/* Enterprise Benefit 1 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Kepatuhan Cyber &amp; ISO
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Evaluasi komprehensif kepatuhan standar industri dengan uji penetrasi (Pen-Testing) dan manajemen firewall yang kuat.
                  </p>
                </div>
                {/* Enterprise Benefit 2 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    Skalabilitas NAS &amp; Cloud Hybrid
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Sistem penyimpanan server lokal yang andal, bersinkronisasi langsung dengan cloud terenkripsi untuk backup darurat pemulihan pasca bencana.
                  </p>
                </div>
                {/* Enterprise Benefit 3 */}
                <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl shadow-xs space-y-4 hover:border-slate-700 transition">
                  <div className="w-12 h-12 bg-blue-950/40 text-blue-400 rounded-xl flex items-center justify-center">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    SLA Dukungan Prioritas Tinggi
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Akses saluran telepon prioritas khusus yang dijamin merespon di bawah 45 menit untuk menyelesaikan downtime kritis perusahaan Anda.
                  </p>
                </div>
              </>
            )}

            {/* Strategic Banner Feature Row */}
            <div className="bg-gradient-to-r from-[#004ac6] to-blue-700 p-8 rounded-xl text-white md:col-span-2 lg:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-lg">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-6 translate-x-6">
                <Network className="w-64 h-64 text-white" />
              </div>

              <div className="space-y-3 z-10 max-w-2xl">
                <h4 className="font-sans font-bold text-xl md:text-2.5xl">
                  {activeSegment === "personal" && "Dukungan Konsultasi Personal Mudah Cepat"}
                  {activeSegment === "umkm" && "Roadmap Strategis Infrastruktur 12 Bulan"}
                  {activeSegment === "enterprise" && "SLA Tahunan Komitment Stabilitas Sistem"}
                </h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {activeSegment === "personal" && "Bebaskan perangkat Anda dari lemot dan ancaman kerusakan hardware. Segera jadwalkan konsultasi awal secara interaktif."}
                  {activeSegment === "umkm" && "Bukan sekadar perbaikan instan. Kami menyusun rencana pengembangan sistem IT jangka panjang bagi stabilitas operasional model bisnis."}
                  {activeSegment === "enterprise" && "Kami memahami bahwa setiap detik downtime adalah kerugian finansial. Mitra korporasi mendapatkan jaminan performa operasional tingkat tinggi."}
                </p>
              </div>

              <div className="z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-lg grid grid-cols-2 gap-x-8 gap-y-3 shrink-0 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3px]" />
                  <span>{activeSegment === "personal" ? "Cek Hardware Gratis" : "Proyeksi Jaringan"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3px]" />
                  <span>{activeSegment === "personal" ? "Pembersihan Debu" : "Rencana Backup Data"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3px]" />
                  <span>{activeSegment === "personal" ? "Optimasi Win/Linux" : "Standarisasi Perangkat"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3px]" />
                  <span>{activeSegment === "personal" ? "Garansi Kepuasan" : "Proyeksi Anggaran"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Pricing Tiers */}
      <section className="py-20 bg-slate-950 border-b border-slate-900" id="prices-sme-section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-sans font-bold text-2.5xl sm:text-3xl text-white tracking-tight">
              Biaya &amp; Paket Layanan Transparan
            </h2>
            <p className="text-slate-400 font-sans text-sm">
              Rincian biaya paket pengerjaan yang disesuaikan khusus untuk kenyamanan Anda.
            </p>
          </div>

          {activeSegment === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
              {/* Personal Plan 1 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Cleaning Hardware
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">150Rb</span>
                    <span className="text-slate-500 text-xs">/perangkat</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Pembersihan Debu Dalam (Kipas & Heatsink)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Re-pasting Pasta Thermal Premium
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Cek Suhu & Pengetesan Stress Test
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Cleaning Hardware", "Rp 150rb")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Paket
                </button>
              </div>

              {/* Personal Plan 2 (Featured) */}
              <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-xl flex flex-col justify-between relative shadow-lg transform md:scale-103 z-10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
                  Promo Bulan Ini
                </div>
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Paket Bundling Hemat
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">200Rb</span>
                    <span className="text-slate-500 text-xs">/bundling</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Semua Layanan Cleaning Hardware + Re-pasting
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-350" />
                      Install Ulang &amp; Lisensi OS Windows/Linux
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Driver Pelengkap &amp; Aplikasi Standar Siap Pakai
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Paket Bundling Hemat", "Rp 200rb")}
                  className="w-full py-3 mt-8 bg-[#004ac6] hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Bundling
                </button>
              </div>

              {/* Personal Plan 3 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-slate-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Install Ulang OS
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">100Rb</span>
                    <span className="text-slate-500 text-xs">/perangkat</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Pemilihan OS Windows / Linux Aman
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Backup Data Pengguna Sebelum Format
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Instalasi Driver Original Komponen Laptop
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Install Ulang OS", "Rp 100rb")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition shadow-md cursor-pointer text-center"
                >
                  Pilih Install Ulang
                </button>
              </div>
            </div>
          )}

          {activeSegment === "umkm" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
              {/* UMKM Plan 1 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Startup Friendly
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">1.5Jt</span>
                    <span className="text-slate-500 text-xs">/audit</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Maksimal 5 Perangkat/Karyawan
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Audit Jaringan WI-FI Dasar
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Laporan Rekomendasi PDF Sistem IT
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Startup Friendly", "Rp 1.5jt / Audit")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Startup
                </button>
              </div>

              {/* UMKM Plan 2 (Featured) */}
              <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-xl flex flex-col justify-between relative shadow-lg transform md:scale-103 z-10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
                  Terpopuler
                </div>
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Scale-Up Business
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">3.5Jt</span>
                    <span className="text-slate-500 text-xs">/audit</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Maksimal 20 Perangkat Kantor
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Audit Jaringan Firewall Dasar
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Evaluasi Server/Penyimpanan NAS Kantor
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Roadmap Implementasi Strategis 12 Bulan
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Scale-up Business", "Rp 3.5jt / Audit")}
                  className="w-full py-3 mt-8 bg-[#004ac6] hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Scale-Up
                </button>
              </div>

              {/* UMKM Plan 3 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-slate-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Maintenance Rutin
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">75Rb</span>
                    <span className="text-slate-500 text-xs">/per-PC/bulan</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Kunjungan Fisik Pemeliharaan Bulanan
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Instalasi Update Keamanan Berkala
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Remote Support Jam Kerja Standar
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("Maintenance Rutin UMKM", "Rp 75rb / PC / Bulan")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition shadow-xs cursor-pointer text-center"
                >
                  Pilih Maintenance
                </button>
              </div>
            </div>
          )}

          {activeSegment === "enterprise" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
              {/* Enterprise Plan 1 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    IT Corporate Audit
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-lg font-bold">Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">5Jt</span>
                    <span className="text-slate-500 text-xs">/audit</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Audit Kepatuhan Kebijakan Server &amp; IT
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Uji Penetrasi Celah Keamanan Eksternal
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Perencanaan Backup Pemulihan Bencana (DRP)
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("IT Corporate Audit", "Rp 5jt / Audit")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Corporate Audit
                </button>
              </div>

              {/* Enterprise Plan 2 (Featured) */}
              <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-xl flex flex-col justify-between relative shadow-lg transform md:scale-103 z-10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
                  Rekomendasi Kontrak
                </div>
                <div className="space-y-4">
                  <span className="text-blue-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    SLA Pemeliharaan Prioritas
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-slate-400 text-sm font-bold">Mulai Rp</span>
                    <span className="text-white text-3xl font-extrabold mx-1">1.5Jt</span>
                    <span className="text-slate-500 text-xs">/bulan</span>
                  </div>
                  <ul className="space-y-3 text-slate-300 text-xs pt-4 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Jaminan Respon Darurat di Bawah 1 Jam
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-355" />
                      Dukungan Teknisi On-Site 24 Jam
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-300" />
                      Dedicated IT Support Engineer
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => selectPlan("SLA Pemeliharaan Prioritas", "Mulai Rp 1.5jt / Bulan")}
                  className="w-full py-3 mt-8 bg-[#004ac6] hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-sans transition-all cursor-pointer text-center"
                >
                  Pilih Paket SLA
                </button>
              </div>

              {/* Enterprise Plan 3 */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col justify-between hover:border-blue-400 transition shadow-md">
                <div className="space-y-4">
                  <span className="text-slate-400 font-sans font-bold text-xs uppercase tracking-wider block">
                    Custom Infrastructure
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-white text-2.5xl font-extrabold">Custom Quote</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Perancangan server terdisitribusi berskala multi-cabang regional, migrasi cloud AWS/GCP, dan instalasi rak server fisik datacenter.
                  </p>
                  <div className="flex items-center gap-2 bg-blue-950/50 text-blue-400 p-2 rounded-lg text-xs font-medium border border-blue-900/40">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 text-blue-400" />
                    <span>Nego Sesuai Blueprint</span>
                  </div>
                </div>
                <button 
                  onClick={() => selectPlan("Custom Infrastructure", "Nego / Custom Quote")}
                  className="w-full py-3 mt-8 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold font-sans transition shadow-xs cursor-pointer text-center"
                >
                  Ajukan Blueprint
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking Form - Dynamically adapts labels for current segment */}
      <section className="py-20 bg-slate-900 border-t border-slate-800" id="booking-section">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-5">
            
            {/* Left promo panel inside card */}
            <div className="md:col-span-2 bg-blue-950/40 p-8 text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Network className="w-32 h-32 text-blue-400" />
              </div>

              <div className="space-y-6 relative z-10">
                <h3 className="font-sans font-bold text-2xl leading-snug text-white">
                  Konsultasikan Kebutuhan Anda
                </h3>
                <p className="text-slate-300 text-xs font-medium border-l-2 border-emerald-400 pl-3 leading-relaxed">
                  {activeSegment === "personal" && "Isi nomor kontak Anda agar teknisi kami dapat segera mengkoordinasikan estimasi perbaikan / cleaning laptop Anda secara langsung."}
                  {activeSegment === "umkm" && "Dapatkan analisis awal gratis! Isi data usaha Anda dan pilih waktu terbaik untuk audit jarak jauh dari tim kami."}
                  {activeSegment === "enterprise" && "Daftarkan tim teknis korporasi Anda untuk rapat strategis menyusun blueprint SLA keamanan jaringan skala perusahaan."}
                </p>
              </div>

              <div className="space-y-4 relative z-10 pt-8 border-t border-slate-800 mt-8 md:mt-0">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-blue-900/40 rounded-full flex items-center justify-center text-white shrink-0">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Waktu Respon Cepat</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Dihubungi kembali dalam kurang dari 24 jam kerja resmi.</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-blue-900/40 rounded-full flex items-center justify-center text-white shrink-0">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Tenaga IT Bersertifikasi</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Seluruh tim kami memegang sertifikat industri resmi (CompTIA, CCNA, MTCNA).</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Fields */}
            <form onSubmit={handleSubmit} className="md:col-span-3 p-8 space-y-4" id="sme-detail-consultation-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-bold mb-1.5" htmlFor="sme-form-name">
                    Nama Lengkap Anda
                  </label>
                  <input 
                    type="text" 
                    id="sme-form-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-blue-500 focus:bg-slate-900 rounded-lg p-3 text-white placeholder-slate-550 text-sm focus:ring-1 focus:ring-blue-500 outline-hidden transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-bold mb-1.5" htmlFor="sme-form-business">
                    {activeSegment === "personal" ? "Kelompok / Tipe Gadget" : "Nama Perusahaan / Bisnis"}
                  </label>
                  <input 
                    type="text" 
                    id="sme-form-business"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder={activeSegment === "personal" ? "Contoh: Asus ROG / Macbook Air" : "Contoh: PT Sukses Mandiri"}
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-blue-500 focus:bg-slate-900 rounded-lg p-3 text-white placeholder-slate-555 text-sm focus:ring-1 focus:ring-blue-500 outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5" htmlFor="sme-form-phone">
                  Nomor WhatsApp Korespondensi
                </label>
                <input 
                  type="tel" 
                  id="sme-form-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-slate-900 border border-slate-800 hover:border-slate-755 focus:border-blue-500 focus:bg-slate-900 rounded-lg p-3 text-white placeholder-slate-550 text-sm focus:ring-1 focus:ring-blue-500 outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1.5" htmlFor="sme-form-msg">
                  Uraikan Kendala IT Saat Ini (Opsional)
                </label>
                <textarea 
                  id="sme-form-msg"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Contoh: Laptop terlalu cepat panas, atau butuh setup server NAS terintegrasi di kantor cabang..."
                  className="w-full bg-slate-900 border border-slate-800 hover:border-slate-755 focus:border-blue-500 focus:bg-slate-900 rounded-lg p-3 text-white placeholder-slate-550 text-sm focus:ring-1 focus:ring-blue-500 outline-hidden transition"
                />
              </div>

              {successMsg && (
                <div className="bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 p-3 rounded-lg text-xs font-semibold">
                  {successMsg}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-900 font-sans font-bold text-sm py-4 rounded-lg shadow-md hover:translate-y-[-1px] active:translate-y-0 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Menyimpan data..." : "Kirim Pengajuan ke WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
