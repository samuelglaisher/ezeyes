// renderer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Renderer Process', () => {
  it('renders the App component', () => {
    render(<App />);
    expect(screen.getByText('Welcome to your Electron-React application!')).toBeInTheDocument();
  });
});
