import { useEffect, useContext } from 'react';
import { PanelDisplayType } from '../SettingsSchema';
import { PanelType, PanelViewportContext } from '../contexts/PanelViewportContext';
import { SettingsContext } from '../contexts/SettingsContext';

function cycleView<T>(prevView: T, viewList: Array<T>): T {
    const nextIndex = (viewList.indexOf(prevView) + 1) % viewList.length;
    return viewList[nextIndex];
}

export const usePanelViewport = () => {
    const { settings } = useContext(SettingsContext);
    const { setActiveView, setActiveFlashcard } = useContext(PanelViewportContext);

    useEffect(() => {
        setActiveView(settings.ui.defaultDisplayType);
    }, [setActiveView, settings.ui.defaultDisplayType]);

    const switchView = () => {
        setActiveView(prevView => cycleView(prevView, [PanelDisplayType.HORIZONTAL, PanelDisplayType.VERTICAL, PanelDisplayType.ZOOM, PanelDisplayType.FLASHCARD]));
    };

    const flipFlashcard = () => {
        setActiveFlashcard(prevPanel => cycleView(prevPanel, [PanelType.READER, PanelType.TEXT_INPUT]));
    };

    return { switchView, flipFlashcard };
};
