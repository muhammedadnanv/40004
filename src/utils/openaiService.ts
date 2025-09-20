import { supabase } from "@/integrations/supabase/client";

interface OpenAIRequestOptions {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Generate content using OpenAI via Supabase Edge Function
 */
export async function generateWithOpenAI(options: OpenAIRequestOptions): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('openai-chat', {
      body: {
        prompt: options.prompt,
        model: options.model || 'gpt-4o-mini',
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000,
      }
    });

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }

    if (!data || !data.text) {
      throw new Error("No response generated");
    }

    return data.text;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

/**
 * Generate educational content optimized for students
 */
export async function generateEducationalContent(topic: string, type: 'explanation' | 'example' | 'exercise'): Promise<string> {
  let prompt = '';
  
  switch (type) {
    case 'explanation':
      prompt = `Explain the concept of "${topic}" in a clear, student-friendly way. Include practical examples and break down complex ideas into digestible parts. Format your response with proper headings and bullet points.`;
      break;
    case 'example':
      prompt = `Provide practical, real-world examples of "${topic}". Include code snippets if relevant and explain how these examples apply in professional development scenarios.`;
      break;
    case 'exercise':
      prompt = `Create a hands-on exercise or project idea related to "${topic}". Include clear objectives, step-by-step instructions, and expected outcomes for students.`;
      break;
  }

  return await generateWithOpenAI({
    prompt,
    temperature: 0.6,
    maxTokens: 1500
  });
}

/**
 * Generate career advice and guidance
 */
export async function generateCareerAdvice(query: string): Promise<string> {
  const prompt = `As a career mentor in tech, provide helpful advice for the following query: "${query}". 

Focus on:
- Practical, actionable steps
- Industry insights and trends
- Skill development recommendations
- Career progression strategies
- Real-world examples and success stories

Keep your response encouraging, professional, and tailored to developers and tech professionals.`;

  return await generateWithOpenAI({
    prompt,
    temperature: 0.7,
    maxTokens: 1200
  });
}

/**
 * Generate personalized learning recommendations
 */
export async function generateLearningPath(experience: string, goals: string, interests: string[]): Promise<string> {
  const prompt = `Create a personalized learning path for a student with the following profile:

Experience Level: ${experience}
Career Goals: ${goals}
Interests: ${interests.join(', ')}

Provide:
1. Recommended learning sequence
2. Key technologies to focus on
3. Project ideas for hands-on practice
4. Timeline and milestones
5. Resources and next steps

Format the response with clear headings and actionable recommendations.`;

  return await generateWithOpenAI({
    prompt,
    temperature: 0.6,
    maxTokens: 2000
  });
}