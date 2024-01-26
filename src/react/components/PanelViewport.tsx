import React, { useContext } from "react";
import HorizontalPanel from "./panelviews/HorizontalPanel";
import ZoomView from "./panelviews/ZoomView";
import FlashcardView from "./panelviews/FlashcardView";
import VerticalPanel from "./panelviews/VerticalPanel";
import { PanelDisplayType } from "../SettingsSchema";
import { usePanel } from '../hooks/usePanel';
import { usePanelViewport } from "../hooks/usePanelViewport";
import { PanelContext } from "../contexts/PanelContext";
import { PanelViewportContext } from "../contexts/PanelViewportContext";
import "../styles/index.css";

const PanelViewport: React.FC = () => {
    const { isPlaying } = useContext(PanelContext);
    const { activeView } = useContext(PanelViewportContext);

    const { togglePlayPause, navigateForward, navigateBackward} = usePanel();
    const { switchView } = usePanelViewport();

    return (
        <div>
            <main>
                <div id="panel-viewport">
                    <button onClick={switchView}>Switch View</button>
                    {activeView === PanelDisplayType.HORIZONTAL && <HorizontalPanel />}
                    {activeView === PanelDisplayType.VERTICAL && <VerticalPanel />}
                    {activeView === PanelDisplayType.ZOOM && <ZoomView />}
                    {activeView === PanelDisplayType.FLASHCARD && <FlashcardView />}
                </div>
            </main>
            <footer>
                <button onClick={navigateBackward}>Previous Sequence</button>
                <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={navigateForward}>Next Sequence</button>
            </footer>
        </div>
    );
};

export default PanelViewport;
