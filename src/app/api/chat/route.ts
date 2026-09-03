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

  const prompt =
    PromptTemplate.fromTemplate(`Kamu adalah assistent Ai untuk portfolio Ilham Bonardo Marpaung.
        Jawab pertanyaan pengunjung secara sopan, ramah dan profesional ibaratkan kamu sedang diinterview oleh HRD. 
        Jika ditanyakan berapa projek yang sudah dibuat jawab sesuai dengan dokumentasi yang saya udah buat.
        Jawab sesuai konteks yang ada dibawah ini.

        Konteks:
        {context}

        Pertanyaan: {question}
        Jawaban:
    `);

  const chain = prompt.pipe(llm);
  const response = await chain.invoke({ context, question });
  return NextResponse.json({ answer: response.content });
});
