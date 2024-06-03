var Mousetrap = require('mousetrap-pause')(require('mousetrap'));
import { useContext, useEffect } from 'react';
import { usePanel } from './usePanel';
import { usePanelViewport } from '../hooks/usePanelViewport';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from './useMenuManager';
import { MenuType } from '../contexts/MenuManagerContext';
import { useFileManager } from './useFileManager';
import { usePlaybackControl } from './usePlaybackControl';
import { useSearchBar } from './useSearchBar';

export const useKeybindings = (updateFunction: () => void, speed: number) => {
    const { settings } = useContext(SettingsContext);

    const { searchFunction } = useSearchBar();
    const { promptAndLoadFile } = useFileManager();
    const { navigateForward, navigateBackward, navigateToPrevParagraph, navigateToNextParagraph, navigateToPrevSentence, navigateToNextSentence, togglePlayPause, backToTop } = usePanel();
    const { switchView, flipFlashcard } = usePanelViewport();
    const { openMenu } = useMenuManager();
    const { increaseSpeed, decreaseSpeed } = usePlaybackControl(updateFunction);

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
        
        Mousetrap.bind(settings.keybindings.openHelp, () => openMenu(MenuType.HELP));

        Mousetrap.bind(settings.keybindings.play, () => {
            togglePlayPause();
            return false;
        });

        Mousetrap.bind(settings.keybindings.switchView, switchView);

        Mousetrap.bind(settings.keybindings.importFile, promptAndLoadFile);

        Mousetrap.bind(settings.keybindings.flipFlashcard, flipFlashcard);

        Mousetrap.bind(settings.keybindings.backToTop, backToTop);

        Mousetrap.bind(settings.keybindings.increaseSpeed, () => {
            increaseSpeed();
            return false;
        });

        Mousetrap.bind(settings.keybindings.decreaseSpeed, () => {
            decreaseSpeed();
            return false;
        });

        Mousetrap.bind(settings.keybindings.search, searchFunction);


        return () => {
            Mousetrap.unbind(settings.keybindings.nextWord);
            Mousetrap.unbind(settings.keybindings.prevWord);
            Mousetrap.unbind(settings.keybindings.openSettings);
            Mousetrap.unbind(settings.keybindings.play);
            Mousetrap.unbind(settings.keybindings.switchView);
            Mousetrap.unbind(settings.keybindings.importFile);
            Mousetrap.unbind(settings.keybindings.increaseSpeed);
            Mousetrap.unbind(settings.keybindings.decreaseSpeed);
        };
    }, [settings.keybindings]);
};

export default useKeybindings;