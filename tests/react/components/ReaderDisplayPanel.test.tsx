import '@testing-library/jest-dom';
import React from 'react';
import ReaderDisplay from '../../../src/react/components/ReaderDisplayPanel';
import { render } from '@testing-library/react';
import { PanelContext, PanelContextType } from '../../../src/react/contexts/PanelContext';
import { screen } from '@testing-library/react';


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


describe('ReaderDisplay', () => {
  it('renders the current word sequence', () => {
    mockPanelContext.curWordSequence = 'Hello World';
    render(
      <PanelContext.Provider value={mockPanelContext}>
        <ReaderDisplay />
      </PanelContext.Provider>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles an empty word sequence by ensuring the text element is empty', () => {
    mockPanelContext.curWordSequence = '';
    const { container } = render(
      <PanelContext.Provider value={mockPanelContext}>
        <ReaderDisplay />
      </PanelContext.Provider>
    );

    const textElement = container.querySelector('.text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('');
  });
});
