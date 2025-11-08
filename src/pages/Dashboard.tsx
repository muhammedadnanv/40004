import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GamificationWidget } from "@/components/gamification/GamificationWidget";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FolderKanban, History } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type PointsHistory = Database["public"]["Tables"]["points_history"]["Row"];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      fetchUserData(user.id);
    }
    setLoading(false);
  };

  const fetchUserData = async (userId: string) => {
    // Fetch user projects
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // Fetch points history
    const { data: historyData } = await supabase
      .from("points_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    setProjects(projectsData || []);
    setPointsHistory(historyData || []);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Your Learning Journey</title>
        <meta name="description" content="Track your progress, view your projects, and see your achievements" />
      </Helmet>

      <main className="min-h-screen bg-background py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <LayoutDashboard className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="projects" className="gap-1 sm:gap-2 py-3 text-sm sm:text-base">
                    <FolderKanban className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden xs:inline">My Projects</span>
                    <span className="xs:hidden">Projects</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-1 sm:gap-2 py-3 text-sm sm:text-base">
                    <History className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden xs:inline">Points History</span>
                    <span className="xs:hidden">History</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {projects.length === 0 ? (
                         <div className="text-center py-6 sm:py-8 px-4">
                          <p className="text-sm sm:text-base text-muted-foreground mb-4">
                            You haven't submitted any projects yet
                          </p>
                          <Button asChild className="min-h-[48px] px-6">
                            <a href="/gallery">Submit Your First Project</a>
                          </Button>
                        </div>
                      ) : (
                         <div className="space-y-3">
                          {projects.map((project) => (
                            <div
                              key={project.id}
                              className="p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors touch-manipulation"
                            >
                              <h3 className="font-semibold mb-1 text-sm sm:text-base">{project.title}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex gap-3 sm:gap-4 mt-2">
                                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                                  <span>👁️</span>
                                  <span>{project.views_count}</span>
                                </span>
                                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                                  <span>❤️</span>
                                  <span>{project.likes_count}</span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {pointsHistory.length === 0 ? (
                        <p className="text-center py-6 sm:py-8 px-4 text-sm sm:text-base text-muted-foreground">
                          No activity yet. Start by submitting projects!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {pointsHistory.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between gap-3 p-3 sm:p-4 border rounded-lg touch-manipulation"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm sm:text-base truncate">{entry.description}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                  {new Date(entry.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="text-base sm:text-lg font-bold text-primary whitespace-nowrap flex-shrink-0">
                                +{entry.points} XP
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <GamificationWidget />
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
