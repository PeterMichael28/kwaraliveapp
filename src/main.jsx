import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import { AuthContextProvider } from './store/AuthContext';

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(


  <AuthContextProvider>
    <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </BrowserRouter>
  </AuthContextProvider>
)
