import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SuccessStory {
  id: string;
  name: string;
  program: string;
  quote: string;
  location?: string;
  client?: string;
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
        {story.location && (
          <p className="text-xs text-gray-500 mt-1">{story.location}</p>
        )}
        {story.client && (
          <p className="text-xs text-gray-600 mt-1">Client: {story.client}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Mock data for additional success stories from Kozhikode and Malappuram
const additionalMockStories: SuccessStory[] = [
  {
    id: "gcc-1",
    name: "Fathima K",
    program: "AI Prompt Engineering Mastery",
    quote: "The AI Prompt Engineering course helped me secure three clients from UAE for content optimization. Now I earn 3x my previous salary working remotely from Kozhikode.",
    location: "Kozhikode",
    client: "Tech Innovation LLC, Dubai"
  },
  {
    id: "gcc-2",
    name: "Anoop Krishnan",
    program: "AI + Supabase Integration",
    quote: "Built a custom CRM for a Saudi retail chain using the skills I learned. This program transformed me from a struggling developer to a sought-after consultant.",
    location: "Malappuram",
    client: "Al Rajhi Retail, Saudi Arabia"
  },
  {
    id: "gcc-3",
    name: "Priya Menon",
    program: "Frontend Development with Low-Code",
    quote: "Within three months of completing the course, I landed a long-term contract with a Qatar-based fintech. I can now support my family while working from my hometown.",
    location: "Kozhikode",
    client: "QatarPay Technologies"
  },
  {
    id: "gcc-4",
    name: "Mohammed Rafeek",
    program: "No-Code Development",
    quote: "Created a membership portal for a Kuwait hospitality group without writing a single line of code. The course paid for itself within the first project.",
    location: "Malappuram",
    client: "Alshaya Group, Kuwait"
  },
  {
    id: "gcc-5",
    name: "Arya Prasad",
    program: "AI Prompt Engineering Mastery",
    quote: "Specialized in AI-driven market research reports for Bahraini companies. My clients are amazed at how I transform their data into actionable insights.",
    location: "Kozhikode",
    client: "Bahrain FinTech Bay"
  },
  {
    id: "gcc-6",
    name: "Suhail Ahmed",
    program: "AI + Supabase Integration",
    quote: "Developed a property management system for a real estate developer in Oman. The technical skills and business understanding from this program were invaluable.",
    location: "Malappuram",
    client: "Al Mouj Properties, Oman"
  },
  {
    id: "gcc-7",
    name: "Lakshmi Nair",
    program: "Frontend Development with Low-Code",
    quote: "Built interactive dashboards for a UAE government agency that previously paid foreign consultants 5x my rate. The low-code approach accelerated delivery by 60%.",
    location: "Kozhikode",
    client: "Smart Dubai Initiative"
  },
  {
    id: "gcc-8",
    name: "Arun Mohan",
    program: "No-Code Development",
    quote: "Created an internal HR portal for a Saudi conglomerate using no-code tools. They were so impressed that they've retained me for all their digital transformation projects.",
    location: "Malappuram",
    client: "SABIC, Saudi Arabia"
  },
  {
    id: "gcc-9",
    name: "Jasmine Banu",
    program: "AI Prompt Engineering Mastery",
    quote: "Specialized in generating AI-optimized product descriptions for Qatar's largest e-commerce platform. I'm now training their internal team while maintaining my freelance status.",
    location: "Kozhikode",
    client: "QatarBest Commerce"
  },
  {
    id: "gcc-10",
    name: "Vishnu Prasad",
    program: "AI + Supabase Integration",
    quote: "Built a custom analytics platform for a Kuwaiti oil company that needed to process millions of data points daily. The technical foundation from this program was crucial.",
    location: "Malappuram",
    client: "Kuwait Petroleum Corporation"
  },
  {
    id: "gcc-11",
    name: "Rahila Thahir",
    program: "Frontend Development with Low-Code",
    quote: "Designed a bilingual user interface for a Bahraini healthcare provider. The responsive templates covered in the course made it possible to deliver on a tight deadline.",
    location: "Kozhikode",
    client: "Royal Bahrain Hospital"
  },
  {
    id: "gcc-12",
    name: "Nithin Kumar",
    program: "No-Code Development",
    quote: "Created a customer loyalty app for an Omani retail chain without coding expertise. This program gave me the confidence to pitch to larger clients in the GCC region.",
    location: "Malappuram",
    client: "Lulu Hypermarket, Oman"
  },
  {
    id: "gcc-13",
    name: "Sneha Kareem",
    program: "AI Prompt Engineering Mastery",
    quote: "Now I create AI-generated content strategies for a Dubai media group. Working remotely from Kozhikode while earning in dirhams has transformed my family's financial situation.",
    location: "Kozhikode",
    client: "Arabian Media Group, UAE"
  },
  {
    id: "gcc-14",
    name: "Anwar Sadiq",
    program: "AI + Supabase Integration",
    quote: "Implemented a secure data storage solution for a Saudi medical research institute. The technical skills from this program helped me overcome complex compliance requirements.",
    location: "Malappuram",
    client: "King Faisal Specialist Hospital, Saudi Arabia"
  },
  {
    id: "gcc-15",
    name: "Divya Menon",
    program: "Frontend Development with Low-Code",
    quote: "Developed a customer portal for a Qatari insurance company that needed a quick refresh before an investor presentation. The low-code approach saved the day!",
    location: "Kozhikode",
    client: "Qatar Insurance Company"
  },
  {
    id: "gcc-16",
    name: "Farhan Ali",
    program: "No-Code Development",
    quote: "Built a fleet management system for a Kuwaiti logistics company using only no-code tools. They were amazed that complex workflows could be implemented so affordably.",
    location: "Malappuram",
    client: "Agility Logistics, Kuwait"
  },
  {
    id: "gcc-17",
    name: "Meera Krishnan",
    program: "AI Prompt Engineering Mastery",
    quote: "I create AI-driven market reports for Bahraini investment firms, all from my home in Kozhikode. This program taught me how to add tremendous value without relocating.",
    location: "Kozhikode",
    client: "Mumtalakat Holding Company, Bahrain"
  },
  {
    id: "gcc-18",
    name: "Shameer Khan",
    program: "AI + Supabase Integration",
    quote: "Developed a real-time inventory system for an Omani supermarket chain. The technical architecture covered in the course was exactly what the client needed.",
    location: "Malappuram",
    client: "Nesto Hypermarkets, Oman"
  },
  {
    id: "gcc-19",
    name: "Roshni Menon",
    program: "Frontend Development with Low-Code",
    quote: "Created an investor dashboard for a UAE wealth management firm. The responsive components we learned in the course allowed me to deliver a premium experience.",
    location: "Kozhikode",
    client: "Emirates NBD Asset Management"
  },
  {
    id: "gcc-20",
    name: "Abdul Razak",
    program: "No-Code Development",
    quote: "Implemented a no-code booking system for a Saudi hotel chain that replaced their expensive legacy software. This program gave me the expertise to compete with established agencies.",
    location: "Malappuram",
    client: "Dur Hospitality, Saudi Arabia"
  }
];

export const SuccessStoriesSection = () => {
  const [storiesByProgram, setStoriesByProgram] = useState<Record<string, SuccessStory[]>>({});
  const [localStories, setLocalStories] = useState<Record<string, SuccessStory[]>>({
    "GCC Freelancers": additionalMockStories
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeLocation, setActiveLocation] = useState<string>("all");
  const storiesPerPage = 6;

  const getFilteredAndPaginatedStories = (stories: SuccessStory[], page: number) => {
    let filteredStories = stories;
    
    if (activeLocation !== "all") {
      filteredStories = stories.filter(story => story.location === activeLocation);
    }
    
    const startIndex = (page - 1) * storiesPerPage;
    const endIndex = startIndex + storiesPerPage;
    
    return {
      paginatedStories: filteredStories.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredStories.length / storiesPerPage),
      totalStories: filteredStories.length
    };
  };

  const getLocations = (stories: SuccessStory[]) => {
    const locations = stories.map(story => story.location).filter(Boolean);
    return Array.from(new Set(locations as string[]));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeLocation]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching success stories:', error);
        return;
      }

      const grouped = (data || []).reduce((acc: Record<string, SuccessStory[]>, story) => {
        if (!acc[story.program]) {
          acc[story.program] = [];
        }
        acc[story.program].push(story);
        return acc;
      }, {});

      setStoriesByProgram(grouped);
    };

    fetchStories();

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
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const { 
    paginatedStories: currentGccStories, 
    totalPages,
    totalStories 
  } = getFilteredAndPaginatedStories(localStories["GCC Freelancers"], currentPage);
  
  const gccLocations = getLocations(localStories["GCC Freelancers"]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-extralight text-center mb-10 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Success Stories
      </motion.h2>

      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-light text-center mb-6 text-purple-600"
        >
          GCC Freelancers from Kerala
        </motion.h3>

        <div className="flex justify-center mb-8">
          <Tabs 
            defaultValue="all" 
            value={activeLocation}
            onValueChange={setActiveLocation}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="all">All Locations</TabsTrigger>
              <TabsTrigger value="Kozhikode">Kozhikode</TabsTrigger>
              <TabsTrigger value="Malappuram">Malappuram</TabsTrigger>
            </TabsList>
            
            <div className="text-center text-sm text-gray-500 mb-4">
              Showing {currentGccStories.length} of {totalStories} stories
            </div>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentGccStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                    }} 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    }} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {Object.entries(storiesByProgram).map(([program, stories]) => {
        const { 
          paginatedStories: currentProgramStories, 
          totalPages: programTotalPages 
        } = getFilteredAndPaginatedStories(stories, 1);
        
        return (
          <div key={program} className="mb-16 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-light text-center mb-6 text-purple-600"
            >
              {program}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProgramStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
            
            {programTotalPages > 1 && (
              <div className="mt-8 text-center">
                <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View All {program} Stories
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
