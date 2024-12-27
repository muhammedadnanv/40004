import { pipeline, Pipeline } from '@huggingface/transformers';

interface GenerationOptions {
  max_length: number;
  do_sample: boolean;
  temperature: number;
  return_full_text: boolean;
}

interface SentimentOptions {
  wait_for_model: boolean;
}

interface GenerationResult {
  generated_text: string;
}

interface SentimentResult {
  score: number;
  label: string;
}

let textGenerator: Pipeline | null = null;
let sentimentAnalyzer: Pipeline | null = null;

const getInitializedServices = async () => {
  if (!textGenerator || !sentimentAnalyzer) {
    await initializeServices();
  }
  return { textGenerator, sentimentAnalyzer };
};

const initializeServices = async () => {
  try {
    console.log('Initializing AI services...');
    
    textGenerator = await pipeline('text-generation', 'gpt2') as Pipeline;
    console.log('Text generator initialized successfully');
    
    sentimentAnalyzer = await pipeline('sentiment-analysis') as Pipeline;
    console.log('Sentiment analyzer initialized successfully');
  } catch (error) {
    console.error('Error initializing AI services:', error);
    throw new Error('Failed to initialize AI services');
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const { textGenerator: pipe } = await getInitializedServices();
    if (!pipe) throw new Error('Text generator not initialized');
    
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
    throw error;
  }
};

export const analyzeSentiment = async (text: string): Promise<number> => {
  try {
    const { sentimentAnalyzer: pipe } = await getInitializedServices();
    if (!pipe) throw new Error('Sentiment analyzer not initialized');
    
    console.log('Analyzing sentiment for text:', text);
    
    const options: SentimentOptions = {
      wait_for_model: true
    };
    
    const result = await pipe(text, options) as SentimentResult[];
    console.log('Sentiment analysis result:', result);
    return result[0].score;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};