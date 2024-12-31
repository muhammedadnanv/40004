import { Pipeline, pipeline } from '@huggingface/transformers';

interface Message {
  role: string;
  content: string;
}

type Chat = Message[];

interface TextGenerationSingle {
  generated_text: string;
}

interface TextGenerationOutput {
  results: TextGenerationSingle[];
}

interface TextClassificationSingle {
  label: string;
  score: number;
}

interface TextClassificationOutput {
  results: TextClassificationSingle[];
}

type AnyPipeline = Pipeline & {
  processor?: unknown;
};

let textGenerationPipeline: AnyPipeline | null = null;
let sentimentPipeline: AnyPipeline | null = null;

const initializePipelines = async () => {
  if (!textGenerationPipeline) {
    textGenerationPipeline = await pipeline('text-generation', 'gpt2') as AnyPipeline;
  }
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline('sentiment-analysis') as AnyPipeline;
  }
};

const isChat = (prompt: string | Chat): prompt is Chat => {
  return Array.isArray(prompt) && prompt.length > 0 && 'role' in prompt[0];
};

const chatToString = (chat: Chat): string => {
  return chat.map(message => `${message.role}: ${message.content}`).join('\n');
};

export const generateText = async (prompt: string | Chat): Promise<string> => {
  try {
    await initializePipelines();
    if (!textGenerationPipeline) {
      throw new Error('Text generation pipeline not initialized');
    }

    const processedPrompt = isChat(prompt) ? chatToString(prompt) : prompt;
    const output = await textGenerationPipeline(processedPrompt) as TextGenerationOutput | TextGenerationSingle | TextGenerationSingle[];

    if (Array.isArray(output)) {
      return output[0]?.generated_text || '';
    }
    
    if ('results' in output) {
      return output.results[0]?.generated_text || '';
    }
    
    return output.generated_text || '';
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

export const analyzeSentiment = async (text: string): Promise<string> => {
  try {
    await initializePipelines();
    if (!sentimentPipeline) {
      throw new Error('Sentiment pipeline not initialized');
    }

    const output = await sentimentPipeline(text) as TextClassificationOutput | TextClassificationSingle | TextClassificationSingle[];
    
    if (Array.isArray(output)) {
      return output[0]?.label || 'NEUTRAL';
    }
    
    if ('results' in output) {
      return output.results[0]?.label || 'NEUTRAL';
    }
    
    return output.label || 'NEUTRAL';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};