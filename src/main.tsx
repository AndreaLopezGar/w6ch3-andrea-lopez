import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { App } from './components/app/app.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
