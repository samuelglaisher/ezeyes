import { useEffect, useContext } from 'react';
import { PanelDisplayType } from '../SettingsSchema';
import { PanelViewportContext } from '../contexts/PanelViewportContext';
import { SettingsContext } from '../contexts/SettingsContext';

export const usePanelViewport = () => {
    const { settings } = useContext(SettingsContext);

    const { setActiveView } = useContext(PanelViewportContext);

    useEffect(() => {
        setActiveView(settings.panels.displayType);
    }, [settings.panels.displayType]);

    const switchView = () => {
        setActiveView(prevView => {
            const viewOrder = [PanelDisplayType.HORIZONTAL, PanelDisplayType.VERTICAL, PanelDisplayType.ZOOM, PanelDisplayType.FLASHCARD];
            const nextIndex = (viewOrder.indexOf(prevView) + 1) % viewOrder.length;
            return viewOrder[nextIndex];
        });
    };

    return { switchView };
};
