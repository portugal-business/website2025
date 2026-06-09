"use server";
// Server Actions, Pièces client (upload portail + revue consultant).
// EXCLU du build front jusqu'à la migration.
import { revalidatePath } from "next/cache";
import { reviewClientFileSchema, uploadClientFileSchema } from "@/platform/lib/validation";
import { createClient } from "@/platform/supabase/server";

/** Le client enregistre une pièce déposée (le binaire est uploadé au bucket
 *  `client-files` sous <org_id>/<mission_id>/… côté client, puis on persiste le path). */
export async function recordClientFileUpload(input: unknown) {
  const data = uploadClientFileSchema.parse(input);
  const sb = await createClient();
  const { error } = await sb
    .from("client_files")
    .update({
      status: "uploaded",
      file_name: data.fileName,
      storage_path: data.storagePath,
      uploaded_at: new Date().toISOString(),
    })
    .eq("id", data.fileId);
  if (error) throw error;
  revalidatePath("/portal/pieces");
}

/** Le consultant valide ou refuse une pièce reçue. */
export async function reviewClientFile(input: unknown) {
  const data = reviewClientFileSchema.parse(input);
  const sb = await createClient();
  const { error } = await sb
    .from("client_files")
    .update({ status: data.status })
    .eq("id", data.fileId);
  if (error) throw error;
  revalidatePath("/app/missions");
}
