import { useQuery } from "@tanstack/react-query";
import { fetchKeywordMetrics, fetchLatestKeywords } from "@/utils/seoKeywordProcessor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SEOMetricsSection = () => {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['seoMetrics'],
    queryFn: fetchKeywordMetrics,
    refetchInterval: 60000 // Refetch every minute
  });

  const { data: latestKeywords, isLoading: keywordsLoading } = useQuery({
    queryKey: ['latestKeywords'],
    queryFn: () => fetchLatestKeywords(20),
    refetchInterval: 60000
  });

  const chartData = latestKeywords?.map(kw => ({
    keyword: kw.keyword,
    relevance: kw.relevance_score
  })) || [];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Total Keywords Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {metricsLoading ? "..." : metrics?.totalKeywords.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Average Relevance Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Relevance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {metricsLoading ? "..." : metrics?.averageRelevance}
              </p>
            </CardContent>
          </Card>

          {/* Top Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {metrics?.topCategories.map((cat, idx) => (
                  <Badge key={idx} variant="secondary">
                    {cat.category} ({cat.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Relevance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Keyword Relevance Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="keyword" tick={false} />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="relevance" 
                    stroke="#4A00E0" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Latest Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {keywordsLoading ? (
                    <p>Loading keywords...</p>
                  ) : (
                    latestKeywords?.map((kw, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <span>{kw.keyword}</span>
                        <Badge variant="outline">{kw.relevance_score}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};