import React, { ReactElement } from 'react';
import PanelViewport from '../../../src/react/components/PanelViewport';
import { render, RenderOptions } from '@testing-library/react';
import { PanelContext, PanelContextType } from '../../../src/react/contexts/PanelContext';
import { PanelType, PanelViewportContext } from '../../../src/react/contexts/PanelViewportContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { PanelDisplayType } from '../../../src/react/SettingsSchema';
import '@testing-library/jest-dom';

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
    speed: 0,
    setSpeed: jest.fn(),
  };

  const renderWithProviders = (
      ui: React.ReactElement,
      options?: RenderOptions,
      activeView: PanelDisplayType = PanelDisplayType.HORIZONTAL
  ) => {
      return render(
          <Provider theme={defaultTheme}>
              <PanelContext.Provider value={mockPanelContext}>
                  <PanelViewportContext.Provider value={{
                      activeView: activeView,
                      setActiveView: jest.fn(),
                      activeFlashcard: PanelType.READER,
                      setActiveFlashcard: jest.fn(),
                  }}>
                      {ui}
                  </PanelViewportContext.Provider>
              </PanelContext.Provider>
          </Provider>,
          options
      );
  };

describe('PanelViewport component', () => {
    it('renders without crashing', () => {
        const { container } = renderWithProviders(<PanelViewport />);
        expect(container).toBeTruthy();
    });

    it('renders horizontal view', () => {
        const { container } = renderWithProviders(<PanelViewport />);
        const panelContainer = document.getElementById('horizontal-panel-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders vertical view', () => {
        const { container } = renderWithProviders(<PanelViewport />, undefined, PanelDisplayType.VERTICAL);
        const panelContainer = document.getElementById('vertical-panel-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders zoom view', () => {
        const { container } = renderWithProviders(<PanelViewport />, undefined, PanelDisplayType.ZOOM);
        const panelContainer = document.getElementById('zoom-container');
        expect(panelContainer).toBeInTheDocument();
    });

    it('renders flashcard view', () => {
        const { container } = renderWithProviders(<PanelViewport />, undefined, PanelDisplayType.FLASHCARD);
        const panelContainer = document.getElementById('flashcard-container');
        expect(panelContainer).toBeInTheDocument();
    });
});
