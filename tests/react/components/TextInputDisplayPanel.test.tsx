import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TextInputDisplayPanel from '../../../src/react/components/TextInputDisplayPanel';
import { PanelContext, PanelContextType } from '../../../src/react/contexts/PanelContext';
import { SettingsContext } from '../../../src/react/contexts/SettingsContext';
import { PanelDisplayType, ThemeType, UISize, WPMType } from '../../../src/react/SettingsSchema';

// Setup the mock context data as provided
const mockPanelContext: PanelContextType = {
  curWordSequence: '',
  setCurWordSequence: jest.fn(),
  textContent: '',
  setTextContent: jest.fn(),
  isPlaying: false,
  setIsPlaying: jest.fn(),
  prevParagraphIndex: 0,
  setPrevParagraphIndex: jest.fn(),
  nextParagraphIndex: 0,
  setNextParagraphIndex: jest.fn(),
  prevSentenceIndex: 0,
  setPrevSentenceIndex: jest.fn(),
  nextSentenceIndex: 0,
  setNextSentenceIndex: jest.fn(),
  prevWordSequenceIndex: 0,
  setPrevWordSequenceIndex: jest.fn(),
  curWordSequenceIndex: 0,
  setCurWordSequenceIndex: jest.fn(),
  nextWordSequenceIndex: 0,
  setNextWordSequenceIndex: jest.fn(),
  formattedTextContent: <></>,
  setFormattedTextContent: jest.fn(),
  sentenceIndices: [],
  setSentenceIndices: jest.fn(),
  paragraphIndices: [],
  setParagraphIndices: jest.fn(),
  wordSequenceIndices: [],
  setWordSequenceIndices: jest.fn(),
  wordIndices: [],
  setWordIndices: jest.fn(),
  generateWordSequenceIndicesFromIndex: jest.fn(),
};

const mockSettingsContext = {
  settings: {
    processing: {
      wpm: {
        type: WPMType.NORMAL,
        assisted: { min: 10, max: 100, current: 50 },
        normal: { min: 200, max: 700, current: 300 },
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
  dispatch: jest.fn(),
  showSettingsMenu: false,
  setShowSettingsMenu: jest.fn(),
  getThemeObject: jest.fn()
};

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <SettingsContext.Provider value={mockSettingsContext}>
      <PanelContext.Provider value={mockPanelContext}>
        {component}
      </PanelContext.Provider>
    </SettingsContext.Provider>
  );
};

describe('TextInputDisplayPanel', () => {
  it('renders without any text content initially', async () => {
    renderWithProviders(<TextInputDisplayPanel />);
    const textInputPanel = await screen.findByTestId('text-input-panel-test-id');
    expect(textInputPanel).toHaveTextContent('');
  });

  it('displays updated text content', async () => {
    // Prepare the mock context with the updated text content
    const updatedText = "Updated text content";
    const updatedMockPanelContext = {
      ...mockPanelContext,
      textContent: updatedText,
      wordIndices: [0, updatedText.length] // Assuming the whole text is one "word"
    };
  
    // Render with the updated context
    const { findByText } = render(
      <SettingsContext.Provider value={mockSettingsContext}>
        <PanelContext.Provider value={updatedMockPanelContext}>
          <TextInputDisplayPanel />
        </PanelContext.Provider>
      </SettingsContext.Provider>
    );
  
    // Now we use findByText, which waits for the element to appear in the DOM
    const textElement = await findByText(updatedText);
    expect(textElement).toBeInTheDocument();
  });


  it('handles paste events correctly', async () => {
    const { getByTestId } = renderWithProviders(<TextInputDisplayPanel />);
    const textInputPanel = getByTestId('text-input-panel-test-id');

    fireEvent.paste(textInputPanel, {
      clipboardData: { getData: () => 'Pasted text' }
    });

    await waitFor(() => {
      expect(mockPanelContext.setTextContent).toHaveBeenCalledWith('Pasted text');
    });
  });
});
