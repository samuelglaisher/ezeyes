import React, { useContext, useState, ReactNode, ReactElement } from 'react';
import PanelViewport from '../../../src/react/components/PanelViewport';
import { render, fireEvent, waitFor, act, getByTestId } from '@testing-library/react';
import { PanelContext, PanelContextType } from '../../../src/react/contexts/PanelContext';
import { PanelType, PanelViewportContext, PanelViewportContextType } from '../../../src/react/contexts/PanelViewportContext';
import { Provider, defaultTheme, lightTheme } from '@adobe/react-spectrum';
import { initialSettings, PanelDisplayType } from '../../../src/react/SettingsSchema';
import '@testing-library/jest-dom';
import { usePanel } from '../../../src/react/hooks/usePanel';
import TextInputDisplayPanel from '../../../src/react/components/TextInputDisplayPanel';
import { SettingsContext, SettingsContextType } from '../../../src/react/contexts/SettingsContext';

/**
 * Mocked component to test play state functionality
 */
const MockedPlayStateTestComponent = () => {
  const { isPlaying, setIsPlaying } = useContext(PanelContext);

  return (
    <>
      <PanelViewport />
      <div data-testid="isPlaying">{isPlaying.toString()}</div>
    </>
  );
};

/**
 * Interface representing the props for the mocked PanelContextProvider component
 */
interface MockedPanelContextProviderProps {
  children: ReactNode;
  value?: Partial<PanelContextType>;
}

/**
 * Mocked values for the PanelContext
 */
