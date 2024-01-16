// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App component', () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('Welcome to your Electron-React application!')).toBeInTheDocument();
  });
});
