import { pipeline } from "@huggingface/transformers";
import { toast } from "@/hooks/use-toast";

type PipelineType = "text-classification" | "image-classification" | "text-generation";

// Define specific pipeline types
type TextClassificationPipeline = Awaited<ReturnType<typeof pipeline>> & { task: "text-classification" };
type ImageClassificationPipeline = Awaited<ReturnType<typeof pipeline>> & { task: "image-classification" };
type TextGenerationPipeline = Awaited<ReturnType<typeof pipeline>> & { task: "text-generation" };
type AnyPipeline = TextClassificationPipeline | ImageClassificationPipeline | TextGenerationPipeline;

let textClassifier: TextClassificationPipeline;
let imageClassifier: ImageClassificationPipeline;
let textGenerator: TextGenerationPipeline;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializePipeline = async (
  task: PipelineType,
  model: string,
  options: any = { quantized: false },
  retries = 0
): Promise<AnyPipeline> => {
  try {
    return await pipeline(task, model, options) as AnyPipeline;
  } catch (error: any) {
    console.error(`Error initializing ${task} pipeline:`, error);
    
    if (retries < MAX_RETRIES) {
      console.log(`Retrying ${task} pipeline initialization... (Attempt ${retries + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return initializePipeline(task, model, options, retries + 1);
    }
    
    throw error;
  }
};

export const initializeAIModels = async (): Promise<boolean> => {
  try {
    console.log("Initializing AI models...");

    // Using public models from the Xenova community space
    textClassifier = await initializePipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      { quantized: true }
    ) as TextClassificationPipeline;
    console.log("Text classification model initialized");

    imageClassifier = await initializePipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224",
      { quantized: true }
    ) as ImageClassificationPipeline;
    console.log("Image classification model initialized");

    textGenerator = await initializePipeline(
      "text-generation",
      "Xenova/gpt2",
      { quantized: true }
    ) as TextGenerationPipeline;
    console.log("Text generation model initialized");

    toast({
      title: "AI Models Ready",
      description: "All AI models have been initialized successfully.",
      duration: 3000,
    });

    return true;
  } catch (error: any) {
    console.error("Failed to initialize AI models:", error);
    
    toast({
      title: "AI Models Initialization Failed",
      description: "There was an error loading the AI models. Some features might be limited.",
      variant: "destructive",
      duration: 5000,
    });
    
    return false;
  }
};

interface ClassificationResult {
  label: string;
  score: number;
}

export const classifyText = async (text: string): Promise<ClassificationResult[]> => {
  if (!textClassifier) {
    throw new Error("Text classifier not initialized");
  }
  try {
    const result = await textClassifier(text, {
      topk: 5,
      truncation: true
    });
    return Array.isArray(result) ? result : [result];
  } catch (error: any) {
    console.error("Text classification error:", error);
    throw error;
  }
};

type ImageInput = string | { src: string } | HTMLImageElement;

export const classifyImage = async (image: ImageInput): Promise<ClassificationResult[]> => {
  if (!imageClassifier) {
    throw new Error("Image classifier not initialized");
  }
  try {
    const result = await imageClassifier(image, {
      topk: 5
    });
    return Array.isArray(result) ? result : [result];
  } catch (error: any) {
    console.error("Image classification error:", error);
    throw error;
  }
};

interface GenerationOptions {
  maxLength?: number;
  minLength?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  repetitionPenalty?: number;
  numReturnSequences?: number;
}

export const generateText = async (prompt: string, options: GenerationOptions = {}): Promise<string[]> => {
  if (!textGenerator) {
    throw new Error("Text generator not initialized");
  }
  try {
    const defaultOptions = {
      maxLength: 100,
      minLength: 10,
      temperature: 0.7,
      topK: 50,
      topP: 0.9,
      repetitionPenalty: 1.0,
      numReturnSequences: 1,
      ...options
    };
    
    const result = await textGenerator(prompt, defaultOptions);
    return Array.isArray(result) ? result.map(r => r.generated_text) : [result.generated_text];
  } catch (error: any) {
    console.error("Text generation error:", error);
    throw error;
  }
};