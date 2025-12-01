import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { MainNav } from "@/components/MainNav";
import { CategoryTopper } from "@/components/CategoryTopper";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { ResponsiveSection } from "@/components/layout/ResponsiveSection";

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

  const currentUrl = `https://devmentorhub.com/programs${category ? `/${category}` : ''}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${title} Programs`,
    "description": description,
    "numberOfItems": filteredPrograms.length,
    "itemListElement": filteredPrograms.map((program, index) => ({
      "@type": "Course",
      "position": index + 1,
      "name": program.title,
      "description": program.description,
      "provider": {
        "@type": "Organization",
        "name": "Dev Mentor Hub",
        "url": "https://devmentorhub.com"
      },
      "educationalLevel": "Beginner to Advanced",
      "timeRequired": program.duration,
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": program.duration
      },
      "teaches": program.skills,
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "price": program.regularPrice,
        "priceCurrency": "INR"
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://devmentorhub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Programs",
        "item": "https://devmentorhub.com/programs"
      },
      ...(category ? [{
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": currentUrl
      }] : [])
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title} - Professional Developer Certification Programs | Dev Mentor Hub</title>
        <meta name="description" content={`${description}. Earn industry-recognized certifications with expert mentorship, hands-on projects, and career support. Join ${filteredPrograms.length}+ programs starting today.`} />
        <meta name="keywords" content={`${category || 'programming'} certification, ${category || 'developer'} courses, web development training, coding bootcamp, programming mentorship, ${title.toLowerCase()}, professional developer certification, tech career training, software development courses`} />
        <meta property="og:title" content={`${title} - Professional Certification Programs | Dev Mentor Hub`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://devmentorhub.com/og-programs.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Dev Mentor Hub`} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen w-full">
        <header role="banner">
          <MainNav />
          <CategoryTopper />
        </header>
        
        <main role="main" className="w-full">
          <ResponsiveSection spacing="sm">
            <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="flex items-center gap-2">
                <a href="/programs" className={!category ? "text-primary font-medium" : "hover:text-primary transition-colors"}>Programs</a>
              </li>
              {category && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <li className="text-primary font-medium" aria-current="page">{title}</li>
                </>
              )}
            </ol>
          </nav>
          </ResponsiveSection>
          
          <ResponsiveSection spacing="md">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          </ResponsiveSection>
          
          <ResponsiveSection spacing="lg">
            <ProgramsSection programs={filteredPrograms} />
          </ResponsiveSection>
        </main>
        
        <footer role="contentinfo">
          <SocialMediaFooter />
        </footer>
      </div>
    </>
  );
};

export default Programs;