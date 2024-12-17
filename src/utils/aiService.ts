import { pipeline, Pipeline } from '@huggingface/transformers';
import { toast } from "@/components/ui/use-toast";

// Define more specific types for our pipelines
type TextClassificationPipeline = Pipeline & { task: 'text-classification' };
type ImageClassificationPipeline = Pipeline & { task: 'image-classification' };
type Text2TextGenerationPipeline = Pipeline & { task: 'text2text-generation' };

type ModelPipeline = TextClassificationPipeline | ImageClassificationPipeline | Text2TextGenerationPipeline;

let textClassifier: TextClassificationPipeline | null = null;
let imageClassifier: ImageClassificationPipeline | null = null;
let textGenerator: Text2TextGenerationPipeline | null = null;

const INITIALIZATION_TIMEOUT = 30000; // 30 seconds timeout

const initializePipeline = async (
  task: 'text-classification' | 'image-classification' | 'text2text-generation',
  model: string,
  options = {},
  retries = 0
): Promise<ModelPipeline> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), INITIALIZATION_TIMEOUT);

  try {
    console.log(`Initializing ${task} pipeline with model ${model}...`);
    const startTime = performance.now();
    
    const instance = await pipeline(task, model, {
      ...options,
      // Remove the signal option as it's not part of PretrainedModelOptions
    }) as ModelPipeline;
    
    const endTime = performance.now();
    console.log(`${task} pipeline initialized in ${(endTime - startTime).toFixed(2)}ms`);
    
    return instance;
  } catch (error: any) {
    console.error(`Error initializing ${task} pipeline:`, error);
    
    if (error.name === 'AbortError') {
      throw new Error(`${task} pipeline initialization timed out after ${INITIALIZATION_TIMEOUT}ms`);
    }
    
    if (retries < 3) {
      const delay = Math.min(1000 * Math.pow(2, retries), 8000);
      console.log(`Retrying... (${retries + 1}/3) after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return initializePipeline(task, model, options, retries + 1);
    }
    
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const initializeAIModels = async (): Promise<boolean> => {
  try {
    console.log("Initializing AI models...");
    const startTime = performance.now();

    // Using browser-optimized models from Xenova
    [textClassifier, imageClassifier, textGenerator] = await Promise.all([
      initializePipeline(
        "text-classification",
        "Xenova/bert-base-multilingual-uncased-sentiment"
      ),
      initializePipeline(
        "image-classification",
        "Xenova/vit-base-patch16-224"
      ),
      initializePipeline(
        "text2text-generation",
        "Xenova/t5-small"
      )
    ]);

    const endTime = performance.now();
    console.log(`All AI models initialized in ${(endTime - startTime).toFixed(2)}ms`);
    
    return true;
  } catch (error) {
    console.error("Failed to initialize AI models:", error);
    toast({
      title: "AI Model Initialization Failed",
      description: "Some features might be limited. Please refresh the page to try again.",
      variant: "destructive",
      duration: 5000,
    });
    return false;
  }
};

export const getTextClassifier = () => textClassifier;
export const getImageClassifier = () => imageClassifier;
export const getTextGenerator = () => textGenerator;