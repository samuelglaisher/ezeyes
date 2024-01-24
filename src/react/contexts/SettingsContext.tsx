import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Settings, initialSettings } from '../SettingsSchema';
import { settingsReducer } from '../hooks/settingsReducer';

interface SettingsContextType {
  settings: Settings;
  dispatch: React.Dispatch<any>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  dispatch: () => {}
});

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
