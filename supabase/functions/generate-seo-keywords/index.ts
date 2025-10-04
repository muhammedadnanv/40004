
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Main categories for keyword generation
const categories = [
  'development',
  'design',
  'career',
  'technology',
  'programming',
  'mentorship',
  'learning',
  'projects',
  'certification',
  'beginner',
  'guidance',
  'portfolio',
  'questions',
  'transactional'
]

// Keyword patterns for each category with high search volume and low competition focus
const keywordPatterns = {
  development: [
    'learn {technology} with mentor',
    '{technology} certification with guidance',
    '{technology} projects for beginners',
    '{technology} mentorship program',
    'professional {technology} development support',
    '{technology} career guidance',
    '{technology} best practices with mentor',
    '{technology} expert mentoring',
    'how to build with {technology} step by step',
    '{technology} portfolio projects with mentor',
    '{technology} project ideas for beginners',
    '{technology} for beginners with support',
    '{technology} advanced techniques with mentor',
    'mastering {technology} with guidance',
    '{technology} real-world applications tutorial',
    'learn {technology} fast with mentor',
    'affordable {technology} mentorship',
    'best {technology} mentors online',
    '{technology} guided learning path',
    '{technology} mentor near me'
  ],
  design: [
    'UI/UX {designType} mentorship',
    '{designType} portfolio with mentor feedback',
    'professional {designType} guidance',
    '{designType} certification with mentor',
    '{designType} mentorship program',
    'learn {designType} with expert feedback',
    '{designType} career mentor',
    '{designType} projects with guidance',
    '{designType} best practices from experts',
    '{designType} tools tutorial with mentor',
    'mastering {designType} with professional help',
    '{designType} for beginners step by step',
    '{designType} career path mentoring',
    '{designType} tips from professionals',
    '{designType} with mentor guidance',
    'affordable {designType} mentorship',
    '{designType} mentor reviews',
    'one-on-one {designType} teaching',
    '{designType} feedback sessions',
    'best {designType} mentors online'
  ],
  career: [
    'tech {careerPath} jobs with mentorship',
    '{careerPath} interview preparation with coach',
    '{careerPath} resume tips from experts',
    '{careerPath} career transition mentor',
    '{careerPath} salary guide with insider tips',
    'become a {careerPath} with mentor',
    '{careerPath} portfolio development help',
    '{careerPath} skills needed with learning path',
    '{careerPath} certifications worth it',
    '{careerPath} mentorship programs near me',
    'how to get {careerPath} job with mentor help',
    '{careerPath} networking with professionals',
    '{careerPath} career advancement mentor',
    'junior {careerPath} to senior guidance',
    '{careerPath} job search strategies with mentor',
    'affordable {careerPath} career coach',
    '{careerPath} mentor hourly rate',
    'best {careerPath} mentors online',
    '{careerPath} skills assessment with feedback',
    '{careerPath} career roadmap with mentor'
  ],
  technology: [
    '{techTrend} adoption with expert help',
    'learn {techTrend} with mentor',
    '{techTrend} certification guided course',
    '{techTrend} applications with mentor help',
    '{techTrend} career opportunities guidance',
    '{techTrend} in business mentorship',
    '{techTrend} implementation expert advice',
    '{techTrend} vs traditional methods explained',
    '{techTrend} best practices from professionals',
    '{techTrend} getting started with guidance',
    '{techTrend} use cases with mentor',
    '{techTrend} ROI with expert insights',
    '{techTrend} innovations guided learning',
    '{techTrend} career impact mentorship',
    '{techTrend} future trends from experts',
    '{techTrend} mentors near me',
    'affordable {techTrend} coaching',
    'best {techTrend} online courses with support',
    '{techTrend} beginner to expert roadmap',
    '{techTrend} expert community'
  ],
  programming: [
    '{language} programming tutorial with mentor',
    'learn {language} programming with feedback',
    '{language} coding projects with guidance',
    '{language} algorithms with mentor explanation',
    '{language} data structures expert teaching',
    '{language} coding interview questions help',
    '{language} code optimization mentorship',
    '{language} programming mentorship program',
    '{language} coding best practices from experts',
    '{language} common errors with solutions',
    '{language} debugging techniques with mentor',
    '{language} programming career guidance',
    '{language} full stack development mentorship',
    '{language} programming patterns with examples',
    '{language} code examples with explanation',
    'best {language} programming mentor',
    'affordable {language} coding lessons',
    '{language} mentor reviews',
    '{language} programming tutor near me',
    '{language} project-based learning'
  ],
  mentorship: [
    'tech mentorship {aspects} benefits',
    'find {profession} mentor online',
    '{profession} mentorship benefits for beginners',
    'mentorship for {profession} career growth',
    'online {profession} mentorship program',
    'structured {profession} mentorship platform',
    '{profession} mentor matching service',
    '{profession} career guidance from experts',
    'one-on-one {profession} mentoring session',
    '{profession} mentorship program cost',
    'how to be a good {profession} mentee',
    '{profession} peer mentorship community',
    '{profession} mentorship cost comparison',
    'return on mentorship investment {profession}',
    '{profession} mentor finding guide',
    'best {profession} mentorship platforms',
    'affordable {profession} mentors',
    '{profession} mentorship success stories',
    'how mentorship transformed my {profession} career',
    '{profession} mentor vs course'
  ],
  learning: [
    '{subject} learning with mentor support',
    'best {subject} guided tutorials',
    '{subject} bootcamp with mentorship',
    'learn {subject} with personal guidance',
    '{subject} certification with mentor support',
    '{subject} course with feedback sessions',
    'structured {subject} learning with mentor',
    'self-taught {subject} with expert guidance',
    '{subject} learning path with feedback',
    '{subject} education vs mentorship',
    '{subject} degree worth it or get a mentor',
    '{subject} practical learning with projects',
    '{subject} learning resources with support',
    'interactive {subject} education with feedback',
    '{subject} education alternatives with mentors',
    'best way to learn {subject} with mentor',
    'affordable {subject} guided learning',
    '{subject} mentor vs self-learning',
    'how long to learn {subject} with mentor',
    '{subject} project-based learning platform'
  ],
  projects: [
    '{technology} project ideas with mentor guidance',
    'build {technology} portfolio with mentor',
    '{technology} real-world projects for beginners',
    '{technology} project-based learning platform',
    'guided {technology} projects for beginners',
    '{technology} projects with step-by-step mentor',
    'portfolio-worthy {technology} projects with guidance',
    '{technology} project examples with mentor review',
    '{technology} beginner projects with support',
    '{technology} advanced projects with mentor',
    'interactive {technology} projects with feedback',
    'practical {technology} projects for learning',
    '{technology} projects for job interviews with help',
    '{technology} showcase projects with mentor',
    'collaborative {technology} projects with guidance',
    'best {technology} projects for learning',
    '{technology} project mentor services',
    '{technology} project feedback sessions',
    'learn {technology} by building with mentor',
    '{technology} mentor reviewed projects'
  ],
  certification: [
    '{cert} certification preparation with mentor',
    '{cert} exam tips from certified experts',
    '{cert} vs experience with mentor guidance',
    'is {cert} certification worth it mentorship',
    '{cert} certification jobs mentorship',
    '{cert} certification salary increase with mentor proof',
    'how to pass {cert} certification with guidance',
    '{cert} certification cost with mentorship',
    '{cert} certification requirements with study plan',
    '{cert} alternative certifications mentor advice',
    '{cert} certification renewal with expert tips',
    '{cert} certification difficulty with mentor help',
    '{cert} certification career impact stories',
    '{cert} certification study guide with mentor',
    '{cert} certification practice tests with feedback',
    'best {cert} certification mentor',
    'affordable {cert} certification coaching',
    '{cert} certification pass rate with mentor',
    '{cert} certification time commitment with guidance',
    '{cert} certification vs project experience'
  ],
  beginner: [
    'beginner friendly {technology} mentor',
    'start learning {technology} with guidance',
    'no experience {technology} mentorship',
    'zero to hero {technology} with mentor',
    'complete beginner {technology} guided course',
    'learn {technology} from scratch with mentor',
    'beginner to professional {technology} mentorship',
    'first steps in {technology} with expert',
    'easy {technology} projects with guidance',
    'is {technology} hard for beginners mentor advice',
    'beginner mistakes in {technology} with solutions',
    'beginner resources for {technology} with mentor',
    'best {technology} for absolute beginners with support',
    'start career in {technology} with mentor help',
    'newbie friendly {technology} mentorship',
    'learn {technology} fast as beginner with mentor',
    'beginner {technology} roadmap with guidance',
    'overcome beginner {technology} challenges with mentor',
    'beginner to intermediate {technology} with support',
    'beginner {technology} mentor cost'
  ],
  guidance: [
    'personalized {subject} guidance online',
    'one-on-one {subject} expert advice',
    'professional feedback on {subject} learning',
    'guided {subject} learning path',
    '{subject} career direction help',
    'expert {subject} insights for beginners',
    '{subject} mentoring session structure',
    'what to expect from {subject} guidance',
    'finding the right {subject} guidance online',
    '{subject} career guidance vs coaching',
    'periodic {subject} feedback importance',
    'guided {subject} practice sessions',
    '{subject} skills assessment with guidance',
    'personalized {subject} improvement plan',
    'structured {subject} advancement path',
    'best {subject} guidance platform',
    'affordable {subject} expert advice',
    '{subject} guidance success stories',
    '{subject} mentor communication frequency',
    '{subject} guidance vs traditional courses'
  ],
  portfolio: [
    'build impressive {profession} portfolio with mentor',
    '{profession} portfolio review services',
    'improve {profession} portfolio with expert feedback',
    'portfolio projects for {profession} beginners',
    '{profession} portfolio examples with guidance',
    'create job-winning {profession} portfolio with help',
    '{profession} portfolio best practices with mentor',
    'showcase {profession} skills through portfolio with guidance',
    'portfolio building course for {profession}',
    '{profession} portfolio mentorship program',
    'portfolio mistakes to avoid in {profession}',
    'industry-standard {profession} portfolio with mentor',
    'portfolio for career transition to {profession}',
    'get hired with {profession} portfolio mentor',
    '{profession} portfolio templates with expert customization',
    'affordable {profession} portfolio review',
    'best {profession} portfolio mentor',
    '{profession} portfolio critique session',
    'standout {profession} portfolio elements with mentor',
    '{profession} portfolio vs resume importance'
  ],
  questions: [
    'how to find good {profession} mentor?',
    'what should I ask my {profession} mentor?',
    'how much does {profession} mentorship cost?',
    'is {profession} mentorship worth the money?',
    'how often should I meet with my {profession} mentor?',
    'what to expect from {profession} mentorship?',
    'how to prepare for {profession} mentorship session?',
    'can mentor help me switch to {profession} career?',
    'best {profession} mentorship platforms?',
    'how long does it take to learn {profession} with mentor?',
    'should I get {profession} certification or mentorship?',
    'what projects should I build with {profession} mentor?',
    'online vs in-person {profession} mentorship?',
    'group vs individual {profession} mentorship?',
    'how to measure progress with {profession} mentor?',
    'what makes a good {profession} mentor?',
    'can I afford {profession} mentorship as student?',
    'how to maximize {profession} mentorship benefits?',
    'will {profession} mentor help with job search?',
    "what is better: {profession} course or mentor?"
  ],
  transactional: [
    'hire {profession} mentor online',
    'book {profession} mentorship session',
    'purchase {profession} mentorship package',
    'subscribe to {profession} mentorship program',
    'pay for {profession} career guidance',
    'buy {profession} portfolio review service',
    'enroll in {profession} mentoring program',
    'sign up for {profession} expert sessions',
    'register for {profession} code review service',
    'get {profession} project feedback service',
    'join {profession} mentorship community',
    'reserve {profession} mentor consultation',
    'invest in {profession} career coaching',
    'purchase {profession} guided project plan',
    'subscribe to {profession} mentor newsletter',
    'best {profession} mentorship deals',
    'affordable {profession} mentor services',
    '{profession} mentorship discount code',
    '{profession} mentorship trial session',
    '{profession} mentorship satisfaction guarantee'
  ]
}

