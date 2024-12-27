import { pipeline, PipelineType } from '@huggingface/transformers';
import type { ProgressCallback, ProgressInfo } from '@huggingface/transformers';

interface ModelConfig {
  task: PipelineType;
  model: string;
}

const SUPPORTED_MODELS: ModelConfig[] = [
  {
    task: 'text-generation',
    model: 'gpt2',
  },
  {
    task: 'sentiment-analysis',
    model: 'nlptown/bert-base-multilingual-uncased-sentiment',
  }
];

export const loadModel = async (task: PipelineType) => {
  const startTime = performance.now();
  const modelConfig = SUPPORTED_MODELS.find(m => m.task === task);

  if (!modelConfig) {
    throw new Error(`Unsupported task: ${task}`);
  }

  try {
    const model = modelConfig.model;
    const pipe = await pipeline(task, model, {
      progress_callback: ((progressInfo: ProgressInfo) => {
        let progressValue = 0;
        
        if ('progress' in progressInfo && typeof progressInfo.progress === 'number') {
          progressValue = progressInfo.progress;
        }
        
        console.log(`Loading ${task} model: ${Math.round(progressValue * 100)}%`);
      }) as ProgressCallback
    });

    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`Model ${task} loaded in ${duration}ms`);
    return pipe;
  } catch (error) {
    console.error(`Failed to load model for task ${task}:`, error);
    throw error;
  }
};

type Pipeline = Awaited<ReturnType<typeof pipeline>>;
type GenerationResult = { generated_text: string }[];
type SentimentResult = { score: number }[];

type GenerationConfig = {
  max_length: number;
  do_sample: boolean;
  temperature: number;
  return_full_text: boolean;
};

type SentimentConfig = {
  return_all_scores: boolean;
  wait_for_model: boolean;
};

export const generateText = async (pipe: Pipeline, prompt: string): Promise<string> => {
  try {
    const result = await pipe(prompt, {
      max_length: 100,
      do_sample: true,
      temperature: 0.7,
      return_full_text: false
    } as any) as GenerationResult;
    
    if (Array.isArray(result) && result.length > 0 && 'generated_text' in result[0]) {
      return result[0].generated_text;
    }
    
    return '';
  } catch (error) {
    console.error('Text generation failed:', error);
    throw error;
  }
};

export const analyzeSentiment = async (pipe: Pipeline, text: string): Promise<number> => {
  try {
    const result = await pipe(text, {
      return_all_scores: false,
      wait_for_model: true
    } as any) as SentimentResult;
    
    if (Array.isArray(result) && result.length > 0 && 'score' in result[0]) {
      return result[0].score;
    }
    
    return 0;
  } catch (error) {
    console.error('Sentiment analysis failed:', error);
    throw error;
  }
};