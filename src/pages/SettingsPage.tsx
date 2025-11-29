import React, { useState } from 'react';
import ProviderSelector from '../components/ai/ProviderSelector';
import ModelSelector from '../components/ai/ModelSelector';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useSettingsStore, ProviderId } from '../store/useSettingsStore';
import { useI18n } from '../i18n/i18n';

const providerLabels: Record<ProviderId, string> = {
  default: 'Default',
  openai: 'OpenAI',
  google: 'Google',
  anthropic: 'Anthropic',
  local: 'Local',
};

const SettingsPage: React.FC = () => {
  const { provider, model, apiKeys, setApiKey } = useSettingsStore();
  const [localKeys, setLocalKeys] = useState(apiKeys);
  const { t } = useI18n();

  const handleSave = (providerId: ProviderId) => {
    const key = localKeys[providerId] || '';
    setApiKey(providerId, key);
  };

  return (
    <div>
      <h1>{t('nav.settings')}</h1>
      <Card title="AI Provider">
        <div className="flex">
          <ProviderSelector />
          <ModelSelector />
        </div>
        <p>
          Active: {provider} / {model}
        </p>
      </Card>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>API Keys</h3>
        {(['default', 'openai', 'google', 'anthropic', 'local'] as ProviderId[]).map((p) => (
          <div key={p} style={{ marginBottom: 12 }}>
            <Input
              label={`${providerLabels[p]} key`}
              value={localKeys[p] || ''}
              onChange={(e) => setLocalKeys({ ...localKeys, [p]: e.target.value })}
            />
            <Button variant="secondary" onClick={() => handleSave(p)}>
              {t('action.save')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
