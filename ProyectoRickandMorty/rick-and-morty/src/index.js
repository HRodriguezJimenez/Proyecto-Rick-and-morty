import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';// React 18.
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Redux/store';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);




