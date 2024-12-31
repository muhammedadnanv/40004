import { pipeline, TextGenerationPipeline, TextClassificationPipeline } from "@huggingface/transformers";
import { toast } from "@/hooks/use-toast";

interface GenerationResult {
  text: string;
  sentiment: string;
}

interface TextGenerationSingle {
  generated_text: string;
}

interface TextClassificationSingle {
  label: string;
  score: number;
}

type TextGenerationOutput = TextGenerationSingle[];
type TextClassificationOutput = TextClassificationSingle[];

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

    // Ensure we have a single result with generated_text
    const generatedResult = Array.isArray(generatedOutput) 
      ? generatedOutput[0] 
      : generatedOutput as TextGenerationSingle;

    if (!('generated_text' in generatedResult)) {
      throw new Error("Invalid generation result format");
    }

    const generatedText = generatedResult.generated_text;

    const sentimentOutput = await sentimentAnalyzer(generatedText);
    
    // Ensure we have a single result with label
    const sentimentResult = Array.isArray(sentimentOutput)
      ? sentimentOutput[0]
      : sentimentOutput as TextClassificationSingle;

    if (!('label' in sentimentResult)) {
      throw new Error("Invalid sentiment result format");
    }

    const sentiment = sentimentResult.label;
    
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