const mockPanelContextDefaults: PanelContextType = {
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

const MockedPanelContextProvider: React.FC<MockedPanelContextProviderProps> = ({ children, value }) => {
  const [isPlaying, setIsPlaying] = useState(value?.isPlaying ?? false);

  const mockPanelContext = {
    ...mockPanelContextDefaults,
    ...value,
    isPlaying,
    setIsPlaying,
  };

  return <PanelContext.Provider value={mockPanelContext}>{children}</PanelContext.Provider>;
};

const mockSettingsContextDefaults: SettingsContextType = {
    settings: initialSettings,
    showSettingsMenu: false,
    setShowSettingsMenu: jest.fn(),
    dispatch: jest.fn(),
    getThemeObject: jest.fn(),
};


/**
 * Interface representing the props for the mocked PanelViewportContext component
 */
interface MockedPanelViewportContextProviderProps {
  children: ReactNode;
  value?: Partial<PanelViewportContextType>;
}

/**
 * Mocked values for the PanelViewportContext
 */
const mockPanelViewportContextDefaults: PanelViewportContextType = {
  activeView: PanelDisplayType.HORIZONTAL,
  setActiveView: jest.fn(),
  activeFlashcard: PanelType.READER,
  setActiveFlashcard: jest.fn(),
};

const MockedPanelViewportContextProvider: React.FC<MockedPanelViewportContextProviderProps> = ({ children, value }) => {
  const mockPanelViewportContext = {
    ...mockPanelViewportContextDefaults,
    ...value,
  };

  return <PanelViewportContext.Provider value={mockPanelViewportContext}>{children}</PanelViewportContext.Provider>;
};

/**
 * Renders both the PanelContextProvider and PanelViewportContextProvider with the given values, allowing overrides for specific tests
 */
const renderWithProviders = (ui: ReactElement, panelContextValue?: Partial<PanelContextType>, panelViewportContextValue?: Partial<PanelViewportContextType>) => {
  return render(
    <Provider theme={defaultTheme}>
      <MockedPanelContextProvider value={panelContextValue}>
        <MockedPanelViewportContextProvider value={panelViewportContextValue}>
          {ui}
        </MockedPanelViewportContextProvider>
      </MockedPanelContextProvider>
    </Provider>
  );
};

describe('PanelViewport component', () => {
  it('renders PanelViewport component', () => {
    renderWithProviders(<PanelViewport />);
    const headerRes = document.getElementsByTagName('header');
    const sectionRes = document.getElementsByTagName('section');
    const footerRes = document.getElementsByTagName('footer');

    expect(headerRes.length).toEqual(1);
    expect(sectionRes.length).toEqual(1);
    expect(footerRes.length).toEqual(1);
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<PanelViewport />);
    expect(container).toBeTruthy();
  });

  it('renders horizontal view', () => {
    renderWithProviders(<PanelViewport />);
    const panelContainer = document.getElementById('horizontal-panel-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('renders vertical view', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.VERTICAL });
    const panelContainer = document.getElementById('vertical-panel-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('renders zoom view', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.ZOOM });
    const panelContainer = document.getElementById('zoom-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('renders flashcard view', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.FLASHCARD });
    const panelContainer = document.getElementById('flashcard-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('toggles play/pause button functionality correctly', () => {
    const { getByTestId } = renderWithProviders(<MockedPlayStateTestComponent />);

    const playPauseButton = getByTestId("play-btn-test-id");
    const isPlayingDiv = getByTestId("isPlaying");

    expect(isPlayingDiv.textContent).toBe('false');
    fireEvent.click(playPauseButton);
    expect(isPlayingDiv.textContent).toBe('true');
    fireEvent.click(playPauseButton);
    expect(isPlayingDiv.textContent).toBe('false');
  });

  it('Navigate forward button calls navigateForward function', () => {
    // Mock the usePanel hook's functions locally within this test
    const mockNavigateForward = jest.fn();
    jest.spyOn(require('../../../src/react/hooks/usePanel'), 'usePanel').mockImplementation(() => ({
      navigateForward: mockNavigateForward,
      navigateBackward: jest.fn(),
      togglePlayPause: jest.fn(),
    }));

    const { getByTestId } = renderWithProviders(<PanelViewport />);
    const navigateForwardButton = getByTestId("navigate-forward-btn-test-id");
    fireEvent.click(navigateForwardButton);
    expect(mockNavigateForward).toHaveBeenCalled();
  });

  it('Navigate backward button calls navigateBackward function', () => {
    // Mock the usePanel hook's functions locally within this test
    const mockNavigateBackward = jest.fn();
    jest.spyOn(require('../../../src/react/hooks/usePanel'), 'usePanel').mockImplementation(() => ({
      navigateForward: jest.fn(),
      navigateBackward: mockNavigateBackward,
      togglePlayPause: jest.fn(),
    }));

    const { getByTestId } = renderWithProviders(<PanelViewport />);
    const navigateBackwardButton = getByTestId("navigate-backward-btn-test-id");
    fireEvent.click(navigateBackwardButton);
    expect(mockNavigateBackward).toHaveBeenCalled();
  });

  it('Panel Viewport Rendered with No Content', () => {
    const { container } = renderWithProviders(<PanelViewport />);
    expect(container).toBeTruthy();
  });

  it('Horizontal View Rendered with No Content (Default View Rendered with No Content)', () => {
    renderWithProviders(<PanelViewport />);
    const panelContainer = document.getElementById('horizontal-panel-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('Vertical View Rendered with No Content', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.VERTICAL });
    const panelContainer = document.getElementById('vertical-panel-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('ZoomView View Rendered with No Content', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.ZOOM });
    const panelContainer = document.getElementById('zoom-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('Flashcard View Rendered with No Content', () => {
    renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.FLASHCARD });
    const panelContainer = document.getElementById('flashcard-container');
    expect(panelContainer).toBeInTheDocument();
  });

  it('Horizontal View with Very Long Text', () => {
    const text = 'a '.repeat(10000);

    const start = performance.now();
    renderWithProviders(
      <PanelViewport />,
      { textContent: text },
      { activeView: PanelDisplayType.HORIZONTAL }
    );
    const end = performance.now();
    const renderTime = end - start;

    const panelContainer = document.getElementById('horizontal-panel-container');

    expect(renderTime).toBeLessThan(5000);
    waitFor(() => expect(panelContainer).toBeInTheDocument());
    waitFor(() => expect(panelContainer?.textContent).toContain(text));
  });

  it('Vertical View with Very Long Text', () => {
    const text = 'a '.repeat(10000);

    const start = performance.now();
    renderWithProviders(
      <PanelViewport />,
      { textContent: text },
      { activeView: PanelDisplayType.VERTICAL }
    );
    const end = performance.now();
    const renderTime = end - start;

    const panelContainer = document.getElementById('vertical-panel-container');

    expect(renderTime).toBeLessThan(5000);
    waitFor(() => expect(panelContainer).toBeInTheDocument());
    waitFor(() => expect(panelContainer?.textContent).toContain(text));
  });

  it('Zoom View with Very Long Text', () => {
    const text = 'a '.repeat(10000);

    const start = performance.now();
    renderWithProviders(
      <PanelViewport />,
      { textContent: text },
      { activeView: PanelDisplayType.ZOOM }
    );
    const end = performance.now();
    const renderTime = end - start;

    const panelContainer = document.getElementById('zoom-panel-container');

    expect(renderTime).toBeLessThan(5000);
    waitFor(() => expect(panelContainer).toBeInTheDocument());
    waitFor(() => expect(panelContainer?.textContent).toContain(text));
  });

  it('Flashcard View with Very Long Text', () => {
    const text = 'a '.repeat(10000);

    const start = performance.now();
    renderWithProviders(
      <PanelViewport />,
      { textContent: text },
      { activeView: PanelDisplayType.FLASHCARD }
    );
    const end = performance.now();
    const renderTime = end - start;

    const panelContainer = document.getElementById('flashcard-panel-container');

    expect(renderTime).toBeLessThan(5000);
    waitFor(() => expect(panelContainer).toBeInTheDocument());
    waitFor(() => expect(panelContainer?.textContent).toContain(text));
  });

//   it('Attempt to set word sequence length to 2 sets highlighting to 2', async () => {
//     const updatedText = "Hello world, this is a test.";
//     const updatedMockPanelContext = {
//       ...mockPanelContextDefaults,
//       textContent: updatedText,
//       wordIndices: [0, 6, 13, 18, 21, 23, 28] // Indices for each word
//     };

//     const { getByTestId, rerender } = render(
//       <SettingsContext.Provider value={mockSettingsContextDefaults}>
//         <PanelContext.Provider value={updatedMockPanelContext}>
//           <TextInputDisplayPanel />
//         </PanelContext.Provider>
//       </SettingsContext.Provider>
//     );

//     act(() => {
//       mockSettingsContextDefaults.settings.processing.wordSequenceLength = 2;
//       mockSettingsContextDefaults.dispatch({ type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: 2 });
//     });

//     rerender(
//       <SettingsContext.Provider value={mockSettingsContextDefaults}>
//         <PanelContext.Provider value={updatedMockPanelContext}>
//           <TextInputDisplayPanel />
//         </PanelContext.Provider>
//       </SettingsContext.Provider>
//     );

//     await waitFor(() => {
//       expect(mockSettingsContextDefaults.settings.processing.wordSequenceLength).toBe(2);
//     });

//     await waitFor(() => {
//       const textInputDisplayPanel = getByTestId('text-input-panel-test-id');
//       console.log(textInputDisplayPanel.innerHTML); // Add this line to debug the actual content
//       const highlightedWords = textInputDisplayPanel.querySelectorAll('.highlight');

//       expect(highlightedWords.length).toBe(2);
//       expect(highlightedWords[0].textContent).toBe('Hello');
//       expect(highlightedWords[1].textContent).toBe('world');
//     });
//   });


  it('Flashcard view flips between ReaderDisplayPanel and TextInputDisplayPanel', () => {
    const { getByTestId } = renderWithProviders(<PanelViewport />, {}, { activeView: PanelDisplayType.FLASHCARD });
    const flashcardContainer = getByTestId('flashcard-container-test-id');

    waitFor(() => expect(flashcardContainer).not.toHaveClass('flipped'));

    fireEvent.click(flashcardContainer);
    waitFor(() => expect(flashcardContainer).toHaveClass('flipped'));

    fireEvent.click(flashcardContainer);
    waitFor(() => expect(flashcardContainer).not.toHaveClass('flipped'));
  });


  it('Reader panel is able to display special characters', async () => {
    const specialCharacters = String.raw`!"#$%&'()*+,44-./01234567🗼🗽🗾🗿128🤠🤡🤢🤣129315🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯129327🤰🤹🤺🤻129339🤼🤽🤾🤿🥀🥁🥂🥃🥄🥅🥆🥇1🥍🥎🥏🥐🥥🥦🥧🥨🥩🥪🥫129387🥬🥭🥮🥯🥰🥱🥲🥳🥴🥵🥶🥷129399🥸🥹/Map (U+1F🚍🚎59🛸🛹🛺🛻🛼🛽🛾🛿128767٤`;
    const { container, getByTestId } = renderWithProviders(
      <PanelViewport />,
      { textContent: specialCharacters },
      { activeView: PanelDisplayType.HORIZONTAL }
    );

    const readerDisplayPanel = getByTestId("reader-display-panel-test-id");
    const textInputDisplayPanel = getByTestId("text-input-panel-test-id");

    waitFor(() => expect(textInputDisplayPanel.textContent).toEqual(specialCharacters));
    waitFor(() => expect(specialCharacters).toContain(readerDisplayPanel.textContent));
    expect(container).toBeTruthy();
  });

});
