import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SuccessStory {
  id: string;
  name: string;
  program: string;
  quote: string;
}

const StoryCard = ({ story, index }: { story: SuccessStory, index: number }) => (
  <motion.div
    key={story.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="w-full"
  >
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center">
        <Quote className="w-8 h-8 mx-auto text-purple-400 mb-4 opacity-50" />
        <CardDescription className="text-base italic">"{story.quote}"</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-medium text-lg">{story.name}</h3>
        <p className="text-sm text-purple-600">{story.program}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const SuccessStoriesSection = () => {
  const [storiesByProgram, setStoriesByProgram] = useState<Record<string, SuccessStory[]>>({});

  useEffect(() => {
    // Initial fetch of success stories
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching success stories:', error);
        return;
      }

      // Group stories by program
      const grouped = (data || []).reduce((acc: Record<string, SuccessStory[]>, story) => {
        if (!acc[story.program]) {
          acc[story.program] = [];
        }
        if (acc[story.program].length < 5) { // Keep only 5 stories per program
          acc[story.program].push(story);
        }
        return acc;
      }, {});

      setStoriesByProgram(grouped);
    };

    fetchStories();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('success-stories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'success_stories'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchStories(); // Refetch all stories to maintain consistency
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Success Stories
      </motion.h2>

      {Object.entries(storiesByProgram).map(([program, stories]) => (
        <div key={program} className="mb-16 last:mb-0">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-light text-center mb-8 text-purple-600"
          >
            {program}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};