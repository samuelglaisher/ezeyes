import React from 'react';
import { render } from '@testing-library/react';
import KeybindingManager from '../../../src/react/components/KeybindingManager';
import useKeybindings from '../../../src/react/hooks/useKeybindings';

jest.mock('../../../src/react/hooks/useKeybindings', () => ({
  useKeybindings: jest.fn(),
}));

describe('KeybindingManager component', () => {
  it('calls useKeybindings hook', () => {
    render(<KeybindingManager />);
    expect(useKeybindings).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const { container } = render(<KeybindingManager />);
    expect(container).toBeTruthy();
  });
});