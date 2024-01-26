import { useContext, useEffect } from 'react';
import { usePanel } from './usePanel';
import { useSettings } from './useSettings';
import { usePanelViewport } from '../hooks/usePanelViewport';
import Mousetrap from 'mousetrap';
import { SettingsContext } from '../contexts/SettingsContext';

const openSettingsAction = () => {
    alert('Yahallo');
};

const useKeybindings = () => {
    const { settings } = useContext(SettingsContext);

    const { navigateForward, navigateBackward, togglePlayPause } = usePanel();
    const { switchView } = usePanelViewport();

    useEffect(() => {
        Mousetrap.bind(settings.keybindings.nextWord, () => {
            navigateForward();
            return false;
        });
        Mousetrap.bind(settings.keybindings.prevWord, () => {
            navigateBackward();
            return false;
        });
        Mousetrap.bind(settings.keybindings.openSettings, openSettingsAction);
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
