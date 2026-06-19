import React, { useState, useEffect } from "react";
import { RefreshCw, Check, Hourglass, Shield, HeartHandshake, Filter, Clock, PhoneCall } from "lucide-react";
import { Consultation } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchConsultations = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/consultations");
      const resData = await res.json();
      if (resData.success) {
        setConsultations(resData.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data leads.");
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (id: number | undefined, newStatus: string) => {
    if (id === undefined) return;
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      alert("Gagal merubah status konsultasi.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchConsultations();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredConsultations = consultations.filter((c) => {
    if (filterStatus === "all") return true;
    return c.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Calculate stats in-memory
  const totalInquiries = consultations.length;
  const pendingCount = consultations.filter(c => c.status === "Pending").length;
  const contactedCount = consultations.filter(c => c.status === "Dihubungi").length;
  const completedCount = consultations.filter(c => c.status === "Selesai").length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose}></div>

      {/* Main Container */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800" id="admin-modal">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold font-sans">Lead &amp; Consultation Inquiries Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition focus:outline-hidden cursor-pointer"
          >
            Tutup Dashboard
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" id="admin-body">
          {/* Section 1: Memory Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="stats-summary-grid">
            {/* Total Inquiries */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Masuk</span>
                <HeartHandshake className="w-4 h-4 text-[#004ac6]" />
              </div>
              <div className="mt-2.5">
                <div className="text-2xl font-extrabold font-sans text-slate-900 dark:text-white">{totalInquiries}</div>
                <p className="text-[11px] text-slate-400 mt-1">Total seluruh konsultasi saat ini</p>
              </div>
            </div>

            {/* Pending Inquiries */}
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/50 dark:border-amber-900/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                <span className="text-xs font-bold uppercase tracking-wider">Layanan Pending</span>
                <Clock className="w-4 h-4" />
              </div>
              <div className="mt-2.5">
                <div className="text-2xl font-extrabold font-sans text-amber-700 dark:text-amber-300">{pendingCount}</div>
                <p className="text-[11px] text-amber-600/70 dark:text-amber-400/70 mt-1">Belum ditangani / diproses</p>
              </div>
            </div>

            {/* Contacted Inquiries */}
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                <span className="text-xs font-bold uppercase tracking-wider">Sudah Dihubungi</span>
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="mt-2.5">
                <div className="text-2xl font-extrabold font-sans text-blue-700 dark:text-blue-300">{contactedCount}</div>
                <p className="text-[11px] text-blue-600/70 dark:text-blue-400/70 mt-1">Dalam proses diskusi / follow up</p>
              </div>
            </div>

            {/* Completed Inquiries */}
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-900/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span className="text-xs font-bold uppercase tracking-wider">Selesai Ditangani</span>
                <Check className="w-4 h-4" />
              </div>
              <div className="mt-2.5">
                <div className="text-2xl font-extrabold font-sans text-emerald-700 dark:text-emerald-300">{completedCount}</div>
                <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/70 mt-1">Konsultasi selesai diselesaikan</p>
              </div>
            </div>
          </div>

          {/* Section 2: Incoming Leads Inquiry */}
          <div className="space-y-3.5" id="admin-table-section">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-md text-slate-900 dark:text-white">
                  Daftar Pengajuan Masuk ({filteredConsultations.length})
                </h3>
              </div>

              {/* Filtering & Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium dark:text-slate-400">
                  <Filter className="w-3.5 h-3.5" /> Filter status:
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md outline-hidden cursor-pointer"
                >
                  <option value="all">Semua Data</option>
                  <option value="Pending">⚙️ Pending / Antrean</option>
                  <option value="Dihubungi">📞 Sudah Dihubungi</option>
                  <option value="Selesai">✅ Selesai</option>
                </select>
                <button
                  onClick={fetchConsultations}
                  disabled={loadingLeads}
                  className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-md transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? "animate-spin" : ""}`} /> Refresh
                </button>
              </div>
            </div>

            {/* Table or Placeholder */}
            {filteredConsultations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50">
                Belum ada pengajuan masuk dengan status filter ini. Coba buat pengajuan dari halaman depan!
              </div>
            ) : (
              <div className="border border-slate-200 dark:border-slate-840 rounded-lg overflow-hidden bg-white dark:bg-slate-850 max-h-[40vh] overflow-y-auto shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-750">
                    <tr>
                      <th className="py-3 px-4 font-sans font-bold">Klien / Detail Kontak</th>
                      <th className="py-3 px-4 font-sans font-bold">Layanan yang Dipilih</th>
                      <th className="py-3 px-4 font-sans font-bold">Pesan Kebutuhan</th>
                      <th className="py-3 px-4 font-sans font-bold">Waktu Pengiriman</th>
                      <th className="py-3 px-4 font-sans font-bold">Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                    {filteredConsultations.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        {/* Name & Contacts */}
                        <td className="py-3.5 px-4 font-sans font-medium">
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{lead.client_name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lead.email}</div>
                          <div className="text-xs text-[#004ac6] dark:text-blue-400 font-semibold mt-0.5">{lead.phone}</div>
                        </td>

                        {/* Service requested */}
                        <td className="py-3.5 px-4 font-sans font-semibold">
                          <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 rounded font-bold font-sans">
                            {lead.service_type}
                          </span>
                        </td>

                        {/* Problem Message */}
                        <td className="py-3.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-300 max-w-xs truncate leading-relaxed">
                          {lead.message || <span className="italic text-slate-400">Tidak ada deskripsi</span>}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          {new Date(lead.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* Status Select action toggle */}
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`px-2 py-1 rounded border text-xs font-bold leading-none cursor-pointer outline-hidden ${
                              lead.status === "Selesai"
                                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40"
                                : lead.status === "Dihubungi"
                                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/40"
                                : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/40"
                            }`}
                          >
                            <option value="Pending">⚙️ Pending</option>
                            <option value="Dihubungi">📞 Dihubungi</option>
                            <option value="Selesai">✅ Selesai</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
