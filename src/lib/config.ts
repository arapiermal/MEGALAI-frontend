export const API_BASE_URL = 'http://localhost:8000';

export const providerModels: Record<string, string[]> = {
  default: ['megalai-default-edu-model'],
  openai: ['gpt-4o-mini', 'gpt-4o'],
  google: ['gemini-1.5-flash', 'gemini-2.5-pro'],
  anthropic: ['claude-3-5-sonnet'],
  local: ['llama-3-8B', 'mistral-nemo'],
};
