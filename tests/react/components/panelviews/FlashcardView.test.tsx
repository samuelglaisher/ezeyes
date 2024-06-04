import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardView from '../../../../src/react/components/panelviews/FlashcardView';
import userEvent from '@testing-library/user-event';
import { PanelType, PanelViewportContext, PanelViewportContextType } from '../../../../src/react/contexts/PanelViewportContext';
import { PanelDisplayType } from '../../../../src/react/SettingsSchema';
import { mock } from 'node:test';

const mockPanelViewportContext: PanelViewportContextType = {
  activeView: PanelDisplayType.FLASHCARD,
  activeFlashcard: PanelType.READER,
  setActiveView: jest.fn(),
  setActiveFlashcard: jest.fn(),
};

jest.mock('../../../../src/react/components/TextInputDisplayPanel', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="textInputDisplayPanel">TextInputDisplayPanel Mock</div>,
  };
});

jest.mock('../../../../src/react/components/ReaderDisplayPanel', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="readerDisplayPanel">ReaderDisplayPanel Mock</div>,
  };
});

describe('FlashcardView', () => {
  it('renders without crashing', () => {
    render(<FlashcardView />);
    expect(screen.getByTestId('textInputDisplayPanel')).toBeInTheDocument();
    expect(screen.getByTestId('readerDisplayPanel')).toBeInTheDocument();
  });

  it('initially does not have the "flipped" class applied', () => {
    const { container } = render(<FlashcardView />);
    expect(container.firstChild).not.toHaveClass('flipped');
  });

  it('applies "flipped" class when ReaderDisplayPanel is not in view', () => {
    mockPanelViewportContext.activeFlashcard = PanelType.TEXT_INPUT

    render(
      <PanelViewportContext.Provider value={mockPanelViewportContext}>
        <FlashcardView />
      </PanelViewportContext.Provider>
    );

    const flashcardContainer = screen.getByTestId('flashcard-container-test-id');
    expect(flashcardContainer).toHaveClass('flipped');
  });
});
