import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import app from './dao/index';
import { connectDb } from './db';
import dotenv from 'dotenv';

const config = dotenv.config();
connectDb(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
