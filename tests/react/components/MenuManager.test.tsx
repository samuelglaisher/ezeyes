
import React from 'react';
import { render } from '@testing-library/react';
import { MenuManager } from '../../../src/react/components/MenuManager';
import { useMenuManager } from '../../../src/react/hooks/useMenuManager';

jest.mock('../../../src/react/hooks/useMenuManager', () => ({
  useMenuManager: jest.fn().mockReturnValue({
    closeMenu: jest.fn(),
  }),
}));

describe('MenuManager component', () => {
  it('calls useMenuManager hook', () => {
    render(<MenuManager />);
    expect(useMenuManager).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { container } = render(<MenuManager />);
    expect(container).toBeTruthy();
  });
});