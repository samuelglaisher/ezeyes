import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { Provider } from "@adobe/react-spectrum";
import { FilterType } from '../SettingsSchema';

const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const { settings, getThemeObject } = useContext(SettingsContext);

    const filter = `
        blur(${settings.ui.blur}px) 
        brightness(${settings.ui.brightness}) 
        contrast(${settings.ui.contrast}) 
        grayscale(${settings.ui.grayscale}) 
        hue-rotate(${settings.ui.hueRotate}deg) 
        invert(${settings.ui.invert}) 
        opacity(${settings.ui.opacity}) 
        saturate(${settings.ui.saturate}) 
        sepia(${settings.ui.sepia})
    `;

    document.body.style.filter = filter;

    return (
        <Provider theme={getThemeObject(settings.ui.theme)} scale={settings.ui.size}>
            {children}
        </Provider>
    );
};

export default UIProvider;
