import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './pages/Home.jsx'
import Agenda from './pages/Agenda.jsx'
import ContentPage from './pages/ContentPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/page/:slug" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
