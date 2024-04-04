import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import { SettingsProvider, SettingsContext, isInRange } from '../../../src/react/contexts/SettingsContext';
import { initialSettings } from '../../../src/react/SettingsSchema';

const TestSettingsContextComponent = () => {
  const { settings, dispatch, showSettingsMenu, setShowSettingsMenu } = useContext(SettingsContext);

  return (
    <div>
      <div data-testid="showSettingsMenu">{showSettingsMenu.toString()}</div>
      <div data-testid="settings">{JSON.stringify(settings)}</div>
      <button onClick={() => setShowSettingsMenu(!showSettingsMenu)}>Toggle Settings Menu</button>
    </div>
  );
};

describe('SettingsProvider', () => {
  test('renders children and provides default context values', () => {
    render(
      <SettingsProvider>
        <TestSettingsContextComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('showSettingsMenu')).toHaveTextContent('false');
    expect(screen.getByTestId('settings')).toHaveTextContent(JSON.stringify(initialSettings));
  });

  test('toggles settings menu visibility', () => {
    render(
      <SettingsProvider>
        <TestSettingsContextComponent />
      </SettingsProvider>
    );

    act(() => {
      screen.getByText('Toggle Settings Menu').click();
    });

    expect(screen.getByTestId('showSettingsMenu')).toHaveTextContent('true');
  });

});
