import { pipeline } from "@huggingface/transformers";

// Initialize pipelines
let textClassifier: any = null;
let imageClassifier: any = null;
let textGenerator: any = null;

// Initialize models
export const initializeAIModels = async () => {
  try {
    console.log("Initializing AI models...");
    
    // Text classification pipeline
    textClassifier = await pipeline(
      "text-classification",
      "SamLowe/roberta-base-go_emotions",
      { device: "cpu" } // Use CPU by default, can be changed to "webgpu" if available
    );

    // Image classification pipeline
    imageClassifier = await pipeline(
      "image-classification",
      "microsoft/resnet-50",
      { device: "cpu" }
    );

    // Text generation pipeline
    textGenerator = await pipeline(
      "text-generation",
      "distilgpt2",
      { device: "cpu" }
    );

    console.log("AI models initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing AI models:", error);
    return false;
  }
};

// Text classification
export const classifyText = async (text: string) => {
  if (!textClassifier) {
    throw new Error("Text classifier not initialized");
  }
  return await textClassifier(text);
};

// Image classification
export const classifyImage = async (imageUrl: string) => {
  if (!imageClassifier) {
    throw new Error("Image classifier not initialized");
  }
  return await imageClassifier(imageUrl);
};

// Text generation
export const generateText = async (prompt: string, maxLength: number = 100) => {
  if (!textGenerator) {
    throw new Error("Text generator not initialized");
  }
  return await textGenerator(prompt, {
    max_length: maxLength,
    num_return_sequences: 1,
  });
};