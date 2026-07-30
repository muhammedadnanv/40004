import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_project",
  title: "Submit a project",
  description: "Submit a new project to the Dev Mentor Hub gallery on behalf of the signed-in user.",
  inputSchema: {
    title: z.string().trim().min(3).max(120).describe("Project title."),
    description: z.string().trim().min(10).max(2000).describe("Project description."),
    category: z.string().trim().min(2).max(60).describe("Project category, e.g. 'Web Development'."),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).describe("Project difficulty."),
    tech_stack: z.array(z.string().trim().min(1)).max(20).default([]).describe("Technologies used."),
    demo_url: z.string().url().optional().describe("Live demo URL."),
    github_url: z.string().url().optional().describe("Source repository URL."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: ctx.getUserId(),
        title: input.title,
        description: input.description,
        category: input.category,
        difficulty: input.difficulty,
        tech_stack: input.tech_stack ?? [],
        demo_url: input.demo_url ?? null,
        github_url: input.github_url ?? null,
      })
      .select("id,title,status,created_at");

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}) }],
      structuredContent: { project: data?.[0] ?? null },
    };
  },
});
