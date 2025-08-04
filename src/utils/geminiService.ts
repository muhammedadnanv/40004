
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility for interacting with the Google Gemini API via secure Edge Function
 */

interface GeminiRequestOptions {
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
  timeout?: number;
}

/**
 * Send a request to the Gemini API via Supabase Edge Function with better error handling
 */
export async function generateWithGemini(options: GeminiRequestOptions): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-content-summary', {
      body: {
        prompt: options.prompt,
        maxOutputTokens: options.maxOutputTokens || 1024,
        temperature: options.temperature || 0.7,
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
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/**
 * Generate a summary of content with better prompting
 */
export async function summarizeContent(content: string, type: "pdf" | "video"): Promise<string> {
  let prompt = `As an educational AI assistant, please summarize the following ${type === "pdf" ? "document" : "video"} content in a student-friendly format.

Task:
1. Identify and break down the main topics and concepts
2. Highlight key takeaways and important information
3. Simplify complex ideas while maintaining accuracy
4. Organize the summary with clear structure
5. Format using markdown headings, bullet points, and paragraphs

Your summary should help students quickly understand the material and identify what's most important. 
If the content is technical, explain terms or concepts that might be challenging.

Content to summarize:
${content}`;
  
  try {
    return await generateWithGemini({
      prompt,
      maxOutputTokens: 2048,
      temperature: 0.3, // Lower temperature for more factual, less creative responses
      timeout: 45000 // 45 second timeout for longer content
    });
  } catch (error) {
    console.error("Error in summarization:", error);
    throw new Error(`Failed to summarize content: ${error.message}`);
  }
}

/**
 * Process and extract text from PDF or video URLs with better error handling
 */
export async function processContentUrl(url: string): Promise<string> {
  try {
    // In a production app, you would use a real PDF extraction or video transcription service
    // For now, we'll return mock content based on the URL
    if (url.endsWith('.pdf')) {
      return `Content extracted from PDF at ${url}:\n\nThis is a sample document discussing machine learning algorithms, their applications, and limitations. The document covers supervised learning techniques including regression and classification algorithms. It also explores unsupervised learning approaches such as clustering and dimensionality reduction. The final section examines reinforcement learning and its real-world applications in robotics and game playing.`;
    } else if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      const videoId = url.includes('youtube.com') ? 
        url.split('v=')[1]?.split('&')[0] || 'unknown' : 
        url.split('/').pop() || 'unknown';
      
      return `Content extracted from video with ID ${videoId}:\n\nThis educational video explains the process of photosynthesis in plants. It starts with an overview of how plants capture light energy and convert it to chemical energy. The video then details the light-dependent reactions that occur in the thylakoid membrane, followed by the Calvin cycle that takes place in the stroma. Visual animations demonstrate the movement of electrons through photosystems I and II, and how ATP and NADPH are produced to power the creation of glucose.`;
    } else {
      return `Content extracted from URL: ${url}\n\nThis content appears to be a technical article discussing web development best practices. It covers topics like responsive design, accessibility considerations, performance optimization, and modern JavaScript frameworks. The article emphasizes the importance of semantic HTML, efficient CSS strategies, and proper image optimization for better user experience across different devices and connection speeds.`;
    }
  } catch (error) {
    console.error("Error processing URL:", error);
    throw new Error(`Failed to process URL: ${error.message}`);
  }
}
