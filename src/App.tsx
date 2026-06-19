import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Expertise from "./components/Expertise";
import ConsultationDrawer from "./components/ConsultationDrawer";
import Footer from "./components/Footer";
import SmeDetail from "./components/SmeDetail";
import CompanyMap from "./components/CompanyMap";
import AdminPanel from "./components/AdminPanel";
import { MessageSquare, Settings, ArrowRight, Sparkles } from "lucide-react";

export default function App() {
  const [view, setView] = useState<"home" | "umkm-detail">("home");
  const [selectedSegment, setSelectedSegment] = useState<"personal" | "umkm" | "enterprise">("umkm");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Konsultasi Umum");
  const [adminOpen, setAdminOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      // Default to light mode (false) if not previously set or if set to light
      return saved === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService("Konsultasi Umum");
    }
    setDrawerOpen(true);
  };

  const handleConsultationSuccess = () => {
    // Optional additional triggers
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f7f9fb] text-[#191c1e] dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between pt-18 transition-colors" id="app-root-container">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentView={view}
        onNavigate={(targetView) => setView(targetView)}
        onOpenConsultation={handleOpenConsultation}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {view === "home" ? (
          <>
            {/* Hero Banner Section */}
            <Hero onOpenConsultation={handleOpenConsultation} />

            {/* Pricing & Offers Sections */}
            <Pricing 
              onOpenConsultation={handleOpenConsultation} 
              onViewSegmentDetail={(segment) => {
                setSelectedSegment(segment);
                setView("umkm-detail");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Service Divisions & Expert Members */}
            <Expertise onOpenConsultation={handleOpenConsultation} />

            {/* Strategic Map / Alamat Fisik Usaha */}
            <CompanyMap />
          </>
        ) : (
          <SmeDetail 
            onBackToHome={() => setView("home")} 
            onOpenConsultation={handleOpenConsultation} 
            initialSegment={selectedSegment}
          />
        )}
      </main>

      {/* Structured Informational Footer */}
      <Footer
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Interactive Slid-over Consultation Form */}
      <ConsultationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedService={selectedService}
        onSuccess={handleConsultationSuccess}
      />

      {/* Admin Panel Controls */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Floating Action Button (FAB) Bottom Right */}
      <button
        onClick={() => handleOpenConsultation("Konsultasi Umum")}
        className="fixed bottom-6 right-6 z-30 bg-[#004ac6] hover:bg-blue-700 text-white p-4.5 rounded-full shadow-2xl flex items-center gap-2 group hover:scale-105 active:scale-95 transition-all outline-hidden cursor-pointer"
        id="floating-fab-button"
        title="Buka Konsultasi"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap font-sans font-bold text-sm text-white">
          Konsultasi Gratis
        </span>
      </button>
    </div>
  );
}
