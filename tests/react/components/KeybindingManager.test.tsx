import React, { ReactNode, useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';
import KeybindingManager from '../../../src/react/components/KeybindingManager';
import * as usePlaybackControlModule from '../../../src/react/hooks/usePlaybackControl';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { lightTheme } from '@adobe/react-spectrum';
import { initialSettings } from '../../../src/react/SettingsSchema';

jest.mock('../../../src/react/hooks/useKeybindings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

interface MockSettingsProviderProps {
  children: ReactNode;
}

const MockSettingsProvider: React.FC<MockSettingsProviderProps> = ({ children }) => {
  const mockSettings = {
    ...initialSettings,
    keybindings: {
      ...initialSettings.keybindings,
      play: ' ',
      // Other keybindings if necessary
    },
  };

  return (
    <SettingsContext.Provider value={{ settings: mockSettings, showSettingsMenu: false, setShowSettingsMenu: () => {}, dispatch: () => {}, getThemeObject: () => lightTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

describe('KeybindingManager component', () => {
  it('calls useKeybindings hook', () => {
    render(<KeybindingManager />);
    const useKeybindings = require('../../../src/react/hooks/useKeybindings').default;
    expect(useKeybindings).toHaveBeenCalled();
  });
});
