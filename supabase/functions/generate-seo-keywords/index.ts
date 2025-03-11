
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Categories for keyword generation
const categories = [
  'development',
  'design',
  'career',
  'technology',
  'programming',
  'mentorship',
  'education',
  'certification'
]

// Keyword patterns for each category
const keywordPatterns = {
  development: [
    'learn {technology}',
    '{technology} certification',
    '{technology} projects',
    '{technology} mentorship',
    'professional {technology} development',
    '{technology} career growth',
    '{technology} best practices',
    '{technology} expert guidance',
    'how to build with {technology}',
    '{technology} portfolio projects',
    '{technology} project ideas',
    '{technology} for beginners',
    '{technology} advanced techniques',
    'mastering {technology}',
    '{technology} real-world applications'
  ],
  design: [
    'UI/UX {designType}',
    '{designType} portfolio',
    'professional {designType}',
    '{designType} certification',
    '{designType} mentorship',
    'learn {designType}',
    '{designType} career',
    '{designType} projects',
    '{designType} best practices',
    '{designType} tools',
    'mastering {designType}',
    '{designType} for beginners',
    '{designType} career path',
    '{designType} tips',
    '{designType} with mentor guidance'
  ],
  career: [
    'tech {careerPath} jobs',
    '{careerPath} interview preparation',
    '{careerPath} resume tips',
    '{careerPath} career transition',
    '{careerPath} salary guide',
    'become a {careerPath}',
    '{careerPath} portfolio development',
    '{careerPath} skills needed',
    '{careerPath} certifications',
    '{careerPath} mentorship programs',
    'how to get {careerPath} job',
    '{careerPath} networking',
    '{careerPath} career advancement',
    'junior {careerPath} to senior',
    '{careerPath} job search strategies'
  ],
  technology: [
    '{techTrend} adoption',
    'learn {techTrend}',
    '{techTrend} certification',
    '{techTrend} applications',
    '{techTrend} career opportunities',
    '{techTrend} in business',
    '{techTrend} implementation',
    '{techTrend} vs traditional methods',
    '{techTrend} best practices',
    '{techTrend} getting started',
    '{techTrend} use cases',
    '{techTrend} ROI',
    '{techTrend} innovations',
    '{techTrend} career impact',
    '{techTrend} future trends'
  ],
  programming: [
    '{language} programming tutorial',
    'learn {language} programming',
    '{language} coding projects',
    '{language} algorithms',
    '{language} data structures',
    '{language} coding interview questions',
    '{language} code optimization',
    '{language} programming mentorship',
    '{language} coding best practices',
    '{language} common errors',
    '{language} debugging techniques',
    '{language} programming career',
    '{language} full stack development',
    '{language} programming patterns',
    '{language} code examples'
  ],
  mentorship: [
    'tech mentorship {aspects}',
    'find {profession} mentor',
    '{profession} mentorship benefits',
    'mentorship for {profession} career',
    'online {profession} mentorship',
    'structured {profession} mentorship',
    '{profession} mentor matching',
    '{profession} career guidance',
    'one-on-one {profession} mentoring',
    '{profession} mentorship program',
    'how to be a good {profession} mentee',
    '{profession} peer mentorship',
    '{profession} mentorship cost',
    'return on mentorship investment',
    '{profession} mentor finding guide'
  ],
  education: [
    '{subject} online courses',
    'best {subject} tutorials',
    '{subject} bootcamp',
    'learn {subject} for free',
    '{subject} certification value',
    '{subject} course comparison',
    'structured {subject} learning',
    'self-taught {subject}',
    '{subject} learning path',
    '{subject} education vs experience',
    '{subject} degree worth it',
    '{subject} practical learning',
    '{subject} learning resources',
    'interactive {subject} education',
    '{subject} education alternatives'
  ],
  certification: [
    '{cert} certification preparation',
    '{cert} exam tips',
    '{cert} vs experience',
    'is {cert} certification worth it',
    '{cert} certification jobs',
    '{cert} certification salary increase',
    'how to pass {cert} certification',
    '{cert} certification cost',
    '{cert} certification requirements',
    '{cert} alternative certifications',
    '{cert} certification renewal',
    '{cert} certification difficulty',
    '{cert} certification career impact',
    '{cert} certification study guide',
    '{cert} certification practice tests'
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
    'WebGL', 'Apollo GraphQL', 'Redux', 'MobX', 'RxJS'
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
    'frontend', 'backend', 'full stack', 'mobile', 'web',
    'cloud architect', 'ML engineer', 'QA engineer',
    'technical writer', 'security specialist', 'database admin',
    'systems analyst', 'IT support', 'network engineer',
    'game developer', 'blockchain developer', 'AR/VR developer'
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

function generateKeywords(count: number): Array<{ keyword: string; category: string; relevance_score: number }> {
  const keywords = new Set<string>()
  const result = []

  while (result.length < count) {
    const category = categories[Math.floor(Math.random() * categories.length)]
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

    // Only add if it's a new keyword
    if (!keywords.has(keyword)) {
      keywords.add(keyword)
      result.push({
        keyword,
        category,
        relevance_score: Math.random() * 0.5 + 0.5 // Score between 0.5 and 1.0
      })
    }
  }

  return result
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

    // Set quantity from request or default to 400
    const { quantity = 400 } = await req.json().catch(() => ({}));
    
    // Generate keywords
    const keywords = generateKeywords(quantity)
    
    // Insert keywords in batches of 50 to avoid timeout
    const batchSize = 50
    const batches = Math.ceil(keywords.length / batchSize)
    let successCount = 0;
    
    for (let i = 0; i < batches; i++) {
      const batch = keywords.slice(i * batchSize, (i + 1) * batchSize)
      
      const { error, count } = await supabaseClient
        .from('seo_keywords')
        .upsert(
          batch,
          { onConflict: 'keyword', ignoreDuplicates: false }
        )
        .select('count')

      if (error) {
        console.error(`Error in batch ${i}:`, error)
        throw error
      }
      
      successCount += batch.length;
      console.log(`Successfully inserted batch ${i + 1} of ${batches}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully generated ${successCount} keywords`,
        categories: categories
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
