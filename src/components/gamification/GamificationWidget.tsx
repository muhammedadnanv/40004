import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Star, Award } from "lucide-react";

export const GamificationWidget = () => {
  const [userStats, setUserStats] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user points
      const { data: points } = await supabase
        .from("user_points")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // Fetch user badges
      const { data: userBadges } = await supabase
        .from("user_badges")
        .select(`
          *,
          badges (*)
        `)
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });

      setUserStats(points || { total_points: 0, current_level: 1 });
      setBadges(userBadges || []);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  const pointsToNextLevel = (userStats?.current_level || 1) * 100;
  const currentLevelPoints = ((userStats?.current_level || 1) - 1) * 100;
  const progress = ((userStats?.total_points || 0) - currentLevelPoints) / 100 * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-primary" size={20} />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Level {userStats?.current_level || 1}</span>
              <span className="text-sm text-muted-foreground">
                {userStats?.total_points || 0} / {pointsToNextLevel} XP
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {userStats?.total_points || 0}
              </div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {userStats?.current_level || 1}
              </div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {badges.length}
              </div>
              <div className="text-xs text-muted-foreground">Badges</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary" size={20} />
              Recent Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.slice(0, 6).map((badge) => (
                <Badge
                  key={badge.id}
                  variant="secondary"
                  className="flex items-center gap-1 text-sm"
                >
                  <span>{badge.badges.icon}</span>
                  {badge.badges.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