// Technology and design type variations
const variations = {
  technology: [
    'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Python', 'JavaScript',
    'TypeScript', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'Swift',
    'Kotlin', 'Flutter', 'React Native', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'TensorFlow',
    'PyTorch', 'Django', 'Express.js', 'Laravel', '.NET', 'Spring Boot',
    'Svelte', 'Web Components', 'Microservices', 'Serverless', 'CI/CD',
    'DevOps', 'WebAssembly', 'Rust', 'Dart', 'Three.js', 'D3.js',
    'WebGL', 'Apollo GraphQL', 'Redux', 'MobX', 'RxJS', 'Tailwind CSS',
    'SASS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Styled Components',
    'Framer Motion', 'WebSockets', 'PWA', 'Electron', 'Fastify',
    'NestJS', 'Deno', 'Bun', 'Remix', 'SolidJS', 'Astro', 'Gatsby'
  ],
  designType: [
    'design', 'development', 'prototyping', 'wireframing',
    'research', 'testing', 'animation', 'interaction design',
    'visual design', 'product design', 'web design',
    'mobile design', 'responsive design', 'design systems',
    'typography', 'color theory', 'accessibility', 'iconography',
    'motion design', 'user testing', 'Figma', 'Sketch', 'Adobe XD',
    'Illustrator', 'Photoshop', 'InVision', 'Framer', 'Webflow',
    'InDesign', 'Principle', 'After Effects', '3D design',
    'illustration', 'branding', 'logo design', 'UI kits'
  ],
  careerPath: [
    'frontend developer', 'backend developer', 'full stack developer',
    'DevOps engineer', 'cloud architect', 'data scientist',
    'machine learning engineer', 'AI specialist', 'mobile developer',
    'iOS developer', 'Android developer', 'React developer',
    'Angular developer', 'Vue developer', 'Node.js developer',
    'Python developer', 'Java developer', 'UX designer',
    'UI designer', 'product designer', 'project manager',
    'Scrum master', 'agile coach', 'technical writer',
    'QA engineer', 'test automation engineer', 'security specialist',
    'database administrator', 'network engineer', 'system administrator',
    'blockchain developer', 'game developer', 'AR/VR developer',
    'CTO', 'technical lead', 'engineering manager'
  ],
  techTrend: [
    'artificial intelligence', 'machine learning', 'blockchain',
    'cryptocurrency', 'virtual reality', 'augmented reality',
    'mixed reality', 'Internet of Things', 'edge computing',
    '5G technology', 'quantum computing', 'big data',
    'data science', 'cybersecurity', 'cloud computing',
    'serverless architecture', 'microservices', 'containerization',
    'sustainable IT', 'green tech', 'digital transformation',
    'automation', 'robotics', 'chatbots', 'voice assistants',
    'biometrics', 'wearable technology', 'smart home technology',
    'digital twins', 'low-code platforms', 'no-code development',
    'progressive web apps', 'WebAssembly', 'JAMstack'
  ],
  language: [
    'JavaScript', 'Python', 'Java', 'C++', 'C#',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go',
    'Rust', 'TypeScript', 'Scala', 'R', 'Perl',
    'Haskell', 'Clojure', 'Dart', 'SQL', 'HTML/CSS',
    'Bash', 'PowerShell', 'MATLAB', 'Groovy', 'Objective-C',
    'Assembly', 'Elixir', 'F#', 'COBOL', 'Fortran'
  ],
  aspects: [
    'benefits', 'finding', 'relationship', 'expectations',
    'communication', 'feedback', 'goal setting', 'progress tracking',
    'career advancement', 'skill development', 'networking',
    'industry insights', 'best practices', 'structure',
    'time management', 'remote', 'paid vs free', 'group vs individual',
    'duration', 'matching', 'evaluation', 'success metrics',
    'tools', 'platforms', 'programs'
  ],
  profession: [
    'developer', 'designer', 'data scientist', 'product manager',
    'DevOps engineer', 'UX researcher', 'software engineer',
    'frontend developer', 'backend developer', 'full stack developer', 
    'mobile developer', 'web developer', 'cloud architect', 
    'ML engineer', 'QA engineer', 'technical writer', 
    'security specialist', 'database admin', 'systems analyst', 
    'IT support', 'network engineer', 'game developer', 
    'blockchain developer', 'AR/VR developer', 'UI designer', 
    'UX designer', 'product designer', 'graphic designer',
    'motion designer', 'interaction designer'
  ],
  subject: [
    'programming', 'web development', 'mobile development',
    'data science', 'machine learning', 'artificial intelligence',
    'DevOps', 'cloud computing', 'cybersecurity', 'blockchain',
    'game development', 'AR/VR', 'UX/UI design', 'digital marketing',
    'product management', 'agile methodologies', 'project management',
    'database design', 'networking', 'system administration',
    'frontend frameworks', 'backend technologies', 'full stack development',
    'iOS development', 'Android development', 'cross-platform development'
  ],
  cert: [
    'AWS', 'Azure', 'GCP', 'CompTIA', 'Cisco CCNA',
    'CISSP', 'CEH', 'PMP', 'Scrum', 'ITIL',
    'Kubernetes', 'Docker', 'Terraform', 'Microsoft', 'Google',
    'Oracle', 'Salesforce', 'ServiceNow', 'Linux', 'Agile',
    'SAFe', 'TOGAF', 'Six Sigma', 'ISTQB', 'Tableau',
    'Power BI', 'TensorFlow', 'Adobe', 'Hadoop', 'MongoDB'
  ]
}

