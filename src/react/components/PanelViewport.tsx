import React, { useEffect, useState } from "react";
import HorizontalPanel from "../components/panelviews/HorizontalPanel";
import ZoomView from "../components/panelviews/ZoomView";
import FlashcardView from "../components/panelviews/FlashcardView";
import VerticalPanel from "./panelviews/VerticalPanel";
import { useSettings } from "../hooks/useSettings";
import { PanelDisplayType } from "../SettingsSchema";
import { usePlaybackControl } from '../hooks/usePlaybackControl';
import { usePanel } from '../hooks/usePanel';
import "../styles/index.css";

const PanelViewport: React.FC = () => {
  const settingsContext = useSettings();
  const [activeView, setActiveView] = useState(settingsContext.settings.panels.displayType);
  const { navigateForward } = usePanel();
  const { isPlaying, startPlayback, stopPlayback } = usePlaybackControl(navigateForward, 1000 / (settingsContext.settings.panels.wpm / 60));

  useEffect(() => {
    setActiveView(settingsContext.settings.panels.displayType);
  }, []);

  const switchView = () => {
    setActiveView(prevView => {
      const viewOrder = [PanelDisplayType.HORIZONTAL, PanelDisplayType.VERTICAL, PanelDisplayType.ZOOM, PanelDisplayType.FLASHCARD];
      const nextIndex = (viewOrder.indexOf(prevView) + 1) % viewOrder.length;
      return viewOrder[nextIndex];
    });
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };


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
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </footer>
    </div>
  );
};

export default PanelViewport;
