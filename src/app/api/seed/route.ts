import { withApiErrorHandling } from "@/src/lib/api-error";
import { ingestProfileData } from "@/src/lib/ingest";
import { NextResponse } from "next/server";

export const GET = withApiErrorHandling(async () => {
  await ingestProfileData();
  return NextResponse.json({
    message: "Data profil Ilham berhasil dimasukkan kedalam vector",
  });
});
