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
import { FileManagerProvider } from "./contexts/FileManagerContext";

const App: React.FC = () => {
  return (
    <Provider theme={lightTheme}>
        <PanelProvider>
          <FileManagerProvider>
            <FileMenuBar />
          </FileManagerProvider>

          <SettingsProvider>
              <MenuManagerProvider>
                <PanelViewportProvider>
                  <KeybindingManager />
                  <PanelViewport />
                </PanelViewportProvider>
                <FocusManager />
              </MenuManagerProvider>
          </SettingsProvider>
        </PanelProvider>
    </Provider>
  );
};

export default App;
