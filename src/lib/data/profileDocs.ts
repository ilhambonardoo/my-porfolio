import { Document } from "@langchain/core/documents";

export const profileDocs = [
  // --- PROFIL & PENDIDIKAN ---
  new Document({
    pageContent: `Profil & Pendidikan Ilham Bonardo Marpaung:
Nama Lengkap: Ilham Bonardo Marpaung
Pendidikan: IPB University, Jurusan Teknologi Rekayasa Komputer (Semester 7, IPK 3.6).
Peran Utama: Fullstack Developer (Backend-Oriented) dengan spesialisasi Backend Engineering, IoT Engineering, dan Machine Learning Integration.
Bahasa: Bahasa Indonesia (Native), Bahasa Inggris (Professional).`,
    metadata: { category: "education" },
  }),

  // --- PENGALAMAN KERJA ---
  new Document({
    pageContent: `Pengalaman Kerja & Posisi Saat Ini Ilham Bonardo Marpaung:
Posisi: IoT Engineer Intern di DPR RI (Periode: 6 Juli 2026 – 6 November 2026).
Tanggung Jawab: Mengembangkan dan mengurus sistem Smarthome Assistant.`,
    metadata: { category: "experience" },
  }),

  // --- SKILLS ---
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

  // --- PUBLIKASI ---
  new Document({
    pageContent: `Publikasi & Riset Ilham Bonardo Marpaung:
Judul Publikasi: Smart Squeeze Cage Berbasis IoT & Precision Livestock Farming (Jurnal Falsikom, Terindeks SINTA 4).
Peran: Full Stack Web Developer dan Machine Learning Engineer.
Ringkasan: Riset dan publikasi sistem Smart Squeeze Cage berbasis IoT untuk otomatisasi monitoring bobot ternak dan kalkulasi pakan presisi berdasarkan standar internasional NRC.
Kontribusi Frontend: Membangun dashboard interaktif real-time menggunakan Next.js dan TypeScript untuk visualisasi data bobot ternak, status perangkat IoT, serta monitoring estimasi pakan harian.
Kontribusi ML & API: Mengembangkan model prediktif kalkulasi rasio optimasi pakan (NRC standar DMI 3% bobot badan, rasio 60% hijauan : 40% konsentrat) serta membangun RESTful API berkinerja tinggi menggunakan FastAPI.`,
    metadata: { category: "publications" },
  }),

  // --- DAFTAR PROYEK ---

  // 1. One Fish
  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung - One Fish Website & Catalog:
Judul Proyek: One Fish - Portfolio & Catalog Website
Deskripsi: Website profil perusahaan dan katalog produk interaktif untuk toko akuarium One Fish. Menampilkan koleksi kehidupan akuatik pilihan yang dikurasi untuk memastikan keindahan dan vitalitas hewan air.
Integrasi Layanan: Terhubung langsung dengan layanan Cloudinary untuk manajemen, pengolahan, dan streaming konten video berkualitas tinggi secara efisien.
Tautan Live Website: https://onefish.vercel.app/`,
    metadata: { category: "projects", project: "one-fish" },
  }),

  // 2. Smart Squeeze Cage
  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung - Smart Squeeze Cage:
Judul Proyek: Smart Squeeze Cage (Timbangan Jepit Digital Pintar)
Deskripsi: Solusi penimbangan digital pintar mutakhir yang dirancang khusus untuk meningkatkan efisiensi dan akurasi manajemen peternakan (khususnya ternak kambing). Menggabungkan teknologi sensor presisi tinggi dengan konektivitas IoT untuk modernisasi proses penimbangan hewan secara real-time.
Panduan & Detail Lengkap: https://squeeze-cage.vercel.app/`,
    metadata: { category: "projects", project: "squeeze-cage" },
  }),

  // 3. Personal Portfolio Website (RAG AI)
  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung - AI Interactive Portfolio:
