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
    '{technology} expert guidance'
  ],
  design: [
    'UI/UX {designType}',
    '{designType} portfolio',
    'professional {designType}',
    '{designType} certification',
    '{designType} mentorship',
    'learn {designType}',
    '{designType} career',
    '{designType} projects'
  ],
  // ... similar patterns for other categories
}

// Technology and design type variations
const variations = {
  technology: [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'JavaScript',
    'TypeScript', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'Swift',
    'Kotlin', 'Flutter', 'React Native', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'
  ],
  designType: [
    'design', 'development', 'prototyping', 'wireframing',
    'research', 'testing', 'animation', 'interaction design',
    'visual design', 'product design', 'web design',
    'mobile design', 'responsive design', 'design systems'
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

    // Generate 400 unique keywords
    const keywords = generateKeywords(400)
    
    // Insert keywords in batches of 50 to avoid timeout
    const batchSize = 50
    const batches = Math.ceil(keywords.length / batchSize)
    
    for (let i = 0; i < batches; i++) {
      const batch = keywords.slice(i * batchSize, (i + 1) * batchSize)
      
      const { error } = await supabaseClient
        .from('seo_keywords')
        .upsert(
          batch,
          { onConflict: 'keyword' }
        )

      if (error) {
        console.error(`Error in batch ${i}:`, error)
        throw error
      }
      
      console.log(`Successfully inserted batch ${i + 1} of ${batches}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully generated keywords' }),
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