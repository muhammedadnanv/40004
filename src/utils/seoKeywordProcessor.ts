import { supabase } from "@/integrations/supabase/client";

interface KeywordMetrics {
  totalKeywords: number;
  averageRelevance: number;
  topCategories: { category: string; count: number }[];
}

export const fetchKeywordMetrics = async (): Promise<KeywordMetrics> => {
  try {
    // Get total keywords
    const { count: totalKeywords } = await supabase
      .from('seo_keywords')
      .select('*', { count: 'exact', head: true });

    // Get average relevance
    const { data: relevanceData } = await supabase
      .from('seo_keywords')
      .select('relevance_score');
    
    const averageRelevance = relevanceData?.reduce((acc, curr) => acc + Number(curr.relevance_score), 0) 
      / (relevanceData?.length || 1);

    // Get top categories
    const { data: categoryData } = await supabase
      .from('seo_keywords')
      .select('category')
      .order('created_at', { ascending: false })
      .limit(100);

    const categoryCount = categoryData?.reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const topCategories = Object.entries(categoryCount || {})
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalKeywords: totalKeywords || 0,
      averageRelevance: Number(averageRelevance.toFixed(2)) || 0,
      topCategories
    };
  } catch (error) {
    console.error('Error fetching keyword metrics:', error);
    return {
      totalKeywords: 0,
      averageRelevance: 0,
      topCategories: []
    };
  }
};

export const fetchLatestKeywords = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('seo_keywords')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching latest keywords:', error);
    return [];
  }
};