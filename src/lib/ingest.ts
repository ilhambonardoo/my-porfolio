import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { profileDocs } from "./data/profileDocs";

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
  dimensions: 3072,
};

export async function ingestProfileData() {
  try {
    const vectors = await embeddings.embedDocuments(
      profileDocs.map((document) => document.pageContent),
    );

    if (
      vectors.length !== profileDocs.length ||
      vectors.some((vector) => vector.length === 0)
    ) {
      throw new Error(
        "Embedding Gemini kosong. Periksa GEMINI_API_KEY dan model gemini-embedding-001.",
      );
    }

    await PGVectorStore.fromDocuments(profileDocs, embeddings, pgVectorConfig);
    console.log("Data profil Ilham berhasil disimpan ke Vector DB!");
  } catch (error) {
    console.error("Gagal menyimpan data ke Vector DB:", error);
    throw error;
  }
}
