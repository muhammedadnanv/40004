import { pipeline, TextGenerationPipeline, TextClassificationPipeline } from "@huggingface/transformers";
import { toast } from "@/components/ui/use-toast";

interface GenerationResult {
  text: string;
  sentiment: string;
}

interface TextGenerationOutput {
  generated_text: string;
}

interface TextClassificationOutput {
  label: string;
  score: number;
}

let textGenerator: TextGenerationPipeline | null = null;
let sentimentAnalyzer: TextClassificationPipeline | null = null;

const initializePipelines = async () => {
  try {
    console.log("Initializing AI pipelines...");
    
    if (!textGenerator) {
      textGenerator = await pipeline("text-generation", "gpt2") as TextGenerationPipeline;
      console.log("Text generation pipeline initialized");
    }
    
    if (!sentimentAnalyzer) {
      sentimentAnalyzer = await pipeline(
        "sentiment-analysis",
        "distilbert-base-uncased-finetuned-sst-2-english"
      ) as TextClassificationPipeline;
      console.log("Sentiment analysis pipeline initialized");
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing AI pipelines:", error);
    toast({
      title: "AI Service Error",
      description: "Failed to initialize AI services. Some features may be limited.",
      variant: "destructive",
    });
    return false;
  }
};

export const generateText = async (prompt: string): Promise<GenerationResult | null> => {
  try {
    const isInitialized = await initializePipelines();
    if (!isInitialized || !textGenerator || !sentimentAnalyzer) {
      throw new Error("AI pipelines not initialized");
    }

    console.log("Generating text for prompt:", prompt);
    const generatedOutput = await textGenerator(prompt, {
      max_length: 100,
      num_return_sequences: 1,
      temperature: 0.7,
      pad_token_id: 50256
    });

    const output = Array.isArray(generatedOutput) ? generatedOutput[0] : generatedOutput;
    const generatedText = (output as TextGenerationOutput).generated_text;

    const sentimentOutput = await sentimentAnalyzer(generatedText);
    const sentimentResult = Array.isArray(sentimentOutput) ? sentimentOutput[0] : sentimentOutput;
    const sentiment = (sentimentResult as TextClassificationOutput).label;
    
    console.log("Generated text:", generatedText);
    console.log("Sentiment:", sentiment);

    return {
      text: generatedText,
      sentiment: sentiment
    };
  } catch (error) {
    console.error("Error in text generation:", error);
    toast({
      title: "Generation Error",
      description: "Failed to generate text. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Initialize pipelines when the service is imported
initializePipelines().catch(console.error);