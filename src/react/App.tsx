import React, { useState, createContext } from "react";
import PanelViewport from "./components/PanelViewport";
import HorizontalPanel from "./components/panelviews/HorizontalPanel";
import ZoomView from "./components/panelviews/ZoomView";
import FlashcardView from "./components/panelviews/FlashcardView";
import { SettingsProvider } from './components/SettingsProvider';
import SettingsMenu from './components/SettingsMenu';
import "./styles/index.css";
import { PanelProvider } from "./contexts/PanelContext";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <PanelProvider>
      {/* <KeybindingProvider> */}
        <SettingsMenu />
        <PanelViewport />
      {/* </KeybindingProvider> */}
      </PanelProvider>
    </SettingsProvider>
  );
};

export default App;



// const App = () => {
//   // const textInputDisplayPanel = new TextInputDisplayPanel("Initial text content");
//   // const textInputDisplayPanel = createContext(new TextInputDisplayPanel("Initial text content"));
//   // const ReaderContext = createContext(new ReaderDisplayPanel(textInputDisplayPanel));

//   return (
//     <PanelViewport textInputDisplayPanel={textInputDisplayPanel}/>
//   );
// };

// export default App;
