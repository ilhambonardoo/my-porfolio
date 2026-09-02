import { Document } from "@langchain/core/documents";

export const profileDocs = [
  new Document({
    pageContent: `Profil & Pendidikan Ilham Bonardo Marpaung:
Nama Lengkap: Ilham Bonardo Marpaung
Pendidikan: IPB University, Jurusan Teknologi Rekayasa Komputer (Semester 7, IPK 3.60).
Peran Utama: Fullstack Developer (Backend-Oriented) dengan spesialisasi Backend Engineering, IoT Engineering, dan Machine Learning Integration.
Bahasa: Bahasa Indonesia (Native), Bahasa Inggris (Professional).`,
    metadata: { category: "education" },
  }),

  new Document({
    pageContent: `Pengalaman Kerja & Posisi Saat Ini Ilham Bonardo Marpaung:
Posisi: IoT Engineer Intern di DPR RI (Periode: 6 Juli 2026 – 6 November 2026).
Tanggung Jawab: Mengembangkan dan mengurus sistem Smarthome Assistant.`,
    metadata: { category: "experience" },
  }),

  new Document({
    pageContent: `Keahlian & Skills Ilham Bonardo Marpaung:
Bahasa Pemrograman: Go (Golang), TypeScript/JavaScript, PHP, Python, C/C++ (Arduino).
Backend & DevOps: Golang, Docker, GitHub Actions (CI/CD), Laravel, Node.js, RESTful API Design.
Frontend: Next.js, Nuxt.js, React, Tailwind CSS.
Hardware & IoT: ESP32, ESP8266, Arduino, Sensor Integration, Real-time Monitoring Dashboard.
Machine Learning: Computer Vision Integration, Predictive Models.
Soft Skills: Kerja sama tim (Cross-functional team collaboration), Profesionalisme tinggi, Adaptabilitas.`,
    metadata: { category: "skills" },
  }),

  new Document({
    pageContent: `Publikasi & Riset Ilham Bonardo Marpaung:
Judul Publikasi: Smart Squeeze Cage Berbasis IoT & Precision Livestock Farming (Jurnal Falsikom, Terindeks SINTA 4).
Peran: Full Stack Web Developer dan Machine Learning Engineer.
Ringkasan: Riset dan publikasi sistem Smart Squeeze Cage berbasis IoT untuk otomatisasi monitoring bobot ternak dan kalkulasi pakan presisi berdasarkan standar internasional NRC.
Kontribusi Frontend: Membangun dashboard interaktif real-time menggunakan Next.js dan TypeScript untuk visualisasi data bobot ternak, status perangkat IoT, serta monitoring estimasi pakan harian.
Kontribusi ML & API: Mengembangkan model prediktif kalkulasi rasio optimasi pakan (NRC standar DMI 3% bobot badan, rasio 60% hijauan : 40% konsentrat) serta membangun RESTful API berkinerja tinggi menggunakan FastAPI.`,
    metadata: { category: "publications" },
  }),

  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung:
Judul Proyek: IoT Realtime Dashboard
Deskripsi: Menghubungkan ESP32 dengan web Next.js untuk monitoring sensor secara realtime.`,
    metadata: { category: "projects" },
  }),

  new Document({
    pageContent: `Informasi Tambahan, Keunggulan, & Kontak Ilham Bonardo Marpaung:
Kelebihan Utama: Memiliki keunggulan unik di persimpangan hardware (IoT) dan software (Web, DevOps, & ML). Sangat kuat di sisi Backend (Golang, Docker, CI/CD) namun tetap fleksibel mengerjakan Frontend.
Ekspektasi Gaji: Terbuka untuk didiskusikan sesuai kualifikasi, tanggung jawab, dan standar perusahaan.
Tautan LinkedIn: https://www.linkedin.com/in/ilham-bonardo-marpaung-98875a33a
Tautan Portofolio Web: https://ilhambonardoo.vercel.app/
Tautan Github : https://github.com/ilhambonardoo`,
    metadata: { category: "faq" },
  }),
];
