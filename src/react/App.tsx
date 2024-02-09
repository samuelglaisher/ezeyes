import React from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import "./styles/index.css";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, darkTheme } from "@adobe/react-spectrum";

const App: React.FC = () => {
  return (
    <Provider theme={darkTheme}>
      <PanelViewportProvider>
        <SettingsProvider>
          <PanelProvider>
            <MenuManagerProvider>
            <PanelViewport />
            <KeybindingManager />
            <FocusManager />
            </MenuManagerProvider>
          </PanelProvider>
        </SettingsProvider>
      </PanelViewportProvider>
    </Provider>
  );
};

export default App;
