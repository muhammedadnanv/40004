import { pipeline } from "@huggingface/transformers";
import { toast } from "@/components/ui/use-toast";

let textClassifier: any;
let imageClassifier: any;
let textGenerator: any;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializePipeline = async (
  task: string,
  model: string,
  options: any,
  retries = 0
): Promise<any> => {
  try {
    return await pipeline(task, model, options);
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

    // Text classification pipeline using a public model
    textClassifier = await initializePipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
      { device: "wasm" }
    );
    console.log("Text classification model initialized");

    // Image classification pipeline using a public model
    imageClassifier = await initializePipeline(
      "image-classification",
      "Xenova/resnet-18",
      { device: "wasm" }
    );
    console.log("Image classification model initialized");

    // Text generation pipeline using a public model
    textGenerator = await initializePipeline(
      "text-generation",
      "Xenova/gpt2-tiny-random",
      { device: "wasm" }
    );
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

export const classifyText = async (text: string): Promise<any> => {
  if (!textClassifier) {
    throw new Error("Text classifier not initialized");
  }
  try {
    return await textClassifier(text);
  } catch (error: any) {
    console.error("Text classification error:", error);
    throw error;
  }
};

export const classifyImage = async (image: string | ArrayBuffer): Promise<any> => {
  if (!imageClassifier) {
    throw new Error("Image classifier not initialized");
  }
  try {
    return await imageClassifier(image);
  } catch (error: any) {
    console.error("Image classification error:", error);
    throw error;
  }
};

export const generateText = async (prompt: string, options = {}): Promise<any> => {
  if (!textGenerator) {
    throw new Error("Text generator not initialized");
  }
  try {
    return await textGenerator(prompt, options);
  } catch (error: any) {
    console.error("Text generation error:", error);
    throw error;
  }
};