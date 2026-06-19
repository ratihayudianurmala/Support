import React, { useState, useEffect } from "react";
import { Mail, Upload, RefreshCw } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  imgUrl: string;
  actions: string[];
  fileName?: string;
}

// Convert shareable Google Drive links to direct image source stream links
const formatImgUrl = (url: string): string => {
  if (!url) return "";
  const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

interface ExpertiseProps {
  onOpenConsultation: (service: string) => void;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: "Ratih Ayudia Nurmala",
    role: "Team Audit & Konsultasi",
    email: "dhearatih83@gmail.com",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rb_oKOmaXBddZhDC8JXYDOXzuz6B3Z22b-EIP60GRxpWdyrBNPJb2qr-YhR-yTLtuz8eBfh_xYYmJgwzGTL5U1HKC82xGms-e1fEwToWq9JTM3DCqzLdNthgHQlT87DJyyDtezYyu8owPSIzqTmgiRwIs9bQxgv0Afgk9waiSpHH8wCdG9tJJd5X7ZJAdFyFpWwl7RAhu3aGg4JTcqlt8sLxj0nI5tX7ujlxttJ-IOC8uCpZV6RjNCuRCug8y6Vki2Rhd0hfMYA",
    actions: ["share"]
  },
  {
    name: "Febri Sofi Suharjo",
    role: "Team Procurement",
    email: "febrisuharjo@gmail.com",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA60EuWZTQ2rh9xLmUpsi3JGXkpwiXJmRpp_GmK5OWVocCYzEgfHjCrTZoVSKPSVQ_1XxcX6HYMJELQ3MSd_ggD96d9Egv9ypmfkS8D8IgLndloA2WtKUPgQ8kO9bQ3eUwoNZ1n8etnfApQ9nUYagxg6nzF_xqVIbLQl4ekmJrlUxgGAdk7HZD-3EXz6Jw3R4RDa2yR-SlMiXghziMhS5_VWICd1f-LT2-noa1A2rdaq20FQlGgtvHJhbx_JJdthL0q06L9cq-RGa4",
    actions: []
  },
  {
    name: "Naufal Anugrah Ramadani",
    role: "Team Technical Support",
    email: "naufalanugrahramadani@gmail.com",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLXC2117sZfk32PStfnuATIwrTfctovA7M5kIHZpIFo5MzrdRvj2Vd3VluNf_24LGNALnM-YPCmngvx6WbNg_Qviplec0twmb8ek2jsmRZ5fTRI_NuX2oFYnGlugeDyQwwqZkeQrTkyxpU5l9L4tq2sr2wJzfC3FCTkHs98CG0s7QbSZRxCYAkM3eG4RfVYhEJDNxAvZ7ziosgRjpXHphepSjIJHi_ctZOlSt8w_xP65QXFpzCNUboGRE9cIXAVY8bOqMc6Pei7QM",
    actions: ["camera"]
  },
  {
    name: "Achmad Amay addadhil",
    role: "Team OS Specialist",
    email: "amay38338@gmail.com",
    imgUrl: "https://drive.google.com/file/d/1dvI_qD6V_Z19Y9SKoNH2TNCR-BGRXuyH/view?usp=drive_link",
    actions: []
  }
];

export default function Expertise({ onOpenConsultation }: ExpertiseProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem("sobat_support_team_v3");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved team data", e);
      }
    }
    return DEFAULT_MEMBERS;
  });

  useEffect(() => {
    localStorage.setItem("sobat_support_team_v3", JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setTeamMembers(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            imgUrl: reader.result as string,
            fileName: file.name
          };
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = (index: number) => {
    setTeamMembers(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        imgUrl: DEFAULT_MEMBERS[index].imgUrl,
        fileName: undefined
      };
      return updated;
    });
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors relative" id="tim">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6" id="expertise-header">
          <div className="space-y-2">
            <span className="text-[#004ac6] dark:text-blue-400 font-sans font-bold text-xs uppercase tracking-widest block">
              Expertise
            </span>
            <h2 className="font-sans font-bold text-3xl text-slate-900 dark:text-white" id="expertise-title">
              Tim Spesialis Kami
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-lg" id="expertise-desc">
            Digerakkan oleh para ahli bersertifikat yang siap menangani setiap tantangan teknologi dengan presisi tinggi.
          </p>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="expertise-grid">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#004ac6] dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative h-full"
              id={`team-member-${idx}`}
            >
              <div className="flex flex-col flex-1">
                {/* Photo Container */}
                <div className="aspect-square w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 mb-4 bg-slate-100 dark:bg-slate-900 relative">
                  <img
                    src={formatImgUrl(member.imgUrl)}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                  {/* Absolute overlay for Upload/Reset Photo */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
                    <label className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded cursor-pointer transition">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(idx, e)}
                      />
                    </label>
                    {member.fileName && (
                      <button
                        onClick={() => resetPhoto(idx)}
                        className="p-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition cursor-pointer"
                        title="Reset Photo"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Name & Role Container */}
                <div className="mb-2 flex flex-col justify-start">
                  <h3 className="font-sans font-bold text-base md:text-lg text-slate-900 dark:text-slate-900 mb-0.5 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-[#004ac6] dark:text-blue-400 font-sans font-semibold text-xs tracking-wide">
                    {member.role}
                  </p>
                </div>

                {/* Email details with Mail Icon - force to align perfectly at bottom of details container */}
                <div className="space-y-3 mb-4 mt-auto">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-[#004ac6] dark:hover:text-blue-400 transition">
                    <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                    <a href={`mailto:${member.email}`} className="text-xs font-medium truncate max-w-full" title={member.email}>
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
