import '@testing-library/jest-dom';
import React from 'react';
import SettingsMenu from '../../../src/react/components/SettingsMenu';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { initialSettings } from '../../../src/react/SettingsSchema';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { MenuManagerProvider } from '../../../src/react/contexts/MenuManagerContext';

const mockDispatch = jest.fn();
const mockSetShowSettingsMenu = jest.fn();
const mockGetThemeObject = jest.fn();

console.log = jest.fn();
console.error = jest.fn();

const TestSettingsProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider theme={defaultTheme}>
    <MenuManagerProvider>
      <SettingsContext.Provider value={{
        settings: initialSettings,
        dispatch: mockDispatch,
        showSettingsMenu: false,
        setShowSettingsMenu: mockSetShowSettingsMenu,
        getThemeObject: mockGetThemeObject
      }}>
        {children}
      </SettingsContext.Provider>
    </MenuManagerProvider>
  </Provider>
);

const TestSettingsMenu = () => (
  <TestSettingsProvider>
    <SettingsMenu onClose={() => {}} />
  </TestSettingsProvider>
);

describe('SettingsMenu component', () => {
  test('displays all attributes in the SettingsContext', async () => {
    render(<TestSettingsMenu />);

    const tabs = await screen.findByRole('tablist');
    const processingTab = within(tabs).getByText('Processing');
    fireEvent.click(processingTab);
    const panel = await screen.findByRole('tabpanel', { name: /processing/i });

    expect(within(panel).getByTestId('speed-mode-picker')).toBeInTheDocument();

    const wpmSliderInput = within(panel).getByRole('slider', { name: /words per minute/i }) as HTMLInputElement;
    expect(wpmSliderInput).toBeInTheDocument();
    expect(wpmSliderInput.value).toBe('300');

    const wordSequenceInput = within(panel).getByTestId('word-sequence-length-field') as HTMLInputElement;
    expect(wordSequenceInput).toBeInTheDocument();
    expect(wordSequenceInput.value).toBe('1');

    const displayTab = within(tabs).getByText('Display');
    fireEvent.click(displayTab);
    const displayPanel = await screen.findByRole('tabpanel', { name: /display/i });

    expect(within(displayPanel).getByTestId('ui-size-picker')).toBeInTheDocument();
    expect(within(displayPanel).getByTestId('ui-size-picker').textContent).toContain('Medium');
    expect(within(displayPanel).getByTestId('theme-picker').textContent).toContain('Dark');
    expect(within(displayPanel).getByTestId('display-type-picker').textContent).toContain('Zoom');

    const textPanelFontSizeInput = within(displayPanel).getByTestId('text-panel-font-size-field') as HTMLInputElement;
    expect(textPanelFontSizeInput).toBeInTheDocument();
    expect(Number(textPanelFontSizeInput.value)).toEqual(16);

    const readerPanelFontSizeInput = within(displayPanel).getByTestId('reader-panel-font-size-field') as HTMLInputElement;
    expect(readerPanelFontSizeInput).toBeInTheDocument();
    expect(Number(readerPanelFontSizeInput.value)).toEqual(36);

    const overlayTab = within(tabs).getByText('Overlay');
    fireEvent.click(overlayTab);
    const overlayPanel = await screen.findByRole('tabpanel', { name: /overlay/i });

    const overlayRedSlider = within(overlayPanel).getByRole('slider', { name: /red/i }) as HTMLInputElement;
    expect(overlayRedSlider).toBeInTheDocument();
    expect(overlayRedSlider.value).toBe('255');

    const filterTab = within(tabs).getByText('Filter');
    fireEvent.click(filterTab);
    const filterPanel = await screen.findByRole('tabpanel', { name: /filter/i });

    const blurSlider = within(filterPanel).getByRole('slider', { name: /blur/i }) as HTMLInputElement;
    expect(blurSlider).toBeInTheDocument();
    expect(blurSlider.value).toBe('0');

    expect((within(filterPanel).getByRole('slider', { name: /brightness/i }) as HTMLInputElement).value).toBe('1');
    expect((within(filterPanel).getByRole('slider', { name: /contrast/i }) as HTMLInputElement).value).toBe('1');
    expect((within(filterPanel).getByRole('slider', { name: /grayscale/i }) as HTMLInputElement).value).toBe('0');
    expect((within(filterPanel).getByRole('slider', { name: /hue rotate/i }) as HTMLInputElement).value).toBe('0');
    expect((within(filterPanel).getByRole('slider', { name: /invert/i }) as HTMLInputElement).value).toBe('0');
    expect((within(filterPanel).getByRole('slider', { name: /opacity/i }) as HTMLInputElement).value).toBe('1');
    expect((within(filterPanel).getByRole('slider', { name: /saturate/i }) as HTMLInputElement).value).toBe('1');
    expect((within(filterPanel).getByRole('slider', { name: /sepia/i }) as HTMLInputElement).value).toBe('0');

    const keybindsTab = within(tabs).getByText('Keybindings');
    fireEvent.click(keybindsTab);
    const keybindsPanel = await screen.findByRole('tabpanel', { name: /keybindings/i });

    const playKeybindInput = within(keybindsPanel).getByTestId('play-keybind-input') as HTMLInputElement;
    expect(playKeybindInput).toBeInTheDocument();
    expect(playKeybindInput.textContent).toBe('space');

    const nextWordKeybindInput = within(keybindsPanel).getByTestId('nextWord-keybind-input') as HTMLInputElement;
    expect(nextWordKeybindInput).toBeInTheDocument();
    expect(nextWordKeybindInput.textContent).toBe('right');

    const prevWordKeybindInput = within(keybindsPanel).getByTestId('prevWord-keybind-input') as HTMLInputElement;
    expect(prevWordKeybindInput).toBeInTheDocument();
    expect(prevWordKeybindInput.textContent).toBe('left');
  });
});
