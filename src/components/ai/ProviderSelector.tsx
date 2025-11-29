import React from 'react';
import { useSettingsStore, ProviderId } from '../../store/useSettingsStore';
import Select from '../ui/Select';
import { useI18n } from '../../i18n/i18n';

const ProviderSelector: React.FC = () => {
  const { provider, setProvider } = useSettingsStore();
  const { t } = useI18n();
  const options = [
    { value: 'default', label: 'Default' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'google', label: 'Google' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'local', label: 'Local' },
  ];

  return (
    <Select
      label={t('settings.provider') || 'Provider'}
      value={provider}
      onChange={(e) => setProvider(e.target.value as ProviderId)}
      options={options}
    />
  );
};

export default ProviderSelector;
