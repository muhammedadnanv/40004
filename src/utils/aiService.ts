import { pipeline, Pipeline, env } from '@xenova/transformers';
import type {
  TextClassificationPipeline,
  ImageClassificationPipeline,
  TextGenerationPipeline,
} from '@xenova/transformers';

// Configure environment
env.allowLocalModels = false;
env.useBrowserCache = true;

type PipelineType = 'text-classification' | 'image-classification' | 'text-generation';
type AnyPipeline = TextClassificationPipeline | ImageClassificationPipeline | TextGenerationPipeline;

let textClassifier: TextClassificationPipeline | null = null;
let imageClassifier: ImageClassificationPipeline | null = null;
let textGenerator: TextGenerationPipeline | null = null;

const initializePipeline = async (
  task: PipelineType,
  model: string,
  options: any = { quantized: true },
  retries = 0
): Promise<AnyPipeline> => {
  try {
    console.log(`Initializing ${task} pipeline with model ${model}...`);
    return await pipeline(task, model, options);
  } catch (error: any) {
    console.error(`Error initializing ${task} pipeline:`, error);
    if (retries < 3) {
      console.log(`Retrying... (${retries + 1}/3)`);
      return initializePipeline(task, model, options, retries + 1);
    }
    throw error;
  }
};

export const initializeAIModels = async (): Promise<boolean> => {
  try {
    console.log("Initializing AI models...");

    // Using optimized models from Xenova's community space
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

    return true;
  } catch (error: any) {
    console.error("Error initializing AI models:", error);
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

export const generateText = async (
  prompt: string, 
  options: GenerationOptions = {}
): Promise<string[]> => {
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
    return Array.isArray(result) ? 
      result.map(r => r.generated_text) : 
      [result.generated_text];
  } catch (error: any) {
    console.error("Text generation error:", error);
    throw error;
  }
};