import { pipeline } from '@huggingface/transformers';
import { toast } from '@/components/ui/use-toast';

// Define the allowed task types
type TaskType = 'text-classification' | 'image-classification' | 'text2text-generation';

// Define pipeline types
type PipelineType = {
  processor?: unknown;
  [key: string]: any;
};

async function initializePipeline(
  task: TaskType,
  model: string
): Promise<PipelineType> {
  console.info(`Initializing ${task} pipeline with model ${model}...`);
  const startTime = performance.now();
  
  try {
    const pipe = await pipeline(task, model);
    const duration = (performance.now() - startTime).toFixed(2);
    console.info(`${task} pipeline initialized in ${duration}ms`);
    return pipe as PipelineType;
  } catch (error) {
    console.error(`Failed to initialize ${task} pipeline:`, error);
    throw error;
  }
}

export async function initializeAIModels(): Promise<boolean> {
  console.info('Initializing AI models...');
  const startTime = performance.now();

  try {
    const [
      imageClassificationPipeline,
      text2textPipeline,
      textClassificationPipeline
    ] = await Promise.all([
      initializePipeline('image-classification', 'Xenova/vit-base-patch16-224'),
      initializePipeline('text2text-generation', 'Xenova/t5-small'),
      initializePipeline('text-classification', 'Xenova/bert-base-multilingual-uncased-sentiment')
    ]);

    const duration = (performance.now() - startTime).toFixed(2);
    console.info(`All AI models initialized in ${duration}ms`);

    // Store pipelines in global scope for later use if needed
    (window as any).aiPipelines = {
      imageClassification: imageClassificationPipeline,
      text2text: text2textPipeline,
      textClassification: textClassificationPipeline
    };

    return true;
  } catch (error) {
    console.error('Failed to initialize AI models:', error);
    toast({
      title: "AI Model Initialization Failed",
      description: "There was an error loading one or more AI models. Some features might be limited.",
      variant: "destructive",
      duration: 5000,
    });
    return false;
  }
}