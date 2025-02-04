import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

const successStoriesByProgram = {
  "Frontend Development": [
    {
      name: "Arun Kumar",
      program: "Frontend Development",
      quote: "Coming from Trivandrum, I was looking for structured guidance in frontend development. The weekly React and TypeScript assignments helped me secure a position at a leading tech company in Technopark!"
    },
    {
      name: "Lakshmi Menon",
      program: "Frontend Development",
      quote: "As a self-taught developer from Kochi, this program gave me the confidence to build complex web applications. The mentor's feedback was invaluable in improving my coding practices."
    },
    {
      name: "Rajesh Nair",
      program: "Frontend Development",
      quote: "The hands-on approach to learning React and modern frontend tools helped me transition from a traditional developer role to a specialist frontend position."
    },
    {
      name: "Meera Krishnan",
      program: "Frontend Development",
      quote: "Being from Palakkad, the remote mentorship program was perfect. I learned the latest frontend technologies while building real-world projects."
    },
    {
      name: "Thomas Joseph",
      program: "Frontend Development",
      quote: "The program's focus on practical projects helped me master responsive design and modern JavaScript frameworks. Now I work remotely for international clients!"
    }
  ],
  "Low-Code Development": [
    {
      name: "Vishnu Prasad",
      program: "Low-Code Development",
      quote: "After completing my studies in Calicut University, this program helped me transition into low-code development. Now I'm building applications efficiently for clients across Kerala."
    },
    {
      name: "Anjali Nair",
      program: "Low-Code Development",
      quote: "Being from Thrissur, I needed a flexible learning approach. The practical assignments taught me how to leverage low-code platforms effectively for local businesses."
    },
    {
      name: "Sanjay Menon",
      program: "Low-Code Development",
      quote: "The program opened my eyes to the possibilities of rapid application development. I now help businesses automate their workflows efficiently."
    },
    {
      name: "Priya Varma",
      program: "Low-Code Development",
      quote: "Coming from a non-technical background, low-code development was perfect for me. Now I create custom solutions for my consulting clients."
    },
    {
      name: "Abdul Rahman",
      program: "Low-Code Development",
      quote: "The mentorship helped me understand enterprise-level low-code development. I now lead digital transformation projects in my organization."
    }
  ],
  "No-Code Development": [
    {
      name: "Mohammed Ashiq",
      program: "No-Code Development",
      quote: "As a business owner from Malappuram, this program was exactly what I needed. I can now create custom applications for my retail business without writing code!"
    },
    {
      name: "Priya Raj",
      program: "No-Code Development",
      quote: "Coming from Kollam, I was skeptical about no-code development. Now I'm successfully running a consultancy helping local businesses automate their processes."
    },
    {
      name: "Deepak Kumar",
      program: "No-Code Development",
      quote: "The program taught me how to create sophisticated workflows without coding. I've automated numerous processes in my family business."
    },
    {
      name: "Fathima Beevi",
      program: "No-Code Development",
      quote: "As an entrepreneur, learning no-code development has been transformative. I can now quickly prototype and launch new business ideas."
    },
    {
      name: "George Thomas",
      program: "No-Code Development",
      quote: "The practical approach to no-code tools helped me create efficient solutions for my clients. The mentorship was invaluable in understanding best practices."
    }
  ],
  "Full Stack API Development": [
    {
      name: "Anoop Krishnan",
      program: "Full Stack API Development",
      quote: "The comprehensive coverage of API design helped me land a job at an IT park in Kochi. The real-world projects were particularly relevant to Kerala's growing tech ecosystem."
    },
    {
      name: "Sreelakshmi K",
      program: "Full Stack API Development",
      quote: "Being from Kannur, remote learning was crucial for me. This program's practical approach helped me master full-stack development while staying connected with Kerala's tech community."
    },
    {
      name: "Rahul Dev",
      program: "Full Stack API Development",
      quote: "The program's focus on modern API development practices helped me transition to a senior developer role. The mentorship was exceptional."
    },
    {
      name: "Divya Menon",
      program: "Full Stack API Development",
      quote: "Learning full-stack development opened new opportunities. I now work with startups across India, building scalable applications."
    },
    {
      name: "Santhosh Kumar",
      program: "Full Stack API Development",
      quote: "The hands-on experience with real API projects was invaluable. I'm now confidently building complex backend systems for enterprise clients."
    }
  ],
  "UX/UI Development": [
    {
      name: "Priya Thomas",
      program: "UX/UI Development",
      quote: "The mentorship program helped me transition from graphic design to UX/UI. Now I'm creating intuitive interfaces for leading tech companies in Kerala!"
    },
    {
      name: "Rahul Menon",
      program: "UX/UI Development",
      quote: "Coming from Kochi, I learned how to create user-centered designs through real projects. The mentor feedback was invaluable for my portfolio."
    },
    {
      name: "Anjana Krishna",
      program: "UX/UI Development",
      quote: "The program's focus on user research and prototyping helped me develop a strong foundation in UX design principles."
    },
    {
      name: "Vishnu Raj",
      program: "UX/UI Development",
      quote: "Learning UX/UI development transformed my approach to design. I now create more meaningful and effective user experiences."
    },
    {
      name: "Sara John",
      program: "UX/UI Development",
      quote: "The practical projects helped me build a strong portfolio. I now work with clients globally, creating impactful digital experiences."
    }
  ],
  "Graphic Designing": [
    {
      name: "Sneha Krishnan",
      program: "Graphic Designing",
      quote: "As a freelancer from Thrissur, this program helped me master professional design tools and techniques. Now I work with clients worldwide!"
    },
    {
      name: "Arun Nair",
      program: "Graphic Designing",
      quote: "The hands-on projects and mentor guidance helped me build a strong portfolio. I now run my own design studio in Trivandrum."
    },
    {
      name: "Maya Mohan",
      program: "Graphic Designing",
      quote: "The program's comprehensive coverage of design principles and tools helped me develop my unique style and attract quality clients."
    },
    {
      name: "Karthik Menon",
      program: "Graphic Designing",
      quote: "Learning professional design techniques transformed my freelance career. I now specialize in branding for tech startups."
    },
    {
      name: "Reshma Rajan",
      program: "Graphic Designing",
      quote: "The mentorship helped me understand the business side of design. I now successfully manage my own design consultancy."
    }
  ],
  "Video Editing": [
    {
      name: "Vishnu Raj",
      program: "Video Editing",
      quote: "From Kozhikode, I learned professional video editing through real projects. Now I create content for major YouTube channels!"
    },
    {
      name: "Maya Menon",
      program: "Video Editing",
      quote: "The program helped me master video editing tools and storytelling. I now work with leading production houses in Kerala."
    },
    {
      name: "Arjun Mohan",
      program: "Video Editing",
      quote: "Learning advanced video editing techniques opened new opportunities. I now create content for corporate clients across India."
    },
    {
      name: "Lakshmi Priya",
      program: "Video Editing",
      quote: "The practical approach to video editing helped me develop my skills rapidly. I now run a successful YouTube channel."
    },
    {
      name: "Sanjay Kumar",
      program: "Video Editing",
      quote: "The program's focus on storytelling through video helped me transition from amateur to professional editing."
    }
  ],
  "Prompt Engineering": [
    {
      name: "Arjun Kumar",
      program: "Prompt Engineering",
      quote: "Being from Palakkad, I learned how to create effective AI prompts. Now I help businesses implement AI solutions efficiently."
    },
    {
      name: "Lakshmi Priya",
      program: "Prompt Engineering",
      quote: "The practical approach to prompt engineering helped me understand AI capabilities. I now consult for tech startups across India."
    },
    {
      name: "Deepak Nair",
      program: "Prompt Engineering",
      quote: "Learning prompt engineering opened new possibilities in AI implementation. I now help companies optimize their AI workflows."
    },
    {
      name: "Anjali Menon",
      program: "Prompt Engineering",
      quote: "The program helped me master the art of crafting effective prompts. I now work with AI development teams globally."
    },
    {
      name: "Rahul Krishna",
      program: "Prompt Engineering",
      quote: "Understanding prompt engineering has been crucial for my career in AI. I now lead AI implementation projects for enterprises."
    }
  ]
};

const StoryCard = ({ story, index }: { story: { name: string; program: string; quote: string }, index: number }) => (
  <motion.div
    key={`${story.name}-${index}`}
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

      {Object.entries(successStoriesByProgram).map(([program, stories]) => (
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
              <StoryCard key={index} story={story} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
