import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Programs = () => {
  const { category } = useParams();
  
  const getCategoryTitle = (cat: string | undefined) => {
    switch (cat) {
      case 'frontend':
        return 'Frontend Development';
      case 'fullstack':
        return 'Full Stack Development';
      case 'lowcode':
        return 'Low-Code Development';
      case 'nocode':
        return 'No-Code Development';
      case 'manychat':
        return 'ManyChat Automation';
      default:
        return 'All Programs';
    }
  };

  const getCategoryDescription = (cat: string | undefined) => {
    switch (cat) {
      case 'frontend':
        return 'Master modern frontend technologies including React, TypeScript, and responsive design principles';
      case 'fullstack':
        return 'Learn both frontend and backend development with comprehensive full-stack training';
      case 'lowcode':
        return 'Build applications faster with low-code platforms and visual development tools';
      case 'nocode':
        return 'Create powerful applications without writing code using no-code platforms';
      case 'manychat':
        return 'Master chatbot automation and customer engagement with ManyChat';
      default:
        return 'Explore our comprehensive range of development programs designed for all skill levels';
    }
  };

  // Filter programs based on category
  const allPrograms = [
    {
      title: "Frontend React Mastery",
      description: "Deep dive into React ecosystem and modern frontend development",
      duration: "8 weeks",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      category: "frontend",
      regularPrice: 12000
    },
    {
      title: "Full Stack Web Development",
      description: "Master both frontend and backend with React, Node.js, and databases",
      duration: "12 weeks", 
      skills: ["React", "Node.js", "MongoDB", "Express"],
      category: "fullstack",
      regularPrice: 15000
    },
    {
      title: "Low-Code Development Mastery",
      description: "Build applications faster with low-code platforms and tools",
      duration: "6 weeks",
      skills: ["Bubble.io", "Webflow", "Zapier", "Airtable"],
      category: "lowcode",
      regularPrice: 10000
    },
    {
      title: "No-Code Application Builder",
      description: "Create powerful apps without writing code using visual platforms",
      duration: "4 weeks",
      skills: ["Glide", "Adalo", "FlutterFlow", "Figma"],
      category: "nocode",
      regularPrice: 8000
    },
    {
      title: "ManyChat Automation Expert",
      description: "Master chatbot creation and customer engagement automation",
      duration: "3 weeks",
      skills: ["ManyChat", "Facebook Messenger", "Instagram DM", "SMS Marketing"],
      category: "manychat",
      regularPrice: 6000
    }
  ];

  const filteredPrograms = category ? allPrograms.filter(p => p.category === category) : allPrograms;
  const title = getCategoryTitle(category);
  const description = getCategoryDescription(category);

  return (
    <>
      <Helmet>
        <title>{title} - Dev Mentor Hub</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${category || 'programming'} courses, web development training, coding mentorship, ${title.toLowerCase()}`} />
        <meta property="og:title" content={`${title} - Dev Mentor Hub`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://devmentorhub.com/programs${category ? `/${category}` : ''}`} />
      </Helmet>
      
      <div className="min-h-screen">
        <header>
          <MainNav />
          <CategoryTopper />
        </header>
        
        <main>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          </section>
          
          <ProgramsSection programs={filteredPrograms} />
        </main>
        
        <footer>
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Programs;