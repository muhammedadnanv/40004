import { pipeline } from '@huggingface/transformers';

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

// Define specific pipeline types
type HuggingFacePipeline = Awaited<ReturnType<typeof pipeline>>;

let textGenerationPipeline: HuggingFacePipeline | null = null;
let sentimentPipeline: HuggingFacePipeline | null = null;

const initializePipelines = async () => {
  if (!textGenerationPipeline) {
    textGenerationPipeline = await pipeline('text-generation', 'gpt2', {
      device: 'webgpu',
      quantized: true // Enable quantization for better performance
    });
  }
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline('sentiment-analysis', undefined, {
      device: 'webgpu',
      quantized: true
    });
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    await initializePipelines();
    
    if (!textGenerationPipeline) {
      throw new Error('Text generation pipeline not initialized');
    }

    console.log('Generating text using WebGPU acceleration...');
    const output = await textGenerationPipeline(prompt, {
      max_length: 100,
      do_sample: true,
      temperature: 0.7,
      num_beams: 4, // Enable beam search for better quality
      batch_size: 1
    } as any) as unknown as TextGenerationResult;

    if ('results' in output) {
      return output.results[0]?.generated_text || '';
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

    console.log('Analyzing sentiment using WebGPU acceleration...');
    const output = await sentimentPipeline(text, {
      truncation: true,
      batch_size: 1
    } as any) as unknown as TextClassificationResult;

    if ('results' in output) {
      return output.results[0]?.label || 'NEUTRAL';
    }
    
    return (output as TextClassificationSingle).label || 'NEUTRAL';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};