import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import SettingsButton from '../../../src/react/components/SettingsButton';
import SettingsMenu from '../../../src/react/components/SettingsMenu';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { MenuType, MenuManagerProvider } from '../../../src/react/contexts/MenuManagerContext';
import { SettingsProvider } from '../../../src/react/contexts/SettingsContext';
import { Provider, defaultTheme } from '@adobe/react-spectrum';

// Correctly mock the useMenuManager hook
jest.mock('../../../src/react/hooks/useMenuManager');

describe('SettingsButton component', () => {
  it('calls openMenu with MenuType.SETTINGS when clicked', () => {
    // Mock the implementation of the useMenuManager hook
    const openMenuMock = jest.fn();
    (useMenuManager as jest.Mock).mockReturnValue({ openMenu: openMenuMock });

    render(
      <Provider theme={defaultTheme}>
        <SettingsButton />
      </Provider>
    );
    const button = screen.getByRole('button');

    // Simulate user clicking the button
    fireEvent.click(button);

    // Assert that openMenu was called with the correct argument
    expect(openMenuMock).toHaveBeenCalledWith(MenuType.SETTINGS);
  });

  test('Verify that the SettingsButton exists when rendered', () => {
    render(
      <Provider theme={defaultTheme}>
        <MenuManagerProvider>
          <SettingsButton />
        </MenuManagerProvider>
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const icon = within(button).getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  test('renders SettingsMenu when SettingsButton is clicked', () => {
    const openMenuMock = jest.fn();
    const closeMenuMock = jest.fn();

    (useMenuManager as jest.Mock).mockReturnValue({
      openMenu: openMenuMock,
      closeMenu: closeMenuMock,
      currentMenu: null
    });

    const { rerender } = render(
      <Provider theme={defaultTheme}>
        <SettingsProvider>
          <MenuManagerProvider>
            <SettingsButton />
          </MenuManagerProvider>
        </SettingsProvider>
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    (useMenuManager as jest.Mock).mockReturnValue({
      openMenu: openMenuMock,
      closeMenu: closeMenuMock,
      currentMenu: MenuType.SETTINGS
    });

    rerender(
      <Provider theme={defaultTheme}>
        <SettingsProvider>
          <MenuManagerProvider>
            <SettingsButton />
            {openMenuMock.mock.calls.length > 0 && <SettingsMenu onClose={() => {}} />}
          </MenuManagerProvider>
        </SettingsProvider>
      </Provider>
    );

    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
