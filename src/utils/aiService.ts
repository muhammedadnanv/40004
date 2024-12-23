import { pipeline, env } from '@huggingface/transformers';
import { useToast } from '@/hooks/use-toast';

// Configure the transformers.js environment
env.useBrowserCache = true;
env.allowLocalModels = true;

const models = {
  'text-classification': 'Xenova/t5-small',
  'question-answering': 'Xenova/t5-small',
  'text-generation': 'Xenova/t5-small'
};

export const initializeAIModels = async () => {
  const toast = useToast();
  const results = [];

  for (const [task, model] of Object.entries(models)) {
    const startTime = performance.now();
    console.log(`Initializing ${task} model...`);

    try {
      const pipe = await pipeline(task, model, {
        progress_callback: (progressInfo) => {
          if ('progress' in progressInfo) {
            console.log(`Loading ${task} model: ${Math.round(progressInfo.progress * 100)}%`);
          }
        }
      });
      const duration = (performance.now() - startTime).toFixed(2);
      console.log(`${task} model loaded in ${duration}ms`);
      results.push({ task, pipe });
    } catch (error) {
      console.error(`Error loading ${task} model:`, error);
      toast({
        title: "Model Loading Error",
        description: `Failed to load ${task} model. Please try refreshing the page.`,
        variant: "destructive"
      });
    }
  }

  return results;
};

export const classifyText = async (text: string) => {
  try {
    const models = await initializeAIModels();
    const classifier = models.find(m => m.task === 'text-classification')?.pipe;
    
    if (!classifier) {
      throw new Error('Text classification model not initialized');
    }

    const result = await classifier(text, {
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
    const generator = models.find(m => m.task === 'text-generation')?.pipe;
    
    if (!generator) {
      throw new Error('Text generation model not initialized');
    }

    const result = await generator(prompt, {
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
    const qa = models.find(m => m.task === 'question-answering')?.pipe;
    
    if (!qa) {
      throw new Error('Question answering model not initialized');
    }

    const result = await qa({
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