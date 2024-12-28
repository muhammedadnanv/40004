import { pipeline } from '@huggingface/transformers';

interface GenerationConfig {
  max_new_tokens?: number;
  temperature?: number;
  top_p?: number;
  return_full_text?: boolean;
}

interface SentimentConfig {
  wait_for_model?: boolean;
}

interface GenerationResult {
  generated_text: string;
}

interface SentimentResult {
  score: number;
}

let textGenerationPipeline: any = null;
let sentimentPipeline: any = null;

const getBaseUrl = () => {
  // Remove any trailing slashes and ensure proper URL formatting
  const baseUrl = window.location.origin.replace(/\/$/, '');
  return baseUrl;
};

export const initializeAIService = async () => {
  try {
    console.log('Initializing AI service...');
    
    if (!textGenerationPipeline) {
      console.log('Initializing text generation pipeline...');
      textGenerationPipeline = await pipeline('text-generation', 'gpt2');
    }
    
    if (!sentimentPipeline) {
      console.log('Initializing sentiment analysis pipeline...');
      sentimentPipeline = await pipeline('sentiment-analysis');
    }
    
    console.log('AI service initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing AI service:', error);
    return false;
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!textGenerationPipeline) {
      console.error('Text generation pipeline not initialized');
      throw new Error('Text generation pipeline not initialized');
    }

    console.log('Generating text for prompt:', prompt);
    
    const options: GenerationConfig = {
      max_new_tokens: 50,
      temperature: 0.7,
      top_p: 0.9,
      return_full_text: false
    };
    
    const result = await (textGenerationPipeline(prompt, options as any) as Promise<GenerationResult[]>);
    console.log('Generated text result:', result);
    return result[0].generated_text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

export const analyzeSentiment = async (text: string): Promise<number> => {
  try {
    if (!sentimentPipeline) {
      console.error('Sentiment pipeline not initialized');
      throw new Error('Sentiment pipeline not initialized');
    }

    console.log('Analyzing sentiment for text:', text);
    
    const options: SentimentConfig = {
      wait_for_model: true
    };
    
    const result = await (sentimentPipeline(text, options as any) as Promise<SentimentResult[]>);
    console.log('Sentiment analysis result:', result);
    return result[0].score;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};