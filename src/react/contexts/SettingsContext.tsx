import React, { createContext, useState, useMemo } from 'react';
import { Settings, initialSettings } from '../SettingsSchema';

interface SettingsContextType {
  settings: Settings;
  showSettingsMenu: boolean;
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  showSettingsMenu: false,
  setShowSettingsMenu: () => {},
  setSettings: () => {}
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    settings,
    setSettings,
    showSettingsMenu,
    setShowSettingsMenu
  }), [settings, showSettingsMenu]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
