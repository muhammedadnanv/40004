import { pipeline } from '@huggingface/transformers';

interface GenerationOptions {
  max_new_tokens: number;
  temperature: number;
  top_p: number;
  repetition_penalty: number;
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
}

let textGenerationPipeline: any = null;
let sentimentPipeline: any = null;

const getModelEndpoint = () => {
  const url = new URL(window.location.href);
  return url.protocol + '//' + url.hostname;
};

export const initializeAIService = async () => {
  try {
    console.log('Initializing AI service with endpoint:', getModelEndpoint());
    
    // Initialize pipelines with direct model references
    textGenerationPipeline = await pipeline('text-generation', {
      model: 'gpt2',
      task: 'text-generation'
    });
    
    sentimentPipeline = await pipeline('sentiment-analysis', {
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      task: 'sentiment-analysis'
    });
    
    console.log('AI service initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize AI service:', error);
    textGenerationPipeline = null;
    sentimentPipeline = null;
    return false;
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!textGenerationPipeline) {
      console.log('Attempting to initialize text generation pipeline...');
      const initialized = await initializeAIService();
      if (!initialized || !textGenerationPipeline) {
        throw new Error('Could not initialize text generation pipeline');
      }
    }

    console.log('Generating text for prompt:', prompt);
    const options: GenerationOptions = {
      max_new_tokens: 50,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.2,
      return_full_text: false
    };
    
    const result = await textGenerationPipeline(prompt, options) as GenerationResult[];
    console.log('Generated text result:', result);
    
    if (!result || !result[0] || typeof result[0].generated_text !== 'string') {
      throw new Error('Invalid response format from text generation pipeline');
    }
    
    return result[0].generated_text;
  } catch (error) {
    console.error('Error in text generation:', error);
    throw error;
  }
};

export const analyzeSentiment = async (text: string): Promise<number> => {
  try {
    if (!sentimentPipeline) {
      console.log('Attempting to initialize sentiment pipeline...');
      const initialized = await initializeAIService();
      if (!initialized || !sentimentPipeline) {
        throw new Error('Could not initialize sentiment pipeline');
      }
    }

    console.log('Analyzing sentiment for text:', text);
    const options: SentimentOptions = {
      wait_for_model: true
    };
    
    const result = await sentimentPipeline(text, options) as SentimentResult[];
    console.log('Sentiment analysis result:', result);
    
    if (!result || !result[0] || typeof result[0].score !== 'number') {
      throw new Error('Invalid response format from sentiment pipeline');
    }
    
    return result[0].score;
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    throw error;
  }
};