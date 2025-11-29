import { create } from 'zustand';
import { providerModels } from '../lib/config';

export type ProviderId = 'default' | 'openai' | 'google' | 'anthropic' | 'local';

interface SettingsState {
  provider: ProviderId;
  model: string;
  apiKeys: Partial<Record<ProviderId, string>>;
  setProvider: (provider: ProviderId) => void;
  setModel: (model: string) => void;
  setApiKey: (provider: ProviderId, key: string) => void;
}

const SETTINGS_KEY = 'megalai_settings';

const loadSettings = () => {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Partial<SettingsState>;
  } catch (e) {
    console.error('Failed to parse settings', e);
    return null;
  }
};

const persist = (state: SettingsState) => {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({ provider: state.provider, model: state.model, apiKeys: state.apiKeys })
  );
};

export const useSettingsStore = create<SettingsState>((set, get) => {
  const stored = loadSettings();
  const initialProvider = stored?.provider || 'default';
  const initialModel = stored?.model || providerModels[initialProvider][0];

  return {
    provider: initialProvider,
    model: initialModel,
    apiKeys: stored?.apiKeys || {},
    setProvider: (provider) =>
      set((state) => {
        const nextModel = providerModels[provider][0];
        const nextState = { ...state, provider, model: nextModel } as SettingsState;
        persist(nextState);
        return nextState;
      }),
    setModel: (model) =>
      set((state) => {
        const nextState = { ...state, model } as SettingsState;
        persist(nextState);
        return nextState;
      }),
    setApiKey: (provider, key) =>
      set((state) => {
        const apiKeys = { ...state.apiKeys, [provider]: key };
        const nextState = { ...state, apiKeys } as SettingsState;
        persist(nextState);
        return nextState;
      }),
  };
});
