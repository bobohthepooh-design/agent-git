export interface AIGenerationRequest {
  type: 'text' | 'image' | 'music' | 'video' | 'code';
  prompt: string;
  options?: {
    style?: string;
    size?: string;
    language?: string;
    genre?: string;
    mood?: string;
    duration?: string;
    resolution?: string;
  };
}

export interface AIGenerationResponse {
  content?: string;
  url?: string;
  code?: string;
  duration?: string;
  resolution?: string;
  genre?: string;
  mood?: string;
  style?: string;
  size?: string;
  language?: string;
  lines?: number;
  tokens?: number;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface PerformanceMetrics {
  cpuUsage: number;
  responseTime: number;
  throughput: number;
  serverLoad: number;
  uptime: number;
  requests: number;
}
