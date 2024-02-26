import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NhostProvider } from '@nhost/react'
import { nhost } from './lib/nhost.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NhostProvider nhost={nhost}>
        <App />
      </NhostProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
