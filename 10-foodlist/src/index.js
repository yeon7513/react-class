import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocaleProvider } from './contexts/LocaleContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);
