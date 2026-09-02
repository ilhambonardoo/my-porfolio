import { NextResponse } from "next/server";
import { ingestProfileData } from "@/src/lib/ingest";

export async function GET() {
  try {
    await ingestProfileData();
    return NextResponse.json({
      message: "Data profil Ilham berhasil dimasukkan ke Supabase pgvector!",
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data ke Supabase" },
      { status: 500 },
    );
  }
}
