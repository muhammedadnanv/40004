import { supabase } from "@/integrations/supabase/client";

interface ProcessedData {
  id: string;
  timestamp: Date;
  category: string;
  metrics: {
    enrollmentRate: number;
    completionRate: number;
    userEngagement: number;
  };
}

const PROCESSING_INTERVAL = 5 * 60 * 1000; // 5 minutes
const BATCH_SIZE = 100;

export class DataProcessor {
  private static instance: DataProcessor;
  private processingQueue: Map<string, any>;
  private lastProcessedTimestamp: Date;

  private constructor() {
    this.processingQueue = new Map();
    this.lastProcessedTimestamp = new Date();
    this.initializeProcessor();
  }

  public static getInstance(): DataProcessor {
    if (!DataProcessor.instance) {
      DataProcessor.instance = new DataProcessor();
    }
    return DataProcessor.instance;
  }

  private async initializeProcessor() {
    console.log("Initializing data processor...");
    this.startPeriodicProcessing();
    await this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(BATCH_SIZE);

      if (paymentsError) throw paymentsError;

      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(BATCH_SIZE);

      if (referralsError) throw referralsError;

      // Process and store initial data
      this.processDataBatch([...payments, ...referrals]);
      console.log("Initial data loaded and processed");
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }

  private startPeriodicProcessing() {
    setInterval(() => {
      this.processBatchedData();
    }, PROCESSING_INTERVAL);
  }

  private async processBatchedData() {
    console.log("Processing batched data...");
    const currentTimestamp = new Date();
    
    try {
      const { data: newData, error } = await supabase
        .from('payments')
        .select('*')
        .gt('created_at', this.lastProcessedTimestamp.toISOString())
        .order('created_at', { ascending: true })
        .limit(BATCH_SIZE);

      if (error) throw error;

      if (newData && newData.length > 0) {
        this.processDataBatch(newData);
        console.log(`Processed ${newData.length} new records`);
      }

      this.lastProcessedTimestamp = currentTimestamp;
    } catch (error) {
      console.error("Error processing batched data:", error);
    }
  }

  private processDataBatch(data: any[]) {
    data.forEach(item => {
      const processedData = this.processItem(item);
      this.processingQueue.set(processedData.id, processedData);
    });
  }

  private processItem(item: any): ProcessedData {
    return {
      id: item.id,
      timestamp: new Date(item.created_at),
      category: item.program_title || 'unknown',
      metrics: {
        enrollmentRate: this.calculateEnrollmentRate(item),
        completionRate: this.calculateCompletionRate(item),
        userEngagement: this.calculateUserEngagement(item),
      },
    };
  }

  private calculateEnrollmentRate(item: any): number {
    // Implement enrollment rate calculation logic
    return Math.random(); // Placeholder implementation
  }

  private calculateCompletionRate(item: any): number {
    // Implement completion rate calculation logic
    return Math.random(); // Placeholder implementation
  }

  private calculateUserEngagement(item: any): number {
    // Implement user engagement calculation logic
    return Math.random(); // Placeholder implementation
  }

  public getProcessedData(id: string): ProcessedData | undefined {
    return this.processingQueue.get(id);
  }

  public getAllProcessedData(): ProcessedData[] {
    return Array.from(this.processingQueue.values());
  }

  public getMetricsSummary() {
    const data = this.getAllProcessedData();
    return {
      averageEnrollmentRate: this.calculateAverage(data.map(d => d.metrics.enrollmentRate)),
      averageCompletionRate: this.calculateAverage(data.map(d => d.metrics.completionRate)),
      averageUserEngagement: this.calculateAverage(data.map(d => d.metrics.userEngagement)),
      totalRecords: data.length,
      lastProcessed: this.lastProcessedTimestamp,
    };
  }

  private calculateAverage(numbers: number[]): number {
    return numbers.length > 0 
      ? numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length 
      : 0;
  }
}

// Initialize the data processor
export const dataProcessor = DataProcessor.getInstance();