// Generate keywords with enhanced relevance scores and search volume estimates
function generateKeywords(count: number): Array<{ keyword: string; category: string; relevance_score: number }> {
  const keywords = new Set<string>()
  const result = []
  
  // Priority multipliers for different keyword types
  const priorityMultipliers = {
    'mentorship': 1.2,
    'projects': 1.15, 
    'learning': 1.1,
    'beginner': 1.1,
    'guidance': 1.05,
    'questions': 1.0,
    'transactional': 0.95
  }

  // Counter to ensure we generate enough keywords
  let attempts = 0
  const maxAttempts = count * 10 // Safety limit to prevent infinite loops

  while (result.length < count && attempts < maxAttempts) {
    attempts++
    
    // Select a category with bias toward high-priority categories
    let category: string
    if (Math.random() < 0.6) {
      // 60% chance to pick from high priority categories
      const highPriorityCategories = ['mentorship', 'projects', 'learning', 'beginner', 'guidance']
      category = highPriorityCategories[Math.floor(Math.random() * highPriorityCategories.length)]
    } else {
      category = categories[Math.floor(Math.random() * categories.length)]
    }
    
    const patterns = keywordPatterns[category as keyof typeof keywordPatterns] || []
    if (patterns.length === 0) continue

    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    let keyword = pattern

    // Replace placeholders with variations
    Object.entries(variations).forEach(([key, values]) => {
      const placeholder = `{${key}}`
      if (keyword.includes(placeholder)) {
        const value = values[Math.floor(Math.random() * values.length)]
        keyword = keyword.replace(placeholder, value)
      }
    })

    // Skip duplicates
    if (keywords.has(keyword)) continue
    
    // Calculate relevance score based on keyword properties
    let baseScore = Math.random() * 0.3 + 0.7 // Base score between 0.7 and 1.0
    
    // Apply priority multiplier based on category
    const multiplier = priorityMultipliers[category as keyof typeof priorityMultipliers] || 1.0
    baseScore *= multiplier
    
    // Boost long-tail keywords (more than 3 words)
    const wordCount = keyword.split(' ').length
    if (wordCount > 3) {
      baseScore *= 1 + (wordCount - 3) * 0.05 // +5% per additional word
    }
    
    // Limit maximum score to 1.0
    const finalScore = Math.min(baseScore, 1.0)
    
    // Add to results
    keywords.add(keyword)
    result.push({
      keyword,
      category,
      relevance_score: parseFloat(finalScore.toFixed(2)) // Round to 2 decimal places
    })
  }

  return result
}

