import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import App from './App';
import Home from './pages/home'
import PageB from './pages/pageB/pageB'
import PageC from './pages/pageC/pageC'
import PageD from './pages/pageD/pageD'
import PageE from './pages/pageE/pageE'
import PageF from './pages/pageF/pageF'
import Grouping from './pages/grouping/index';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Grouping />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
