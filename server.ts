import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory consultations storage
interface Consultation {
  id?: number;
  client_name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: string;
  created_at: string;
}

const inMemoryConsultations: Consultation[] = [
  {
    id: 1,
    client_name: "Budi Santoso",
    email: "budi@santoso-umkm.com",
    phone: "081234567890",
    service_type: "Audit & Rekomendasi Jaringan",
    message: "Butuh audit jaringan untuk kantor cabang baru kami di Jakarta.",
    status: "Pending",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 2,
    client_name: "Siti Rahma",
    email: "siti.rahma@enterprise-it.id",
    phone: "081198765432",
    service_type: "Integrasi Server & Cloud SLA",
    message: "Ingin menanyakan integrasi NAS server bergaransi resmi.",
    status: "Dihubungi",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

// 1. Get database status (always return clean operational system description)
app.get("/api/db-status", (req, res) => {
  res.json({
    connected: false,
    message: "Aplikasi berjalan penuh dalam mode in-memory sandboxed. Database fisik telah dihilangkan sesuai permintaan.",
    fallbackActive: true,
  });
});

// 2. Initialize database schema (noop placeholder)
app.post("/api/db-init", (req, res) => {
  res.json({
    success: true,
    message: "Server berjalan menggunakan mode in-memory tanpa database."
  });
});

// 3. Create a consultation
app.post("/api/consultations", (req, res) => {
  const { client_name, email, phone, service_type, message } = req.body;

  if (!client_name || !email || !phone || !service_type) {
    return res.status(400).json({
      success: false,
      message: "Nama, email, nomor HP, dan tipe layanan harus diisi."
    });
  }

  // Save to memory
  const newConsultation: Consultation = {
    id: inMemoryConsultations.length + 1,
    client_name,
    email,
    phone,
    service_type,
    message: message || "",
    status: "Pending",
    created_at: new Date().toISOString()
  };
  inMemoryConsultations.unshift(newConsultation);

  return res.json({
    success: true,
    message: "Permintaan konsultasi Anda telah berhasil kami terima secara cepat.",
    data: newConsultation,
    fallback: true
  });
});

// 4. Get all consultations
app.get("/api/consultations", (req, res) => {
  return res.json({
    success: true,
    source: "local-memory",
    data: inMemoryConsultations
  });
});

// 5. Update consultation status
app.patch("/api/consultations/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: "Status is required." });
  }

  const index = inMemoryConsultations.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    inMemoryConsultations[index].status = status;
    return res.json({
      success: true,
      message: "Status updated in memory!",
      data: inMemoryConsultations[index]
    });
  }

  return res.status(404).json({ success: false, message: "Consultation not found." });
});

// Setup Vite & static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

bootstrap();
