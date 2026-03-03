// Environment variables and configuration
export const env = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AI Revolution',
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Experience the future of artificial intelligence',
  
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  AI_SERVICE_URL: process.env.AI_SERVICE_URL || 'https://api.openai.com',
  
  ENABLE_AI_FEATURES: process.env.ENABLE_AI_FEATURES === 'true',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_MODE: process.env.ENABLE_DEBUG_MODE === 'true',
} as const;

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
