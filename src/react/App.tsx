import React, { useContext } from "react";
import PanelViewport from "./components/PanelViewport";
import KeybindingManager from "./components/KeybindingManager";
import FocusManager from "./components/FocusManager";
import SystemErrorModal from "./components/SystemErrorModal";
import { PanelProvider } from "./contexts/PanelContext";
import { SettingsContext, SettingsProvider } from './contexts/SettingsContext';
import { PanelViewportProvider } from "./contexts/PanelViewportContext";
import { MenuManagerProvider } from "./contexts/MenuManagerContext";
import { Provider, darkTheme, lightTheme } from "@adobe/react-spectrum";
import { ErrorBoundary } from "react-error-boundary";
import { FileManagerProvider } from "./contexts/FileManagerContext";
import "./styles/index.css";
import UIProvider from "./components/UIProvider";
import { SearchBarProvider } from "./contexts/SearchBarContext";
import { WPMProvider } from './contexts/SliderVisibilityContext';
import WPMSliderManager from './components/WPMSliderManager';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <UIProvider>
        <ErrorBoundary FallbackComponent={SystemErrorModal}>
          <PanelViewportProvider>
            <PanelProvider>
              <SearchBarProvider>
                <FileManagerProvider>        
                  <MenuManagerProvider>
                    <WPMProvider>
                      <PanelViewport />
                      <KeybindingManager />
                      <FocusManager />
                      <WPMSliderManager />
                    </WPMProvider>
                  </MenuManagerProvider>
                </FileManagerProvider>
              </SearchBarProvider>
            </PanelProvider>
          </PanelViewportProvider>
        </ErrorBoundary>
      </UIProvider>
    </SettingsProvider>
  );
};

export default App;
