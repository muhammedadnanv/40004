import { pipeline, env } from '@huggingface/transformers';
import { toast } from '@/components/ui/use-toast';

// Configure transformers.js to use browser cache and local models
env.allowLocalModels = false;
env.useBrowserCache = true;
env.backends.onnx.wasm.numThreads = 1;

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
    const pipe = await pipeline(task, model, {
      quantized: true,
      progress_callback: (progress) => {
        console.log(`Loading ${task} model: ${Math.round(progress * 100)}%`);
      }
    });
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
    // Initialize models sequentially to avoid overwhelming the browser
    const imageClassificationPipeline = await initializePipeline(
      'image-classification',
      'Xenova/vit-base-patch16-224'
    );
    console.log('Image classification model loaded');

    const text2textPipeline = await initializePipeline(
      'text2text-generation',
      'Xenova/t5-small'
    );
    console.log('Text2text model loaded');

    const textClassificationPipeline = await initializePipeline(
      'text-classification',
      'Xenova/bert-base-multilingual-uncased-sentiment'
    );
    console.log('Text classification model loaded');

    const duration = (performance.now() - startTime).toFixed(2);
    console.info(`All AI models initialized in ${duration}ms`);

    // Store pipelines in global scope for later use if needed
    (window as any).aiPipelines = {
      imageClassification: imageClassificationPipeline,
      text2text: text2textPipeline,
      textClassification: textClassificationPipeline
    };

    toast({
      title: "AI Models Ready",
      description: "All AI models have been loaded successfully.",
      duration: 3000,
    });

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