Judul Proyek: Web Portofolio Interaktif Berbasis RAG AI
Deskripsi: Website portofolio pribadi Ilham yang terintegrasi dengan chatbot AI berbasis RAG (Retrieval-Augmented Generation).
Cara Kerja Sistem AI:
- Proses Ingestion (Penyimpanan): Data profil diubah menjadi vektor 768 dimensi menggunakan Gemini Embedding (embedding-001) dan disimpan di database Supabase (pgvector).
- Proses Querying (Pencarian & Chat): Saat pengunjung bertanya, sistem mengubah pertanyaan menjadi vektor, mencari data terdekat di Supabase (similarity search), lalu menyuapkan data tersebut ke DeepSeek LLM via LangChain untuk menghasilkan jawaban alami.
Tech Stack: Next.js (App Router), React, TypeScript, Tailwind CSS, Supabase (pgvector), LangChain, Gemini Embedding, DeepSeek API.
Tautan Website : https://ilhambonardoo.vercel.app
`,

    metadata: { category: "projects", project: "portfolio" },
  }),

  // 4. CV Boenha Makmur Utama
  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung - Website CV Boenha Makmur Utama:
Judul Proyek: Company Profile Website Development - CV Boenha Makmur Utama
Deskripsi: Mengembangkan website profil perusahaan yang responsif untuk memperkuat kehadiran online serta menampilkan informasi bisnis, produk, dan layanan CV Boenha Makmur Utama. Dirancang dengan fokus pada usabilitas, performa tinggi, dan pengalaman pengguna (UX) yang profesional di seluruh perangkat.
Tanggung Jawab Utama:
- Merancang dan membangun website profil perusahaan yang responsif.
- Mengimplementasikan antarmuka (UI) yang bersih dan modern dengan UX yang intuitif.
- Membangun halaman informatif: Beranda, Tentang Kami, Produk/Layanan, Galeri, dan Kontak.
- Mengoptimalkan performa website, responsivitas, dan dasar-dasar SEO.
- Mengintegrasikan formulir kontak dan informasi bisnis untuk meningkatkan komunikasi dengan pelanggan.
Tech Stack: Next.js, React.js, Tailwind CSS.
Tautan Website : https://boenha.com
`,
    metadata: { category: "projects", project: "boenha" },
  }),

  // 5. IoTani Groups
  new Document({
    pageContent: `Proyek Ilham Bonardo Marpaung - IoTani Groups:
Judul Proyek: IoTani Groups (Sistem Otomasi Pertanian Cerdas / Smart Farming)
Deskripsi: Sistem otomatisasi pertanian cerdas yang dikembangkan Ilham melalui integrasi 3 pilar disiplin ilmu:
1. Pilar Perangkat Lunak (Software Engineering): Merancang dashboard web berbasis Next.js dan Firebase untuk mengelola data sensor secara real-time, penyimpanan data tambahan menggunakan Supabase, serta hosting web di Vercel dan deployment file Python Machine Learning di HuggingFace.
2. Pilar Machine Learning: Mengembangkan model Computer Vision menggunakan Python dan Jupyter Notebook untuk mengidentifikasi penyakit/status kesehatan tanaman cabai secara dini bagi petani.
3. Pilar Robotika (Simulasi 3D): Simulasi pergerakan robot secara digital menggunakan 3D Modeling & Texturing presisi skala, Rigging Armature (menghubungkan engsel tulang ke model 3D), dan Constraints (pembatasan sudut pergerakan sendi hingga 180°) agar simulasi berjalan akurat tanpa perlu objek fisik langsung.
Tautan Website : https://io-tani-project.vercel.app/
`,
    metadata: { category: "projects", project: "iotani" },
  }),

  // --- FAQ & KONTAK ---
  new Document({
    pageContent: `Informasi Tambahan, Keunggulan, & Kontak Ilham Bonardo Marpaung:
Kelebihan Utama: Memiliki keunggulan unik di persimpangan hardware (IoT) dan software (Web, DevOps, & ML). Sangat kuat di sisi Backend (Golang, Docker, CI/CD) namun tetap fleksibel mengerjakan Frontend.
Ekspektasi Gaji: Terbuka untuk didiskusikan sesuai kualifikasi, tanggung jawab, dan standar perusahaan.
Tautan LinkedIn: https://www.linkedin.com/in/ilham-bonardo-marpaung-98875a33a
Tautan Portofolio Web: https://ilhambonardoo.vercel.app/
Tautan Github : https://github.com/ilhambonardoo
Tautan Instagram : https://instagram.com/ilhambonardoo
Tautan Whatsapp : https://wa.me/6285884153418`,
    metadata: { category: "faq" },
  }),
];
