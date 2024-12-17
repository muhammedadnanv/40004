import { pipeline, env } from '@huggingface/transformers';
import type {
  TextClassificationPipeline,
  ImageClassificationPipeline,
  TextGenerationPipeline,
  TextClassificationOutput,
  ImageClassificationOutput,
  ImagePipelineInputs,
  PipelineType
} from '@huggingface/transformers';

// Configure environment
env.allowLocalModels = false;
env.useBrowserCache = true;

interface ClassificationResult {
  label: string;
  score: number;
}

let textClassifier: TextClassificationPipeline | null = null;
let imageClassifier: ImageClassificationPipeline | null = null;
let textGenerator: TextGenerationPipeline | null = null;

const initializePipeline = async (
  task: PipelineType,
  model: string,
  options: any = {},
  retries = 0
) => {
  try {
    console.log(`Initializing ${task} pipeline with model ${model}...`);
    return await pipeline(task, model, options);
  } catch (error: any) {
    console.error(`Error initializing ${task} pipeline:`, error);
    if (retries < 3) {
      console.log(`Retrying... (${retries + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1))); // Exponential backoff
      return initializePipeline(task, model, options, retries + 1);
    }
    throw error;
  }
};

export const initializeAIModels = async (): Promise<boolean> => {
  try {
    console.log("Initializing AI models...");

    // Using browser-optimized models from Xenova
    textClassifier = await initializePipeline(
      "text-classification",
      "Xenova/bert-base-multilingual-uncased-sentiment"
    ) as TextClassificationPipeline;
    console.log("Text classification model initialized");

    imageClassifier = await initializePipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    ) as ImageClassificationPipeline;
    console.log("Image classification model initialized");

    textGenerator = await initializePipeline(
      "text2text-generation", // Changed from text-generation to text2text-generation
      "Xenova/t5-small" // Using T5 instead of GPT-2 as it's more reliable in browsers
    ) as TextGenerationPipeline;
    console.log("Text generation model initialized");

    return true;
  } catch (error: any) {
    console.error("Error initializing AI models:", error);
    return false;
  }
};

export const classifyText = async (text: string): Promise<ClassificationResult[]> => {
  if (!textClassifier) {
    throw new Error("Text classifier not initialized");
  }
  try {
    const result = await textClassifier(text, {
      top_k: 5
    });
    const output = Array.isArray(result) ? result : [result];
    return output.map(item => ({
      label: item.label,
      score: item.score
    }));
  } catch (error: any) {
    console.error("Text classification error:", error);
    throw error;
  }
};

export const classifyImage = async (image: ImagePipelineInputs): Promise<ClassificationResult[]> => {
  if (!imageClassifier) {
    throw new Error("Image classifier not initialized");
  }
  try {
    const result = await imageClassifier(image, {
      top_k: 5
    });
    const output = Array.isArray(result) ? result : [result];
    return output.map(item => ({
      label: item.label,
      score: item.score
    }));
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
      max_length: 100,
      min_length: 10,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.9,
      repetition_penalty: 1.0,
      num_return_sequences: 1,
      ...options
    };
    
    const result = await textGenerator(prompt, defaultOptions);
    const outputs = Array.isArray(result) ? result : [result];
    return outputs.map(output => output.text);
  } catch (error: any) {
    console.error("Text generation error:", error);
    throw error;
  }
};