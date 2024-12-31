import { pipeline, Pipeline } from '@huggingface/transformers';

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

type TextGenerationResult = TextGenerationOutput | TextGenerationSingle;
type TextClassificationResult = TextClassificationOutput | TextClassificationSingle;

let textGenerationPipeline: Pipeline | null = null;
let sentimentPipeline: Pipeline | null = null;

const initializePipelines = async () => {
  if (!textGenerationPipeline) {
    textGenerationPipeline = await pipeline('text-generation', 'gpt2') as Pipeline;
  }
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline('sentiment-analysis') as Pipeline;
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    await initializePipelines();
    
    if (!textGenerationPipeline) {
      throw new Error('Text generation pipeline not initialized');
    }

    const output = await textGenerationPipeline(prompt, {
      max_length: 100,
      num_return_sequences: 1,
    }) as TextGenerationResult;

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

    const output = await sentimentPipeline(text) as TextClassificationResult;

    if ('results' in output) {
      return output.results[0]?.label || 'NEUTRAL';
    }
    
    return output.label || 'NEUTRAL';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};