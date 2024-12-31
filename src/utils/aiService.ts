import { Pipeline, pipeline, TextGenerationPipeline, TextClassificationPipeline } from '@huggingface/transformers';

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

let textGenerationPipeline: TextGenerationPipeline | null = null;
let sentimentPipeline: TextClassificationPipeline | null = null;

const initializePipelines = async () => {
  if (!textGenerationPipeline) {
    textGenerationPipeline = await pipeline('text-generation', 'gpt2');
  }
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline('sentiment-analysis');
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
    const output = await textGenerationPipeline(processedPrompt);

    if (Array.isArray(output)) {
      return output[0]?.generated_text || '';
    }
    
    return (output as TextGenerationSingle).generated_text || '';
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

    const output = await sentimentPipeline(text);
    
    if (Array.isArray(output)) {
      return output[0]?.label || 'NEUTRAL';
    }
    
    return (output as TextClassificationSingle).label || 'NEUTRAL';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};