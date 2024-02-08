import React, { ReactElement } from 'react';
import PanelViewport from '../../../src/react/components/PanelViewport';
import { render, RenderOptions } from '@testing-library/react';
import { PanelContext } from '../../../src/react/contexts/PanelContext';
import { PanelViewportContext } from '../../../src/react/contexts/PanelViewportContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { PanelDisplayType } from '../../../src/react/SettingsSchema';

interface ProviderProps {
    theme?: typeof defaultTheme;
}

const renderWithProviders = (
    ui: ReactElement,
    { providerProps, ...renderOptions }: { providerProps?: ProviderProps } & RenderOptions = {}
) => {
    return render(
        <Provider theme={defaultTheme} {...providerProps}>
            {ui}
        </Provider>,
        renderOptions
    );
};

describe('PanelViewport component', () => {
    it('renders without crashing', () => {
        const { container } = renderWithProviders(
            <PanelContext.Provider value={{ 
                isPlaying: false, 
                curWordSequence: [], 
                setCurWordSequence: jest.fn(), 
                textContent: '', 
                setTextContent: jest.fn(), 
                setIsPlaying: jest.fn() 
            }}>
                <PanelViewportContext.Provider value={{ 
                    activeView: PanelDisplayType.HORIZONTAL, 
                    setActiveView: jest.fn() 
                }}>
                    <PanelViewport />
                </PanelViewportContext.Provider>
            </PanelContext.Provider>, 
            {}
        );
        expect(container).toBeTruthy();
    });
});
