import { pipeline, env } from '@huggingface/transformers';
import type { PipelineType, ProgressCallback } from '@huggingface/transformers';

// Configure the transformers.js environment
env.useBrowserCache = true;
env.allowLocalModels = true;

type ModelConfig = {
  task: PipelineType;
  model: string;
};

const models: Record<string, ModelConfig> = {
  textClassification: {
    task: 'text-classification' as PipelineType,
    model: 'Xenova/distilbert-base-uncased'
  },
  questionAnswering: {
    task: 'question-answering' as PipelineType,
    model: 'Xenova/distilbert-base-uncased'
  },
  textGeneration: {
    task: 'text2text-generation' as PipelineType,
    model: 'Xenova/distilbert-base-uncased'
  }
};

export const initializeAIModels = async () => {
  const results = [];

  for (const [key, { task, model }] of Object.entries(models)) {
    const startTime = performance.now();
    console.log(`Initializing ${task} model...`);

    try {
      const pipe = await pipeline(task, model, {
        progress_callback: ((progressInfo: any) => {
          if (typeof progressInfo === 'object' && progressInfo !== null && 'progress' in progressInfo) {
            const progress = progressInfo.progress as number;
            console.log(`Loading ${task} model: ${Math.round(progress * 100)}%`);
          }
        }) as ProgressCallback
      });
      const duration = (performance.now() - startTime).toFixed(2);
      console.log(`${task} model loaded in ${duration}ms`);
      results.push({ task, pipe });
    } catch (error) {
      console.error(`Error loading ${task} model:`, error);
      console.error(`Failed to load ${task} model. Please try refreshing the page.`);
    }
  }

  return results.length > 0;
};

export const classifyText = async (text: string) => {
  try {
    const models = await initializeAIModels();
    if (!models) {
      throw new Error('Text classification model not initialized');
    }

    const result = await models[0].pipe(text, {
      max_length: 128,
      truncation: true
    });

    return result;
  } catch (error) {
    console.error('Text classification error:', error);
    throw error;
  }
};

export const generateText = async (prompt: string) => {
  try {
    const models = await initializeAIModels();
    if (!models) {
      throw new Error('Text generation model not initialized');
    }

    const result = await models[0].pipe(prompt, {
      max_length: 128,
      num_return_sequences: 1
    });

    return result;
  } catch (error) {
    console.error('Text generation error:', error);
    throw error;
  }
};

export const answerQuestion = async (question: string, context: string) => {
  try {
    const models = await initializeAIModels();
    if (!models) {
      throw new Error('Question answering model not initialized');
    }

    const result = await models[0].pipe({
      question,
      context,
      max_length: 128,
      truncation: true
    });

    return result;
  } catch (error) {
    console.error('Question answering error:', error);
    throw error;
  }
};