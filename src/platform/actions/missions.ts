"use server";
// Server Actions, Tracker des missions (consultant). EXCLU jusqu'à la migration.
import { revalidatePath } from "next/cache";
import { updateStepSchema } from "@/platform/lib/validation";
import { createClient } from "@/platform/supabase/server";

export async function updateMissionStep(input: unknown) {
  const data = updateStepSchema.parse(input);
  const sb = await createClient();
  const { error } = await sb
    .from("mission_steps")
    .update({
      status: data.status,
      done_at: data.status === "done" ? new Date().toISOString() : null,
    })
    .eq("mission_id", data.missionId)
    .eq("step_key", data.stepKey);
  if (error) throw error;

  // Mission terminée quand toutes les étapes sont done (calcul simplifié, à affiner en RPC)
  if (data.status === "done") {
    const { data: steps } = await sb
      .from("mission_steps")
      .select("status")
      .eq("mission_id", data.missionId);
    if (steps && steps.every((s: { status: string }) => s.status === "done")) {
      await sb
        .from("missions")
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("id", data.missionId);
    }
  }
  revalidatePath(`/app/missions/${data.missionId}`);
  revalidatePath("/portal");
}
