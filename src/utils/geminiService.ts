
/**
 * Utility for interacting with the Google Gemini API
 */

// Note: In a production environment, this API key should be stored in a secure place
// like Supabase secrets, not directly in the code
const GEMINI_API_KEY = "AIzaSyBdNlUw4NFrejPzvuEvFOl_Pb9DyB6qlus";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface GeminiRequestOptions {
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

/**
 * Send a request to the Gemini API
 */
export async function generateWithGemini(options: GeminiRequestOptions): Promise<string> {
  try {
    const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: options.prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: options.maxOutputTokens || 1024,
          temperature: options.temperature || 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as GeminiResponse;
    return data.candidates[0]?.content.parts[0]?.text || "No response generated";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/**
 * Generate a summary of content
 */
export async function summarizeContent(content: string, type: "pdf" | "video"): Promise<string> {
  let prompt = `Please summarize the following ${type === "pdf" ? "document" : "video"} content in a student-friendly format. 
  Break it down into main topics, key concepts, and important takeaways. 
  Make complex ideas accessible and highlight the most important information.
  Format the summary with markdown headings, bullet points, and sections.\n\n`;
  
  prompt += content;
  
  return generateWithGemini({
    prompt,
    maxOutputTokens: 1500,
    temperature: 0.2, // Lower temperature for more factual, less creative responses
  });
}

/**
 * Process and extract text from PDF or video URLs
 */
export async function processContentUrl(url: string): Promise<string> {
  // In a real implementation, this would use PDF extraction libraries or video transcription services
  // For now, we'll return a mock acknowledgment
  return `Content extracted from URL: ${url}`;
}
