import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

// Assuming App is a standard React component, TypeScript will infer the types here.
// If App has props, ensure App.tsx is properly typed to accept those props.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
