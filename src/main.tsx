import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShoppingContextProvider } from './contexts/ShoppingContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ShoppingContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ShoppingContextProvider>
)
