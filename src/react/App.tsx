import React from "react";
import PanelViewport from "./components/PanelViewport";
import SettingsMenu from './components/SettingsMenu';
import KeybindingManager from "./components/KeybindingManager";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <PanelProvider>
        <PanelViewportProvider>
        <SettingsMenu />
        <PanelViewport />
        <KeybindingManager />
        </PanelViewportProvider>
      </PanelProvider>
    </SettingsProvider>
  );
};

export default App;
