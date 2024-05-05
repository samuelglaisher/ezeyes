import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeybindInput } from '../../../src/react/components/KeybindInput';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { handleRecord } from '../../../src/react/components/KeybindInput';
import { WPMType, UISize, ThemeType, PanelDisplayType, Keybindings } from '../../../src/react/SettingsSchema';
import '@testing-library/jest-dom';


interface WrapperProps {
    children: React.ReactNode;
};

describe('KeybindInput', () => {
    const mockDispatch = jest.fn();
    const mockSetShowSettingsMenu = jest.fn();
    const mockGetThemeObject = jest.fn();

    // Mock the SettingsContext
    const wrapper: React.FC<WrapperProps> = ({ children }) => (
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
                    }
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
        {children}
        </SettingsContext.Provider>
    );

  test('renders with initial label and key value', () => {
    render(<KeybindInput label="Test Label" keycode="nextWord" keyValue="Right Arrow" />, { wrapper });
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent('Right Arrow');
  });

  test('enters edit mode on click', () => {
    render(<KeybindInput label="Test Label" keycode="nextWord" keyValue="Right Arrow" />, { wrapper });
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    expect(input).toHaveTextContent('???');
  });

  test('prevents default on space bar when editing', () => {
    render(<KeybindInput label="Test Label" keycode="nextWord" keyValue="Right Arrow" />, { wrapper: wrapper });
    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    userEvent.type(input, '{space}');
    const event = new KeyboardEvent('keydown', { code: 'Space', cancelable: true });
    fireEvent(input, event);
    expect(event.defaultPrevented).toBe(true);
  });
});

describe('handleRecord', () => {
    let mockDispatch: Function;
    let mockSetIsEditing: Function;
    let settingsKeybindings: Keybindings;
  
    beforeEach(() => {
      mockDispatch = jest.fn();
      mockSetIsEditing = jest.fn();
      settingsKeybindings = {
        play: 'space',
        nextWord: 'right',
        prevWord: 'left',
        openSettings: 's',
        switchView: 'd',
        importFile: 'q',
        prevParagraph: 'shift+up',
        nextParagraph: 'shift+down',
        prevSentence: 'up',
        nextSentence: 'down',
        flipFlashcard: 'f',
        backToTop: 'ctrl+up',
        search: 'ctrl+f',
        increaseSpeed: 'shift+right',
        decreaseSpeed: 'shift+left',
      };
    });

    test('calls dispatch and updates editing state when sequence is not in settingsKeybindings', () => {
      const sequence = ['ctrl', 'n'];
      handleRecord('nextWord', mockDispatch, settingsKeybindings, mockSetIsEditing, sequence);
  
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "UPDATE_KEYBINDING",
        key: 'nextWord',
        value: 'ctrl n'
      });
      expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    });

    test('does not call dispatch but updates editing state when sequence is in settingsKeybindings', () => {
      const sequence = ['right'];
      handleRecord('nextWord', mockDispatch, settingsKeybindings, mockSetIsEditing, sequence);
  
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    });
  });
