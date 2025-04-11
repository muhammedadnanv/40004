
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
  timeout?: number;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason?: string;
  }>;
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: Array<{
      category: string;
      probability: string;
    }>;
  };
}

/**
 * Send a request to the Gemini API with better error handling
 */
export async function generateWithGemini(options: GeminiRequestOptions): Promise<string> {
  const controller = new AbortController();
  const timeout = options.timeout || 30000; // 30 second default timeout
  
  // Setup timeout
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
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
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Gemini API error (${response.status}): ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = `Gemini API error: ${errorData.error.message}`;
        }
      } catch (e) {
        // If we can't parse the error JSON, just use the status text
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json() as GeminiResponse;
    
    // Check for content filtering
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }
    
    // Check if we have valid response data
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated");
    }
    
    return data.candidates[0]?.content.parts[0]?.text || "No response generated";
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error("Request timed out. Please try again.");
    }
    console.error("Error calling Gemini API:", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
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