// Function to generate additional keyword variations
function generateLongTailVariations(baseKeywords: Array<{ keyword: string; category: string; relevance_score: number }>, count: number): Array<{ keyword: string; category: string; relevance_score: number }> {
  const variations = []
  const existingKeywords = new Set(baseKeywords.map(k => k.keyword))
  
  // Prefixes to add to existing keywords
  const prefixes = [
    'best', 'top', 'affordable', 'cheap', 'free', 'online', 'remote',
    'guided', 'professional', 'expert', 'beginner', 'advanced',
    'interactive', 'structured', 'self-paced', 'live', 'recorded',
    'one-on-one', 'group', 'weekend', 'evening', 'intensive',
    'comprehensive', 'quick', 'step-by-step', 'hands-on'
  ]
  
  // Suffixes to add to existing keywords
  const suffixes = [
    'for beginners', 'for professionals', 'with certification',
    'with job guarantee', 'near me', 'online', 'with feedback',
    'with portfolio review', 'with projects', 'with exercises',
    'with case studies', 'with real examples', 'step by step',
    'for career change', 'for career advancement', 'for job interview',
    'with code review', 'with community support', 'in 2023',
    'worth it', 'vs self-learning', 'cost'
  ]
  
  // Questions to create question-based keywords
  const questions = [
    'how to find', 'what is the best', 'how much does', 'is it worth',
    'how long does it take', 'where to find', 'can I learn', 'should I get',
    'how to become', 'what skills do I need for'
  ]
  
  let baseIndex = 0
  
  while (variations.length < count && baseIndex < baseKeywords.length) {
    const baseKeyword = baseKeywords[baseIndex]
    baseIndex = (baseIndex + 1) % baseKeywords.length // Cycle through base keywords
    
    // Try adding a prefix
    if (variations.length < count) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
      const prefixVariation = `${prefix} ${baseKeyword.keyword}`
      
      if (!existingKeywords.has(prefixVariation)) {
        existingKeywords.add(prefixVariation)
        variations.push({
          keyword: prefixVariation,
          category: baseKeyword.category,
          relevance_score: Math.min(baseKeyword.relevance_score * 1.05, 1.0) // Slightly higher relevance
        })
      }
    }
    
    // Try adding a suffix
    if (variations.length < count) {
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      const suffixVariation = `${baseKeyword.keyword} ${suffix}`
      
      if (!existingKeywords.has(suffixVariation)) {
        existingKeywords.add(suffixVariation)
        variations.push({
          keyword: suffixVariation,
          category: baseKeyword.category,
          relevance_score: Math.min(baseKeyword.relevance_score * 1.05, 1.0) // Slightly higher relevance
        })
      }
    }
    
    // Try creating a question
    if (variations.length < count) {
      const question = questions[Math.floor(Math.random() * questions.length)]
      const questionVariation = `${question} ${baseKeyword.keyword}?`
      
      if (!existingKeywords.has(questionVariation)) {
        existingKeywords.add(questionVariation)
        variations.push({
          keyword: questionVariation,
          category: 'questions',
          relevance_score: Math.min(baseKeyword.relevance_score * 1.1, 1.0) // Higher relevance for questions
        })
      }
    }
  }
  
  return variations
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Set quantity from request or default to 2500
    const { quantity = 2500 } = await req.json().catch(() => ({}));
    
    // Calculate how many base keywords and variations to generate
    const baseKeywordCount = Math.min(Math.floor(quantity * 0.7), 1750); // 70% are base keywords
    const variationCount = quantity - baseKeywordCount; // The rest are variations
    
    console.log(`Generating ${baseKeywordCount} base keywords and ${variationCount} variations`);
    
    // Generate base keywords
    const baseKeywords = generateKeywords(baseKeywordCount);
    
    // Generate variations from base keywords
    const variations = generateLongTailVariations(baseKeywords, variationCount);
    
    // Combine all keywords
    const allKeywords = [...baseKeywords, ...variations];
    
    // Insert keywords in batches of 50 to avoid timeout
    const batchSize = 50;
    const batches = Math.ceil(allKeywords.length / batchSize);
    let successCount = 0;
    
    // Helper function to insert batch with retry logic for deadlocks
    const insertBatchWithRetry = async (batch: any[], batchNumber: number, maxRetries = 3) => {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const { error } = await supabaseClient
            .from('seo_keywords')
            .upsert(
              batch,
              { onConflict: 'keyword', ignoreDuplicates: false }
            );

          if (error) {
            // Check if it's a deadlock error
            if (error.code === '40P01' && attempt < maxRetries - 1) {
              console.log(`Deadlock detected in batch ${batchNumber}, retrying (attempt ${attempt + 1})...`);
              // Wait before retrying with exponential backoff
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
              continue;
            }
            throw error;
          }
          
          // Success
          return batch.length;
        } catch (error) {
          if (attempt === maxRetries - 1) {
            console.error(`Error in batch ${batchNumber} after ${maxRetries} attempts:`, error);
            throw error;
          }
        }
      }
      return 0;
    };
    
    for (let i = 0; i < batches; i++) {
      const batch = allKeywords.slice(i * batchSize, (i + 1) * batchSize);
      
      try {
        const inserted = await insertBatchWithRetry(batch, i + 1);
        successCount += inserted;
        console.log(`Successfully inserted batch ${i + 1} of ${batches} (${batch.length} keywords)`);
        
        // Add small delay between batches to reduce lock contention
        if (i < batches - 1) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } catch (error) {
        console.error(`Failed to insert batch ${i + 1}:`, error);
        // Continue with next batch instead of failing completely
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully generated ${successCount} keywords`,
        categories: categories,
        sample: allKeywords.slice(0, 10) // Return a sample of generated keywords
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
