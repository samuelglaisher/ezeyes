import { useEffect, useContext, useState } from 'react';
import { PanelDisplayType } from '../SettingsSchema';
import { PanelType, PanelViewportContext } from '../contexts/PanelViewportContext';
import { SettingsContext } from '../contexts/SettingsContext';

function cycleView<T>(prevView: T, viewList: Array<T>): T {
    const nextIndex = (viewList.indexOf(prevView) + 1) % viewList.length;
    return viewList[nextIndex];
}

export const usePanelViewport = () => {
    const [isInit, setIsInit] = useState(true);
    const { settings } = useContext(SettingsContext);
    var { setActiveView, setActiveFlashcard } = useContext(PanelViewportContext);

    if (isInit) {
        setActiveView(settings.ui.defaultDisplayType);
        setIsInit(false);
    }

    const switchView = () => {
        setActiveView(prevView => cycleView(prevView, [PanelDisplayType.HORIZONTAL, PanelDisplayType.VERTICAL, PanelDisplayType.ZOOM, PanelDisplayType.FLASHCARD]));
    };

    const flipFlashcard = () => {
        // bugged: allows you to flip flashcard even when you're not on flashcard
        // neither settings.panels.displayType nor activePanel update with calls to switchView
        setActiveFlashcard(prevPanel => cycleView(prevPanel, [PanelType.READER, PanelType.TEXT_INPUT]))
    };

    return { switchView, flipFlashcard };
};
