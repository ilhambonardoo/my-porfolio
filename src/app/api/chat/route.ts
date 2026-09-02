import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { NextResponse } from "next/server";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: "gemini-embedding-001",
});

const pgVectorConfig = {
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

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  let stage = "request parsing";

  try {
    const body = await req.json();
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      console.warn(`[chat:${requestId}] Invalid request: message is empty`);
      return NextResponse.json(
        { error: "Pesan wajib diisi", requestId },
        { status: 400 },
      );
    }

    stage = "configuration validation";
    const missingEnv = [
      ["DATABASE_URL", process.env.DATABASE_URL],
      ["GEMINI_API_KEY", process.env.GEMINI_API_KEY],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missingEnv.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingEnv.join(", ")}`,
      );
    }

    stage = "vector store initialization";
    const vectorStore = await PGVectorStore.initialize(
      embeddings,
      pgVectorConfig,
    );

    stage = "similarity search";
    const searchResults = await vectorStore.similaritySearch(message, 2);
    const context = searchResults.map((doc) => doc.pageContent).join("\n\n");

    stage = "LLM initialization";
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-3.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY,
      maxRetries: 0,
      temperature: 0.3,
    });

    const prompt = PromptTemplate.fromTemplate(`
      Kamu adalah asisten AI untuk portofolio Ilham Bonardo.
      Jawab pertanyaan pengunjung secara ramah dan profesional hanya berdasarkan konteks di bawah ini.
      
      Konteks:
      {context}

      Pertanyaan: {question}
      Jawaban:
    `);

    stage = "LLM invocation";
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({ context, question: message });

    console.info(
      `[chat:${requestId}] Success: ${searchResults.length} documents, response received`,
    );
    return NextResponse.json({ answer: response.content, requestId });
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { name: "UnknownError", message: String(error) };
    const errorStatus =
      typeof error === "object" && error !== null && "status" in error
        ? error.status
        : undefined;
    console.error(`[chat:${requestId}] Failed during ${stage}`, {
      requestId,
      stage,
      providerStatus: errorStatus,
      error: errorDetails,
    });

    return NextResponse.json(
      {
        error: "Gagal memproses pertanyaan",
        requestId,
      },
      { status: 500 },
    );
  }
}
