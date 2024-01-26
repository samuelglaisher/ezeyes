import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PanelDisplayType } from "../SettingsSchema";

interface PanelViewportContextType {
    activeView: PanelDisplayType;
    setActiveView: React.Dispatch<React.SetStateAction<PanelDisplayType>>;
}

const defaultContextValue: PanelViewportContextType = {
    activeView: PanelDisplayType.HORIZONTAL,
    setActiveView: () => {}
};

export const PanelViewportContext = createContext<PanelViewportContextType>(defaultContextValue);

export const PanelViewportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeView, setActiveView] = useState<PanelDisplayType>(defaultContextValue.activeView);

    return (
        <PanelViewportContext.Provider value={{ activeView, setActiveView }}>
            {children}
        </PanelViewportContext.Provider>
    );
};
