import '@testing-library/jest-dom';
import React from 'react';
import SettingsMenu from '../../../src/react/components/SettingsMenu';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { initialSettings, PanelDisplayType, ThemeType, UISize, WPMType } from '../../../src/react/SettingsSchema';
import { DialogContainer, Provider, defaultTheme } from '@adobe/react-spectrum';
import { MenuManagerContext, MenuManagerContextType } from '../../../src/react/contexts/MenuManagerContext';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';


interface WrapperProps {
  children: React.ReactNode;
};

const mockMenuManagerContext: MenuManagerContextType = {
  currentMenu: undefined,
  setCurrentMenu: () => {}
};

const mockDispatch = jest.fn();
const mockSetShowSettingsMenu = jest.fn();
const mockGetThemeObject = jest.fn();
console.error = jest.fn();

function TestSettingsMenu() {
  const { closeMenu } = useMenuManager();

  return (
    <Provider theme={defaultTheme}>
      <MenuManagerContext.Provider value={mockMenuManagerContext}>
        <DialogContainer onDismiss={closeMenu}>
        <SettingsContext.Provider value={{ settings: {
            processing: {
                wpm: {
                    type: WPMType.NORMAL,
                    assisted: {
                        min: 10,
                        max: 100,
                        current: 50,
                    },
                    normal: {
                        min: 200,
                        max: 700,
                        current: 300,
                    },
                    delta: 1,
                },
                wordSequenceLength: 1,
            },
            ui: {
                size: UISize.MEDIUM,
                defaultDisplayType: PanelDisplayType.ZOOM,
                theme: ThemeType.DARK,
                blur: 0,
                brightness: 1,
                contrast: 1,
                grayscale: 0,
                hueRotate: 0,
                invert: 0,
                opacity: 1,
                saturate: 1,
                sepia: 0,
                overlayColor: '#ff00ff00',
            },
            textInputPanel: {
                fontSize: 16,
            },
            readerPanel: {
                fontSize: 36,
            },
            keybindings: {
                play: 'space',
                nextWord: 'right',
                prevWord: 'left',
                openSettings: 's',
                switchView: 'd',
                importFile: 'q',
                prevParagraph: "shift+up",
                nextParagraph: "shift+down",
                prevSentence: "up",
                nextSentence: "down",
                flipFlashcard: "f",
                backToTop: "ctrl+up",
                search: 'ctrl+f',
                increaseSpeed: 'shift+right',
                decreaseSpeed: 'shift+left',
            },
        }, 
        dispatch: mockDispatch,
        showSettingsMenu: false,
        setShowSettingsMenu: mockSetShowSettingsMenu,
        getThemeObject: mockGetThemeObject 
        }}>
            <SettingsMenu onClose={closeMenu} />
          </SettingsContext.Provider>
        </DialogContainer>
      </MenuManagerContext.Provider>
    </Provider>
  );
}

describe('SettingsMenu', () => {
  it('renders the settings menu', () => {
    render(<TestSettingsMenu />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
