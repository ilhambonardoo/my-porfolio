import { NextResponse } from "next/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export async function GET() {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-001",
    });

    const result = await embeddings.embedQuery("Tes koneksi Gemini");

    return NextResponse.json({
      success: true,
      modelUsed: "gemini-embedding-001",
      vectorLength: result.length,
      sampleVector: result.slice(0, 5),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
