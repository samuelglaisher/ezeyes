import React from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, darkTheme, lightTheme } from "@adobe/react-spectrum";
import { ErrorBoundary } from "react-error-boundary"
import ErrorModal from "./components/ErrorModal";
import "./styles/index.css";


const App: React.FC = () => {
  return (
      <Provider theme={lightTheme}>
        <ErrorBoundary FallbackComponent={ErrorModal}>
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
        </ErrorBoundary>
      </Provider>
  );
};

export default App;
