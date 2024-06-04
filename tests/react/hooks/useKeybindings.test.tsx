import React from 'react';
import { render, waitFor } from '@testing-library/react';
import KeybindingManager from '../../../src/react/components/KeybindingManager';
import { initialSettings } from '../../../src/react/SettingsSchema';
var Mousetrap = require('mousetrap-pause')(require('mousetrap'));

console.error = jest.fn();

jest.mock('../../../src/react/hooks/usePanel', () => ({
    usePanel: jest.fn(),
}));

describe('useKeybindings', () => {
    it('Verify Play/Pause Keybind Toggles Media Playback Correctly', async () => {
        const mockedTogglePlayPause = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: mockedTogglePlayPause,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.play);
        Mousetrap.trigger(initialSettings.keybindings.play);

        await waitFor(() => expect(mockedTogglePlayPause).toHaveBeenCalledTimes(2));
    });

    it('Verify Next Word Keybind Triggers Advancement in the Displayed Text Correctly', async () => {
        const mockedNavigateForward = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: mockedNavigateForward,
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.nextWord);
        Mousetrap.trigger(initialSettings.keybindings.nextWord);

        await waitFor(() => expect(mockedNavigateForward).toHaveBeenCalledTimes(2));
    });

    it('Verify Previous Word Keybind Triggers Advancement in the Displayed Text Correctly', async () => {
        const mockedNavigateBackward = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: mockedNavigateBackward,
            togglePlayPause: jest.fn(),
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.prevWord);
        Mousetrap.trigger(initialSettings.keybindings.prevWord);

        await waitFor(() => expect(mockedNavigateBackward).toHaveBeenCalledTimes(2));
    });

    it('Verify Open Settings Keybind Opens the UI Settings Menu', async () => {
        jest.mock('../../../src/react/hooks/useMenuManager', () => ({
            useMenuManager: jest.fn(),
        }));

        const useMenuManager = require('../../../src/react/hooks/useMenuManager').useMenuManager;
        const mockedOpenSettings = jest.fn();

        useMenuManager.mockImplementation(() => ({
            openMenu: mockedOpenSettings,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.openSettings);

        waitFor(() => expect(mockedOpenSettings).toHaveBeenCalled());
    });

    it('Verify Switch View Keybind Switches Presented UI View on Display Panel', async () => {
        jest.mock('../../../src/react/hooks/usePanelViewport', () => ({
            usePanelViewport: jest.fn(),
        }));

        const usePanelViewport = require('../../../src/react/hooks/usePanelViewport').usePanelViewport;
        const mockedSwitchView = jest.fn();

        usePanelViewport.mockImplementation(() => ({
            switchView: mockedSwitchView,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.switchView);

        waitFor(() => expect(mockedSwitchView).toHaveBeenCalled());
    });

    it('Verify Import File Keybind initiates the File Explorer / File Manager Client', async () => {
        jest.mock('../../../src/react/hooks/useFileManager', () => ({
            useFileManager: jest.fn(),
        }));

        const useFileManager = require('../../../src/react/hooks/useFileManager').useFileManager;
        const mockedPromptAndLoadFile = jest.fn();

        useFileManager.mockImplementation(() => ({
            promptAndLoadFile: mockedPromptAndLoadFile,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.importFile);

        waitFor(() => expect(mockedPromptAndLoadFile).toHaveBeenCalled());
    });

    it('Verify Next Paragraph Keybind Advances the Displayed Text Correctly', async () => {
        const mockedNavigateToNextParagraph = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
            navigateToNextParagraph: mockedNavigateToNextParagraph,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.nextParagraph);
        Mousetrap.trigger(initialSettings.keybindings.nextParagraph);

        await waitFor(() => expect(mockedNavigateToNextParagraph).toHaveBeenCalledTimes(2));    
    });

    it('Verify Previous Paragraph Keybind Advances the Displayed Text Correctly', async () => {
        const mockedNavigateToPrevParagraph = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
            navigateToPrevParagraph: mockedNavigateToPrevParagraph,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.prevParagraph);
        Mousetrap.trigger(initialSettings.keybindings.prevParagraph);

        await waitFor(() => expect(mockedNavigateToPrevParagraph).toHaveBeenCalledTimes(2));
    });

    it('Verify Next Sentence Keybind Advances the Displayed Text Correctly', async () => {
        const mockedNavigateToNextSentence = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
            navigateToNextSentence: mockedNavigateToNextSentence,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.nextSentence);
        Mousetrap.trigger(initialSettings.keybindings.nextSentence);

        await waitFor(() => expect(mockedNavigateToNextSentence).toHaveBeenCalledTimes(2));
    });

    it('Verify Previous Sentence Keybind Advances the Displayed Text Correctly', async () => {
        const mockedNavigateToPrevSentence = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
            navigateToPrevSentence: mockedNavigateToPrevSentence,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.prevSentence);
        Mousetrap.trigger(initialSettings.keybindings.prevSentence);

        await waitFor(() => expect(mockedNavigateToPrevSentence).toHaveBeenCalledTimes(2));
    });

    it('Verify Flip Flashcard Keybind switches the Display Panel Presented', async () => {
        jest.mock('../../../src/react/hooks/usePanelViewport', () => ({
            usePanelViewport: jest.fn(),
        }));

        const usePanelViewport = require('../../../src/react/hooks/usePanelViewport').usePanelViewport;
        const mockedFlipFlashcard = jest.fn();

        usePanelViewport.mockImplementation(() => ({
            flipFlashcard: mockedFlipFlashcard,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.flipFlashcard);

        waitFor(() => expect(mockedFlipFlashcard).toHaveBeenCalled());
    });

    it('Verify Back to Top Keybind Advances the Displayed Text Correctly', async () => {
        const mockedBackToTop = jest.fn();
        const usePanel = require('../../../src/react/hooks/usePanel').usePanel;

        usePanel.mockImplementation(() => ({
            navigateForward: jest.fn(),
            navigateBackward: jest.fn(),
            togglePlayPause: jest.fn(),
            backToTop: mockedBackToTop,
        }));

        render(<KeybindingManager />);

        Mousetrap.trigger(initialSettings.keybindings.backToTop);
        Mousetrap.trigger(initialSettings.keybindings.backToTop);

        await waitFor(() => expect(mockedBackToTop).toHaveBeenCalledTimes(2));
    });
});
