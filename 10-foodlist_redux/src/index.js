import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { LocaleProvider } from './contexts/LocaleContext';
import './index.css';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <LocaleProvider defaultValue="ko">
      <App />
    </LocaleProvider>
  </Provider>
);
