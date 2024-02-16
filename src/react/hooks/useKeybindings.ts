var Mousetrap = require('mousetrap-pause')(require('mousetrap'));
import { useContext, useEffect } from 'react';
import { usePanel } from './usePanel';
import { usePanelViewport } from '../hooks/usePanelViewport';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from './useMenuManager';
import { MenuType } from '../contexts/MenuManagerContext';

const useKeybindings = () => {
    const { settings } = useContext(SettingsContext);

    const { navigateForward, navigateBackward, navigateToPrevParagraph, togglePlayPause } = usePanel();
    const { switchView } = usePanelViewport();
    const { openMenu } = useMenuManager();

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

        Mousetrap.bind(settings.keybindings.openSettings, () => openMenu(MenuType.SETTINGS));
        Mousetrap.bind(settings.keybindings.play, () => {
            togglePlayPause();
            return false;
        });
        Mousetrap.bind(settings.keybindings.switchView, switchView);

        return () => {
            Mousetrap.unbind(settings.keybindings.nextWord);
            Mousetrap.unbind(settings.keybindings.prevWord);
            Mousetrap.unbind(settings.keybindings.openSettings);
            Mousetrap.unbind(settings.keybindings.play);
            Mousetrap.unbind(settings.keybindings.switchView);
            
        };
    }, [settings.keybindings]);
};

export default useKeybindings;
