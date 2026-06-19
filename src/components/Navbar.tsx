import React, { useState, useEffect } from "react";
import { HelpCircle, ChevronRight, Menu, X, Sun, Moon, Shield } from "lucide-react";

interface NavbarProps {
  currentView?: "home" | "umkm-detail";
  onNavigate?: (view: "home" | "umkm-detail") => void;
  onOpenConsultation: (service?: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ currentView = "home", onNavigate, onOpenConsultation, isDarkMode, onToggleDarkMode, onOpenAdmin }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("layanan");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("home");
    }
    setActiveSection("layanan");
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate && currentView !== "home") {
      onNavigate("home");
    }
    // Wait for the home view to render before scrolling
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const handleMobileConsultationClick = () => {
    setIsMobileMenuOpen(false);
    onOpenConsultation("Konsultasi Umum");
  };

  useEffect(() => {
    if (currentView !== "home") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      
      const hargaElement = document.getElementById("harga");
      const timElement = document.getElementById("tim");
      const lokasiElement = document.getElementById("lokasi");

      if (lokasiElement && scrollPos >= lokasiElement.offsetTop) {
        setActiveSection("lokasi");
      } else if (timElement && scrollPos >= timElement.offsetTop) {
        setActiveSection("tim");
      } else if (hargaElement && scrollPos >= hargaElement.offsetTop) {
        setActiveSection("harga");
      } else {
        setActiveSection("layanan");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 h-18 flex justify-between items-center">
        {/* Brand */}
        <button 
          onClick={handleLogoClick}
          className="font-sans font-bold text-xl sm:text-2xl text-[#004ac6] dark:text-blue-400 hover:opacity-90 transition-opacity cursor-pointer focus:outline-hidden"
          id="nav-logo-button"
        >
          SobatSupport
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => handleLinkClick("harga")}
            className={`font-sans font-semibold text-sm pb-1 transition-all focus:outline-hidden cursor-pointer ${
              activeSection === "layanan" && currentView === "home"
                ? "text-[#004ac6] dark:text-blue-400 border-b-2 border-[#004ac6] dark:border-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-[#004ac6] dark:hover:text-blue-400 hover:border-b-2 hover:border-[#004ac6] dark:hover:border-blue-400 border-b-2 border-transparent"
            }`}
            id="nav-layanan-link"
          >
            Layanan
          </button>
          <button
            onClick={() => handleLinkClick("harga")}
            className={`font-sans font-semibold text-sm pb-1 transition-all focus:outline-hidden cursor-pointer ${
              activeSection === "harga" && currentView === "home"
                ? "text-[#004ac6] dark:text-blue-400 border-b-2 border-[#004ac6] dark:border-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-[#004ac6] dark:hover:text-blue-400 hover:border-b-2 hover:border-[#004ac6] dark:hover:border-blue-400 border-b-2 border-transparent"
            }`}
            id="nav-harga-link"
          >
            Harga
          </button>
          <button
            onClick={() => handleLinkClick("tim")}
            className={`font-sans font-semibold text-sm pb-1 transition-all focus:outline-hidden cursor-pointer ${
              activeSection === "tim" && currentView === "home"
                ? "text-[#004ac6] dark:text-blue-400 border-b-2 border-[#004ac6] dark:border-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-[#004ac6] dark:hover:text-blue-400 hover:border-b-2 hover:border-[#004ac6] dark:hover:border-blue-400 border-b-2 border-transparent"
            }`}
            id="nav-tim-link"
          >
            Tim
          </button>
          <button
            onClick={() => handleLinkClick("lokasi")}
            className={`font-sans font-semibold text-sm pb-1 transition-all focus:outline-hidden cursor-pointer ${
              activeSection === "lokasi" && currentView === "home"
                ? "text-[#004ac6] dark:text-blue-400 border-b-2 border-[#004ac6] dark:border-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-[#004ac6] dark:hover:text-blue-400 hover:border-b-2 hover:border-[#004ac6] dark:hover:border-blue-400 border-b-2 border-transparent"
            }`}
            id="nav-lokasi-link"
          >
            Lokasi
          </button>
        </div>

        {/* Desktop Action Button / Mobile Hamburger & Button Container */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenConsultation("Konsultasi Umum")}
            className="hidden sm:inline-block bg-[#004ac6] hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-sans font-semibold text-sm hover:shadow-md transition-all active:scale-95 focus:outline-hidden cursor-pointer"
            id="nav-consultation-button"
          >
            Konsultasi Gratis
          </button>

          {/* Hamburger Menu Icon for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-200 hover:text-[#004ac6] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-hidden cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-18 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg flex flex-col py-4 px-6 gap-4 animate-fadeIn"
          id="mobile-dropdown-panel"
        >
          <button
            onClick={() => handleLinkClick("harga")}
            className={`font-sans font-bold text-left py-2 border-b border-slate-50 dark:border-slate-900 text-base transition-colors ${
              activeSection === "layanan" && currentView === "home" ? "text-[#004ac6] dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Layanan
          </button>
          <button
            onClick={() => handleLinkClick("harga")}
            className={`font-sans font-bold text-left py-2 border-b border-slate-50 dark:border-slate-900 text-base transition-colors ${
              activeSection === "harga" && currentView === "home" ? "text-[#004ac6] dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Harga Paket
          </button>
          <button
            onClick={() => handleLinkClick("tim")}
            className={`font-sans font-bold text-left py-2 border-b border-slate-50 dark:border-slate-900 text-base transition-colors ${
              activeSection === "tim" && currentView === "home" ? "text-[#004ac6] dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Tim Spesialis
          </button>
          <button
            onClick={() => handleLinkClick("lokasi")}
            className={`font-sans font-bold text-left py-2 border-b border-slate-50 dark:border-slate-900 text-base transition-colors ${
              activeSection === "lokasi" && currentView === "home" ? "text-[#004ac6] dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
            }`}
          >
            Lokasi Kantor
          </button>
          <button
            onClick={handleMobileConsultationClick}
            className="w-full bg-[#004ac6] hover:bg-blue-700 text-white py-3 rounded-lg font-sans font-bold text-center text-sm shadow-md transition-all active:scale-98 mt-2"
          >
            Konsultasi Gratis Sekarang
          </button>
        </div>
      )}
    </nav>
  );
}
