import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsentBanner from '@/components/cookies/CookieConsentBanner'
import HomePage from '@/src/pages/HomePage'
import MenuPage from '@/src/pages/MenuPage'
import CookiePolicyPage from '@/src/pages/CookiePolicyPage'
import ScrollToHash from '@/src/ScrollToHash'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/politica-de-cookies" element={<CookiePolicyPage />} />
      </Routes>
      <Footer />
      <CookieConsentBanner />
    </BrowserRouter>
  )
}
