import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import submitProjectTool from "./tools/submit-project";
import getMyProgressTool from "./tools/get-my-progress";
import getLeaderboardTool from "./tools/get-leaderboard";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "dev-mentor-hub-39",
  title: "dev-mentor-hub-39",
  version: "0.1.0",
  instructions:
    "Tools for Dev Mentor Hub, a mentorship platform for developers. Browse and submit gallery projects, check the signed-in user's points, badges and submissions, and read the leaderboard. All tools act as the authenticated user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProjectsTool, submitProjectTool, getMyProgressTool, getLeaderboardTool],
});
