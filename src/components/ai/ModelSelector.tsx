import React, { useMemo } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import Select from '../ui/Select';
import { providerModels } from '../../lib/config';
import { useI18n } from '../../i18n/i18n';

const ModelSelector: React.FC = () => {
  const { provider, model, setModel } = useSettingsStore();
  const { t } = useI18n();

  const options = useMemo(
    () => providerModels[provider]?.map((m) => ({ value: m, label: m })) || [],
    [provider]
  );

  return (
    <Select
      label={t('settings.model') || 'Model'}
      value={model}
      onChange={(e) => setModel(e.target.value)}
      options={options}
    />
  );
};

export default ModelSelector;
