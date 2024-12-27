import { pipeline } from '@huggingface/transformers';

// Define interfaces for type safety
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
  label: string;
  score: number;
}

// Define pipeline type
type Pipeline = Awaited<ReturnType<typeof pipeline>>;

// Initialize AI services
let textGenerator: Pipeline | null = null;
let sentimentAnalyzer: Pipeline | null = null;

export const initializeAI = async () => {
  try {
    console.log('Initializing AI services...');
    
    textGenerator = await pipeline('text-generation', 'gpt2') as Pipeline;
    console.log('Text generator initialized successfully');
    
    sentimentAnalyzer = await pipeline('sentiment-analysis') as Pipeline;
    console.log('Sentiment analyzer initialized successfully');
    
    return { textGenerator, sentimentAnalyzer };
  } catch (error) {
    console.error('Error initializing AI services:', error);
    throw new Error('Failed to initialize AI services');
  }
};

export const generateText = async (pipe: Pipeline, prompt: string): Promise<string> => {
  try {
    console.log('Generating text for prompt:', prompt);
    
    const options: GenerationOptions = {
      max_length: 100,
      do_sample: true,
      temperature: 0.7,
      return_full_text: false
    };

    const result = await pipe(prompt, options) as GenerationResult[];
    console.log('Generated text result:', result);
    
    return result[0].generated_text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
};

export const analyzeSentiment = async (pipe: Pipeline, text: string): Promise<number> => {
  try {
    console.log('Analyzing sentiment for text:', text);
    
    const options: SentimentOptions = {
      return_all_scores: true,
      wait_for_model: true
    };

    const result = await pipe(text, options) as SentimentResult[];
    console.log('Sentiment analysis result:', result);
    
    return result[0].score;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('Failed to analyze sentiment');
  }
};

// Export initialized services
export const getInitializedServices = () => ({
  textGenerator,
  sentimentAnalyzer
});