import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GamificationWidget } from "@/components/gamification/GamificationWidget";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Trophy, FolderKanban, History } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [pointsHistory, setPointsHistory] = useState<any[]>([]);

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

      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard size={32} className="text-primary" />
            <h1 className="text-4xl font-bold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="projects" className="gap-2">
                    <FolderKanban size={16} />
                    My Projects
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2">
                    <History size={16} />
                    Points History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {projects.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            You haven't submitted any projects yet
                          </p>
                          <Button asChild>
                            <a href="/gallery">Submit Your First Project</a>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {projects.map((project) => (
                            <div
                              key={project.id}
                              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <h3 className="font-semibold mb-1">{project.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  👁️ {project.views_count}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ❤️ {project.likes_count}
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
                        <p className="text-center py-8 text-muted-foreground">
                          No activity yet. Start by submitting projects!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {pointsHistory.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{entry.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(entry.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="text-lg font-bold text-primary">
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

            <div className="space-y-6">
              <GamificationWidget />
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
