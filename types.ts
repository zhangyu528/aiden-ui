
export interface TokenMetrics {
  input: number;
  output: number;
  cost: number;
  contextFill: number; // 0 to 100
}

export interface PerformanceMetrics {
  ttft: number; // ms
  tps: number; // tokens per second
  latencies: {
    network: number;
    thinking: number;
    io: number;
  };
}

export interface ThoughtStep {
  id: string;
  timestamp: string;
  stage: 'PARSING' | 'SEARCHING' | 'DECIDING' | 'EXECUTING' | 'REPAIRING';
  content: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

export interface HealthMetrics {
  selfHealRate: number;
  codeDiffRatio: number;
  lintFixes: number;
  activeErrors: number;
}

export interface TimeSeriesPoint {
  time: string;
  tokens: number;
  cost: number;
}
