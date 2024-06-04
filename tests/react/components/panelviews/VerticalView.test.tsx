import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import VerticalPanel from '../../../../src/react/components/panelviews/VerticalPanel';
import { PanelContext, PanelContextType } from '../../../../src/react/contexts/PanelContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { PanelType, PanelViewportContext, PanelViewportContextType } from '../../../../src/react/contexts/PanelViewportContext';
import { PanelDisplayType } from "../../../../src/react/SettingsSchema";

const MIN_HEIGHT = 200;

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
    activeView: PanelDisplayType.VERTICAL,
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

describe('VerticalPanel', () => {
    it('renders without crashing', () => {
        render(
            <PanelViewportContext.Provider value={mockPanelViewportContext}>
                <Provider theme={defaultTheme}>
                    <VerticalPanel />
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
                    <VerticalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const resizeBar = screen.getByTestId('resize-bar-horizontal-test-id');
        const initialClientY = window.innerHeight / 2;

        fireEvent.mouseDown(resizeBar);
        fireEvent.mouseMove(resizeBar, { clientY: window.innerHeight });
        fireEvent.mouseUp(resizeBar);

        textInputDisplayPanel.getBoundingClientRect();

        const finalTextInputHeight = textInputDisplayPanel.getBoundingClientRect().height;
        const maxHeight = window.innerHeight * 0.8;

        expect(finalTextInputHeight).toBeLessThanOrEqual(maxHeight);
    });

    it('respects the minimum resize limit of the TextInputDisplayPanel', () => {
        render(
            <MockedPanelContextProvider value={{ textContent: 'Sample text content' }}>
                <Provider theme={defaultTheme}>
                    <VerticalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const minHeight = textInputDisplayPanel.style.minHeight || getComputedStyle(textInputDisplayPanel).minHeight;

        expect(parseInt(minHeight)).toBeGreaterThanOrEqual(MIN_HEIGHT);
    });

    it('respects the dynamic maximum resize limit of the TextInputDisplayPanel', () => {
        render(
            <MockedPanelContextProvider value={{ textContent: 'Sample text content' }}>
                <Provider theme={defaultTheme}>
                    <VerticalPanel />
                </Provider>
            </MockedPanelContextProvider>
        );

        const textInputDisplayPanel = screen.getByTestId('text-input-panel-test-id');
        const resizeBar = screen.getByTestId('resize-bar-horizontal-test-id');

        fireEvent.mouseDown(resizeBar);
        fireEvent.mouseMove(resizeBar, { clientY: window.innerHeight });
        fireEvent.mouseUp(resizeBar);

        textInputDisplayPanel.getBoundingClientRect();

        const finalTextInputHeight = textInputDisplayPanel.getBoundingClientRect().height;
        const maxHeight = window.innerHeight * 0.8;

        expect(finalTextInputHeight).toBeLessThanOrEqual(maxHeight);
    });

    it('handles invalid text content without crashing', () => {
        const invalidTextContent = "12345";

        expect(() => {
            render(
                <MockedPanelContextProvider value={{ textContent: invalidTextContent }}>
                    <Provider theme={defaultTheme}>
                        <VerticalPanel />
                    </Provider>
                </MockedPanelContextProvider>
            );
        }).not.toThrow();
    });
});
