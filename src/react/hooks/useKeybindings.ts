var Mousetrap = require('mousetrap-pause')(require('mousetrap'));
import { useContext, useEffect } from 'react';
import { usePanel } from './usePanel';
import { usePanelViewport } from '../hooks/usePanelViewport';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from './useMenuManager';
import { MenuType } from '../contexts/MenuManagerContext';
import { useFileManager } from './useFileManager';
import { PanelViewportContext } from '../contexts/PanelViewportContext';
import { usePlaybackControl } from './usePlaybackControl';

const useKeybindings = (updateFunction: () => void, speed: number) => {
    const { settings } = useContext(SettingsContext);

    const { promptAndLoadFile } = useFileManager();
    const { navigateForward, navigateBackward, navigateToPrevParagraph, navigateToNextParagraph, navigateToPrevSentence, navigateToNextSentence, togglePlayPause, handleSpeedChange } = usePanel();
    const { switchView, flipFlashcard } = usePanelViewport();
    const { openMenu } = useMenuManager();
    //const { handleSpeedChange } = usePlaybackControl(updateFunction, speed);

    useEffect(() => {
        Mousetrap.bind(settings.keybindings.nextWord, () => {
            navigateForward();
            return false;
        });
        Mousetrap.bind(settings.keybindings.prevWord, () => {
            navigateBackward();
            return false;
        });

        Mousetrap.bind(settings.keybindings.prevParagraph, () => {
            navigateToPrevParagraph();
            return false;
        });

        Mousetrap.bind(settings.keybindings.nextParagraph, () => {
            navigateToNextParagraph();
            return false;
        });

        Mousetrap.bind(settings.keybindings.prevSentence, () => {
            navigateToPrevSentence();
            return false;
        });

        Mousetrap.bind(settings.keybindings.nextSentence, () => {
            navigateToNextSentence();
            return false;
        });

        Mousetrap.bind(settings.keybindings.openSettings, () => openMenu(MenuType.SETTINGS));

        Mousetrap.bind(settings.keybindings.play, () => {
            togglePlayPause();
            return false;
        });

        Mousetrap.bind(settings.keybindings.switchView, switchView);

        Mousetrap.bind(settings.keybindings.importFile, promptAndLoadFile);

        Mousetrap.bind(settings.keybindings.flipFlashcard, flipFlashcard);

        // document.addEventListener('keydown', function(event) {
        //     if(event.ctrlKey && event.key === 'ArrowRight') {
        //         Mousetrap.bind(settings.keybindings.increaseSpeed, handleSpeedChange(true));
        //         console.log('Ctrl + Right Arrow key pressed');
        //     }
        // });
        
        Mousetrap.bind(settings.keybindings.increaseSpeed, () => {
            handleSpeedChange();
            return false;
        });

        return () => {
            Mousetrap.unbind(settings.keybindings.nextWord);
            Mousetrap.unbind(settings.keybindings.prevWord);
            Mousetrap.unbind(settings.keybindings.openSettings);
            Mousetrap.unbind(settings.keybindings.play);
            Mousetrap.unbind(settings.keybindings.switchView);
            Mousetrap.unbind(settings.keybindings.importFile);
            Mousetrap.unbind(settings.keybindings.increaseSpeed);
            
        };
    }, [settings.keybindings]);
};

export default useKeybindings;
