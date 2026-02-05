// Application configuration
export const config = {
  // WebSocket URL for backend connection
  wsUrl: 'ws://localhost:8000/ws',

  // API Base URL
  apiBaseUrl: 'http://localhost:8000/api/v1',

  // Default model (will be overridden by first available model from backend)
  defaultModelId: 'gpt-4o',
} as const;
