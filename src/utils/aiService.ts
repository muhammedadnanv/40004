import { pipeline } from '@huggingface/transformers';

interface GenerationOptions {
  max_length: number;
  do_sample: boolean;
  temperature: number;
  return_full_text: boolean;
}

interface SentimentOptions {
  return_all_scores: boolean;
  wait_for_model: boolean;
}

interface GenerationResult {
  generated_text: string;
}

interface SentimentResult {
  score: number;
}

type Pipeline = Awaited<ReturnType<typeof pipeline>>;

export const initializeAI = async () => {
  try {
    const [generationPipe, sentimentPipe] = await Promise.all([
      pipeline('text-generation', 'gpt2'),
      pipeline('sentiment-analysis', 'nlptown/bert-base-multilingual-uncased-sentiment')
    ]);

    return {
      generationPipe,
      sentimentPipe
    };
  } catch (error) {
    console.error('Error initializing AI pipelines:', error);
    throw new Error('Failed to initialize AI services');
  }
};

export const generateText = async (pipe: Pipeline, prompt: string): Promise<string> => {
  try {
    const options: GenerationOptions = {
      max_length: 100,
      do_sample: true,
      temperature: 0.7,
      return_full_text: false
    };
    
    const result = await (pipe as any)(prompt, options) as GenerationResult[];
    
    if (Array.isArray(result) && result.length > 0 && 'generated_text' in result[0]) {
      return result[0].generated_text;
    }
    
    throw new Error('Invalid generation result format');
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

export const analyzeSentiment = async (pipe: Pipeline, text: string): Promise<number> => {
  try {
    const options: SentimentOptions = {
      return_all_scores: false,
      wait_for_model: true
    };
    
    const result = await (pipe as any)(text, options) as SentimentResult[];
    
    if (Array.isArray(result) && result.length > 0 && 'score' in result[0]) {
      return result[0].score;
    }
    
    throw new Error('Invalid sentiment result format');
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};