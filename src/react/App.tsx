import React from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import "./styles/index.css";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, lightTheme } from "@adobe/react-spectrum";
import FileMenuBar from "./components/FileMenuBar";

const App: React.FC = () => {
  return (
    <Provider theme={lightTheme}>
      <PanelViewportProvider>
      <PanelProvider>
        <FileMenuBar />
          <SettingsProvider>
              <MenuManagerProvider>
              <PanelViewport />
              <KeybindingManager />
              <FocusManager />
              </MenuManagerProvider>
          </SettingsProvider>
        </PanelProvider>
      </PanelViewportProvider>
    </Provider>
  );
};

export default App;
