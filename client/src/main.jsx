import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateGroup from './local-components/CreateGroup.jsx';
import CreateUser from './local-components/CreateUser';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateGroup />
    <CreateUser />
  </React.StrictMode>,
);
