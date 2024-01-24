import { useContext } from 'react';
import { SettingsContext } from '../components/SettingsProvider';

export const useSettings = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  if (!settings) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return { settings, dispatch };
};
