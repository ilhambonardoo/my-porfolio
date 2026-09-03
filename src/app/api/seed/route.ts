import { withApiErrorHandling } from "@/src/lib/api-error";
import { ingestProfileData } from "@/src/lib/ingest";
import { NextResponse } from "next/server";

export const GET = withApiErrorHandling(async () => {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not Found", { status: 404 });
  }
  await ingestProfileData();
  return NextResponse.json({
    message: "Data profil Ilham berhasil dimasukkan kedalam vector",
  });
});
