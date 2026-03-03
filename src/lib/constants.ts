// Application constants
export const APP_CONFIG = {
  name: 'AI Revolution',
  description: 'Experience the future of artificial intelligence',
  version: '1.0.0',
  
  // Performance settings
  MAX_PARTICLES: 20,
  ANIMATION_DURATION: {
    slow: 30,
    medium: 15,
    fast: 5
  },
  
  // API endpoints
  API: {
    AI: '/api/ai',
    AUTH: '/api/auth',
    USER: '/api/user'
  },
  
  // Learning paths
  LEARNING_DIFFICULTIES: ['Beginner', 'Intermediate', 'Advanced'] as const,
  
  // AI generation types
  AI_TYPES: ['text', 'image', 'music', 'video', 'code'] as const,
  
  // Color themes
  COLORS: {
    primary: 'blue',
    secondary: 'purple',
    accent: 'pink',
    success: 'green',
    warning: 'yellow',
    error: 'red'
  }
} as const;
