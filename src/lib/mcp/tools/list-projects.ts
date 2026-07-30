import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_projects",
  title: "List gallery projects",
  description:
    "List projects from the Dev Mentor Hub project gallery, optionally filtered by category, difficulty or search text.",
  inputSchema: {
    search: z.string().trim().optional().describe("Text to match in project title or description."),
    category: z.string().trim().optional().describe("Project category filter."),
    difficulty: z
      .enum(["beginner", "intermediate", "advanced"])
      .optional()
      .describe("Difficulty filter."),
    limit: z.number().int().min(1).max(50).default(10).describe("Maximum projects to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ search, category, difficulty, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("projects")
      .select("id,title,description,category,difficulty,tech_stack,demo_url,github_url,likes_count,views_count,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);

    if (category) query = query.eq("category", category);
    if (difficulty) query = query.eq("difficulty", difficulty);
    if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { projects: data ?? [] },
    };
  },
});
