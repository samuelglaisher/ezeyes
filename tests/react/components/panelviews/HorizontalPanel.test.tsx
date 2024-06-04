import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HorizontalPanel from '../../../../src/react/components/panelviews/HorizontalPanel';
import { PanelContext, PanelContextType } from '../../../../src/react/contexts/PanelContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { PanelType, PanelViewportContext, PanelViewportContextType } from '../../../../src/react/contexts/PanelViewportContext';
import { PanelDisplayType } from "../../../../src/react/SettingsSchema";

const MIN_WIDTH = 200;

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

const mockPanelViewportContext: PanelViewportContextType = {
    activeView: PanelDisplayType.HORIZONTAL,
    activeFlashcard: PanelType.READER,
    setActiveView: jest.fn(),
    setActiveFlashcard: jest.fn(),
};

const MockedPanelContextProvider: React.FC<{ children: React.ReactNode; value?: Partial<PanelContextType> }> = ({ children, value }) => {
    const mockPanelContext = {
        ...mockPanelContextDefaults,
        ...value,
    };

    return <PanelContext.Provider value={mockPanelContext}>{children}</PanelContext.Provider>;
};

describe('HorizontalPanel', () => {
    it('renders without crashing', () => {
        render(
            <PanelViewportContext.Provider value={mockPanelViewportContext}>
                <Provider theme={defaultTheme}>
                    <HorizontalPanel />
                </Provider>
            </PanelViewportContext.Provider>
        );
        expect(screen.getByTestId('text-input-panel-test-id')).toBeInTheDocument();
        expect(screen.getByTestId('reader-display-panel-test-id')).toBeInTheDocument();
    });

    it('respects the dynamic maximum resize limit of the TextInputDisplayPanel', () => {
        render(
            <MockedPanelContextProvider value={{ textContent: 'Sample text content' }}>
                <Provider theme={defaultTheme}>
                    <HorizontalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const resizeBar = screen.getByTestId('resize-bar-vertical-test-id');
        const initialClientX = window.innerWidth / 2;

        fireEvent.mouseDown(resizeBar);
        fireEvent.mouseMove(resizeBar, { clientX: window.innerWidth });
        fireEvent.mouseUp(resizeBar);

        textInputDisplayPanel.getBoundingClientRect();

        const finalTextInputWidth = textInputDisplayPanel.getBoundingClientRect().width;
        const maxWidth = window.innerWidth * 0.8;

        expect(finalTextInputWidth).toBeLessThanOrEqual(maxWidth);
    });

    it('respects the minimum resize limit of the TextInputDisplayPanel', () => {
        render(
            <MockedPanelContextProvider value={{ textContent: 'Sample text content' }}>
                <Provider theme={defaultTheme}>
                    <HorizontalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const minWidth = textInputDisplayPanel.style.minWidth || getComputedStyle(textInputDisplayPanel).minWidth;

        expect(parseInt(minWidth)).toBeGreaterThanOrEqual(MIN_WIDTH);
    });

    it('respects the dynamic maximum resize limit of the TextInputDisplayPanel', () => {
        render(
            <MockedPanelContextProvider value={{ textContent: 'Sample text content' }}>
                <Provider theme={defaultTheme}>
                    <HorizontalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const resizeBar = screen.getByTestId('resize-bar-vertical-test-id');

        fireEvent.mouseDown(resizeBar);
        fireEvent.mouseMove(resizeBar, { clientX: window.innerWidth });
        fireEvent.mouseUp(resizeBar);

        textInputDisplayPanel.getBoundingClientRect();

        const finalTextInputWidth = textInputDisplayPanel.getBoundingClientRect().width;
        const maxWidth = window.innerWidth * 0.8;

        expect(finalTextInputWidth).toBeLessThanOrEqual(maxWidth);
    });

    it('handles invalid text content without crashing', () => {
        const invalidTextContent = "12345";

        expect(() => {
            render(
                <MockedPanelContextProvider value={{ textContent: invalidTextContent }}>
                    <Provider theme={defaultTheme}>
                        <HorizontalPanel />
                    </Provider>
                </MockedPanelContextProvider>
            );
        }).not.toThrow();
    });
});
