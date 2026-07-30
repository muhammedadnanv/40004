import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_progress",
  title: "Get my learning progress",
  description:
    "Get the signed-in user's Dev Mentor Hub profile, points, level, earned badges and submitted projects.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId();

    const [profile, points, badges, projects] = await Promise.all([
      supabase.from("profiles").select("id,full_name,email,created_at").eq("id", userId).maybeSingle(),
      supabase.from("user_points").select("total_points,current_level").eq("user_id", userId).maybeSingle(),
      supabase.from("user_badges").select("*").eq("user_id", userId),
      supabase
        .from("projects")
        .select("id,title,status,likes_count,views_count,created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    ]);

    const firstError = [profile, points, badges, projects].find((r) => r.error)?.error;
    if (firstError) return { content: [{ type: "text", text: firstError.message }], isError: true };

    const result = {
      profile: profile.data ?? null,
      points: points.data ?? { total_points: 0, current_level: 1 },
      badges: badges.data ?? [],
      projects: projects.data ?? [],
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
});
