import React, { createContext, useReducer, ReactNode } from 'react';
import { initialSettings, Settings } from '../SettingsSchema';

type Action = 
  | { type: 'LOAD_SETTINGS'; payload: Settings }
  | { type: 'UPDATE_SETTING'; key: keyof Settings; value: any };

interface SettingsProviderProps {
  children: ReactNode;
}

//Takes in a state and action and returns a new state
const settingsReducer = (state: Settings, action: Action): Settings => {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return action.payload;
    case 'UPDATE_SETTING':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export const SettingsContext = createContext<{
  settings: Settings;
  dispatch: React.Dispatch<Action>;
}>({ settings: initialSettings, dispatch: () => null });

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
