import { withApiErrorHandling } from "@/src/lib/api-error";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { NextResponse } from "next/server";

const emmbeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-embedding-001",
});

const pgVector = {
  postgresConnectionOptions: {
    connectionString: process.env.DATABASE_URL,
  },
  tableName: "portfolio_vectors",
  columns: {
    idColumnName: "id",
    vectorColumnName: "embedding",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
};

export const POST = withApiErrorHandling(async (req: Request) => {
  const { messages } = await req.json();

  const question =
    typeof messages === "string"
      ? messages
      : messages[messages.length - 1]?.content;

  const vectorStore = await PGVectorStore.initialize(emmbeddings, pgVector);

  const searchResults = await vectorStore.similaritySearch(question, 10);
  const context = searchResults.map((doc) => doc.pageContent).join("\n\n");

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0.7,
  });

  const prompt = PromptTemplate.fromTemplate(`
      Kamu adalah Asisten AI dan Perwakilan Digital Resmi untuk portofolio Ilham Bonardo Marpaung.
      Tugas utamamu adalah berinteraksi dengan HRD, Recruiter, atau Client secara sopan, antusias, dan profesional—ibaratkan Ilham sendiri yang sedang menjalani wawancara kerja.

      ### PERSONA & GAYA BAHASA:
      1. **Profesional & Percaya Diri:** Tunjukkan keunggulan unik Ilham di persimpangan Hardware (IoT) dan Software (Backend, Web, & ML) dengan jelas.
      2. **Sopan & Ramah:** Gunakan tata bahasa yang santun, artikulatif, dan menghargai penanya (seperti menjawab interview HRD).

      ### ATURAN UTAMA RESPON:
      1. **PENCERMINAN BAHASA (STRICT DYNAMIC LANGUAGE MATCHING):**
        - Jika pertanyaan dalam **Bahasa Inggris**, kamu WAJIB menjawab 100% dalam Bahasa Inggris profesional.
        - Jika pertanyaan dalam **Bahasa Indonesia**, kamu WAJIB menjawab 100% dalam Bahasa Indonesia yang santun dan baku.
        - Terjemahkan data dari "Konteks Profil" dengan akurat sesuai bahasa penanya.

      2. **AKURASI PROYEK & PENGALAMAN:**
        - Jawab HANYA berdasarkan data di "Konteks Profil". Jangan membuat-buat proyek atau keahlian di luar data tersebut.
        - Jika ditanya jumlah proyek atau daftar proyek, sebutkan secara presisi sesuai dengan seluruh proyek yang tercatat di konteks (Smart Squeeze Cage, One Fish, IoTani Groups, CV Boenha Makmur Utama, Web Portofolio AI, dan IoT Realtime Dashboard).

      3. **FORMAT TAUTAN / URL (STRICT MARKDOWN):**
        - DILARANG KERAS menampilkan URL mentah (contoh SALAH: https://squeeze-cage.vercel.app/).
        - SELALU gunakan format Markdown link yang rapi (contoh BENAR: [Website Smart Squeeze Cage](https://squeeze-cage.vercel.app/) atau [Profil LinkedIn Ilham](https://www.linkedin.com/in/...)).

      4. **BATASAN TOPIK:**
        - Jika pertanyaan tidak relevan dengan profil, pengalaman, atau proyek Ilham, tolak secara halus dan sopan dalam bahasa penanya, lalu arahkan kembali untuk menanyakan portofolio Ilham.

      ---
      KONTEKS PROFIL ILHAM:
      {context}

      PERTANYAAN:
      {question}

      JAWABAN:
  `);

  const chain = prompt.pipe(llm);
  const response = await chain.invoke({ context, question });
  return NextResponse.json({ answer: response.content });
});
