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
    }) as TextGenerationOutput | TextGenerationSingle;

    let generatedText: string;

    if (Array.isArray(generatedOutput)) {
      if (generatedOutput.length === 0) {
        throw new Error("No text generated");
      }
      generatedText = generatedOutput[0].generated_text;
    } else if ('generated_text' in generatedOutput) {
      generatedText = generatedOutput.generated_text;
    } else {
      throw new Error("Invalid generation result format");
    }

    const sentimentOutput = await sentimentAnalyzer(generatedText) as TextClassificationOutput | TextClassificationSingle;
    
    let sentiment: string;

    if (Array.isArray(sentimentOutput)) {
      if (sentimentOutput.length === 0) {
        throw new Error("No sentiment analysis result");
      }
      sentiment = sentimentOutput[0].label;
    } else if ('label' in sentimentOutput) {
      sentiment = sentimentOutput.label;
    } else {
      throw new Error("Invalid sentiment result format");
    }
    
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